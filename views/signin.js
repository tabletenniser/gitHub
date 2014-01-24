define(['marionette','parse', 'hbs!templates/signin'],function(Marionette,Parse,loginTemplates){
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
			var password = this.$el.find("input[name='pwd']").val();
			Parse.User.logIn(email,password,function(){
				window.location.hash= "home";
			},function(){

			});


		},
	});
});