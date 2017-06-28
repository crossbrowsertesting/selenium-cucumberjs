var webdriver = require('selenium-webdriver');
var {defineSupportCode} = require('cucumber');
var assert = require('assert');

defineSupportCode(function({Given, When, Then}) {
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
});