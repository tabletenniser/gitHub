define(['marionette','hbs!templates/header','scripts/lib','model/event'],function(Marionette,headerTemplate,Lib,Event){
	
	return Marionette.ItemView.extend({
		template : headerTemplate,
		className: "header",
		tagName:"div",
		initialize:function(){
			this.listenTo(Lib.Events,'signin:success',this.onUserSignInSuccess);
		},
		onUserSignInSuccess:function(user){
			this.model = user;
			this.render();
		},
		serializeData:function(){
			var data = this.model.toJSON();
			_.extend(data,{
				modelExists: (this.model)? true:false,
			});
		}

		events:{
			"click .create-event":"createEvent",

		},
		createEvent:function (){
			if (this.model){

			}else{
				window.location.href = ""
			}
		},
	});
});