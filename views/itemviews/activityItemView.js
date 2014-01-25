define(['marionette','parse','lib','hbs!templates/itemviews/activityItemView'],function(Marionette, Parse,Lib,templateFile){

	return Marionette.ItemView.extend({
		template: templateFile,
		tagName:"li",
		className:"activity-itemview",
		initialize :function(options){
			_.extend(this,options);
			console.log(options);
			this.listenTo(this.model,'change',this.render);
		},
		onRender:function{
			if (this.clickable){
				this.$el.addClass("list-group-item");
			}
		},
		serializeData:function(){
			var data = this.model.toJSON();
			_.extend(data,{voting:this.voting});
			return data;
		},
		events:{
			"click .upvote":"upVote",
			"click .downvote":"downVote",
			"click" : "onClick",
		},

		onClick:function(){
			if (this.clickable){
				this.$el.addClass("active");
				this.$el.parent().find('.active').removeClass('active');
			}

		},
		upVote:function(){
			this.model.set("upvotes",this.model.get("upvotes")+1);
			this.model.save();
		},
		downVote:function(){
			this.model.set("downvotes",this.model.get("downvotes")+1);
			this.model.save();
		}


	})
});