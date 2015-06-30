var DevShop = React.createClass({
	handleRemoveList: function(id) {
		try
		{
			var deleteUrl = this.props.url+"/"+id;
			$.ajax({
				url: deleteUrl,
				dataType: 'json',
				type: "POST",
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
			console.log("ERROR - " + err);
		}
	},
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
			console.log(String.format("ERROR - {0}", err));
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
					this.setState({data: data});
				}.bind(this),
				error: function(xhr, status, err) {
					console.error(this.props.url, status, err.toString());
				}.bind(this)
			})
		}
		catch(err)
		{
			console.log(String.format("ERROR - {0}", err));
		}
	},
	getInitialState: function() {
		try
		{
			return {data: []};
		}
		catch(err)
		{
			console.log(String.format("ERROR - {0}", err));
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
			console.log(String.format("ERROR - {0}", err));
		}	
	},
	render: function() {
		return (
			<div>
				<div class="row">
					<h1>Dev Shop</h1>
				</div>
				<ProductForm onProductSubmit={this.handleProductSubmit} />
				<ProductList data={this.state.data} handleRemoveList={this.handleRemoveList} />
			</div>
		);
	}
});

React.render(
  <DevShop url="/products" pollInterval={2000} />,
  document.getElementById('container')
);
