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
            "accessory": "CMD",
            "name": "プレイステーション",
            "on_cmd": "ps4-waker",
            "off_cmd": "ps4-waker standby"
        }
    ]

```