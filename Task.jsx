//Task component - represents a single todo item
Task = React.createClass({
	propTypes: {
		task: React.PropTypes.object.isRequired
	},
	render() {
		return (
			<li>{this.props.task.text}</li>
		);
	}
});