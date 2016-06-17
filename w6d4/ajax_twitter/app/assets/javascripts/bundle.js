/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const FollowToggle = __webpack_require__(1);
	const UsersSearch = __webpack_require__(2);
	const TweetCompose = __webpack_require__(3);
	const InfiniteTweets = __webpack_require__(4);
	
	$(function(){
	  new FollowToggle($(".follow-toggle"));
	  new UsersSearch($(".users-search"));
	  new TweetCompose($(".tweet-compose"));
	  new InfiniteTweets($(".infinite-tweets"));
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const FollowToggle = __webpack_require__(1);
	
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


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map