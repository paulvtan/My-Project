// Get elements from DOM
var pageheader = $("#page-header")[0]; //note the [0], jQuery returns an object, so to get the html DOM object we need the first item in the object
var pagecontainer = $("#page-container")[0];
// The html DOM object has been casted to a input element (as defined in index.html) as later we want to get specific fields that are only avaliable from an input element object
var imgSelector = $("#my-file-selector")[0];
var refreshbtn = $("#refreshbtn")[0]; //You dont have to use [0], however this just means whenever you use the object you need to refer to it with [0].
function summonerLookUp() {
    var summonerName = "";
    summonerName = document.getElementById("userName").value;
    var apiKey = "RGAPI-EDDF1ED9-48D5-4B23-B33B-CEF488949806";
    if (summonerName == "") {
        swal({
            title: "Error",
            text: "Please input a valid summoner name...",
            type: "warning",
            timer: 1700,
            showConfirmButton: false
        });
    }
    if (summonerName !== "") {
        //ajax API call to riot
        $.ajax({
            url: 'https://na.api.pvp.net/api/lol/oce/v1.4/summoner/by-name/' + summonerName + '?api_key=' + apiKey,
            type: 'GET',
            dataType: 'json',
            data: {},
            success: function (json) {
                var summonerNameNoSpace = summonerName.replace(" ", "");
                summonerNameNoSpace = summonerNameNoSpace.trim();
                summonerNameNoSpace = summonerNameNoSpace.toLowerCase();
                document.getElementById("userName").select();
                var name = json[summonerNameNoSpace].name;
                var summonerLevel = json[summonerNameNoSpace].summonerLevel;
                var profileIcon = json[summonerNameNoSpace].profileIconId;
                swal({
                    title: name,
                    text: "Summoner Level: " + summonerLevel,
                    allowOutsideClick: true,
                    allowEscapeKey: true,
                    imageUrl: "http://ddragon.leagueoflegends.com/cdn/6.18.1/img/profileicon/" + profileIcon + ".png",
                    closeOnConfirm: false,
                    showConfirmButton: false,
                    showCancelButton: true,
                    cancelButtonText: "Press 'ESC' to continue",
                });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                document.getElementById("userName").select();
                swal({
                    title: "Player not found.",
                    type: "error",
                    text: "Please try another summoner name...",
                    timer: 1700,
                    showConfirmButton: false,
                });
            }
        });
    }
    else { }
}
$("#userName").keyup(function (event) {
    if (event.keyCode == 13) {
        $("#button").click();
    }
});
