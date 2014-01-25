define(['marionette','parse','lib'],function(Marionette,Parse, Lib){

	var Activity = {};
	 Activity.Model = Lib.Object.extend({
	 	className: "Activity",

	 });

	 Activity.Collection = Lib.Collection.extend({
	 	model: Activity.model,

	 	setEvent:function(event){
	 		this.event = event;
			this.query = (new Parse.Query(Activity.Model)).equalTo("event",event);
	 	},


	 });

	 return Activity;
});