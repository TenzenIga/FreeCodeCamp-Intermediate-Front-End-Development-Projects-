$(document).ready(function() {
  var idVal='';
  var name = '';
  var logo = '';
  var game = '';
  var url ='';
  var preview = '';
  //array of channels
  var arr = ["ESL_SC2", "frecodecmp", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

  //function to send request to get info about channels
   function getInfo(array) {
    var htmlOnline = '';
    var htmlOffline = '';
    for (var i = 0; i < array.length; i++) {

      (function(i) {
        $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + array[i] + '?callback=?', function(data) {
          //checking if channel online
          if (data.stream !== null) {

            //channel name , logo and curent stream
            name = data.stream.channel.display_name;
            logo = data.stream.channel.logo;
            if (data.logo === null) {
              logo = 'http://www-cdn.jtvnw.net/images/xarth/404_user_600x600.png';
            }
            game = data.stream.channel.status;
            url = data.stream.channel.url;
            preview = data.stream.preview.medium;

            //appending data to the page
            htmlOnline += "<div id=" + name + " class='col-lg-4 col-md-4 col-sm-6 col-xs-6 online'><button type='button' class='close'>x</button><a href=" + url + " target='_blank'><img class='logo'src =" + logo + '><div class="nameStatus">'+data.stream.game +'</div><h3>' + name + '</h3><div><img class="preview" src=' + preview + '></a><p>' + game + '</p></div></div>';
            $('#contentOnline').html(htmlOnline);
          } else { // we do extra check if channel is off or doesn't exist
            $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/' + array[i] + '?callback=?',function(data1) {
              if (data1.error) {

              } else { //adding offline channels
                $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/' + array[i] + '?callback=?', function(data2) {
                  name = data2.display_name;
                  logo = data2.logo;
                  if (data2.logo === null) {
                    logo = 'http://www-cdn.jtvnw.net/images/xarth/404_user_600x600.png';
                  }
                  url = data2.url;
                  htmlOffline += "<div id=" + name + " class='col-lg-4 col-md-4 col-sm-6 col-xs-6 offline'><button type='button' class='close'>x</button><img class='logo' src =" + logo + '><a href=' + url + " target='_blank'><h3>" + name + '</h3></a><p class="status">Offline</p></div>';
                  $('#contentOffline').html(htmlOffline);
                })
              }

            })
          }
        });
      })(i);

    }
  
  }; //end of function
  getInfo(arr);

  $("#showOnline").click(function() {
    getInfo(arr);
    $("#tooltip").hide();
    $("#contentOffline").fadeOut();
    $("#contentOnline").fadeIn();
  })
  $("#showOffline").click(function() {
    getInfo(arr);
    $("#tooltip").hide();
    $("#contentOnline").fadeOut()
    $("#contentOffline").fadeIn();;
  })
  $("#showAll").click(function() {
      getInfo(arr);
      $("#tooltip").hide();
      $("#contentOnline").fadeIn();
      $("#contentOffline").fadeIn();
    })
  
   $("#submit").click(function() {
    searchValue = $("#search").val();
    var idx = arr.indexOf(searchValue);
    $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/' + searchValue + '?callback=?', function(data1) {
      if (data1.error) {
        $('#tooltip').html("Channel doesn't exist");
        $('#tooltip').show();
      } else if (idx != -1) {
        $("#tooltip").html('Channel is already in list');
        $('#tooltip').show();

      } else {
        $('#tooltip').hide();
        arr.push(searchValue);
        getInfo(arr);
      }

    });
  })
    $("#search").keypress(function(e) {
      if (e.which == 13) {
        $("#submit").click();
        return false;
      }
    });
 $(document).on('click', '.close', function(){ 
    idVal= $(this).parent().attr("id");
    $(this).parent().hide();
    var id=arr.indexOf(idVal);
    arr.splice(id, 1);
});
});