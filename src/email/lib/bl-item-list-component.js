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
  'mj-body': ['bl-item-list-component'],
  // Tell the validator which tags are allowed as our component's children
  'bl-item-list-component': []
});
/*
  Our component is a (useless) simple text tag, that adds colored stars around the text.
  It can take 3 attributes, to specify size and colors.
*/

var BlItemListComponent =
/*#__PURE__*/
function (_BodyComponent) {
  _inherits(BlItemListComponent, _BodyComponent);

  function BlItemListComponent() {
    _classCallCheck(this, BlItemListComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(BlItemListComponent).apply(this, arguments));
  }

  _createClass(BlItemListComponent, [{
    key: "render",
    // Tell the parser that our component won't contain other mjml tags

    /*
      Render is the only required function in a component.
      It must return an html string.
    */
    value: function render() {
      return this.renderMJML("\n      <mj-section css-class=\"bl-content\">\n        <mj-column>\n          <mj-text>Dine b\xF8ker som snart har frist:</mj-text>\n          <mj-table css-class=\"bl-table\">\n            <tr style=\"border-bottom: 5px solid ".concat(_blStyles.BL_STYLES.color.main, "\">\n              <th>#</th>\n              <th>Tittel</th>\n              <th>Frist</th>\n              <th>Igjen \xE5 betale</th>\n            </tr>\n\n            <mj-raw>{{#itemList.items}}</mj-raw>\n            <tr>\n              <td>{{id}}</td>\n              <td>{{title}}</td>\n              <td>{{deadline}}</td>\n              <td>{{leftToPay}}</td>\n            </tr>\n            <mj-raw>{{/itemList.items}}</mj-raw>\n            <tr>\n              <th colspan=\"2\"></th>\n              <th>Sum</th>\n              <th style=\"border-top: 1px solid ").concat(_blStyles.BL_STYLES.color.main, "; border-bottom: 5px double ").concat(_blStyles.BL_STYLES.color.main, ";\">{{itemList.summary.total}}</th>\n            </tr>\n            <tr style=\"font-size: 10px;\">\n              <th colspan=\"2\"></th>\n              <th>MVA ({{itemList.summary.taxPercentage}}%)</th>\n              <th>{{itemList.summary.totalTax}}</th>\n            </tr>\n          </mj-table>\n        </mj-column>\n        </mj-section>\n\t\t"));
    }
  }]);

  return BlItemListComponent;
}(_mjmlCore.BodyComponent);

exports.default = BlItemListComponent;

_defineProperty(BlItemListComponent, "endingTag", true);