define(['marionette','parse','hbs!templates/createNew','lib','models/event','models/activity'],function(Marionette,Parse,createNewTemplate,Lib,Event,Activity){
	return Marionette.Layout.extend({
		template: createNewTemplate,
		ui:{
			event:".event-section",
			friend :".friend-section",
			time :".time-section",
		},
		events:{
			"click .submit": "newEvent",
			"click .add-activity": "newActivity",
			"click .submit-activity":"submitActivity",
		},
		onRender:function(){
			//create a new event object
			this.user = Lib.getCurrentUser();
			this.event = new Event.Model();
			this.event.set("user",this.user);
		},
		submitActivity:function(){
			var activity = new Activity.Model();
			var title = this.$el.find("input[name='activity-title']").val();
			var description = this.$el.find("input[name='activity-description']").val();
			var location = this.$el.find("input[name='activity-location']").val();
			var data ={'user':this.user,
					   'event':this.event,
					   'title':title,
						'description':description,
						'location':location,
						'upvotes':0,
						'downvotes':0};
			var view = this;
		
			Lib.ModelSave(activity,data,function(){
				view.$el.find(".new-activity-dropdown").css({display:"none"});
			},function(){

			});
		},
		
		
		newActivity:function(){
			this.$el.find(".new-activity-dropdown").css({display:"block"});
		},
		newEvent:function(){
			if (!this.event) throw new Error("no event object found");
			var event = this.event;

			var data = {'title':this.$el.find("input[name='title']").val(),
						'description':this.$el.find("input[name='description']").val()};

			Lib.ModelSave(event, data, function(){
				console.log("new event created: "+ event.id+", "+event.get('title'));
				event=null;
				Lib.navigateTo("home");
			}, function(){

			});


		},




	});

});