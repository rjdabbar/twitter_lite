$.TweetCompose = function (el) {
  this.$el = $(el);
  this.$ul = $(this.$el.data("tweets-ul"))
  this.bindEvents();
}

$.TweetCompose.prototype.bindEvents = function () {
  this.$el.on("submit", this.submit.bind(this));
  this.$el.on("input", "textarea", this.handleTweetLength.bind(this));
  this.$el.on("click", "a.add-mentioned-user", this.addMentionedListener.bind(this));
  this.$el.on("click", "a.remove-mentioned-user", this.removeMentionedListener.bind(this));
}

$.TweetCompose.prototype.addMentionedListener = function (event) {
  $("div.mention-users").append($("#select-script").html());
};

$.TweetCompose.prototype.removeMentionedListener = function (event) {
  $(event.currentTarget).parent().remove();
};

$.TweetCompose.prototype.handleTweetLength = function (event) {
  var currentChars = $(event.currentTarget).val().length;
  this.$el.find(".chars-left").html((140 - currentChars) + " characters left");
};

$.TweetCompose.prototype.submit = function(event) {
  event.preventDefault();
  var formContents = $(event.currentTarget).serializeJSON();
  this.$el.find(":input").prop("disabled", true);
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/tweets",
    data: formContents,
    dataType: "json",
    success: this.handleSuccess.bind(this, data)
  });
}

$.TweetCompose.prototype.handleSuccess = function(data) {
  this.clearInput();
  this.$el.find(":input").prop("disabled", false);

  var tweet = JSON.stringify(data);
  var html = "<li>" + tweet + "</li>";
  this.$ul.prepend(html);
}

$.TweetCompose.prototype.clearInput = function() {
  this.$el.find("textarea").val("");
  $("div.mention-users").empty();
}

$.fn.tweetCompose = function () {
  return this.each(function () {
    new $.TweetCompose(this);
  });
};

$(function () {
  $("form.tweet-compose").tweetCompose();
});
