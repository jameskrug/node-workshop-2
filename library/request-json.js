var request = require("request");

function requestJson(theUrl, xFunction){
    request(theUrl, function(err, data){
        if (err){
            console.log("error 1");
            xFunction(err);
        }
        else{
            try{
                xFunction(null, JSON.parse(data.body));
            }
            catch(error){
                console.log("error 2");
                xFunction(error);
            }
        }
    });
}

module.exports = {
    requestJson: requestJson
}