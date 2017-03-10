var getQuote = function() {
    var html = "";
    $.getJSON("https://random-quote-generator.herokuapp.com/api/quotes/random", function(e) {
      html += "<blockquote>";
      html += "<p id ='quote'>" + e.quote + "</p>";
      html += "<footer id='author'>" + e.author + "</footer>";
      html += "</blockquote>";
      $("h1").html(html);
    });
};
    $(document).ready(function() {
     getQuote(); $("#nextQuote").on("click",getQuote)

      });


    $("#tweet").click(function() {
      var quote = $("#quote").text();
      var author = $("#author").text();
      window.open('https://twitter.com/intent/tweet?text="' + quote + ' ' + author + '"', '_blank');
    })