var DevShop = React.createClass({
	onBuyCart: function() {
		try
		{
			var urlCart = "/cart";
			$.ajax({
				url: urlCart,
				dataType: 'json',
				type: "POST",
				success: function(data){
					alert("Congratulations!");
				}.bind(this),
				error: function(xhr, status, err) {
					console.error(urlCart, status, err.toString());
				}.bind(this)
			})
		}
		catch(err)
		{
			console.log("ERROR onBuyCart - " + err);
		}
	},
	handleRemoveList: function(id) {
		try
		{
			var deleteUrl = this.props.url+"/"+id;
			$.ajax({
				url: deleteUrl,
				dataType: 'json',
				type: "POST",
				success: function(data){
					this.setState({
		                data: data
        			});
				}.bind(this),
				error: function(xhr, status, err) {
					console.error(this.props.url, status, err.toString());
				}.bind(this)
			})
		}
		catch(err)
		{
			console.log("ERROR handleRemoveList - " + err);
		}
	},
	loadProductsFromServer: function(page){
		try
		{
			var url = this.props.url+"/"+page;
			$.ajax({
				url: url,
				dataType: 'json',
				cache: false,
				success: function(data) {
					this.setState({
		                data: data
        			});
				}.bind(this),
				error: function(xhr, status, err) {
					console.error(this.props.url, status, err.toString());
				}.bind(this)
			});
		}
		catch(err)
		{
			console.log("ERROR loadProductsFromServer - " + err);
		}
	},
	handleProductSubmit: function(product) {
		try
		{
			$.ajax({
				url: this.props.url,
				dataType: 'json',
				type: "POST",
				data: product,
				success: function(data){
					this.setState({
		                data: data
        			});
				}.bind(this),
				error: function(xhr, status, err) {
					console.error(this.props.url, status, err.toString());
				}.bind(this)
			})
		}
		catch(err)
		{
			console.log("ERROR handleProductSubmit - " + err);
		}
	},
	getInitialState: function() {
		try
		{
			return {data: []};
		}
		catch(err)
		{
			console.log("ERROR getInitialState - " + err);
		}
	},
	componentDidMount: function(){
		try
		{
	        this.loadProductsFromServer(1);
		}
		catch(err)
		{
			console.log("ERROR componentDidMount- " + err);
		}	
	},
	render: function() {
		return (
			<div className="container">
				<div className="row">
					<h1>Dev Shop</h1>
				</div>
				<ProductForm onProductSubmit={this.handleProductSubmit} />
				<ProductList data={this.state.data} handleRemoveList={this.handleRemoveList} loadProductsFromServer={this.loadProductsFromServer} />
				<button className="btn btn-success" onClick={this.onBuyCart}>Buy Cart</button>
			</div>
		);
	}
});


React.render(
	<DevShop url="/products" pollInterval={2000} />,
	document.getElementById('container')
);
