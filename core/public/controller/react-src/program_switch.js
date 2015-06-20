/// <reference path="../../../../typings/react/react.d.ts"/>
define(function (require, exports, module) {
	module.exports = {
		init: function () {
			var self = this;
			var programSwitch = React.createClass({
				getInitialState: function() {
					return {programs: self.programs, program: self.program}
				},
				handleBackground: function() {
					
				}, 
				handleScore: function() {
					
				},
				render: function () {
					return (
					<ReactBootstrap.Panel header='[%=lang.controller.programSelect%]' eventKey='2'>
					<p>[%=lang.controller.programSelect%]<ReactBootstrap.ListGroup>
					{this.state.programs.map(function(item, i) {
						return <ReactBootstrap.List data-pos={item.program.id}>{item.program.name + " - " + item.player.name}</ReactBootstrap.List>
					})}
					</ReactBootstrap.ListGroup></p>
                    <p>   <ReactBootstrap.Button onClick={this.handleBackground}>[%=lang.controller.modeBackground%]</ReactBootstrap.Button>
                    &nbsp;<ReactBootstrap.Button onClick={this.handleScore}>[%=lang.controller.handleScore%]</ReactBootstrap.Button>
					</p>
					</ReactBootstrap.Panel>
				)}
			});
			this.on("programChanged", function () {
				//programInfo.setState({});
			});
			var ProgramSwitch = programSwitch;
			return {
				reactDom: <ProgramSwitch />
			};
		}
	};
});