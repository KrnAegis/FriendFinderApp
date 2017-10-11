
var allFriends = require("../data/friends.js");

module.exports = function(app){
	//Getting all data from the friends.js
  app.get("/api/friends", function(req, res) {
    res.json(allFriends);
  });
  //post data after receiving data from survey.html
  app.post("/api/friends", function(req, res) {
  	var totScore;
    var newFriend = req.body;
    console.log(newFriend)
    var compDiff = 40;
    var compFriend;
    var compFriendPhoto;
    //loop for calculating compatibility through all friends
        for (var i = 0; i < allFriends.length; i++) {
            totScore = 0;
            //difference of each question value and existing one
            for (var j = 0; j < 10; j++) {
                var score1 = newFriend.scores[j];
                var score2 = allFriends[i].scores[j];
                parseInt(score1);
                parseInt(score2);
                // absolute value of difference
                var addToScore = Math.abs(score1 - score2);
                totScore = totScore + addToScore;
            }
            //store new score to compare to
            var newTotalScore = totScore;
            //changing data until score matches or closest
            if (newTotalScore < compDiff) {
                compDiff = newTotalScore;
                compFriend = allFriends[i].name;
                compFriendPhoto = allFriends[i].photo;
            }
        }
        //best friend match data
        var bestFriend = {
            name: compFriend,
            photo: compFriendPhoto
        };
        // send new data to friends.js
        	allFriends.push(newFriend);
        	res.json(bestFriend);
  });
}


