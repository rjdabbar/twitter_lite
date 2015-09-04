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
    console.log(data);
    this.renderResults(data)
    }.bind(this)
  })
};

$.UsersSearch.prototype.renderResults = function (data) {
  this.$ul.empty();
  data.forEach(function(user) {
    var html = "<li>" + user.username + "</li>";
    this.$ul.append(html);
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
