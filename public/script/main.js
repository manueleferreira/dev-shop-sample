var ItemForm = React.createClass({
	render: function(){
		return (
			<div className="itemForm">
				itemForm
			</div>
		);
	}
});

var ItemList = React.createClass({
	render: function() {
		return (
			<div className="itemList">
				itemList
			</div>
		);
	}
});

var DevShop = React.createClass({
  render: function() {
    return (
    	<div class="devShopRow">
			<div class="row">
				<h1>Dev Shop</h1>
			</div>
			<ItemForm />
			<ItemList />
		</div>
    );
  }
});

React.render(
  React.createElement(DevShop, null),
  document.getElementById('container')
);
