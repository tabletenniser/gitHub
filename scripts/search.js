define(['marionette','lib','q'],function(Marionette,Lib,Q){

	var Search={};

	Search.placeTypes=['bank' ,'amusement_park', 'bakery', 'bar', 'bowling_alley', 'cafe', 'casino', 'clothing_store', 'electronics_store', 'food', 'gym', 'hair_care', 'jewelry_store', 'library', 'movie_theater', 'museum', 'park', 'restaurant', 'shoe_store', 'zoo'];
	Search.placeRadius = ['5','10','20','50'];
	
	//globale varibale
	var map;
		var geocoder;
		var latCoord=43.6584;
		var lngCoord=-79.39449;//logs the current map location
		var userLatCoord = 43.6584;
		var userLngCoord= -79.39449;//logs the user location
		var userLocation;
		var userLocationMarker;
		var infowindow;
		var nearbySearchTypes;
		var nearbySearchRadius;
		var nearbySearchRankby;
		var nearbyPlacesList;
		var mapOptions = {zoom: 6};

 	Search.initialize = function(mapDom){
 			map = new google.maps.Map(mapDom,mapOptions);
			infowindow = new google.maps.InfoWindow({maxWidth: 100,	maxHeight:50});
			geocoder = new google.maps.Geocoder();
			return map;

 	},

	Search.geoCodeAddress=function(address){
				var deffered = Q.defer();
				geocoder.geocode( { 'address': address}, function(results, status) {
				if (status==google.maps.GeocoderStatus.OK){
					if(results.length>1){
						alert("more than one location is found");
					}
					latCoord = results[0].geometry.location.lat();
					lngCoord = results[0].geometry.location.lng();
					map.setCenter(results[0].geometry.location);
					createPlaceMarker(results[0]);
					map.setZoom(12);
					deffered.resolve({
						lat: latCoord,
						lng :lngCoord,
					})
				} 
				else{
					alert('Geocode was not successful because: ' + status);
					deffered.reject("failed");
				}
			});
				return deffered.promise;
		}

	Search.geolocate = function(){
		 var deffered = Q.defer();
		 if(navigator.geolocation) {
			  navigator.geolocation.getCurrentPosition(function(position) {
			  latCoord = position.coords.latitude;
			  lngCoord = position.coords.longitude;
			  
			  var pos = new google.maps.LatLng(latCoord, lngCoord);
			
			  infowindow = new google.maps.InfoWindow({
				map: map,
				position: pos,
				content: 'Current location is: ('+latCoord+','+lngCoord+')'
			  });

			  map.setCenter(pos);
			  deffered.resolve({
			  	lat: latCoord,
			  	lng : lngCoord,
			  });
			}, function(){
				
				handleNoGeolocation();
				deffered.reject("faiiled to get location");
				});
		  } else {
			// Browser doesn't support Geolocation
				handleNoGeolocation(-100);
				deffered.reject("faiiled to get location");
		  }
		  return deffered.promise;


	};

	Search.markPlacesNearby=function(lat, lng, types, radius){

			//marks all query places near coordinates in certain radius
			var deffered = Q.defer();
			var coord = new google.maps.LatLng(lat, lng);
			var request = {
				location: coord,
				radius: radius,
				types: [types], 
				rankBy:google.maps.places.RankBy.PROMINENCE,
			};
			var service = new google.maps.places.PlacesService(map);
			var success = processPlaces;
			service.nearbySearch(request, function(results,status){
				success(results,status, deffered);
		});
			return deffered.promise;
		};

		var processPlaces =function (results, status,deffered){
			if(status==google.maps.places.PlacesServiceStatus.OK){
				var resultCount = results.length>20 ? 20:results.length;
				nearbyPlacesList = results.slice(0,resultCount);
				var bounds = new google.maps.LatLngBounds ();
				for(var i = 0; i < resultCount; i++){
					var marker = createPlaceMarker(results[i]);
					bounds.extend (results[i].geometry.location);
				}
				deffered.resolve(results);
				//  Fit these bounds to the map
				map.fitBounds (bounds);
				//map.setZoom(15);
			}
		}

		function createPlaceMarker(place) {
		 var placeLoc = place.geometry.location;
			if (place.icon) {
			  var image = new google.maps.MarkerImage(
					place.icon, new google.maps.Size(71, 71),
					new google.maps.Point(0, 0), new google.maps.Point(17, 34),
					new google.maps.Size(25, 25));
			} else var image = null;
		  
		  var marker = new google.maps.Marker({
			map: map,
			icon: image,
			position: place.geometry.location
		  });

		  google.maps.event.addListener(marker, 'click', function() {
			map.setCenter(placeLoc);
			//infowindow.setContent(place.name);
			//infowindow.open(map, this);
			
		  });
			return marker;
		}
	
		function isPlaceOpenDuring(startTime,endTime, dayOfWeek, place){
			//return true if the place is open at the time specified 
			//false if anything else. assumes opening_hours always exists
			//day of week starts from Sunday (0), to 6. 
			//input times are in 24hr format (0000-2359)
			if(dayOfWeek > 6 || dayOfWeek<0){
				return false;
			}
			var openHour = place.opening_hours.periods[dayOfWeek].open;
			var closeHour = place.opening_hours.periods[dayOfWeek].close;
			if(openHour > startTime || startTime > closeHour ||
				closeHour < endTime || endTime<openHour){
				return false;
			}
			else{
				return true;
			}	
		};

	var handleNoGeolocation=function(errorFlag) {	
		  if(errorFlag==-100){
			var content = 'Error: The Geolocation service failed.';
		  }
		  else{
			var content = 'Error: '+errorFlag.message;
		  }
		  var options = {
			map: map,
			position: new google.maps.LatLng(latCoord, lngCoord),
			content: content
		  };

		  //var infowindow = new google.maps.InfoWindow(options);
		  map.setCenter(options.position);
	};



	return Search;

});