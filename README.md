# homebridge-http for IRKit

Supports IRKit on HomeBridge Platform(base on homebridge-http)  
IRKitをSiri(Homekit)で操作するやつ。オン/オフの切り替えが可能になります。  
エアコン、テレビ、照明のオンオフができようになるでしょう(多分)

# Installation

1. Install homebridge using: npm install -g homebridge
2. Install this plugin using: npm install -g https://github.com/senyoltw/homebridge-http
3. Update your configuration file. See sample-config.json in this repository for a sample. 

1. homebridgeをインストール : npm install -g homebridge
2. このプラグインをインストール : npm install -g https://github.com/senyoltw/homebridge-http
3. .homebridge/config.json をしたの書き方を参考に編集

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