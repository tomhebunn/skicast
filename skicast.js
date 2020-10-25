// skicast.js

Module.register("skicast", {
	// default module config
	defaults: {
		location: false,
		locationID: false,
		lat: false,
		lon: false,
		appid: '',
		units = config.units,
		updateInterval: 15 * 60 * 1000, // every 15 minutes
		animationSpeed: 1000,
		timeFormat: config.timeFormat,
		lang: config.language,
		decimalSymbol: '.',
		fade: false,

		initialLoaddelay: 2500, //2.5 seconds
		retryDelay: 2500,

		apiBase: 'https://api.weatherunlocked.com/',

		weatherProvider: 'weatherunlocked',
	},

	getScripts: function () {
		return ['moment.js']
	},

	start: function () {
		Log.info("starting module: " + this.name);

		//set locale
		moment.locale(config.language);

		this.forecast = [];
		this.loaded = false;
		this.scheduleUpdate(this.config.initialLoaddelay);

		this.updateTimer = null;
	},

	// override dom generator
	getDom: function () {
		var wrapper = document.createElement('div');

		if (this.config.appid = "") {
			wrapper.innerHTML = "Please set correct appid in config module";
			wrapper.className = 'dimed light small';
			return wrapper
		}
	},

	loaded: function(callback) {
		this.finishloading();
		Log.log(this.name + ' is loaded!');
		callback();
	}
})