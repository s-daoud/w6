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
