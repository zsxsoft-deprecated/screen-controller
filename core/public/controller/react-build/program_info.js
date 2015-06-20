/// <reference path="../../../../typings/react/react.d.ts"/>
define(function (require, exports, module) {
	module.exports = {
		init: function () {
			var self = this;
			var programInfo = React.createClass({displayName: "programInfo",
				getInitialState: function() {
					return self.program
				},
				render: function () {
					return (
					React.createElement(ReactBootstrap.Panel, {header: "[%=lang.controller.information%]", eventKey: "1"}, 
					React.createElement("p", null, "Playing ID: ", React.createElement("span", {className: "dom-playing-id"}, " ",  self.program.id, " ")), 
					React.createElement("p", null, "[%=lang.controller.playingName %]", React.createElement("span", {className: "dom-playing-name"}, " ",  self.program.name, " ")), 
					React.createElement("p", null, "[%=lang.controller.player %]", React.createElement("span", {className: "dom-playing-player"}, " ",  self.program.player.name, " "))
					)
				)}
			});
			this.on("programChanged", function () {
				//programInfo.setState({});
			});
			var ProgramInfo = programInfo;
			return {
				reactDom: React.createElement(ProgramInfo, null)
			};
		}
	};
});