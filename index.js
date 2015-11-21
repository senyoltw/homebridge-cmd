var Service, Characteristic;
var request = require("request");

module.exports = function(homebridge){
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("homebridge-http", "Http", HttpAccessory);
}


function HttpAccessory(log, config) {
	this.log = log;

	// url info
	this.irkit_url    = config["irkit_url"];
	this.on_form   = config["on_form"];
	this.off_form  = config["off_form"];
	this.name = config["name"];
}

HttpAccessory.prototype = {

	httpRequest: function(url, form, callback) {
		request({
				url: url,
				method: 'POST',
				form: JSON.stringify(form)
			},
			function(error, response, body) {
				callback(error, response, body)
			})
	},

	setPowerState: function(powerOn, callback) {
		var form;

		if (powerOn) {
			form = this.on_form;
			this.log("Setting power state to on");
		} else {
			form = this.off_form;
			this.log("Setting power state to off");
		}

		this.httpRequest(this.irkit_url, form, function(error, response, responseBody) {
			if (error) {
				this.log('HTTP power function failed: %s', error.message);
				callback(error);
			} else {
				this.log('HTTP power function succeeded!');
				this.log(response);
				this.log(responseBody);
	
				callback();
			}
		}.bind(this));
	},

	identify: function(callback) {
		this.log("Identify requested!");
		callback(); // success
	},

	getServices: function() {

		// you can OPTIONALLY create an information service if you wish to override
		// the default values for things like serial number, model, etc.
		var informationService = new Service.AccessoryInformation();

		informationService
			.setCharacteristic(Characteristic.Manufacturer, "HTTP Manufacturer")
			.setCharacteristic(Characteristic.Model, "HTTP Model")
			.setCharacteristic(Characteristic.SerialNumber, "HTTP Serial Number");

		var switchService = new Service.Switch(this.name);

		switchService
			.getCharacteristic(Characteristic.On)
			.on('set', this.setPowerState.bind(this));

		return [switchService];
	}
};
