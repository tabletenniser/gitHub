define(['marionette','parse','scripts/lib'],function(Marionette,Parse, Lib){

	var Activity = {};
	 Activity.Model = Parse.Object.extend({
	 	className: "Activity",

	 });

	 Activity.Collection = Parse.Collection.extend({
	 	model: Activity.model,


	 });

	 return Activity;
});