define(['marionette','hbs!templates/header','lib','models/event','parse'],function(Marionette,headerTemplate,Lib,Event,Parse){
	
	return Marionette.ItemView.extend({
		template : headerTemplate,
		className: "header",
		tagName:"div",
		initialize:function(){
			this.listenTo(Lib.Events,'signin:success',this.onUserSignInSuccess);
			this.model =  Parse.User.current();
		},
		onUserSignInSuccess:function(user){
			this.model = user;
			this.render();
		},
		serializeData:function(){
			if (this.model){ 
				var data = this.model.toJSON();
				_.extend(data,{
					modelExists: (this.model)? true:false,
				});
			}else{
				var data = {};
			}
			return data;
		},

/*		events:{
			"click .create-event":"createEvent",

		},
		createEvent:function (){
			if (this.model){
				Lib.navigateTo("createNew");
			}else{
				Lib.navigateTo("signIn")
			}
		},*/
	});
});