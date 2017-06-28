const request = require('request');
module.exports = function cleanUp(scenarioResult, sessionId, user, auth) {
    var result = { error: false, message: null }

    if (sessionId) {
        var score = null;

        if (scenarioResult == 'passed') {
          score = 'pass';
        } else {
          score = 'fail';
        }
        request({
            method: 'PUT',
            uri: 'https://crossbrowsertesting.com/api/v3/selenium/' + sessionId,
            body: {'action': 'set_score', 'score': score },
            json: true
        }, function(error, response, body) {
            if (error) {
                result.error = true;
                result.message = error;
            } else if (response.statusCode !== 200) {
                result.error = true;
                result.message = body;
            } else {
                result.error = false;
                result.message = 'success';
            }
        }).auth(user,auth);
    } else {
        result.error = true;
        result.message = 'Session Id was not defined';
    }
    
    return;
}