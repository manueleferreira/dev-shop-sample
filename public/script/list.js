var ProductList = React.createClass({
	handleRemove: function(id) {
		try
		{
			this.props.handleRemoveList(id);
		}
		catch(err)
		{
			console.log("ERROR - " + err);
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
			<div class="cart row">
				<h2>Cart</h2>
				<table class="table">
					<thead>
						<tr>
						  <th colspan="2">Username</th>
						  <th>Price</th>
						  <th>Hours</th>
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
