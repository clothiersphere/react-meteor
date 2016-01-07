//Task component - represents a single todo item
Task = React.createClass({
	propTypes: {
		task: React.PropTypes.object.isRequired,
		showPrivateButton: React.PropTypes.bool.isRequired
	},
	
	toggleChecked() {
		// Set the checked property to the opposite of its current value
		// Tasks.update(this.props.task._id, {
		// 	$set: {checked: ! this.props.task.checked}
		// });
		Meteor.call("setChecked", this.props.task._id, ! this.props.task.checked)
	},

	deleteThisTask() {
		// Tasks.remove(this.props.task._id);
		Meteor.call("removeTask", this.props.task._id);
	},

	togglePrivate() {
		Meteor.call("setPrivate", this.props.task._id, ! this.props.task.private);
	},

	render() {
		//Give tasks a diff className when they are checked off,
		//so that we can style them differently
		const taskClassName = (this.props.task.checked ? "checked": "") + " " + 
			(this.props.task.private ? "private" : "");
		
		return (
			<li className={taskClassName}>
				<button className="delete" onClick={this.deleteThisTask}>
					&times;
				</button>
				
				<input
					type="checkbox"
					readOnly={true}
					checked={this.props.task.checked}
					onClick={this.toggleChecked} />

					{ this.props.showPrivateButton ? (
						<button taskClassName="toggle-private" onClick={this.togglePrivate}>
							{ this.props.task.private ? "Private" : "Public"}
						</button>
					) : ''}

				<span className="text">
					<strong>{this.props.task.username}</strong>: {this.props.task.text}
				</span>
			</li>
		);
	}
});