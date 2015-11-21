var Service, Characteristic;
var exec = require("child_process").exec;

module.exports = function(homebridge){
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("homebridge-cmd", "cmd", cmdAccessory);
}


function cmdAccessory(log, config) {
	this.log = log;

	// url info
	this.on_cmd   = config["on_cmd"];
	this.off_cmd  = config["off_cmd"];
	this.name = config["name"];
}

cmdAccessory.prototype = {

	cmdRequest: function(url, form, callback) {
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
			.setCharacteristic(Characteristic.Manufacturer, "cmd Manufacturer")
			.setCharacteristic(Characteristic.Model, "cmd Model")
			.setCharacteristic(Characteristic.SerialNumber, "cmd Serial Number");

		var switchService = new Service.Switch(this.name);

		switchService
			.getCharacteristic(Characteristic.On)
			.on('set', this.setPowerState.bind(this));

		return [switchService];
	}
};
