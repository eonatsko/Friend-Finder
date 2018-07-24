var friendList = require("../data/friends");
module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------
  
    app.get("/api/friends", function(req, res) {
      res.json(friendList);
    });
  
  
    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------
  
    app.post("/api/friends", function(req, res) {
      var userInfo=(req.body);
      userScore= userInfo.scores;
      var userArr = userScore.map(function(v) {
        return parseInt(v, 10);
      });
      var yourMatch;

      function getFriend() {
        var matchScore;
        for(var i=0;i<friendList.length;i++){
          var totalDiff=0;
          var friendMatch=friendList[i];
          var friendScores = friendMatch.scores;
          for(var j=0;j<friendScores.length;j++){
          var currScore;
          currScore=friendScores[j];
          totalDiff+=Math.abs(currScore-userArr[j]);
          }
          if(matchScore==null || matchScore>totalDiff){
            matchScore=totalDiff;
            yourMatch=friendMatch;
          }
        }
      }
      getFriend();
      friendList.push(userInfo);
      console.log(yourMatch);
      res.json(yourMatch);
      res.json(true);
    
    });

  };