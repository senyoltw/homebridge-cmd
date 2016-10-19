# homebridge-rfoutlets

Homebridge plugin purpose-built for controlling 433MHz radio frequency outlets which can be purchased inexpensively. (i.e. [these](https://www.amazon.com/Etekcity-Wireless-Electrical-Household-Appliances/dp/B00DQELHBS "Etekcity Wireless Outlets")). Homebridge maintains state information, so you can always know if you left that lamp on.

Tested on a Raspberry Pi 2 - Model B running Raspbian (Debian). This should work on most ARM-based microcomputer platforms running linux, however YMMV

Supports *lights*, *switches*, and *fans*

## Installation

1. Install homebridge using: sudo npm install -g homebridge
2. Install this plugin using: sudo npm install -g homebridge-rfoutlets
3. Download and make the required '*codesend*' executable from [here](https://github.com/ninjablocks/433Utils/tree/master/RPi_utils "RPi_utils")
4. Update your homebridge configuration

## Other Notes

- The user which homebridge is run from must be on the list of *sudoers* as the '*codesend*' executable requires root privileges
- A great guide on how to record RF signals and set up your Pi to transmit can be found [here](https://www.samkear.com/hardware/control-power-outlets-wirelessly-raspberry-pi "Pi 433Mhz Transmitter Guide"). Note: the web portion of the guide is not required

## Configuration

- 'name': Name of your device
- 'path': Path to the '*codesend*' executable (*optional*, defaults to homebridge working directory)
- 'type': '*Light*', '*Switch*', or '*Fan*' (**required**)
- 'rf_on': RF signal to turn the outlet on (**required**)
- 'rf_off': RF signal to turn the outlet off (**required**)
- 'pin': GPIO pin of the 433MHz transmitter (*optional*, defaults to 0)
- 'pulselength': RF transmission pulse length (*optional*, defaults to 189)
- 'manufacturer': manufacturer of the device plugged into the outlet (*optional*, defaults to *blank*)
- 'model': model of the device plugged into the outlet (*optional*, defaults to *blank*)
- 'serial': serial number of the device plugged into the outlet (*optional*, defaults to *blank*)


See '*sample-config.json*'
