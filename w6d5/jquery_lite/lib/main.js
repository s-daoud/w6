const DOMNodeCollection = require('./dom_node_collection.js');

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
