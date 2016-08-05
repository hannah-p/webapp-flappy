var playerName, scoreEntry;
var namedone = false;
var oldscore= 0;
jQuery("#credits").on("click", function() {
    var message = "Game created by Hannah";
    alert(message);
    jQuery("#credits").append(
        "<p>" + "Thanks" + "</p>"
    );
});


scorelist = [];
function registerScore(){
if (namedone === false){
 playerName = prompt("What's your name?");
 scoreEntry =  ":" + " "+ score.toString();
  namedone = true;
}
else {
 //scoreEntry = playerName + ":" + " "+ score.toString();
}
if (score > oldscore){
newscore();
}
}

//function if over oldscore
function newscore(){
//{jQuery("#scoresbtn").on("click", function() {
  jQuery("#content").append(
  "<ul>" +
      "<li>" + playerName + " " + score + "</li>" +
  "</ul>");
  oldscore = score;
}


//jQuery("#scoresbtn").on("click", function() {
//registerScore();
//});


jQuery("#creditsbtn").on("click", function() {
    jQuery("#creditsDiv").append(
        "<div>" + "Game created by Hannah(sorry but i cant be bothered to add code so when you click again this txt dissapears)" + "</div>"
    );
});

jQuery("#helpbtn").on("click", function() {
    jQuery("#helpDiv").empty();
    jQuery("#helpDiv").append(
        "<ul>" +
             "<li>" + "Press SPACE to fly" + "</li>" +
             "<li>" + "Try not to fall or crash" + "</li>" +
             "<li>" + "Click on the screen to add fun clouds!" + "</li>" +
             "<li>" + "Good clouds make you float, bad clouds make you sink" + "</li>" +
         "</ul>"
    );
});
