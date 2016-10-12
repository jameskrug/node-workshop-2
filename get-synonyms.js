var api = require("./library/synonyms.js");
var prompt = require("prompt");
var Table = require("cli-table");
var table = new Table();
var colors = require("colors");


prompt.get("Give me a word", function(err, data){
    var myWords = new api.SynonymAPI("0fbf1868b3e1def7efb07c48dba7e4fd");
    if (err){
        console.log("different problems");
    }
    else{
        var theWord = data["Give me a word"];
        myWords.getSynonyms(theWord, function(err, data){
            if (err){
                console.log("an even bigger error");
            }
            else{
                var nounTable = new Table();
                var verbTable = new Table();
                var adjectiveTable = new Table();
                var theAnswers = JSON.parse(data.body);
                if (theAnswers.noun){
                    theAnswers.noun.syn.forEach(function(x){
                        nounTable.push({noun: [x]});
                    });
                }
                if (theAnswers.verb){
                    theAnswers.verb.syn.forEach(function(x){
                        verbTable.push({verb: [x]});
                    });
                }
                if (theAnswers.adjective){
                    theAnswers.adjective.syn.forEach(function(x){
                        adjectiveTable.push({adjective: [x]});
                    });
                
                }
                console.log(nounTable.toString());
                console.log(verbTable.toString());
                console.log(adjectiveTable.toString());
            }
        });
    }
})
    
