function FollowToggle($el){
  this.$el = $el;
  this.$userId = $el.data("user-id");
  this.$followState = $el.data("initial-follow-state");
  this.render();
  this.$el.on("click", this.handleClick.bind(this));
}

FollowToggle.prototype.render = function () {
  if(this.$followState === "following") {
    this.$el.text("Following");
    this.$el.prop("disabled", true);
  } else if(this.$followState === "unfollowing") {
    this.$el.text("Unfollowing");
    this.$el.prop("disabled", true);
  } else if(this.$followState === "unfollowed") {
    this.$el.text("Follow!");
    this.$el.prop("disabled", false);
  } else {
    this.$el.text("Unfollow!");
    this.$el.prop("disabled", false);
  }
};

FollowToggle.prototype.handleClick = function (e) {
  e.preventDefault();
  let that = this;

  if (this.$followState === "followed") {
    this.$followState = "unfollowing";
    this.render();

    $.ajax({
      method: "DELETE",
      url: `/users/${this.$userId}/follow`,
      dataType: "json",
      success() {
        that.$followState = "unfollowed";
        that.render();
      }
    });
  } else {
    this.$followState = "following";
    this.render();

    $.ajax({
      method: "POST",
      url: `/users/${this.$userId}/follow`,
      dataType: "json",
      success() {
        that.$followState = "followed";
        that.render();
      }
    });
  }
};

module.exports = FollowToggle;
