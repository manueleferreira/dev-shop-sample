var data = [
	{author: "Jose Maria", price:"R$1"},
	{author: "Maria Jose", price:"R$2"}
];

var Product = React.createClass({
	render: function(){
		return (
			<tr class="product">
              <td>{this.props.author}</td>
              <td>{this.props.price}</td>
              <td><button class="btn btn-danger pull-right">Remove</button></td>
            </tr>
		);
	}
});

var ProductForm = React.createClass({
	render: function(){
		return (
			<div className="productForm">
				productForm
			</div>
		);
	}
});

var ProductList = React.createClass({
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
	},
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function(){
		this.loadProductsFromServer();
		setInterval(this.loadProductsFromServer, this.props.pollInterval);
	},
	render: function() {
		return (
			<div>
				<div class="row">
					<h1>Dev Shop</h1>
				</div>
				<ProductForm />
				<ProductList data={this.state.data} />
			</div>
		);
	}
});

React.render(
  <DevShop url="products.json" pollInterval={2000} />,
  document.getElementById('container')
);
