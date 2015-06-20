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
				handleItemClicked: function(e) {
					var nodes = Array.prototype.slice.call( e.currentTarget.children );
			        var index = nodes.indexOf( e.target );
					console.log(e.target);
				},
				render: function () {
					return (
					<ReactBootstrap.Panel header='[%=lang.controller.programSelect%]' eventKey='2'>
					[%=lang.controller.programSelect%]<ReactBootstrap.ListGroup onClick={this.handleItemClicked}>
					{self.programs.map(function(item, i) {
						return <ReactBootstrap.ListGroupItem active={item.program.id == self.program.id} href="javascript:;" key={i} data-pos={item.program.id}>{item.program.name + " - " + item.player.name}</ReactBootstrap.ListGroupItem>
					})}
					</ReactBootstrap.ListGroup>
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