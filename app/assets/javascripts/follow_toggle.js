$.FollowToggle = function (el, options) {
  this.$el = $(el);
  this.userId = this.$el.data("user-id") || options.userId;
  this.followState = this.$el.data("initial-follow-state") || options.followState;
  this.render();
  this.bindEvents();
  console.log(this.userId);
};

$.FollowToggle.prototype.render = function () {
  if (this.followState === "unfollowing") {
    this.followState = "unfollowed";
    this.$el.html("Follow!");
    this.$el.prop("disabled", false);
  } else if (this.followState === "following") {
    this.followState = "followed";
    this.$el.html("Unfollow!");
    this.$el.prop("disabled", false);
  } else if (this.followState === "unfollowed") {
    this.$el.html("Follow!");
  } else if (this.followState === "followed") {
    this.$el.html("Unfollow!");
  };
};

$.FollowToggle.prototype.bindEvents = function () {
  this.$el.on("click", this.handleClick.bind(this))
};

$.FollowToggle.prototype.handleClick = function (event) {
  event.preventDefault();
  if (this.followState === "unfollowed") {
    var method = "POST";
    var newState = "following"
  } else {
    var method = "DELETE";
    var newState = "unfollowing";

    }
    this.$el.prop("disabled", true);
    this.$el.html(newState);
    $.ajax({
      method: method,
      url: "http://localhost:3000/users/" + this.userId +"/follow",
      data: {},
      dataType: "json",
      success: function(data) {
        this.followState = newState;

        this.render();
      }.bind(this)})

};

$.fn.followToggle = function (options) {
  return this.each(function () {
    new $.FollowToggle(this, options);
  });
};

$(function () {

  $("button.follow-toggle").followToggle();
});
