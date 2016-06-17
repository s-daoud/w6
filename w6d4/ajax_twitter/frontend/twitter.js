const FollowToggle = require("./follow_toggle.js");
const UsersSearch = require("./users_search.js");
const TweetCompose = require("./tweet_compose.js");
const InfiniteTweets = require("./infinite_tweets.js");

$(function(){
  new FollowToggle($(".follow-toggle"));
  new UsersSearch($(".users-search"));
  new TweetCompose($(".tweet-compose"));
  new InfiniteTweets($(".infinite-tweets"));
});
