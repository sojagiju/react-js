var Panel = React.createClass({
	render: function(){
		return (<div className="panel panel-default">
			<div className="panel panel-heading"><h3>World Clock</h3></div>			
		 	<div className="row">
			<Clock timezone="Europe/London" /> 
			<Clock timezone="America/New_York" /> 
			<Clock timezone="Asia/Calcutta" /> 
			<Clock timezone="Australia/Sydney" /> 
			<Clock timezone="Asia/Dubai" /> 
			<Clock timezone="Africa/Johannesburg" /> 
			</div>
		</div>);
	}

});

var Clock = React.createClass({
	render: function(){
		var date=new Date();
		var utc = moment.tz(date, this.props.timezone).format("YYYY-MM-DD HH-mm-ss");
		return(
		 	<div className="col-md-3">
		 		<div className="panel panel-default ">
  	     			<div className="panel-heading">{this.props.timezone}</div>
  					<div className="panel-body">
    					{utc}
  					</div>
				</div>
			</div>
		);
	}
});


setInterval(function(){
	React.render(<Panel  />, document.getElementById("container"));
}, 1000);