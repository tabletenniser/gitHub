define(['marionette','parse', 'hbs!templates/signin','lib'],function(Marionette,Parse,loginTemplates,Lib){
	return Marionette.ItemView.extend({
		template:loginTemplates,

		events:{
			"click .sign-up-btn":"signup",
			"click .sign-in-btn":"signin",
			"click .fb-sign-in-btn":"fbSignIn",
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
		fbSignIn:function(){
			Parse.FacebookUtils.logIn('read_friendlists', {
			  success: function(user) {
			    if (!user.existed()) {
			      alert("User signed up and logged in through Facebook!");
			    } else {
			      alert("User logged in through Facebook!");
			    }
			  },
			  error: function(user, error) {
			    alert("User cancelled the Facebook login or did not fully authorize.");
			  }
			});
		}
	});
});