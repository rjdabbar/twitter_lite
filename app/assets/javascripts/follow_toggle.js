$.FollowToggle = function (el) {
  this.$el = $(el);
  this.userId = this.$el.data("user-id");
  this.followState = this.$el.data("initial-follow-state");
  this.render();
  this.bindEvents();
};

$.FollowToggle.prototype.render = function () {
  if (this.followState === "unfollowed") {
    console.log(this.followState);
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
    $.ajax({
      method: "POST",
      url: this.$el.parent().attr("action"),
      data: {},
      dataType: "json",
      success: function(data) {
        this.followState = "followed";
        this.render();
      }.bind(this)
    })
  } else {
    debugger;
    $.ajax({
      method: "DELETE",
      url: this.$el.parent().attr("action"),
      data: {},
      dataType: "json",
      success: function(data) {
        this.followState = "unfollowed";
        this.render();
        }.bind(this)
    })
  };
};

$.fn.followToggle = function () {
  return this.each(function () {
    new $.FollowToggle(this);
  });
};

$(function () {

  $("button.follow-toggle").followToggle();
});
