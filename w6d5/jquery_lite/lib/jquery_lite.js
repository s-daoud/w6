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
/******/ 	__webpack_require__.p = "/lib/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);
	
	const queue = [];
	
	window.$l = function(selector) {
	  if (typeof selector === "string") {
	    let elementList = document.querySelectorAll(selector);
	    let domNodes = new DOMNodeCollection(Array.from(elementList));
	    return domNodes;
	  } else if (selector instanceof HTMLElement){
	    let domNode = new DOMNodeCollection([selector]);
	    return domNode;
	  } else if (typeof selector === "function") {
	    if (document.readyState === "complete") {
	      selector();
	    } else {
	      queue.push(selector);
	    }
	  }
	};
	
	document.addEventListener("DOMContentLoaded", () => {
	  queue.forEach((func) => {
	    func();
	  });
	});
	
	window.$l.extend = function(...args) {
	  return Object.assign(...args);
	};
	
	window.$l.ajax = function(options) {
	  let defaults = {
	    url: "/",
	    method: "GET",
	    data: {},
	    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	    success: function(response) {
	      console.log(response);
	    },
	    error: function(response) {
	      console.log(response);
	    }
	  };
	
	  let ajaxData = this.extend(defaults, options);
	
	  const xhr = new XMLHttpRequest();
	  xhr.open(ajaxData.method, ajaxData.url);
	  xhr.onload = function () {
	    if (xhr.status === 200) {
	      ajaxData.success(xhr.response);
	    } else {
	      ajaxData.error(xhr.response);
	    }
	  };
	
	  xhr.send(ajaxData.data);
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	function DOMNodeCollection(elementList) {
	  this.elementList = elementList;
	}
	
	DOMNodeCollection.prototype.html = function (string) {
	  if (string === undefined) {
	    return this.elementList[0].innerHTML;
	  } else {
	    this.elementList.forEach( el => {
	      el.innerHTML = string;
	    });
	  }
	};
	
	DOMNodeCollection.prototype.empty = function () {
	  this.html("");
	};
	
	DOMNodeCollection.prototype.append = function (element) {
	  this.html(element.outerHTML);
	};
	
	DOMNodeCollection.prototype.attr = function (key, value) {
	  if (value === undefined){
	    for(let i = 0; i < this.elementList.length; i++) {
	      if (this.elementList[i].hasAttribute(key)){
	        return this.elementList[i].getAttribute(key);
	      }
	    }
	  } else {
	    this.elementList.forEach( el => {
	      el.setAttribute(key, value);
	    });
	  }
	};
	
	DOMNodeCollection.prototype.addClass = function (className) {
	  this.elementList.forEach( el => {
	    el.classList.add(className);
	  });
	};
	
	DOMNodeCollection.prototype.removeClass = function (className) {
	  this.elementList.forEach( el => {
	    el.classList.remove(className);
	  });
	};
	
	DOMNodeCollection.prototype.children = function () {
	  let result = [];
	  this.elementList.forEach( el => {
	    result = result.concat(Array.from(el.children));
	  });
	  return new DOMNodeCollection(result);
	};
	
	DOMNodeCollection.prototype.parent = function () {
	  let result = [];
	  this.elementList.forEach( el => {
	    if (!result.includes(el.parentNode)) {
	      result.push(el.parentNode);
	    }
	  });
	  return new DOMNodeCollection(result);
	};
	
	DOMNodeCollection.prototype.find = function (selector) {
	  let result = [];
	  this.elementList.forEach( el => {
	    result = result.concat(Array.from(el.querySelectorAll(selector)));
	  });
	  return new DOMNodeCollection(result);
	};
	
	DOMNodeCollection.prototype.remove = function () {
	  this.empty();
	  this.elementList = [];
	};
	
	DOMNodeCollection.prototype.on = function (e, callback) {
	  this.elementList.forEach( function(el) {
	    el.addEventListener(e, callback);
	  });
	};
	
	DOMNodeCollection.prototype.off = function (e, callback) {
	  this.elementList.forEach( function(el) {
	    el.removeEventListener(e, callback);
	  });
	};
	
	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);
//# sourceMappingURL=jquery_lite.js.map