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
