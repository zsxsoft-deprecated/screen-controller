/// <reference path="../../../../typings/react/react.d.ts"/>
define(function (require, exports, module) {
	module.exports = {
		init: function () {
			var self = this;
			var programSwitch = React.createClass({
				getInitialState: function() {
					var me = this;
					var initState = function() {
						me.setState({programs: self.programs, program: self.program});
					};
					self.on("dataGot", initState);
					self.on("programChanged", initState)
					return {programs: self.programs, program: self.program};
				},
				handleBackground: function() {
					
				}, 
				handleScore: function() {
					
				},
				handleItemClicked: function(index) {
					self.emit("changeProgram", index);
				},
				render: function () {
					var me = this;
					return (
						<ReactBootstrap.Panel header="[%=lang.controller.programSelect%]" eventKey="2">
						[%=lang.controller.programSelect%]<ReactBootstrap.ListGroup>
						{this.state.programs.map(function(item, i) {
							return <ReactBootstrap.ListGroupItem onClick={me.handleItemClicked.bind(null, i)} active={item.id == me.state.program.id} href="javascript:;" key={i} pos={item.id}>{item.program.name + " - " + item.player.name}</ReactBootstrap.ListGroupItem>
						})}
						</ReactBootstrap.ListGroup>
                 	    <p>   <ReactBootstrap.Button onClick={this.handleBackground}>[%=lang.controller.modeBackground%]</ReactBootstrap.Button>
						&nbsp;<ReactBootstrap.Button onClick={this.handleScore}>[%=lang.controller.handleScore%]</ReactBootstrap.Button>
						</p>
						</ReactBootstrap.Panel>
					)}
			});
			var ProgramSwitch = programSwitch;
			return {
				reactDom: <ProgramSwitch />
			};
		}
	};
});