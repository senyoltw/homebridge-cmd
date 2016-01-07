# homebridge-cmd

homebridge-plugin for Your PC Command with Apple-Homekit.(by node.js child_process.exec())

# Installation

1. Install homebridge using: sudo npm install -g homebridge
2. Install this plugin using: sudo npm install -g homebridge-cmd
3. Update your configuration file. See sample-config.json in this repository for a sample. 

# Configuration

Configuration sample:

 ```
"accessories": [
        {
            "accessory": "CMD",
            "name": "PlayStation",
            "on_cmd": "ps4-waker",
            "off_cmd": "ps4-waker standby"
        }
    ]

```