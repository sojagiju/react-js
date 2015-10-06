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
		var date=new Date();
		var utc=moment.tz(date, "UTC").format();
		var newYork=moment.tz(date, "America/New_York").format();
		var calcutta=moment.tz(date, "Asia/Calcutta").format();
		var london=moment.tz(date,"Europe/London").format();
		var australia=moment.tz(date,"Australia/Sydney").format();
		var gulf=moment.tz(date,"Asia/Dubai").format();
		var africa=moment.tz(date,"Africa/Johannesburg").format();
		return(
		<div>
		Seconds Elapsed: {this.state.secondsElapsed} 
		<br></br>
		<br></br>
		Time UTC : {utc}
		<br></br>
		<br></br>
		Time PST NewYork : {newYork}
		<br></br>
		<br></br>
		Time IST India : {calcutta}
		<br></br>
		<br></br>
		Time BST London : {london}
		<br></br>
		<br></br>
		Time AUS Sydney : {australia}
		<br></br>
		<br></br>
		Time GST Gulf : {gulf}
		<br></br>
		<br></br>
		Time Africa : {africa}
		</div>
		);
	}

});

setInterval(function(){
	React.render(<Timer />, document.getElementById("container"));

}, 1000);
