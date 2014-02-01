define(['parse'],function(Parse){
	var Time = {};
	Time.Model = Parse.Object.extend({
		className: "time"

	});
	Time.Collection = Parse.Collection.extend({
		model: Time.Model,
		setEvent:function(event){
	 		this.event = event;
			this.query = (new Parse.Query(Activity.Model)).equalTo("event",event);
	 	},


	});

	return Time;
})