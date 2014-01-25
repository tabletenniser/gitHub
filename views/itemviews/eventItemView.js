define(['marionette','models/event','hbs!templates/itemviews/eventItemView','lib'],function(Marionette,EventModel,eventItemViewTemplate,Lib){

	return Marionette.ItemView.extend({
		template: eventItemViewTemplate,
		tagName :"li",
		events:{
			"click .event-itemview-title":"eventClicked",
		},
		eventClicked:function (){
			console.log ('click');
			Lib.navigateTo('event',this.model.id);

		}
	})


})