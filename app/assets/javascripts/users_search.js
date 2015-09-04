$.UsersSearch = function (el) {
  this.$el = $(el);
  this.$input = this.$el.find("input");
  this.$ul = this.$el.find("ul");
  this.bindEvents();
};

$.UsersSearch.prototype.bindEvents = function () {
  this.$input.on("input", this.handleInput.bind(this))
};

$.UsersSearch.prototype.handleInput = function (event) {
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/users/search",
    data: { query: this.$input.val() },
    dataType: "json",
    success: function (data) {
    this.renderResults(data)
    }.bind(this)
  })
};

$.UsersSearch.prototype.renderResults = function (data) {
  console.log(data);
  this.$ul.empty();
  data.forEach(function(user) {
    var button = "<button id=" + user.id + " class=\"follow-toggle\"></button>";
    var followedStatus = user.followed ? "followed" : "unfollowed";
    // debugger;
    var options = { userId: user.id, followState: followedStatus };
    var html = "<li>" + user.username + button + "</li>";
    this.$ul.append(html);
    $("button#" + user.id).followToggle(options)
  }.bind(this))
};

$.fn.usersSearch = function () {
  return this.each(function () {
    new $.UsersSearch(this);
  });
};

$(function () {
  $("div.users-search").usersSearch();
});
