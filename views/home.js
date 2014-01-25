define(['marionette','parse','hbs!templates/home','lib','models/event','views/composites/listView','views/itemviews/eventItemView'],
		function(Marionette, Parse,homeTemplate,Lib,Event,ListView,EventItemView){
	return Marionette.Layout.extend({
		template: homeTemplate,
		regions:{
			content:'.event-section',
		},
		onRender:function(){
			this.user = Lib.getCurrentUser();
			this.events =new Event.Collection();
			this.events.setUser(this.user);
			this.events.fetch();
			var list = new ListView({
				collection: this.events,
				itemView: EventItemView,
			});
			this.content.show(list);

		},
	});
});