function InfiniteTweets($el) {
  this.$el = $el;
  $("a.fetch-more").on("click", this.fetchTweets.bind(this));
  this.maxCreatedAt = null;
  this.$el.on("insert-tweet", this.insertTweet.bind(this));
}

InfiniteTweets.prototype.insertTweet = function (e, tweet, pos) {
  e.preventDefault();
  let json = JSON.stringify(tweet);
  let $li = $("<li>").html(json);
  if (pos === "pre") {
    $("ul#feed").prepend($li);
  } else {
    $("ul#feed").append($li);
  }

  if (!this.maxCreatedAt) {
    this.maxCreatedAt = (tweet.created_at).toString();
  }
};

InfiniteTweets.prototype.fetchTweets = function (e) {
  e.preventDefault();
  let that = this;

  let options = {
    method: "GET",
    url: "feed",
    dataType: "json",
    success(tweets) {

      if(tweets.length < 20){
        that.$el.find("a.fetch-more").remove();
        let $p = $("<p>").text("No more tweets!");
        that.$el.append($p);
      } else {
        that.insertTweets(tweets);
      }
    }
  };

  if(this.maxCreatedAt){
    options.data = {max_created_at : this.maxCreatedAt};
  }

  $.ajax(options);
};

InfiniteTweets.prototype.insertTweets = function (tweets) {
  tweets.forEach((tweet) => {
    $("ul#feed").trigger("insert-tweet", [tweet, "app"]);
  });
  let lastTweet = tweets[tweets.length - 1];
  this.maxCreatedAt = (lastTweet.created_at).toString();
};

module.exports = InfiniteTweets;
