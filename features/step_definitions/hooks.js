var {defineSupportCode} = require('cucumber');
var cleanUp = require('./cleanUp.js');
var tunnel = require('cbt_tunnels');

defineSupportCode(function({Before}) {
	Before(function() {
		tunnel.start({
			'username': global.username,
			'authkey': global.authkey,
			'quiet': true
		}, function() {
			console.log('Tunnel started');
		})
	})
})

defineSupportCode(function({After}) {
  After(function(scenarioResult) {
  	this.driver.getSession().then(function(session) {
  		cleanUp(scenarioResult.status, session.id_, this.username, this.authkey);
  	});
    return this.driver.quit();
    tunnel.stop();
    console.log('tunnel status after stop', tunnel.status());
  });
});