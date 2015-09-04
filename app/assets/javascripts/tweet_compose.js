$.TweetCompose = function (el) {
  this.$el = $(el);
  this.$ul = $(this.$el.data("tweets-ul"))
  this.bindEvents();
}

$.TweetCompose.prototype.bindEvents = function () {
  this.$el.on("submit", this.submit.bind(this));
  this.$el.on("input", "textarea", this.handleTweetLength.bind(this));
}

$.TweetCompose.prototype.handleTweetLength = function (event) {
  var currentChars = $(event.currentTarget).val().length;
  this.$el.find(".chars-left").html((140 - currentChars) + " characters left");
};

$.TweetCompose.prototype.submit = function(event) {
  event.preventDefault();
  var formContents = $(event.currentTarget).serializeJSON();
  $(":input").prop("disable", true);
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/tweets",
    data: formContents,
    dataType: "json",
    success: function(data) {
      this.handleSuccess(data, event);

    }.bind(this)
  })
}

$.TweetCompose.prototype.handleSuccess = function(data, event) {
  this.clearInput(event);
  $(":input").prop("disable", false);
  debugger
  var tweet = JSON.stringify(data);
  var html = "<li>" + tweet + "</li>";
  this.$ul.prepend(html);
}

$.TweetCompose.prototype.clearInput = function(event) {
  this.$el.find("textarea").val("");
  this.$el.find("select").val("");
}

$.fn.tweetCompose = function () {
  return this.each(function () {
    new $.TweetCompose(this);
  });
};

$(function () {
  $("form.tweet-compose").tweetCompose();
});
