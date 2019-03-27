"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mjmlValidator = require("mjml-validator");

var _mjmlCore = require("mjml-core");

var _blStyles = require("../config/bl-styles.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(0, _mjmlValidator.registerDependencies)({
  // Tell the validator which tags are allowed as our component's parent
  'mj-body': ['bl-header-component'],
  // Tell the validator which tags are allowed as our component's children
  'bl-header-component': []
});
/*
  Our component is a (useless) simple text tag, that adds colored stars around the text.
  It can take 3 attributes, to specify size and colors.
*/

var BlHeaderComponent =
/*#__PURE__*/
function (_BodyComponent) {
  _inherits(BlHeaderComponent, _BodyComponent);

  function BlHeaderComponent() {
    _classCallCheck(this, BlHeaderComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(BlHeaderComponent).apply(this, arguments));
  }

  _createClass(BlHeaderComponent, [{
    key: "render",
    // Tell the parser that our component won't contain other mjml tags
    // Tells the validator which attributes are allowed for mj-layout
    // What the name suggests. Fallback value for this.getAttribute('attribute-name').

    /*
      Render is the only required function in a component.
      It must return an html string.
    */
    value: function render() {
      return this.renderMJML("\n      <mj-section background-color=\"".concat(_blStyles.BL_STYLES.color.main, "\">\n        <mj-column>\n            <mj-image\n              src=\"https://www.boklisten.no/assets/img/boklisten_logo_v2_icon_white_lg.png\"\n              height=\"50px\"\n              width=\"50px\"\n              css-class=\"bl-header-icon\"\n              alt=\"Boklisten.no\">\n          </mj-image>\n        </mj-column>\n      </mj-section>\n\t\t"));
    }
  }]);

  return BlHeaderComponent;
}(_mjmlCore.BodyComponent);

exports.default = BlHeaderComponent;

_defineProperty(BlHeaderComponent, "endingTag", true);

_defineProperty(BlHeaderComponent, "allowedAttributes", {
  'stars-color': 'color',
  color: 'color',
  'font-size': 'unit(px)',
  align: 'enum(left,right,center)'
});

_defineProperty(BlHeaderComponent, "defaultAttributes", {
  'stars-color': 'yellow',
  color: 'black',
  'font-size': '12px',
  align: 'center'
});