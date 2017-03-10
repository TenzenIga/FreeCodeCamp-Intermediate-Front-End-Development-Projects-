//load this page with http 
$(document).ready(function() {

  $.getJSON("http://ip-api.com/json", function(e) {

    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + e.lat + "&lon=" + e.lon + "&appid=ed1f66082b30d87785b6056017a3a10a&units=metric", function(data) {
      var units = "metric";
      var temp = Math.floor(data.main.temp);
      var imgURL = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
      var description = data.weather[0].description;
      var city = e.city;
      var wind = data.wind.speed;
      var name = data.name;
      var humidity = data.main.humidity;
      //icon code without d/n
      var iconCode = data.weather[0].icon.slice(0, -1);

      //object of pictures
      var weatherImg = {
        "01": "https://static.pexels.com/photos/3768/sky-sunny-clouds-cloudy.jpg",
        "02": "http://www.hdwallpapers.in/walls/sunrays_sky_clouds-wide.jpg",
        "03": "https://upload.wikimedia.org/wikipedia/commons/a/ae/Currambine_skyscape_scattered_clouds_blue_sky.jpg",
        "04": "http://www.hdwallpapers.in/walls/sunrays_sky_clouds-wide.jpg",
        "09": "http://sparklequotes.com/wp-content/uploads/2016/10/Rain-Status-2.jpg",
        "10": "http://sparklequotes.com/wp-content/uploads/2016/10/Rain-Status-2.jpg",
        "11": "https://aos.iacpublishinglabs.com/question/aq/1400px-788px/thunderstorms-made_fdef5d2957edbe09.jpg?domain=cx.aos.ask.com",
        "13": "http://engl4life.ru/wp-content/uploads/2016/11/833_o.jpg",
        "50": "https://www.sunhome.ru/i/foto/55/tuman-v5.orig.jpg"
      };

      // add info to site
      $("#content").append("<h2>" + city + ', ' + name + "</h2>", '<img class="img-thumbnail" src=' + imgURL + '></img>', '<span class="temp">' + temp + '</span>' + '<a class="switch">' + " °C" + '</a>', "<div class='des'>" + description + "</div>", "<p>Wind: " + wind + " mps" + "</p>", "<p>Humidity: " + humidity + "%</p>");
      //switch the units
      $(".switch").click(function() {
        if ($(this).text() === " °C") {
          $(".temp").html(Math.floor((temp * 1.8) + 32));
          $(".switch").html(" °F");
          $(".temp").after($(".switch"));
        } else {
          $(".temp").html(temp);
          $(".switch").html(" °C");
          $(".temp").after($(".switch"));

        }

      });
      //change the background
          
      $("body").css('background-image', 'url(' + weatherImg[iconCode] + ')');

    });
  });
});