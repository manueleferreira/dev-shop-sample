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
			console.log(String.format("ERROR - {0}", err));
		}
	},
	render: function() {
		var productNodes = this.props.data.map(function(product){
			return (
				<Product _id={product._id} author={product.author} price={product.price}></Product>
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
