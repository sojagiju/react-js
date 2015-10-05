var Timer = React.createClass({
	getInitialState: function() {
		return {secondsElapsed: 0};
	},
	tick: function() {
		this.setState({secondsElapsed: this.state.secondsElapsed + 1});
	},
	componentDidMount: function(){
		this.interval = setInterval(this.tick, 1000);
	},
	componentWillUnmount: function(){
		clearInterval(this.interval);
	},

	render: function(){
		return(
		<div>Seconds Elapsed: {this.state.secondsElapsed} and the Time now is: {this.props.date.toUTCString()}</div>
		);
	}

});

setInterval(function(){
	React.render(<Timer date={new Date()} />, document.getElementById("container"));

})
