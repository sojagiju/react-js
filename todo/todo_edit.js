var TodoList = React.createClass({
	handleDelete: function(){;
		this.props.del(index);
	},
	handleClick: function(){
		React.findDOMNode(this.refs.editField).focus();
	},	
	handleEdit: function() {
		this.setState({text: "edited"});
		this.props.onEdit();
	},
	render: function(){
		var createItem = function(itemText, index) {
			return <li key={index + itemText} > 
					<input 
						ref="editField"
						className="edit"
						defaultValue={itemText} 
						onChange={this.handleEdit} />
				<button onClick={this.handleClick}>{"edit"}</button>
				<button onClick={this.handleDelete}>{"delete"}</button>
			</li>;		
		};
		return <ul>{this.props.items.map(createItem)}</ul>;
	}

}); 
var TodoApp = React.createClass({
	getInitialState: function() {
		return {items: [], text: ''};
	}, 
	onChange: function(e) {
		this.setState({text: e.target.value});
	},
	
	handleSubmit: function(e) {
		e.preventDefault();
		var nextItems = this.state.items.concat([this.state.text]);
		var nextText ='';
		this.setState({items:nextItems, text: nextText});
	},
	render: function() {
		return(
			<div>
				<h3>TODO</h3>
				<TodoList items={this.state.items} />
				<form onSubmit={this.handleSubmit}>
					<input
						value={this.state.text}
						onChange={this.onChange}		/>					
					<button>{'Add #' + (this.state.items.length +1)}</button>
				</form>
			</div>
		);
	}
});

React.render(<TodoApp />, document.getElementById("container"));