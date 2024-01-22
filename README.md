# allure-extras

`allure-extras` is an innovative npm package designed to enhance the functionality of Allure reports. It introduces a novel approach to organizing and analyzing test results, especially beneficial for large and complex test suites. By using the `groupBy` tag format, `allure-extras` allows users to categorize and segregate test failures more effectively, providing clearer insights into specific modules or aspects of the application under test.

## Features

- **Test Grouping**: Automatically groups test failures based on custom `groupBy` tags for a more organized review process.
- **Easy Identification**: Simplifies the process of identifying which modules or sections of your tests are failing.
- **Customizable Tags**: Users can define multiple `groupBy` tags like `groupBy:SOMETHING1`, `groupBy:SOMETHING2`, etc., to categorize tests according to different criteria.

## Installation

Install `allure-extras` globally using npm:

```bash
npm install -g allure-extras
```

This global installation allows you to use `allure-extras` across all your projects and integrate it seamlessly into your testing workflow.

## Usage
Steps to generate updated report:
1.  Make sure `allure-commandline` is installed globally using `npm i -g allure-commandline
2. Install `allure-extras` with `npm install -g allure-extras` command
3. Run `allure-extras` (once only) and it adds additional capabilites to the allure report
4. Now you can use `allure generate`, `allure serve` commands the way you like

### Tagging Tests

To leverage the full potential of `allure-extras`, ensure your tests are tagged following the `groupBy` format:

```plaintext
groupBy:ModuleName
groupBy:Functionality
groupBy:AnyOtherCriteria
```

### Viewing Grouped Results

After running your tests, `allure-extras` enhances the Allure report by adding an additional dropdown menu. This menu categorizes the failed tests based on the specified `groupBy` tags, allowing for a quick and easy identification of problem areas in your test suite.

## Contribution

Contributions to `allure-extras` are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request on our GitHub repository.

## License

`allure-extras` is released under the [ISC License](LICENSE).
