define(['marionette','parse','hbs!templates/event','lib','models/event','models/activity','views/itemviews/activityItemView',
		'views/composites/listView','scripts/search','facebook','scripts/sliderbar','models/time'],function(Marionette,Parse,createNewTemplate,Lib,Event,Activity,ActivityItemView,
				ListView,Search,Facebook,SliderBar,Time){
	return Marionette.Layout.extend({
		template: createNewTemplate,

		initialize:function(options){
			_.extend(this,options);
			this.refresh();
		},
		addFriends:function(){
<<<<<<< HEAD
			console.log("Add friends function gets called");

			Facebook.ui(
			{
			method: 'apprequests',
			name: 'Waterdo',
			link: 'https://developers.facebook.com/docs/reference/dialogs/',
			picture: 'http://fbrell.com/f8.jpg',
			caption: 'You are invited to an event!',
			description: 'You are invited to an event! Please register at Waterdo App to meet with your friends.'
			},
			function(response) {
				if (response && response.post_id) {
  					alert('Post was published.');
				} else {
  					alert('Post was not published.');
				}
			}
			);




=======
				//to do
>>>>>>> 7a080f1b49b1f261c627c42beeb673daa1aa797b
		},

		//run this function whenever a new view is opened
		refresh:function(eventId){
			//create new event object
			if (eventId) this.eventId = eventId;
			this.user = Lib.getCurrentUser();
			if (this.eventId){
				this.createNew =false;
				this.event = Lib.DataStore.find(this.eventId,Event.Model);
				if (!this.event) {
					this.createNew=true;
					this.newEvent();
					this.event = new Event.Model();
					var that = this;
					var Query = new Parse.Query(this.event);

					Query.get(this.eventId,function(event){
						if(!event){
							that.createNew=true;
							that.newEvent();
							that.render();
						}else{
							that.event =event;
							that.createNew = false;
							console.log(event.toJSON());
							that.existingEvent();
							that.render();
						}
					},function(){
						
					});
				}else{
					that.existingEvent();
				}
			}else{
				this.event = new Event.Model();	
				this.event.set("user",this.user);
				this.newEvent();
				this.createNew = true;
			}
			this.activities = new Activity.Collection();

		},

		existingEvent:function(){

			this.activities.setEvent(this.event);
			this.activities.fetch();

		},
		newEvent:function (){
			

		},
		serializeData:function(){
			var data ={};
			if (this.createNew){
				data.createNew =  true;	
			}else{
				data.createNew = false;
				if (this.event) _.extend(data,this.event.toJSON());
			}
			
			data.placeTypes = Search.placeTypes;
			data.placeRadius = Search.placeRadius;
			return data;
		},
		regions:{
			activity:".activity-section",
			friend :".friend-section",
			time :".time-section",
		},

		events:{
			"click .submit": "submitEvent",
			"click .add-friends": "addFriends",
			"click .submit-time":"submitTime",
			"click .add-activity": "newActivity",
			"click .submit-activity":"submitActivity",
			"click .add-time":"addTime",
			"click #geolocate": "geolocate",
			"click #findplaces":"findplaces",
			"click #searchAddress": "searchAddress"
		},
		submitTime:function(){
			var starttime = new Date($('.startT').val());
			var endtime = new Date($('.endT').val());
			var time = new Time.Model();
			var data = {
				'user':this.user,
				'event': this.event,
				'starttime': starttime,
				'endtime': endtime,
			};
			Lib.ModelSave(time,data,function(){
				$('.startT').val("");
				$('.endT').val("");

			});

		},
		onRender:function(){
			//create a new event object
			if (this.activities){
				if (this.createNew){
					var options = {voting:false}
				}else{
					var options = {voting:true}
				}
				this.activity.show(new ListView({
					collection: this.activities,
					itemView: ActivityItemView,
					itemViewOptions: options,
				}))
			}
			if (this.createNew){
				var date = {
					start: new Date(),
					end :new Date()+1000000,
				}
				SliderBar([date]);				
			}else{

			}
			
			
		},
		submitActivity:function(){
			var activity = new Activity.Model();
			var title = this.$el.find("input[name='activity-title']").val();
			var description = this.$el.find("input[name='activity-description']").val();
			var location = this.$el.find("input[name='activity-location']").val();
			var data ={'user':this.user,
					   'event':this.event,
					   'title':title,
						'description':description,
						'location':location,
						'upvotes':0,
						'downvotes':0};
			var view = this;
			var that =this;
			Lib.ModelSave(activity,data,function(){
				view.$el.find(".new-activity-dropdown").css({display:"none"});
				that.activities.add(activity);
			},function(){

			});
		},
		
		
		newActivity:function(){
			this.$el.find(".new-activity-dropdown").css({display:"block"});
			if (!this.map){
				this.map = Search.initialize($("#map-canvas")[0]);
			}
		},
		submitEvent:function(){
			if (!this.event) throw new Error("no event object found");
			var event = this.event;

			var data = {'title':this.$el.find("#eventTitle").val(),
						'description':this.$el.find("#eventDescription").val()};
		
			Lib.ModelSave(event, data, function(){
				console.log("new event created: "+ event.objectId+", "+event.get('title'));
				event=null;
				Lib.navigateTo("home");
			}, function(){

			});


		},
		geolocate:function(){
			var coord ={};
			if(this.map){
				Search.geolocate().then(function(pos){
					coord.lat = pos.lat;
					coord.lng = pos.lng;
					console.log(coord);
				});
			}
			this.coord = coord;

		},

		findplaces:function(){
			if (this.coord){
				if (this.coord.lat&&this.coord.lng){
					var radius = parseInt($("#placeRadius").val())*1000;
					var type = $("#placeTypes").val();
					Search.markPlacesNearby(this.coord.lat,this.coord.lng,type,radius).then(function(results){

						console.log(results);
					});

				}

			}
			



		},
		searchAddress:function(){
			var address = $("#userAddrField").val();
			if (address){
				var coord = {}
				Search.geoCodeAddress(address).then(function(pos){
					coord.lat = pos.lat;
					coord.lng = pos.lng;
					console.log(coord);
				});
				this.coord = coord;
			}
		},




	});

});