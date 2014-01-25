define(['marionette','parse','hbs!templates/createNew','models/event','scripts/lib'],function(Marionette,Parse,createNewTemplate,Event,Lib){
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
		},
		onRender:function(){
			//create a new event object
			this.user = Lib.getCurrentUser();
			this.event = new Event.Model();
			this.event.set("parent",this.user);
		},
		newActivity:function(){
			this.$el.find(".new-acitivity-dropdown").css("display:show");
		},
		newEvent:function(){
			if (!this.event) throw new Error("no event object found");
			var title = this.$el.find("input[name='title']").val();
			var description = this.$el.find("input[name='description']").val();
			
			this.event.set('title',title);
			this.event.set('description',description);

			this.event.save(function(){
				console.log("new event created: "+ this.event.id+", "+this.event.get('title'));
				this.event=null;
				Lib.navigateTo("home");
			},function(){

			});


		},




	});

});