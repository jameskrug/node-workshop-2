var api = require("./library/synonyms.js");
var prompt = require("prompt");
var Table = require("cli-table");
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
                var nouns = [];
                var verbs = [];
                var adjectives = [];
                var theAnswers = JSON.parse(data.body);
                if (theAnswers.noun){
                    theAnswers.noun.syn.forEach(function(x){
                        nouns.push(x);
                    });
                }
                if (theAnswers.verb){
                    theAnswers.verb.syn.forEach(function(x){
                        verbs.push(x);
                    });
                }
                if (theAnswers.adjective){
                    theAnswers.adjective.syn.forEach(function(x){
                        adjectives.push(x);
                    });
                
                }
                var table = new Table({
                    head: ["Noun".yellow, "Adjective".yellow, "Verb".yellow]
                });
                table.push([nouns.join("\n"), verbs.join("\n"), adjectives.join("\n")]);
                console.log(table.toString());
            }
        });
    }
})
    
