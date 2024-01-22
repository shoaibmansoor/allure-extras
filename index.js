const axios = require('axios');
const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;
const fileName = 'allure-generator.jar';


async function downloadLatestJar() {
    const repoUrl = 'https://api.github.com/repos/shoaibmansoor/allure2/releases/latest';
    const response = await axios.get(repoUrl);
    const jarAsset = response.data.assets.find(asset => asset.name.endsWith('.jar'));

    if (!jarAsset) {
        throw new Error('No JAR file found in the latest release');
    }

    const jarUrl = jarAsset.browser_download_url;
    const jarData = await axios.get(jarUrl, { responseType: 'arraybuffer' });
    fs.writeFileSync(fileName, jarData.data);
}

function checkAllureInstallation() {
    const rootPath = execSync('npm root -g').toString().trim();
    const allureLibPath = path.join(rootPath, 'allure-commandline', 'dist', 'lib');

    if (!fs.existsSync(allureLibPath)) {
        throw new Error('Please install allure-commandline globally');
    }

    const files = fs.readdirSync(allureLibPath);
    const allureGeneratorFile = files.find(file => file.startsWith('allure-generator'));

    if (allureGeneratorFile) {
        // If exists, replace the old file
        fs.unlinkSync(path.join(allureLibPath, allureGeneratorFile));
    }
    // Copy the new jar file
    fs.copyFileSync(fileName, path.join(allureLibPath, allureGeneratorFile));
}

(async () => {
    try {
        await downloadLatestJar();
        checkAllureInstallation();
    } catch (error) {
        console.error(error.message);
    }
})();
