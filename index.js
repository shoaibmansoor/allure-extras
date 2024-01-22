#!/usr/bin/env node

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const os = require('os');
const execSync = require('child_process').execSync;
const fileNames = ['allure-generator', 'allure-commandline'];

async function downloadLatestJar(fileName) {
    console.log(`# Downloading new file: ${fileName}`);
    const repoUrl = 'https://api.github.com/repos/shoaibmansoor/allure2/releases/latest';
    const response = await axios.get(repoUrl);
    const asset = response.data.assets.find(asset => asset.name.startsWith(fileName));

    if (!asset) {
        throw new Error(`No file found for ${fileName} in the latest release`);
    }

    const fileUrl = asset.browser_download_url;
    const fileData = await axios.get(fileUrl, { responseType: 'arraybuffer' });
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'allure-extras-'));
    const filePath = path.join(tempDir, asset.name);
    fs.writeFileSync(filePath, fileData.data);
    console.log(`# ${fileName} downloaded successfully to ${tempDir}!`);

    return filePath;
}

function getExistingFileName(allureLibPath, filename) {
    const files = fs.readdirSync(allureLibPath);
    return files.find(file => file.startsWith(filename));
}

function replaceFile(oldFilePath, newFilePath) {
    if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
    }
    fs.copyFileSync(newFilePath, oldFilePath);
}

function checkAllureInstallation(filePath, fileName) {
    console.log(`# Replacing older version of ${fileName}`);
    const rootPath = execSync('npm root -g').toString().trim();
    const allureLibPath = path.join(rootPath, 'allure-commandline', 'dist', 'lib');

    if (!fs.existsSync(allureLibPath)) {
        throw new Error('Please install allure-commandline globally');
    }

    const oldFileName = getExistingFileName(allureLibPath, fileName)
    const oldFilePath = path.join(allureLibPath, oldFileName);
    replaceFile(oldFilePath, filePath);
    console.log(`# ${fileName} has been updated successfully!`);
}

(async () => {
    try {
        for (const fileName of fileNames) {
            const downloadedFilePath = await downloadLatestJar(fileName);
            checkAllureInstallation(downloadedFilePath, fileName);
            // Cleanup downloaded file
            fs.unlinkSync(downloadedFilePath);
        }
        console.log("# All files have been updated and cleaned up!");
        console.log("# Voila! The installation is successful!!!");
    } catch (error) {
        console.error(error.message);
    }
})();
