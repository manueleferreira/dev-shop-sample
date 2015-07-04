var Product = React.createClass({
	onProductRemove: function(e) {
		try
		{
			console.log("handleRemove");
			var node = this.getDOMNode();
			React.unmountComponentAtNode(node);
			//$(node).remove();			

			this.props.handleRemove(this.props._id);

			return;
		}
		catch(err)
		{
			console.log("ERROR onProductRemove - " + err);
		}
	},
	render: function(){
		return (
			<tr className="product">
				<td className="hide">{this.props._id}</td>
				<td>{this.props.author}</td>
				<td>${this.props.price}</td>
				<td>{this.props.hours}</td>
				<td><button className="btn btn-danger pull-right" onClick={this.onProductRemove}>Remove</button></td>
            </tr>
		);
	}
});

var ProductForm = React.createClass({
	handleSubmit: function(e) {
		try
		{
			console.log("submit form");
			e.preventDefault();
			var authorDOMNode = React.findDOMNode(this.refs.author);
			var hoursDOMNode = React.findDOMNode(this.refs.hours);

			var author = authorDOMNode.value.trim();
			var hours = hoursDOMNode.value.trim();
			if(!author || !hours){
				return;
			}

			this.props.onProductSubmit({author: author, hours: hours});

			authorDOMNode.value = '';
			hoursDOMNode.value = '';

			return;	
		}
		catch(err)
		{
			console.log("ERROR handleSubmit - " + err);
		}
	},
	render: function(){
		return (
			<div className="row">
				<h2>Add a developer</h2>
				<form className="form-inline" role="form" onSubmit={this.handleSubmit}>
					<div className="form-group">
						<input type="text" placeholder="GitHub Username" className="form-control" ref="author" required></input>
					</div>
					<div className="form-group">
						<input type="text" placeholder="Hours" className="form-control" ref="hours" required></input>
					</div>
					<button type="submit" className="btn btn-success">Add</button>
				</form>	
			</div>
		);
	}
});
