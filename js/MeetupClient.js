(function(window, undefined){
	"use strict";

	var meetupView = Backbone.View.extend({

		tagname: "div",
		className: "meetups",
		initialize: function(opts){

			this.options = _.extend(
				{},
				{
					$container: $('body')
				},
				opts
				);

			this.options.$container.append(this.el);

			this.render();
		},
		
		template: "<h3>{name}</h3><hr><h6>{description}</h6>",
		render: function(){
			this.el.innerHTML = _.template(this.template, this.options);
		}
	})


function MeetupClient(options){
	
	this.options = {apikey: "284b6a257c7c73785101a423976502c"};

	this.init();
}

MeetupClient.prototype.queryAPI = function(zipcode, search_term){

//	var input = this.createInputObject();

	var url = [ "http://api.meetup.com/2/groups.json/",
				"?zip=",
				zipcode,
				//input.zip,
				"&topic=",
				search_term,
				//input.topic,
				"&order=members&key=",
				this.options.apikey,
				"&callback=?" 

				];

	return $.getJSON(url.join('')).then(function(data){
		//console.log(data);
		return data;
	});

};

MeetupClient.prototype.makeRequest = function(){

	$.when(this.queryAPI("77002", "javascript")
		).then(function(data){
			
			console.log(data);

			arguments[0].results.forEach(function(data){
				new meetupView(data);
			})

		});
};

MeetupClient.prototype.init = function(){

	var self = this;

		self.makeRequest();


};


window.MeetupClient = MeetupClient;

}) (window, undefined);

// MeetupClient.prototype.getGeo = function(){
	
// 	var promise = $.Deferred();
	
// 	navigator.geolocation.getCurrentPosition(function(){
// 		promise.resolve(arguments[0]);
// 	});

// 	console.log(promise);
// 	return promise;
// };



// MeetupClient.prototype.Routing = function(){

// 	var self = this;

// 	Path.map("#/results").to(function(){
// 		$.when()
// 	})
// };



// MeetupClient.prototype.createInputObject = function(){

// 	var input = {};
// 	$(':input').each(function(){
// 		input[this.name] = this.value;
// 	})
// 	console.log(input);
// 	return input;
// }