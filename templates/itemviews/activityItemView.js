define(['marionette','parse','lib','hbs!templates/itemviews/activityItemView'],function(Marionette, Parse,Lib,templateFile){

	return Marionette.ItemView.extend({
		template: templateFile,
		tagName:"li",
		className:"activity-itemview",
	})
});