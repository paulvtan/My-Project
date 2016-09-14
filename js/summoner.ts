
// Get elements from DOM
var pageheader = $("#page-header")[0]; //note the [0], jQuery returns an object, so to get the html DOM object we need the first item in the object
var pagecontainer = $("#page-container")[0]; 

// The html DOM object has been casted to a input element (as defined in index.html) as later we want to get specific fields that are only avaliable from an input element object
var imgSelector : HTMLInputElement = <HTMLInputElement> $("#my-file-selector")[0]; 
var refreshbtn = $("#refreshbtn")[0]; //You dont have to use [0], however this just means whenever you use the object you need to refer to it with [0].




function summonerLookUp() {
    sweetAlert('Congratulations!', 'Your message has been successfully sent', 'success');

    

    var summonerName = "";
    summonerName = (<HTMLInputElement>document.getElementById("userName")).value;

    var apiKey = "RGAPI-EDDF1ED9-48D5-4B23-B33B-CEF488949806";
    
    //$(".fakeloader").fakeLoader();


    if (summonerName !== "") {       
 //ajax API call to riot
        $.ajax({
            url: 'https://na.api.pvp.net/api/lol/oce/v1.4/summoner/by-name/' + summonerName + '?api_key=' + apiKey,
            type: 'GET',
            dataType: 'json',
            data: {

            },
            success: function (json) {
                var summonerNameNoSpace = summonerName.replace(" ", "");

                summonerNameNoSpace = summonerNameNoSpace.toLowerCase().trim();

                var summonerLevel = json[summonerNameNoSpace].summonerLevel;
                var profileIcon = json[summonerNameNoSpace].profileIconId;

                var message = "Summoner Name: " + summonerName + "\nSummoner Level: " + summonerLevel + "\nProfile Icon: "  + profileIcon;

                alert(message);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("error getting Summoner data!");
            }
        });
    } else {}
}
