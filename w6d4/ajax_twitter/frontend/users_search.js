const FollowToggle = require("./follow_toggle.js");

function UsersSearch($el) {
  this.$el = $el;
  this.$input = $el.find('input[name="user[username]"]');
  this.$ul = $el.find("ul.users");
  this.$el.on("input", this.handleInput.bind(this));
}

UsersSearch.prototype.handleInput = function (e) {
  e.preventDefault();
  let that = this;
  $.ajax({
    method: "GET",
    url: `/users/search`,
    dataType: "json",
    data: {query : this.$input.val()},
    success(users) {
      that.renderResults(users);
    }
  });
};

UsersSearch.prototype.renderResults = function (users) {
  this.$ul.empty();
  users.forEach((user) => {
    let fs = "unfollowed";
    if(user.followed){
      fs = "followed";
    }
    let $li = $("<li>").html(`<a href="/users/${user.id}">${user.username}</a>`);
    let $followToggle = $(`<button data-user-id="${user.id}" data-initial-follow-state="${fs}">`);
    new FollowToggle($followToggle);
    $li.append($followToggle);
    this.$ul.append($li);
  });
};

module.exports = UsersSearch;
