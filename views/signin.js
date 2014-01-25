define(['marionette','parse', 'hbs!templates/signin','lib'],function(Marionette,Parse,loginTemplates,Lib){
	return Marionette.ItemView.extend({
		template:loginTemplates,

		events:{
			"click .sign-up-btn":"signup",
			"click .sign-in-btn":"signin",
		},

		signup:function(){



		},

		signin:function(){
			var email = this.$el.find("input[name='email']").val();
			var password = this.$el.find("input[name='password']").val();
			Parse.User.logIn(email,password,function(user){
				Lib.Events.trigger("signin:success",user);
				window.location.hash= "home";
			},function(){

			});


		},
	});
});