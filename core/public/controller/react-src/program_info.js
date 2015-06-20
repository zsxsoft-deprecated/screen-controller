/// <reference path="../../../../typings/react/react.d.ts"/>
define(function (require, exports, module) {
	module.exports = {
		init: function () {
			var self = this;
			var programInfo = React.createClass({
				getInitialState: function() {
					return self.program
				},
				render: function () {
					return (
					<ReactBootstrap.Panel header='[%=lang.controller.information%]' eventKey='1'>
					<p>Playing ID: <span className="dom-playing-id" > { this.state.id } </span></p>
					<p>[%=lang.controller.playingName %]<span className="dom-playing-name" > { this.state.program.name } </span></p>
					<p>[%=lang.controller.player %]<span className="dom-playing-player" > { this.state.player.name } </span></p>
					</ReactBootstrap.Panel>
				)}
			});
			this.on("programChanged", function () {
				//programInfo.setState({});
			});
			var ProgramInfo = programInfo;
			return {
				reactDom: <ProgramInfo />
			};
		}
	};
});