

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
						<Product author="Jose" price="R$1"></Product>
						<Product author="Maria" price="R$2"></Product>
					</tbody>
				</table>
			</div>
		);
	}
});

var DevShop = React.createClass({
  render: function() {
    return (
    	<div>
			<div class="row">
				<h1>Dev Shop</h1>
			</div>
			<ProductForm />
			<ProductList />
		</div>
    );
  }
});

React.render(
  React.createElement(DevShop, null),
  document.getElementById('container')
);
