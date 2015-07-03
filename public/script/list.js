var ProductList = React.createClass({
	handleRemove: function(id) {
		try
		{
			this.props.handleRemoveList(id);
		}
		catch(err)
		{
			console.log("ERROR handleRemove - " + err);
		}
	},
	onChangePage: function(page) {
		try
		{
        	this.props.loadProductsFromServer(page);
        }
		catch(err)
		{
			console.log("ERROR onChangePage - " + err);
		}
    },
	render: function() {
		var functionRemove = this.handleRemove;
		var productNodes = this.props.data.map(function(product){
			return (
				<Product _id={product._id} author={product.author} price={product.price} hours={product.hours} handleRemove={functionRemove}></Product>
			);
		});
		return (
			<div className="row">
				<h2>Cart</h2>
				<Paginator max={5} onChange={this.onChangePage}/>

				<table className="table">
					<thead>
						<tr>
						  <th colSpan="2">Username</th>
						  <th>Price</th>
						  <th colSpan="2">Hours</th>
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

