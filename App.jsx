//represents the whole App
App = React.createClass({
	
	mixins: [ReactMeteorData],

	getInitialState() {
		return { 
			hideCompleted: false
		}
	},
	// getTasks() {
	// 	return [
	// 		{_id: 1, text: "This is task"},
	// 		{_id: 2, text: "This is task"},
	// 		{_id: 3, text: "This is task"}
	// 	];
	// },
	// renderTasks() {
	// 	return this.getTasks().map((task) => {
	// 		return <Task key={task._id} task={task} />;
	// 	}); 
	// },
	getMeteorData() {
		let query = {};

		//$ne = not equal to
		if (this.state.hideCompleted) {
			query = {checked: {$ne: true}};
		}

		return { 
			tasks: Tasks.find(query, {sort: {createdAt: -1}}).fetch(),
			incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
			currentUser: Meteor.user()
		};
		// return {
		// 	tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch()
		// }
	},

	renderTasks() {
		return this.data.tasks.map((task) => {
			const currentUserId = this.data.currentUser && this.data.currentUser._id;
			const showPrivateButton = task.owner === currentUserId;

			return <Task 
				key={task._id} 
				task={task} 
				showPrivateButton={showPrivateButton} />;
		});
	},

	handleSubmit(event) {
		event.preventDefault();
		var text = this.refs.textInput.value;
		
		Meteor.call('addTask', text);
		//calls no longer directly being called from client due to insecure being removed

		// Tasks.insert({
		// 	text: text,
		// 	createdAt: new Date(),	// current time
		// 	owner: Meteor.userId(), //_id of logged in user
		// 	username: Meteor.user().username // username of logged in user
		// });

		React.findDOMNode(this.refs.textInput).value="";
	},

	toggleHideCompleted() {
		this.setState({ 
			hideCompleted: ! this.state.hideCompleted
		});
	},

	render() {
		return (
			<div className="container">
				
				<header>
					<h1>Todo List ({this.data.incompleteCount})</h1>
					
					<label className="hide-completed">
						<input
							type="checkbox"
							readOnly={true}
							checked={this.state.hideCompleted}
							onClick={this.toggleHideCompleted} />
						Hide Completed Tasks
					</label>

					<AccountsUIWrapper />

					{ this.data.currentUser ?
						<form className="new-task" onSubmit={this.handleSubmit} >
							<input
								type="text"
								ref="textInput"
								placeholder="Type to add new tasks" />
						</form> : ''
					}
				</header>

				<ul>
					{this.renderTasks()}
				</ul>
			</div>
		);
	}
})