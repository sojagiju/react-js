var placeholder = document.createElement("li");
 placeholder.className="placeholder";

var TodoItem =React.createClass({

	getInitialState:function(){
		return {
			mode:'DISPLAY',
			text:""
		};
	},

	handleDelete: function() {
		this.props.parent.removeItem(this.props.idx);
	},
	handleEdit: function(){	
		var self = this;
 		this.setState({mode:"EDIT"},function  (argument) {
 			React.findDOMNode(self.refs.editItem).focus();
 		});	
	},
	handleSave: function () {
		this.setState({mode:"DISPLAY"});
		this.setState({text: ''});
	},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
	handleCancel: function(e){
		this.setState({mode:"DISPLAY"});	
	},
	handleChange:function(e) {
		this.setState({text:e.target.value});
		this.props.items[this.props.idx] = e.target.value;
		this.forceUpdate();
	},
	dragStart: function(e){
		e.dataTransfer.effectAllowed='move';
	},
	dragEnd: function(e){
		var to = placeholder.getAttribute('data-id');
		var from = e.currentTarget.getAttribute('data-id');
		console.log("end",from,to);
		$(placeholder).remove();
		this.props.parent.swapItems(from,to)
	},
	dragOver: function(e){
		console.log("dragOver")
 		e.preventDefault();
 		if(e.target.className=="placeholder") return;
 		if (e.target.getAttribute('data-id') == null) {
 			return;
 		}
		e.dataTransfer.setData("text",this.props.idx);
 		e.target.parentNode.insertBefore(placeholder, e.target);
 		placeholder.setAttribute('data-id',this.props.idx);
 		// console.log(placeholder);
 	},
	render: function(){
		var idx=this.props.idx;

		if (this.state.mode == 'EDIT') {
			return (<li key={"comp_inp_"+idx} 
						className="col-md-8 col-xs-offset-0" 
						data-id={idx} 
						draggable="true"						
						onDragStart={this.dragStart} 
						onDragOver={this.dragOver}
						onDragEnd={this.dragEnd}>
					<input type="text" ref="editItem" style={{width: '100px'}} onChange={this.handleChange} onBlur={this.handleCancel} value={this.props.items[idx]}></input>
					<button className="btn-success" onClick={this.handleSave.bind(null,idx)} style={{marginLeft: '10px'}}>Save</button>
					</li>);
		} else {
			return( <li key={"comp_txt_"+idx } 
						className="col-md-8 col-xs-offset-0"  
						data-id={idx} 
						draggable="true"						
						onDragStart={this.dragStart} 
						onDragOver={this.dragOver}
						onDragEnd={this.dragEnd}>
					<span id="item" style={{width: '100px', display:'inline-block'}}>{this.props.items[idx]}</span>
					<button className="btn-info" onClick={this.handleEdit.bind(null,idx)}  style={{marginLeft: '10px'}}>Edit</button>
					<button className="btn-warning" onClick={this.handleDelete.bind(null,idx)}>Delete</button>
					</li>);
		}
		
	}
});

var TodoList = React.createClass({	
		
 	removeItem:function (idx){
 		this.props.items.splice(idx,1);
		this.forceUpdate();
 	},
 	swapItems:function(from,to){
 		this.props.items.splice(to,0,this.props.items.splice(from,1)[0]);
 		//var tmp = this.props.items[to];
 		//this.props.items[to] = this.props.items[from];
 		//this.props.items[from] = tmp;
 		this.forceUpdate();
 	},
	render: function(){	
		var list=[];
		for(var i=0; i<this.props.items.length; i++){
			list.push(<div className="row"><TodoItem items={this.props.items} parent={this} idx={i} /></div>);
		}
		return(<ul>{list}</ul>);		
	}
}); 

var TodoApp = React.createClass({
	getInitialState: function() {
		return {items: [], text: ''};
	}, 
 	componentDidUpdate: function() {
		React.findDOMNode(this.refs.addItem).focus();
 	},
	onChange: function(e) {
		this.setState({text: e.target.value});
	},
	handleSubmit: function(e) {
		e.preventDefault();		                                                                                                     
		this.state.items.push(this.state.text);
		var nextText ='';
		this.setState({text: nextText});
	},
	render: function() {
		return(
			<div className="panel panel-default"  style={{width: '600px'}}>
				<div className="panel panel-heading">
				<h3 style={{textAlign: 'center'}}>TODO</h3>
				</div> 
				<div className="panel panel-body">
				<div className="container" style={{width: '600px'}}>
				<TodoList items={this.state.items} parent={this} />
				</div>
				<form onSubmit={this.handleSubmit}>
					<input type="text"
						ref="addItem"
						value={this.state.text}
						onChange={this.onChange}		/>					
					<button className="btn-success" >{'Add #' + (this.state.items.length +1)}</button>
				</form>
				</div>
			</div>
		);
	}
});

React.render(<TodoApp />, document.getElementById("container"));