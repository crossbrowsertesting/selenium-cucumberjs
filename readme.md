# Getting Started with CucumberJS and CrossBrowserTesting #

Want a powerful and easy to use command line tool for running Selenium-JS tests? [CucumberJS](https://github.com/cucumber/cucumber-js) might be the option for you. CucumberJS provides language-bindings for the powerful browser-driving tool [Selenium](http://www.seleniumhq.org/docs/). It's [Gherkin](https://cucumber.io/docs/gherkin/) language allows you to write your tests in a way that can be easily read by anyone on your team. CucumberJS integrates easily with the CrossBrowserTesting platform, so you can perform tests on a wide variety of OS/Device/Browser combinations, all from one test. Let's walk through getting setup.

The easiest way to get started is to simply clone this repository and perform the following command in this repository:

```
npm install
```

However, if you're new to CucumberJS, we'll walk you through getting setup the first time around. First we need to create a new folder, initialize your project, and get Cucumber and Selenium installed. You can do this through NPM:

```npm init --yes```</br>
```npm install cucumber --save-dev```</br>
```npm install selenium-webdriver --save-dev```</br>

We're also going to install Javascript's [Request](https://github.com/request/request) module, so we can make Restful API calls to set the score for our test once we're finished. We can also do this with NPM:

`npm install request --save-dev`

Before starting any tests, you can configure Cucumber to use testing frameworks like [Chai](http://chaijs.com/) or [Mocha](https://mochajs.org/), and you can [read more on that here](http://webdriver.io/guide/getstarted/configuration.html). For the purpose of this introduction, we'll dive right into getting connected with CBT. We'll need to create a new file step_definitions/world.js that defines our connection to the remote hub:

```javascript
var webdriver = require('selenium-webdriver');
var{setWorldConstructor} = require('cucumber');
var{setDefaultTimeout}=require('cucumber');

global.username = 'YOUR_USERNAME';
global.authkey = 'YOUR_AUTHKEY';
function CBTWorld() {
  var remoteHub = 'http://hub.crossbrowsertesting.com:80/wd/hub';
  var caps = {
    name : 'Basic Example',
    build :  '1.0',
    browserName : 'Chrome', // Pulls latest version of Chrome by default
    platform : 'Windows 10', // To specify version, add version : 'desired version'
    screen_resolution : '1366x768',
    record_video : 'true',
    username : global.username,
    password : global.authkey
  };

  this.driver = new webdriver.Builder()
    .usingServer(remoteHub)
    .withCapabilities(caps)
    .build();
}

  setDefaultTimeout(60 * 1000);
  setWorldConstructor(CBTWorld);

```

Be certain to change the username and authorization key above to those associated with your account. Now that we have that out of the way, we can put together our first script. We'll first need to create a feature file where our test steps are defined in the Gherkin language. Save the following as features/todo.feature:

```
Feature: CBT Feature

  Scenario: Testing ToDos
    Given I visit a ToDo app
    When I click some ToDos
    Then I add another ToDo to our list
    When I archive my old ToDos
    Then I should have 4 ToDos
```

Lastly, we need to define the procedural code. This will be the javascript that works with the Selenium language bindings to create the logic of our test. Save the following as step_definitions/browser_steps.js:

```javascript

var webdriver = require('selenium-webdriver');
var {Given, When, Then } = require('cucumber');
var assert = require('assert');

  Given('I visit a ToDo app', function() {
    return this.driver.get('http://crossbrowsertesting.github.io/todo-app.html');
  });

  When('I click some ToDos', function () {
    this.driver.findElement(webdriver.By.name("todo-4")).click();
    return this.driver.findElement(webdriver.By.name("todo-5")).click();
  });

  Then('I add another ToDo to our list', function () {
    this.driver.findElement(webdriver.By.id("todotext")).sendKeys("Run your first Selenium Test");
    return this.driver.findElement(webdriver.By.id("addbutton")).click();
  });

  When('I archive my old ToDos', function() {
    return this.driver.findElement(webdriver.By.linkText("archive")).click()
  });

  Then('I should have 4 ToDos', function() {
    return this.driver.findElements(webdriver.By.className('ng-pristine ng-untouched ng-valid'))
      .then(function(elems) {
        assert.equal(elems.length, 4);
    });
  
  });

```
Save the following as step_definitions/hooks.js:

```javascript
var {After} = require('cucumber');


  After(function() {
    return this.driver.quit();
  });

```

Run your test using the command:

```node_modules/.bin/cucumber-js ./features -r ./step_definitions```

As you can probably make out from our test, we visit a small ToDo App example, interact with our page, and use assertions to verify that the changes we've made are actually reflected in our app.

We kept it short and sweet for our purposes, but there is so much more you can do with CucumberJS! Being built on top of Selenium means the sky is the limit as far as what you can do. If you have any questions or concerns, feel [free to get in touch](mailto:info@crossbrowsertesting.com).
