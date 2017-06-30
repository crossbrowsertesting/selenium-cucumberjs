var webdriver = require('selenium-webdriver');
var {defineSupportCode} = require('cucumber');
global.username = 'chase@crossbrowsertesting.com';
global.authkey = 'selenium';
function CBTWorld() {
  var remoteHub = 'http://hub.crossbrowsertesting.com:80/wd/hub';
  var caps = {
    name : 'Basic Example',
    build :  '1.0',
    browser_api_name : 'Chrome56x64', 
    os_api_name : 'Win7x64-C1', 
    screen_resolution : '1366x768',
    record_video : 'true',
    record_network : 'true',
    browserName : 'chrome', // <---- this needs to be the browser type in lower case: firefox, internet explorer, chrome, opera, or safari
    username : global.username,
    password : global.authkey
  };
  
  this.driver = new webdriver.Builder()
    .usingServer(remoteHub)
    .withCapabilities(caps)
    .build();
}

defineSupportCode(function({setDefaultTimeout}) {
	setDefaultTimeout(60 * 1000);
})

defineSupportCode(function({setWorldConstructor}) {
  setWorldConstructor(CBTWorld)
})
