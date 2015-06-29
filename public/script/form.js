var Product = React.createClass({
	handleRemove: function(e) {
		try
		{
			var node = this.getDOMNode();
			React.unmountComponentAtNode(node);
			$(node).remove();			

			this.props.handleRemoveButton(node);
			return;
		}
		catch(err)
		{
			console.log("ERROR - " + err);
		}
	},
	render: function(){
		return (
			<tr class="product">
				<td>{this.props._id}</td>
				<td>{this.props.author}</td>
				<td>{this.props.price}</td>
				<td><button class="btn btn-danger pull-right" onClick={this.handleRemove}>Remove</button></td>
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
			var priceDOMNode = React.findDOMNode(this.refs.price);
			var author = authorDOMNode.value.trim();
			var price = priceDOMNode.value.trim();
			if(!author || !price){
				return;
			}

			this.props.onProductSubmit({author: author, price: price});

			authorDOMNode.value = '';
			priceDOMNode.value = '';
			return;	
		}
		catch(err)
		{
			console.log(String.format("ERROR - {0}", err));
		}
	},
	render: function(){
		return (
			<div class="row">
				<h2>Add a developer</h2>
				<form class="form-inline" role="form" onSubmit={this.handleSubmit}>
					<div class="form-group">
						<input type="text" placeholder="GitHub Username" class="form-control" ref="author"></input>
					</div>
					<div class="form-group">
						<input type="text" placeholder="Price" class="form-control" ref="price"></input>
					</div>
					<button type="submit" class="btn btn-success">Add</button>
				</form>
			</div>
		);
	}
});
