var HelloMessage=React.createClass({
	render: function(){
		return <div>Hello {this.props.firstname} the {this.props.lastname} </div>;
	}
});

React.render(<HelloMessage firstname="John" lastname="Baptist"/>, 
	document.getElementById("container")
	);