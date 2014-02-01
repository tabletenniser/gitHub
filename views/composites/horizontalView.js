define(['marionette','parse','hbs!templates/composites/horizontalView'],function(Marionette,Parse,horizontalTemplate){

		return Marionette.CompositeView.extend({
			template:horizontalTemplate,
			tagName: "div",
			className:"list-view list-group",
			itemViewContainer: ".horizontal-view-content",
			initialize:function(options){
				_.extend(this,options);
			},

			onRender:function(){


			},

		});




})