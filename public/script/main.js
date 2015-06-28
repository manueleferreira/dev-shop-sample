var Product = React.createClass({
	handleRemove: function(e) {
		try
		{
			var node = this.getDOMNode();
			React.unmountComponentAtNode(node);
			$(node).remove();			
			return;	

			//this.props.handleRemoveButton(product);
		}
		catch(err)
		{
			console.log("ERROR - {0}".format(err));	
		}
	},
	render: function(){
		return (
			<tr class="product">
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
			console.log("ERROR - {0}".format(err));
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

var ProductList = React.createClass({
	handleRemoveButton: function(product) {
		try
		{
			console.log("remove product list");
			var node = this.getDOMNode();
			React.unmountComponentAtNode(node);
			$(node).remove();			
			return;	
		}
		catch(err)
		{
			console.log("ERROR - {0}".format(err));
		}
	},
	render: function() {
		var productNodes = this.props.data.map(function(product){
			return (
				<Product author={product.author} price={product.price}></Product>
			);
		});
		return (
			<div class="cart row">
				<h2>Cart</h2>
				<table class="table">
					<thead>
						<tr>
						  <th>Username</th>
						  <th>Price</th>
						  <th></th>
						</tr>
					</thead>
					<tbody>
						{productNodes}
					</tbody>
				</table>
			</div>
		);
	}
});

var DevShop = React.createClass({
	loadProductsFromServer: function(){
		try
		{
			$.ajax({
				url: this.props.url,
				dataType: 'json',
				cache: false,
				success: function(data) {
					this.setState({data: data});
				}.bind(this),
				error: function(xhr, status, err) {
					console.error(this.props.url, status, err.toString());
				}.bind(this)
			});
		}
		catch(err)
		{
			console.log("ERROR - {0}".format(err));
		}
	},
	handleProductSubmit: function(product) {
		try
		{
			var products = this.state.data;
			var newProductList = products.concat([product]);
			this.setState({data: newProductList});
			$.ajax({
				url: this.props.url,
				dataType: 'json',
				type: "POST",
				data: product,
				success: function(data){
					this.setState({data: data});
				}.bind(this),
				error: function(xhr, status, err) {
					console.error(this.props.url, status, err.toString());
				}.bind(this)
			})
		}
		catch(err)
		{
			console.log("ERROR - {0}".format(err));
		}
	},
	getInitialState: function() {
		try
		{
			return {data: []};
		}
		catch(err)
		{
			console.log("ERROR - {0}".format(err));
		}
	},
	componentDidMount: function(){
		try
		{
			this.loadProductsFromServer();
			setInterval(this.loadProductsFromServer, this.props.pollInterval);
		}
		catch(err)
		{
			console.log("ERROR - {0}".format(err));
		}	
	},
	render: function() {
		return (
			<div>
				<div class="row">
					<h1>Dev Shop</h1>
				</div>
				<ProductForm onProductSubmit={this.handleProductSubmit} />
				<ProductList data={this.state.data} handleRemoveButton={this.handleRemoveButton} />
			</div>
		);
	}
});

React.render(
  <DevShop url="products.json" pollInterval={2000} />,
  document.getElementById('container')
);
