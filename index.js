var Service, Characteristic;
var exec = require("child_process").exec;

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory("homebridge-rfoutlets", "RFOutlet", RFOutletAccessory);
}

function RFOutletAccessory(log, config) {
    this.log = log;

    // url info
    this.name = config["name"];
    this.path = config["path"];
    this.type = config["type"];

    this.rf_on = config["rf_on"];
    this.rf_off = config["rf_off"];
    this.pin = config["pin"];
    this.pulselength = config["pulselength"];

    this.manufacturer = config["manufacturer"];
    this.model = config["model"];
    this.serial = config["serial"];
}

RFOutletAccessory.prototype = {
    cmdRequest: function(cmd, callback) {
        exec(cmd, function(error, stdout, stderr) {
            callback(error, stdout, stderr)
        })
    },

    setPowerState: function(powerOn, callback) {
        var cmd;
        var path = this.path;

        if (path) {
            cmd = "sudo " + path + " ";
        } else {
            cmd = "sudo codesend "
        }

        var pin = this.pin;
        var pulselength = this.pulselength;

        if (powerOn) {
            cmd = cmd + this.rf_on;
            this.log("Turning " + this.name + " on");
        } else {
            cmd = cmd + this.rf_off;
            this.log("Turning " + this.name + " off");
        }

        if (pin) {
            cmd = cmd + " -p " + pin;
        }
        if (pulselength) {
            cmd = cmd + " -l " + pulselength;
        }

        this.cmdRequest(cmd, function(error, stdout, stderr) {
            if (error) {
                this.log('Error toggling outlet state: %s', stderr);
                callback(error);
            } else {
                //this.log('power function succeeded!');
                callback();
                this.log(stdout);
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
            .setCharacteristic(Characteristic.Manufacturer, this.manufacturer)
            .setCharacteristic(Characteristic.Model, this.model)
            .setCharacteristic(Characteristic.SerialNumber, this.serial);

        var outletService;

        switch (this.type) {
            case "Switch":
                this.outletService = new Service.Switch(this.name);
                break;
            case "Light":
                this.outletService = new Service.Lightbulb(this.name);
                break;
            case "Fan":
                this.outletService = new Service.Fan(this.name);
                break;
            default:
                this.outletService = new Service.Switch(this.name);
        }

        this.outletService
            .getCharacteristic(Characteristic.On)
            .on('set', this.setPowerState.bind(this));

        return [informationService, this.outletService];
    }
};
