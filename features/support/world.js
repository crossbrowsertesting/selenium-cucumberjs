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
    browserName : 'Chrome', // Pulls latest version of Chrome by default
    platform : 'Windows 7', // To specify version, add version : 'desired version'
    record_video : 'true',
    record_network : 'true',
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
