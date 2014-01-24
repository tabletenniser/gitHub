define(['marionette','hbs!templates/header'],function(Marionette,headerTemplate){
	
	return Marionette.ItemView.extend({
		template : headerTemplate,
		className: "header",
		tagName:"div",
	});
});