// Task component - represents a single todo item.
Task = React.createClass({
	propTypes: {
		//This component gets the task to display through a React prop.
		//we can use propTypes to indicate it is required
		task: React.PropTypes.object.isRequired
	},
	
	toggleChecked() {
		//Set the checked property to the opposite of its current value
		Tasks.update(this.props.task._id, {
			$set: {checked: ! this.props.task.checked}
		});
	}, 

	deleteThisTask() {
		Tasks.remove(this.props.task._id);
	},

	render() {
		return (
			<li>{this.props.task.text}</li>
		);
	}
});