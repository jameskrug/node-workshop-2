var request = require("request");

function SynonymAPI(apiKey) {
    this.apiKey = apiKey;
}

SynonymAPI.prototype.getSynonyms = function(word, xFunction){
    request.get("http://words.bighugelabs.com/api/2/0fbf1868b3e1def7efb07c48dba7e4fd/" + word +"/json", function(err, data){
        if (err){
            console.log("problems!");
        }
        else{
            try{
                xFunction(null, data);
            }
            catch(error){
                console.log(error);
                xFunction(error);
            }
        }
    });
};


module.exports = {
    SynonymAPI : SynonymAPI
}