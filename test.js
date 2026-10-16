const {remote} = require('webdriverio');

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  'appium:appPackage': 'com.gregnorth.appiumpractice',
  'appium:appActivity': '.MainActivity',
  'appium:noReset': true,
  'appium:forceAppLaunch': true,
};

const wdOpts = {
  hostname: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
  capabilities,
};

async function runTest() {
  const driver = await remote(wdOpts);
  try {
    const homeTitle = await driver.$('~home-title');
    await homeTitle.waitForDisplayed({timeout: 10000});

    await (await driver.$('~start-registration')).click();
    await (await driver.$('~registration-screen')).waitForDisplayed();

    await (await driver.$('~full-name-input')).setValue('Alex Tester');
    await (await driver.$('~email-input')).setValue('alex@example.com');
    await (await driver.$('~password-input')).setValue('secret123');
    await driver.hideKeyboard().catch(() => {});

    const advancedOption = await driver.$('~experience-advanced');
    await advancedOption.scrollIntoView();
    await advancedOption.click();

    const termsSwitch = await driver.$('~terms-switch');
    await termsSwitch.scrollIntoView();
    await termsSwitch.click();

    const submitButton = await driver.$('~submit-registration');
    await submitButton.scrollIntoView();
    await submitButton.click();

    const resultHeading = await driver.$('~result-heading');
    await resultHeading.waitForDisplayed({timeout: 5000});
    const heading = await resultHeading.getText();
    if (heading !== 'Registration complete') {
      throw new Error(`Unexpected result heading: ${heading}`);
    }

    const resultEmail = await driver.$('~result-email');
    const submittedEmail = await resultEmail.getText();
    if (submittedEmail !== 'alex@example.com') {
      throw new Error(`Unexpected submitted email: ${submittedEmail}`);
    }

    console.log('Appium practice journey passed.');
  } finally {
    await driver.deleteSession();
  }
}

runTest().catch(console.error);