# homebridge-cmd

Supports cmd on HomeBridge Platform(base on homebridge-http)  

# Installation

1. Install homebridge using: npm install -g homebridge
2. Install this plugin using: npm install -g https://github.com/senyoltw/homebridge-cmd
3. Update your configuration file. See sample-config.json in this repository for a sample. 

# Configuration

Configuration sample:

 ```
"accessories": [
        {
            "accessory": "Http",
            "name": "irkit control device",
            "irkit_url": "http://irkitxxxxx.local/messages",
            "on_form": {"format":"raw","freq":38,"data":[]},
            "off_form": {"format":"raw","freq":38,"data":[]},
        }
    ]

```