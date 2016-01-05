// App component - represents the whole app
App = React.createClass({
	
	// mixin makes the getMeteorData method work
	mixins: [ReactMeteorData],
	// Loads items from the Tasks collection and puts them on this.data.tasks
	getMeteorData() {
		return {
			// tasks: Tasks.find({}).fetch().reverse()
			// tasks: Tasks.find({}).fetch()
			tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch()
		}
	},

	//commented out now that we have a collection to point to
	// getTasks() {
	// 	return [
	// 		{_id: 1, text: "This is task 1"},
	// 		{_id: 2, text: "This is task 2"},
	// 		{_id: 3, text: "This is task 3"}, 
	// 	];
	// },

	handleSubmit(event) {
		event.preventDefault();
		var text = this.refs.textInput.value

		Tasks.insert({
			text: text,
			createAt: new Date()
		});
		//clears form
		React.findDOMNode(this.refs.textInput).value="";
	},

	renderTasks() {
		// Get tasks from this.data.tasks
		return this.data.tasks.map((task) => {
			return <Task key={task._id} task={task} />;
		});
	},

	//short hand for methods in ECMA2105 - render() { ... }
	render() {
		return (
			<div className="container">
				<header>
					<h1>Todo List</h1>
					<form className="new-task" onSubmit={this.handleSubmit}>
						<input
							type="text"
							ref="textInput"
							placeholder="Type to add new tasks" />
					</form>
				</header>
			<ul>
				{this.renderTasks()}
			</ul>
			</div>
		);
	}
});