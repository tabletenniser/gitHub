define(['marionette','parse','lib'],function(Marionette,Parse, Lib){

	var Activity = {};
	 Activity.Model = Parse.Object.extend({
	 	className: "Activity",

	 });

	 Activity.Collection = Lib.Collection.extend({
	 	model: Activity.model,




	 });

	 return Activity;
});