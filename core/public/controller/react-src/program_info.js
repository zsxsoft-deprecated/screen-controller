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
					<p>Playing ID: <span className="dom-playing-id" > { self.program.id } </span></p>
					<p>[%=lang.controller.playingName %]<span className="dom-playing-name" > { self.program.name } </span></p>
					<p>[%=lang.controller.player %]<span className="dom-playing-player" > { self.program.player.name } </span></p>
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