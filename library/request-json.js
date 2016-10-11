var request = require("request");

function requestJson(theUrl, xFunction){
    request(theUrl, function(err, data){
        if (err){
            xFunction(err);
        }
        else{
            try{
                xFunction(null, JSON.parse(data.body));
            }
            catch(error){
                xFunction(error);
            }
        }
    });
}

module.export = {
    requestJson: requestJson
}