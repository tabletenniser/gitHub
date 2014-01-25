define(['marionette','parse','lib','hbs!templates/itemviews/userItemView'],function(Marionette, Parse,Lib,templateSource){
	return Marionette.ItemView.extend({
		template: templateSource,
		tagName :"li",
		className :"user-item-view",
	})
});