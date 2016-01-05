//define a collection to hold our tasks
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
	
	Meteor.startup(function () {
		//On startup render the component after the page is ready
		React.render(<App />, document.getElementById("render-target"));
	});

}