define(['marionette','parse'],function(Marionette,Parse){

	var Event ={};
	Event.Model = Parse.Object.extend({
		className: "Event",
	});

	Event.Collection = Parse.Collection.extend({
		model: Event.Model,
	});

	return Event;



});