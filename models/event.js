define(['marionette','parse','lib'],function(Marionette,Parse,Lib){

	var Event ={};
	Event.Model = Parse.Object.extend({
		className: "Event",
	});

	Event.Collection = Parse.Collection.extend({
		model: Event.Model,
		
		setUser:function(user){
			this.user = user;
			this.query = new Parse.Query(Event.Model).equalTo("user",user);
		},
	});

	return Event;



});