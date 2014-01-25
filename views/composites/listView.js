define(['marionette','parse','hbs!templates/composites/listView'],function(Marionette,Parse,listViewTemplate){

		return Marionette.CompositeView.extend({
			template:listViewTemplate,
			tagName: "div",
			className:"list-view list-group",
			itemViewContainer: ".list-view-content",
			initialize:function(options){
				_.extend(this,options);
			},

		});




})