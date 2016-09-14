
// Get elements from DOM
var pageheader = $("#page-header")[0]; //note the [0], jQuery returns an object, so to get the html DOM object we need the first item in the object
var pagecontainer = $("#page-container")[0]; 

// The html DOM object has been casted to a input element (as defined in index.html) as later we want to get specific fields that are only avaliable from an input element object
var imgSelector : HTMLInputElement = <HTMLInputElement> $("#my-file-selector")[0]; 
var refreshbtn = $("#refreshbtn")[0]; //You dont have to use [0], however this just means whenever you use the object you need to refer to it with [0].




function summonerLookUp() {

    var summonerName = "";
    summonerName = (<HTMLInputElement>document.getElementById("userName")).value;

    var apiKey = "RGAPI-EDDF1ED9-48D5-4B23-B33B-CEF488949806";
    
    if (summonerName == "") {
        swal({   
            title: "Error",   
            text: "Please input a summoner name.", 
            type: "warning",
            allowOutsideClick: true,
            allowEscapeKey: true,
           });
    }

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
                
                var name = json[summonerNameNoSpace].name;
                var summonerLevel = json[summonerNameNoSpace].summonerLevel;
                var profileIcon = json[summonerNameNoSpace].profileIconId;

            

                swal({   
                    title: name,   
                    text: "Summoner Level: " + summonerLevel,   
                    imageUrl: "http://ddragon.leagueoflegends.com/cdn/6.18.1/img/profileicon/" + profileIcon + ".png", 
                    allowOutsideClick: true,
                    allowEscapeKey: true
            });
                                
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                swal({   
                    title: "User not found!",   
                    text: "The following summoner " + summonerName + " does not exist.",
                    type: "error",
                    confirmButtonText: "Search another summoner",
                    confirmButtonColor: "#DD6B55",
                    allowOutsideClick: true,
                    allowEscapeKey: true,
                    });
            }
        });
    } else {}
}
