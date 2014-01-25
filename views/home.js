define(['marionette','parse','hbs!templates/home'],function(Marionette, Parse,homeTemplate){
	return Marionette.Layout.extend({
		template: homeTemplate,
		ui:{
			content:'.content-section',
		},
		




	});
});