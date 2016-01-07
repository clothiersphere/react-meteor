//represents the whole App
App = React.createClass({
	
	mixins: [ReactMeteorData],

	// getTasks() {
	// 	return [
	// 		{_id: 1, text: "This is task"},
	// 		{_id: 2, text: "This is task"},
	// 		{_id: 3, text: "This is task"}
	// 	];
	// },
	getMeteorData() {
		return {
			tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch()
		}
	},
	// renderTasks() {
	// 	return this.getTasks().map((task) => {
	// 		return <Task key={task._id} task={task} />;
	// 	}); 
	// },
	renderTasks() {
		return this.data.tasks.map((task) =>{
			return <Task key={task._id} task={task} />;
		});
	},

	handleSubmit(event) {
		event.preventDefault();
		var text = this.refs.textInput.value;
		Tasks.insert({
			text: text,
			createdAt: new Date()
		});
		React.findDOMNode(this.refs.textInput).value="";
	},

	render() {
		return (
			<div className="container">
				<header>
					<h1>Todo List</h1>
					
					<form className="new-task" onSubmit={this.handleSubmit} >
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
})