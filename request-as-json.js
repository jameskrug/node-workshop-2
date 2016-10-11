var request = require("request");

function requestJson(theUrl, xFunction){
    request(theUrl, function(err, data){
        if (err){
            xFunction(err);
        }
        else{
            
        }
    })
}