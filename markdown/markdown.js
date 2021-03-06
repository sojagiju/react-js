var MarkdownEditor = React.createClass({
	getInitialState: function(){
		return {value:'Type some *markdown* here!'};
	},
	handleChange: function() {
		this.setState ({value: React.findDOMNode(this.refs.textarea),value});
	},
	rawMarkup: function() {
		return{ __html: marked(this.state.value, {sanitize:true}) };
	},
	render: function() {
		return(
			<div className="MarkdownEditor">
				<h3>Input</h3>
				<textarea
					defaultValue={this.state.value} 
					onChange={this.handleChange}
					ref="textarea" />
				<h3>Output</h3>
				<div 
					className="content" 
					dangerouslySetInnerHTML={this.rawMarkup()}
				/>
			</div>
		);
	}
});

React.render(<MarkdownEditor />, document.getElementById("container"));