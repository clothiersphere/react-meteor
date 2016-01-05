if (Meteor.isClient) {
	
	Meteor.startup(function () {
		//On startup render the component after the page is ready
		React.render(<App />, document.getElementById("render-target"));
	});

}