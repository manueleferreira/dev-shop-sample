var Product = React.createClass({
	onProductRemove: function(e) {
		try
		{
			console.log("handleRemove");
			var node = this.getDOMNode();
			React.unmountComponentAtNode(node);
			$(node).remove();			

			this.props.handleRemove(this.props._id);

			return;
		}
		catch(err)
		{
			console.log("ERROR onProductRemove - " + err);
		}
	},
	render: function(){
		return (
			<tr className="product">
				<td>{this.props._id}</td>
				<td>{this.props.author}</td>
				<td>{this.props.price}</td>
				<td>{this.props.hours}</td>
            </tr>
		);
	}
});