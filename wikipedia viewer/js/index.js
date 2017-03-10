$(document).ready(function() {

  $("#submitBtn").click(function(e) {
    //get input value for search
    var searchValue = $('#search').val();
    // send request to wikiapi
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&list=&titles=&generator=search&formatversion=latest&exchars=250&exlimit=max&exintro=1&explaintext=1&gsrsearch=" + searchValue + '&callback=?', function(data) {
      var html = '';
      for (var i = 0; i < 10; i++) {
        html += '<div class="item"><a  href="https://en.wikipedia.org/wiki/' + data.query.pages[i].title + '"' + ' target="_blank">' + '<h3><strong>' + data.query.pages[i].title + '</strong></h3>' + '<p>' + data.query.pages[i].extract + '</p>' + '</a></div>';

      }
      $("#content").html(html);
     $("#content").hide().fadeIn('1000');
  
    });
  }); 
  $("#search").keypress(function(e) {
    if (e.which == 13) {
      $("#submitBtn").click();
      return false;
    }
  })
});