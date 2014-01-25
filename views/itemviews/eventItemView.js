define(['marionette','models/event','hbs!templates/itemviews/eventItemView'],function(Marionette,EventModel,eventItemViewTemplate){

	return Marionette.ItemView.extend({
		template: eventItemViewTemplate,
		tagName :"li",

	})


})