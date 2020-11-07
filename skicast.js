// skicast.js

const moment = require("moment");

Module.register("skicast", {

	// default module config
	defaults: {
		updateInterval: 10 * 60 * 1000, // every 10 minutes
		animationSpeed: 0,
		initialLoadDelay: 2500, //2.5 seconds
		retryDelay: 2500,

		maxWidth: "100%",
		head: "true",

		// weather unlocked information
		appID: "8b6d0115",
		apiKey: "1ebc12ef6c3877569787a4e3eac7c0a3",
		resortId: "333005",
		apiBase: 'https://api.weatherunlocked.com/api/snow/report/',
		weatherProvider: 'weatherunlocked',

		// styling
		appendLocationNameToHeader: true,
		calendarClass: "calendar",
		tableClass: "small",
		colored: false,
		scale: false,

		iconTable: {
			"01d": "wi-day-sunny",
			"02d": "wi-day-cloudy",
			"03d": "wi-cloudy",
			"04d": "wi-cloudy-windy",
			"09d": "wi-showers",
			"10d": "wi-rain",
			"11d": "wi-thunderstorm",
			"13d": "wi-snow",
			"50d": "wi-fog",
			"01n": "wi-night-clear",
			"02n": "wi-night-cloudy",
			"03n": "wi-night-cloudy",
			"04n": "wi-night-cloudy",
			"09n": "wi-night-showers",
			"10n": "wi-night-rain",
			"11n": "wi-night-thunderstorm",
			"13n": "wi-night-snow",
			"50n": "wi-night-alt-cloudy-windy"
		},

	},

	getUrl: function () {
		var url = null;

		url = this.config.apiBase + this.config.resortId + "?app_id=" + this.config.appID + "&app_key=" + this.config.apiKey +".json";
	},

	getStyles: function () {
		return ["skicast.css", "weathericons.css"]
	},

	getScripts: function() {
		return ["moment.js"]
	},

	// define start sequence
	start: function() {
		Log.info("Starting module: " + this.name);

		// set locale
		moment.locale(config.language);

		this.conditions = [];
		this.loaded = false;
		this.scheduleUpdate(this.config.initialLoadDelay);

		this.updateTimer = null;
	},

	// Override dom generator
	getDom: function () {
		var wrapper = document.createElement("div");

		var table = document.createElement("table");
		table.classname = this.config.tableclass;

		for (var c in this.conditions) {
			var condition = this.conditions[c];

			var row = document.createElement('tr');
			if (this.config.colored) {
				row.className = 'colored';
			}
			table.appendChild(row);
		}
	},

	// Override get header
	getheader: function () {
		if (this.config.appendLocationNameToHeader) {
			if (this.data.header) {
				return this.data.header + " " + this.fetchedLocationName;
			}
			else {
				return this.fetchedLocationName;
			}
		}
		return this.data.header ? this.data.header : "";
	},
	
})