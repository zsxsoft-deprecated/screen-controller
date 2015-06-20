/// <reference path="../../../../typings/react/react.d.ts"/>
define(function (require, exports, module) {
	module.exports = {
		init: function () {
			var self = this;
			var programSwitch = React.createClass({displayName: "programSwitch",
				getInitialState: function() {
					return {programs: self.programs, program: self.program}
				},
				handleBackground: function() {
					
				}, 
				handleScore: function() {
					
				},
				render: function () {
					return (
					React.createElement(ReactBootstrap.Panel, {header: "[%=lang.controller.programSelect%]", eventKey: "2"}, 
					React.createElement("p", null, "[%=lang.controller.programSelect%]", React.createElement(ReactBootstrap.ListGroup, null, 
					this.state.programs.map(function(item, i) {
						return React.createElement(ReactBootstrap.List, {"data-pos": item.program.id}, item.program.name + " - " + item.player.name)
					})
					)), 
                    React.createElement("p", null, "   ", React.createElement(ReactBootstrap.Button, {onClick: this.handleBackground}, "[%=lang.controller.modeBackground%]"), 
                    " ", React.createElement(ReactBootstrap.Button, {onClick: this.handleScore}, "[%=lang.controller.handleScore%]")
					)
					)
				)}
			});
			this.on("programChanged", function () {
				//programInfo.setState({});
			});
			var ProgramSwitch = programSwitch;
			return {
				reactDom: React.createElement(ProgramSwitch, null)
			};
		}
	};
});