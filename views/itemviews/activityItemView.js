define(['marionette','parse','lib','hbs!templates/itemviews/activityItemView'],function(Marionette, Parse,Lib,templateFile){

	return Marionette.ItemView.extend({
		template: templateFile,
		initialize :function(options){
			_.extend(this,options);
			console.log(options);
		},
		serializeData:function(){
			var data = this.model.toJSON();
		
			_.extend(data,{voting:this.voting});
			return data;
			
		}
	})
});