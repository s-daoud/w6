function TweetCompose($el) {
  this.$el = $el;
  this.$el.on("submit", this.submit.bind(this));
  this.$strong = $el.find("strong.chars-left");
  this.$el.on("input", this.counter.bind(this));
  $("a.add-mentioned-user").on("click", this.handleAdd.bind(this));
  this.$el.find(".mentioned-users").on("click",
    "a.remove-mentioned-user", this.handleRemove.bind(this));
}

TweetCompose.prototype.handleRemove = function (e) {
  e.preventDefault();
  let that = this;
  let target = e.currentTarget;
  $.ajax({
    method: "GET",
    url: "feed",
    dataType: "json",
    success() {
      that.removeMentionedUser(target);
    }
  });
};

TweetCompose.prototype.removeMentionedUser = function (target) {
  $(target).parent().remove();
};

TweetCompose.prototype.handleAdd = function (e) {
  e.preventDefault();
  let that = this;
  $.ajax({
    method: "GET",
    url: "feed",
    dataType: "json",
    success() {
      that.addMentionedUser();
    }
  });
};

TweetCompose.prototype.addMentionedUser = function () {
  let $scriptTag = this.$el.find("script");
  let contents = $scriptTag.html();
  $("div.mentioned-users").append(contents);
};

TweetCompose.prototype.counter = function (e) {
  e.preventDefault();
  let that = this;
  $.ajax({
    method: "GET",
    url: "feed",
    dataType: "json",
    success() {
      that.lowerCount();
    }
  });
};

TweetCompose.prototype.lowerCount = function () {
  this.$strong.empty();
  let count = 140 - this.$el.find("textarea").val().length;
  this.$strong.text(count);
};

TweetCompose.prototype.submit = function (e) {
  e.preventDefault();
  let that = this;
  let inputs = this.$el.serializeJSON();
  this.$el.find(":input").prop("disabled", true);
  $.ajax({
    method: "POST",
    url: "tweets",
    dataType: "json",
    data: inputs,
    success(tweet) {
      that.handleSuccess(tweet);
    }
  });
};

TweetCompose.prototype.clearInput = function () {
  this.$el.find(":input:not(:submit)").val("");
  this.$el.find("div.mentioned-users").empty();
  this.$strong.text("140");
};

TweetCompose.prototype.handleSuccess = function (tweet) {
  this.clearInput();
  this.$el.find(":input").prop("disabled", false);

  $("ul#feed").trigger("insert-tweet", [tweet, "pre"]);
};

module.exports = TweetCompose;
