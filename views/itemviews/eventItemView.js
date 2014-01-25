define(['marionette','models/event','hbs!templates/itemviews/event'],function(Marionette,EventModel,eventItemViewTemplate){

	return Marionette.ItemView.extend({
		template: eventItemViewTemplate,

	})


})