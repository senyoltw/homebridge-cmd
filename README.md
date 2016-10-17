# homebridge-rfoutlets

Homebridge  plugin which is purpose-built for controlling 433MHz radio frequency outlets which can be purchased inexpensively. (i.e. [these](https://www.amazon.com/Etekcity-Wireless-Electrical-Household-Appliances/dp/B00DQELHBS "Etekcity Wireless Outlets")). Homebridge maintains state information, so you can always know if you left that lamp on

Supports *lights*, *switches*, and *fans*

# Installation

1. Install homebridge using: sudo npm install -g homebridge
2. Install this plugin using: sudo npm install -g homebridge-rfoutlets
3. Download and make the required '*codesend*' executable from [here](https://github.com/ninjablocks/433Utils/tree/master/RPi_utils "RPi_utils")
4. Update your homebridge configuration

# Configuration

See '*sample-config.json*'

- 'name': Name of your device
- 'path': Path to the '*codesend*' executable (*optional*, defaults to homebridge working directory)
- 'type': '*Light*', '*Switch*', or '*Fan*'  (**required**)
- 'rf_on': RF signal to turn the outlet on (**required**)
- 'rf_off': RF signal to turn the outlet off (**required**)
- 'pin': GPIO pin of the 433MHz transmitter (*optional*, defaults to 0)
- 'pulselength': RF transmission pulse length (*optional*, defaults to 189)
- 'manufacturer': manufacturer of the device plugged into the outlet (*optional*, defaults to *blank*)
- 'model': model of the device plugged into the outlet (*optional*, defaults to *blank*)
- 'serial': serial number of the device plugged into the outlet (*optional*, defaults to *blank*)
