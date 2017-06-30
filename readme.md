**Getting Started with CucumberJS and CrossBrowserTesting**

Want a powerful and easy to use command line tool for running Selenium-JS tests? [CucumberJS](https://github.com/cucumber/cucumber-js) might be the option for you. CucumberJS provides language-bindings for the powerful browser-driving tool [Selenium](http://www.seleniumhq.org/docs/). Its test runner allows you to write your tests in a way that can be easily read by anyone on your team, by using [Gherkin](https://cucumber.io/docs/reference). CucumberJS integrates easily with the CrossBrowserTesting platform, so you can perform tests on a wide variety of OS/Device/Browser combinations, all from one test. Let's walk through getting setup.

If you're already a WebDriverIO user, you can quickly change your current tests by doing the following:

```javascript
var webdriver = require('selenium-webdriver');
var {defineSupportCode} = require('cucumber');
global.username = 'chase@crossbrowsertesting.com';
global.authkey = 'notmyrealauthkey';
function CBTWorld() {
  var remoteHub = 'http://hub.crossbrowsertesting.com:80/wd/hub';
  var caps = {
    name : 'Basic Example',
    build :  '1.0',
    browser_api_name : 'Chrome56x64', 
    os_api_name : 'Win7x64', 
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
```

As you can see, we're now pointing the test at our hub rather than a local driver instance. 

If you're new to WebDriverIO, we'll walk you through getting setup the first time around. First we need to get WebDriverIO installed. You can do this through NPM:

`npm install cucumber --save`

We're also going to install Javascript's [Request](https://github.com/request/request) module, so we can make Restful API calls to set the score of our test once we're finished. We can also do this with NPM:

`npm install request --save`

Before starting any tests, you can configure WebDriverIO to use testing frameworks like [Chai](http://chaijs.com/) or [Mocha](https://mochajs.org/), and you can [read more on that here](http://webdriver.io/guide/getstarted/configuration.html). For our purposes, we'll start by writing our first test with CBT. Copy the following script into your favorite text-editor, and make sure to change the username and authkey values to those associated with your account:

```javascript
var webdriverio = require('webdriverio');
var request = require('request');

var username = 'you@yourdomain.com'; 			// the email address associated with your account
var authkey = 'yourauthkey';					// can be found on the "Manage Account" page of our app
var options = {
  desiredCapabilities: {
    name: 'Selenium Test Example',
    build: '1.0',
    browser_api_name: "FF45",
    os_api_name: "Win10",
    browserName: 'firefox',
    record_video: 'true',
    record_network: 'true'
  },
  host: "hub.crossbrowsertesting.com",
  port: 80,
  user: username,
  key: authkey      
}

var sessionId;

//Call API to set the score
function setScore(score) {

    var result = { error: false, message: null }

    if (sessionId){
        
        request({
            method: 'PUT',
            uri: 'https://crossbrowsertesting.com/api/v3/selenium/' + sessionId,
            body: {'action': 'set_score', 'score': score },
            json: true
        },
        function(error, response, body) {
            if (error) {
                result.error = true;
                result.message = error;
            }
            else if (response.statusCode !== 200){
                result.error = true;
                result.message = body;
            }
            else{
                result.error = false;
                result.message = 'success';
            }

        })
        .auth(username, authkey);
    }
    else{
        result.error = true;
        result.message = 'Session Id was not defined';
    }

}

// create your webdriverio.remote with your options as an argument
var client = webdriverio.remote(options);

client
    .init()
    .then(function() {
      sessionId = client.requestHandler.sessionID;
    })
    .url('http://www.google.com')
    .getTitle().then(function(title) {
        if (title === 'Google') {
          setScore('pass');
        } else {
          setScore('fail');
        }
    })
    .end();

```

As you can probably make out from our test, we visit Google, and output the title we see. If the title is correct (hopefully Google hasn't changed names on us), then we'll set the score to pass. We kept it short and sweet for our purposes, but there is so much more you can do with WebDriverIO. Being built on top of Selenium means the sky is the limit as far as what you can do. If you have any questions or concerns, feel [free to get in touch](mailto:info@crossbrowsertesting.com)!