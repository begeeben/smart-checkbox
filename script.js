'use strict';
/* global KeyEvent */

window.SmartCheckboxElement = (function(window) {

  var template = document.createElement('template');

  template.innerHTML =
    `
      <div id="default"></div>
      <content>
      </content>
    `;

  // Extend from the HTMLInputElement prototype
  var proto = Object.create(HTMLInputElement.prototype);

  proto.createdCallback = function() {
    this.createShadowRoot();
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    // this.type = 'checkbox';
    this.tabIndex = 0;
  };

  proto.handleEvent = function(evt) {
    console.log(e);
    switch(evt.type) {
      case 'mousedown':
      case 'touchstart':
        this.classList.add('pressed');
        break;
      case 'keydown':
        if (evt.keyCode === KeyEvent.DOM_VK_RETURN) {
          this.classList.add('pressed');
        }
        break;
      case 'mouseup':
      case 'touchend':
        this.classList.remove('pressed');
        this.classList.add('released');
        break;
      case 'keyup':
        if (evt.keyCode === KeyEvent.DOM_VK_RETURN) {
          this.classList.remove('pressed');
          this.classList.add('released');
          this.click();
        }
        break;
      case 'transitionend':
        if (this.classList.contains('released')) {
          this.classList.remove('released');
        }
        break;
      case 'focus':
        this.classList.add('focused');
        break;
      case 'blur':
        this.classList.remove('pressed');
        this.classList.remove('released');
        this.classList.remove('focused');
        break;
    }
  };

  // Register and return the constructor
  return document.registerElement('smart-checkbox', { prototype: proto });
})(window);
