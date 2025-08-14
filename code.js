(async function () {
  if (typeof Swal === "undefined") {
    await new Promise((_0x315a72, _0x39cebe) => {
      const _0x5a82e5 = document.createElement("script");
      _0x5a82e5.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
      _0x5a82e5.onload = _0x315a72;
      _0x5a82e5.onerror = _0x39cebe;
      document.head.appendChild(_0x5a82e5);
    });
  }
  let _0x253050 = false;
  let _0x488881 = null;
  let _0x53c1c7 = 39000;
  function _0xd095ec() {
    const _0x5f1c97 = navigator.userAgent;
    let _0x21186f = "Unknown";
    let _0xf6f572 = "Unknown";
    let _0x573706 = "Unknown";
    if (_0x5f1c97.includes("Firefox")) {
      _0xf6f572 = "Firefox";
    } else {
      if (_0x5f1c97.includes("SamsungBrowser")) {
        _0xf6f572 = "Samsung Browser";
      } else {
        if (_0x5f1c97.includes("Opera") || _0x5f1c97.includes("OPR/")) {
          _0xf6f572 = "Opera";
        } else {
          if (_0x5f1c97.includes("Trident")) {
            _0xf6f572 = "Internet Explorer";
          } else {
            if (_0x5f1c97.includes("Edge")) {
              _0xf6f572 = "Edge";
            } else {
              if (_0x5f1c97.includes("Chrome")) {
                _0xf6f572 = "Chrome";
              } else {
                if (_0x5f1c97.includes("Safari")) {
                  _0xf6f572 = "Safari";
                }
              }
            }
          }
        }
      }
    }
    if (_0x5f1c97.includes("Android")) {
      _0x573706 = "Android";
    } else {
      if (_0x5f1c97.includes("Linux")) {
        _0x573706 = "Linux";
      } else {
        if (_0x5f1c97.includes("iPhone") || _0x5f1c97.includes("iPad") || _0x5f1c97.includes("iPod")) {
          _0x573706 = "iOS";
        } else {
          if (_0x5f1c97.includes("Macintosh")) {
            _0x573706 = "Mac OS";
          } else {
            if (_0x5f1c97.includes("Windows")) {
              _0x573706 = "Windows";
            }
          }
        }
      }
    }
    if (_0x5f1c97.includes("Mobile")) {
      _0x21186f = "Mobile";
    } else {
      if (_0x5f1c97.includes("Tablet")) {
        _0x21186f = "Tablet";
      } else {
        _0x21186f = "Desktop";
      }
    }
    const _0xbd22f6 = window.screen.width + 'x' + window.screen.height;
    const _0x21500d = navigator.cpuClass || "Unknown";
    return {
      'fingerprint': localStorage.getItem("deviceFingerprint") || "dev_" + Math.random().toString(36).substring(2, 15),
      'deviceType': _0x21186f,
      'browser': _0xf6f572,
      'os': _0x573706,
      'userAgent': _0x5f1c97,
      'screenResolution': _0xbd22f6,
      'cpuClass': _0x21500d,
      'language': navigator.language,
      'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      'plugins': Array.from(navigator.plugins).map(_0x291074 => _0x291074.name).join(", "),
      'hardwareConcurrency': navigator.hardwareConcurrency || "Unknown"
    };
  }
  function _0x555ac3() {
    let _0x21ac9d = localStorage.getItem("customDeviceId");
    if (!_0x21ac9d) {
      _0x21ac9d = "dev-" + Math.random().toString(36).substr(2, 12) + '-' + navigator.hardwareConcurrency + '-' + screen.width + 'x' + screen.height;
      localStorage.setItem("customDeviceId", _0x21ac9d);
    }
    return _0x21ac9d;
  }
  async function _0x1af360(_0x56f17d) {
    const _0x26b628 = _0x555ac3();
    const _0x7a8234 = _0xd095ec();
    if (!localStorage.getItem("deviceFingerprint")) {
      localStorage.setItem("deviceFingerprint", _0x7a8234.fingerprint);
    }
    try {
      const _0x14c2bb = await fetch("https://jisanx4899.pythonanywhere.com/api/verify", {
        'method': "POST",
        'headers': {
          'Content-Type': "application/json"
        },
        'body': JSON.stringify({
          'license_key': _0x56f17d,
          'device_id': _0x26b628,
          'device_fingerprint': _0x7a8234.fingerprint,
          'device_info': _0x7a8234,
          'is_recheck': !!localStorage.getItem("appActivation")
        })
      });
      const _0xe1a7f8 = await _0x14c2bb.json();
      console.log("✅ Server Response:", _0xe1a7f8);
      if (_0xe1a7f8.valid || _0xe1a7f8.status === "success") {
        localStorage.setItem("appActivation", _0x56f17d);
        localStorage.setItem("lastVerified", Date.now());
        _0x253050 = true;
        return {
          'valid': true,
          'key': _0x56f17d
        };
      } else {
        return _0xe1a7f8.message && _0xe1a7f8.message.includes("device limit") ? {
          'valid': false,
          'reason': "limit",
          'allowed': _0xe1a7f8.allowed_devices || 3,
          'used': _0xe1a7f8.used_devices || "unknown"
        } : (localStorage.getItem("appActivation") === _0x56f17d && (localStorage.removeItem("appActivation"), localStorage.removeItem("lastVerified"), _0x253050 = false), {
          'valid': false,
          'reason': "invalid"
        });
      }
    } catch (_0x5bc029) {
      console.error("Verification failed:", _0x5bc029);
      return {
        'valid': false,
        'reason': "network"
      };
    }
  }
  function _0x100d35(_0x301b64, _0x18e899) {
    Swal.fire({
      'icon': "error",
      'title': "Device Limit Reached",
      'html': "You have used <b>" + _0x18e899 + "</b> out of <b>" + _0x301b64 + "</b> devices.<br>Please contact <a href=\"https://t.me/traderjisanx\" target=\"_blank\">@traderjisanx</a>.",
      'confirmButtonText': 'OK',
      'allowOutsideClick': false
    });
  }
  function _0x18f584() {
    Swal.fire({
      'icon': "error",
      'title': "👇Click Username 👇",
      'html': "Click 👉 <a href=\"https://t.me/traderjisanx\" target=\"_blank\">@traderjisanx</a> 🫲.",
      'confirmButtonText': 'OK',
      'allowOutsideClick': false
    });
  }
  function _0x371900() {
    Swal.fire({
      'icon': "warning",
      'title': "Connection Error",
      'html': "Could not verify license. Please check your internet connection and try again.<br>If problem persists, contact <a href=\"https://t.me/traderjisanx\" target=\"_blank\">@traderjisanx</a>.",
      'confirmButtonText': 'OK',
      'allowOutsideClick': false
    });
  }
  function _0x2ea466(_0x33f14d) {
    const _0x186ceb = {
      'A': "Nebula",
      'B': "Quartz",
      'C': "Tornado",
      'D': "Eclipse",
      'E': "Blizzard",
      'F': "Mirage",
      'G': "Vortex",
      'H': "Zephyr",
      'I': "Nimbus",
      'J': "Cyclone",
      'K': "Phantom",
      'L': "Ignite",
      'M': "Jungle",
      'N': "Lynx",
      'O': "Falcon",
      'P': "Comet",
      'Q': "Raven",
      'R': "Stellar",
      'S': "Glacier",
      'T': "Orbit",
      'U': "Tempest",
      'V': "Nova",
      'W': "Inferno",
      'X': "Echo",
      'Y': "Gravity",
      'Z': "Shadow",
      0x0: "Drift",
      0x1: "Bolt",
      0x2: "Fury",
      0x3: "Crimson",
      0x4: "Oblivion",
      0x5: "Pulse",
      0x6: "Specter",
      0x7: "Radiant",
      0x8: "Blitz",
      0x9: "Strike",
      '@': "Quotex",
      '-': "Lyra",
      '_': "Xion",
      '#': "Vega",
      '.': "Orion"
    };
    const _0x550b63 = _0x33f14d.toUpperCase().split('').map(_0x4a1aa1 => _0x186ceb[_0x4a1aa1] || "Fine").join(" ");
    return _0x550b63;
  }
  function _0x5f1c9f(_0x167e7b, _0x9cf01e = 3000) {
    const _0x55b766 = document.createElement("div");
    _0x55b766.className = "message-popup";
    _0x55b766.textContent = _0x167e7b;
    document.body.appendChild(_0x55b766);
    setTimeout(() => {
      _0x55b766.style.opacity = '0';
      setTimeout(() => _0x55b766.remove(), 300);
    }, _0x9cf01e);
  }
  function _0x5cd9d1() {
    const _0x21bf24 = document.getElementById("licenseSection");
    const _0xd1fb7d = document.getElementById("demoBalanceSection");
    if (_0x21bf24 && _0xd1fb7d) {
      _0x21bf24.classList.add("hide");
      setTimeout(() => {
        _0xd1fb7d.classList.add("show");
      }, 300);
    }
  }
  async function _0x7be47e() {
    const _0x362416 = document.createElement("div");
    _0x362416.innerHTML = "\n      <div id=\"settingsPopup\" class=\"show\">\n        <h2>Only Buy For @traderjisanx </h2>\n        <a href=\"https://t.me/treader_jisan\" target=\"_blank\" style=\"display: inline-block; margin-bottom: 15px;\">\n            <img src=\"https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg\" alt=\"Telegram\" width=\"40px\" style=\"cursor: pointer;\">\n        </a>\n        \n        <label>Leaderboard Name:\n            <input type=\"text\" id=\"lname\" placeholder=\"Enter Name\">\n        </label>\n        <label>Leaderboard Balance:\n            <input type=\"number\" id=\"iblafp\" placeholder=\"Enter Balance\">\n        </label>\n        <label>Mid Position:\n            <input type=\"number\" id=\"midPosition\" value=\"1690\">\n        </label>\n        <label>Maximum Position:\n            <input type=\"number\" id=\"basePosition\" value=\"789345\">\n        </label>\n        <label>Country Flag:\n             <select id=\"countryFlagSelect\">\n                <option value=\"bd\">🇧🇩 Bangladesh</option>\n                <option value=\"in\">🇮🇳 India</option>\n                <option value=\"pk\">🇵🇰 Pakistan</option>\n                <option value=\"af\">🇦🇫 Afghanistan</option>\n                <option value=\"ax\">🇦🇽 Åland Islands</option>\n                <option value=\"al\">🇦🇱 Albania</option>\n                <option value=\"dz\">🇩🇿 Algeria</option>\n                <option value=\"as\">🇦🇸 American Samoa</option>\n                <option value=\"ao\">🇦🇴 Angola</option>\n                <option value=\"ai\">🇦🇮 Anguilla</option>\n                <option value=\"aq\">🇦🇶 Antarctica</option>\n                <option value=\"ag\">🇦🇬 Antigua & Barbuda</option>\n                <option value=\"ar\">🇦🇷 Argentina</option>\n                <option value=\"am\">🇦🇲 Armenia</option>\n                <option value=\"aw\">🇦🇼 Aruba</option>\n                <option value=\"az\">🇦🇿 Azerbaijan</option>\n                <option value=\"bs\">🇧🇸 Bahamas</option>\n                <option value=\"bh\">🇧🇭 Bahrain</option>\n                <option value=\"bb\">🇧🇧 Barbados</option>\n                <option value=\"by\">🇧🇾 Belarus</option>\n                <option value=\"bz\">🇧🇿 Belize</option>\n                <option value=\"bj\">🇧🇯 Benin</option>\n                <option value=\"bm\">🇧🇲 Bermuda</option>\n                <option value=\"bt\">🇧🇹 Bhutan</option>\n                <option value=\"bo\">🇧🇴 Bolivia</option>\n                <option value=\"ba\">🇧🇦 Bosnia & Herzegovina</option>\n                <option value=\"bw\">🇧🇼 Botswana</option>\n                <option value=\"bv\">🇧🇻 Bouvet Island</option>\n                <option value=\"br\">🇧🇷 Brazil</option>\n                <option value=\"io\">🇮🇴 British Indian Ocean Territory</option>\n                <option value=\"bn\">🇧🇳 Brunei</option>\n                <option value=\"bf\">🇧🇫 Burkina Faso</option>\n                <option value=\"bi\">🇧🇮 Burundi</option>\n                <option value=\"kh\">🇰🇭 Cambodia</option>\n                <option value=\"cm\">🇨🇲 Cameroon</option>\n                <option value=\"cv\">🇨🇻 Cape Verde</option>\n                <option value=\"ky\">🇰🇾 Cayman Islands</option>\n                <option value=\"cf\">🇨🇫 Central African Republic</option>\n                <option value=\"td\">🇹🇩 Chad</option>\n                <option value=\"cl\">🇨🇱 Chile</option>\n                <option value=\"cn\">🇨🇳 China</option>\n                <option value=\"cx\">🇨🇽 Christmas Island</option>\n                <option value=\"cc\">🇨🇨 Cocos (Keeling) Islands</option>\n                <option value=\"co\">🇨🇴 Colombia</option>\n                <option value=\"km\">🇰🇲 Comoros</option>\n                <option value=\"cg\">🇨🇬 Congo - Brazzaville</option>\n                <option value=\"cd\">🇨🇩 Congo - Kinshasa</option>\n                <option value=\"ck\">🇨🇰 Cook Islands</option>\n                <option value=\"cr\">🇨🇷 Costa Rica</option>\n                <option value=\"ci\">🇨🇮 Côte d Ivoire</option>\n                <option value=\"cu\">🇨🇺 Cuba</option>\n                <option value=\"cw\">🇨🇼 Curaçao</option>\n                <option value=\"dj\">🇩🇯 Djibouti</option>\n                <option value=\"dm\">🇩🇲 Dominica</option>\n                <option value=\"do\">🇩🇴 Dominican Republic</option>\n                <option value=\"ec\">🇪🇨 Ecuador</option>\n                <option value=\"eg\">🇪🇬 Egypt</option>\n                <option value=\"sv\">🇸🇻 El Salvador</option>\n                <option value=\"gq\">🇬🇶 Equatorial Guinea</option>\n                <option value=\"er\">🇪🇷 Eritrea</option>\n                <option value=\"sz\">🇸🇿 Eswatini</option>\n                <option value=\"et\">🇪🇹 Ethiopia</option>\n                <option value=\"fk\">🇫🇰 Falkland Islands</option>\n                <option value=\"fo\">🇫🇴 Faroe Islands</option>\n                <option value=\"fj\">🇫🇯 Fiji</option>\n                <option value=\"gf\">🇬🇫 French Guiana</option>\n                <option value=\"pf\">🇵🇫 French Polynesia</option>\n                <option value=\"tf\">🇹🇫 French Southern Territories</option>\n                <option value=\"ga\">🇬🇦 Gabon</option>\n                <option value=\"gm\">🇬🇲 Gambia</option>\n                <option value=\"ge\">🇬🇪 Georgia</option>\n                <option value=\"gh\">🇬🇭 Ghana</option>\n                <option value=\"gi\">🇬🇮 Gibraltar</option>\n                <option value=\"gl\">🇬🇱 Greenland</option>\n                <option value=\"gd\">🇬🇩 Grenada</option>\n                <option value=\"gp\">🇬🇵 Guadeloupe</option>\n                <option value=\"gt\">🇬🇹 Guatemala</option>\n                <option value=\"gg\">🇬🇬 Guernsey</option>\n                <option value=\"gn\">🇬🇳 Guinea</option>\n                <option value=\"gw\">🇬🇼 Guinea-Bissau</option>\n                <option value=\"gy\">🇬🇾 Guyana</option>\n                <option value=\"ht\">🇭🇹 Haiti</option>\n                <option value=\"hm\">🇭🇲 Heard & McDonald Islands</option>\n                <option value=\"hn\">🇭🇳 Honduras</option>\n                <option value=\"is\">🇮🇸 Iceland</option>\n                <option value=\"id\">🇮🇩 Indonesia</option>\n                <option value=\"ir\">🇮🇷 Iran</option>\n                <option value=\"iq\">🇮🇶 Iraq</option>\n                <option value=\"im\">🇮🇲 Isle of Man</option>\n                <option value=\"jm\">🇯🇲 Jamaica</option>\n                <option value=\"je\">🇯🇪 Jersey</option>\n                <option value=\"jo\">🇯🇴 Jordan</option>\n                <option value=\"kz\">🇰🇿 Kazakhstan</option>\n                <option value=\"ke\">🇰🇪 Kenya</option>\n                <option value=\"ki\">🇰🇮 Kiribati</option>\n                <option value=\"kw\">🇰🇼 Kuwait</option>\n                <option value=\"kg\">🇰🇬 Kyrgyzstan</option>\n                <option value=\"la\">🇱🇦 Laos</option>\n                <option value=\"lb\">🇱🇧 Lebanon</option>\n                <option value=\"ls\">🇱🇸 Lesotho</option>\n                <option value=\"lr\">🇱🇷 Liberia</option>\n                <option value=\"ly\">🇱🇾 Libya</option>\n                <option value=\"mo\">🇲🇴 Macao SAR China</option>\n                <option value=\"mg\">🇲🇬 Madagascar</option>\n                <option value=\"mw\">🇲🇼 Malawi</option>\n                <option value=\"my\">🇲🇾 Malaysia</option>\n                <option value=\"mv\">🇲🇻 Maldives</option>\n                <option value=\"ml\">🇲🇱 Mali</option>\n                <option value=\"mh\">🇲🇭 Marshall Islands</option>\n                <option value=\"mq\">🇲🇶 Martinique</option>\n                <option value=\"mr\">🇲🇷 Mauritania</option>\n                <option value=\"mu\">🇲🇺 Mauritius</option>\n                <option value=\"yt\">🇾🇹 Mayotte</option>\n                <option value=\"mx\">🇲🇽 Mexico</option>\n                <option value=\"fm\">🇫🇲 Micronesia</option>\n                <option value=\"md\">🇲🇩 Moldova</option>\n                <option value=\"mc\">🇲🇨 Monaco</option>\n                <option value=\"mn\">🇲🇳 Mongolia</option>\n                <option value=\"me\">🇲🇪 Montenegro</option>\n                <option value=\"ms\">🇲🇸 Montserrat</option>\n                <option value=\"ma\">🇲🇦 Morocco</option>\n                <option value=\"mz\">🇲🇿 Mozambique</option>\n                <option value=\"mm\">🇲🇲 Myanmar (Burma)</option>\n                <option value=\"na\">🇳🇦 Namibia</option>\n                <option value=\"nr\">🇳🇷 Nauru</option>\n                <option value=\"np\">🇳🇵 Nepal</option>\n                <option value=\"nc\">🇳🇨 New Caledonia</option>\n                <option value=\"ni\">🇳🇮 Nicaragua</option>\n                <option value=\"ne\">🇳🇪 Niger</option>\n                <option value=\"ng\">🇳🇬 Nigeria</option>\n                <option value=\"nu\">🇳🇺 Niue</option>\n                <option value=\"nf\">🇳🇫 Norfolk Island</option>\n                <option value=\"kp\">🇰🇵 North Korea</option>\n                <option value=\"mk\">🇲🇰 North Macedonia</option>\n                <option value=\"om\">🇴🇲 Oman</option>\n                <option value=\"pw\">🇵🇼 Palau</option>\n                <option value=\"ps\">🇵🇸 Palestinian Territories</option>\n                <option value=\"pa\">🇵🇦 Panama</option>\n                <option value=\"pg\">🇵🇬 Papua New Guinea</option>\n                <option value=\"py\">🇵🇾 Paraguay</option>\n                <option value=\"pe\">🇵🇪 Peru</option>\n                <option value=\"ph\">🇵🇭 Philippines</option>\n                <option value=\"pn\">🇵🇳 Pitcairn Islands</option>\n                <option value=\"qa\">🇶🇦 Qatar</option>\n                <option value=\"re\">🇷🇪 Réunion</option>\n                <option value=\"rw\">🇷🇼 Rwanda</option>\n                <option value=\"ws\">🇼🇸 Samoa</option>\n                <option value=\"st\">🇸🇹 São Tomé & Príncipe</option>\n                <option value=\"sa\">🇸🇦 Saudi Arabia</option>\n                <option value=\"sn\">🇸🇳 Senegal</option>\n                <option value=\"rs\">🇷🇸 Serbia</option>\n                <option value=\"sc\">🇸🇨 Seychelles</option>\n                <option value=\"sg\">🇸🇬 Singapore</option>\n                <option value=\"sx\">🇸🇽 Sint Maarten</option>\n                <option value=\"sb\">🇸🇧 Solomon Islands</option>\n                <option value=\"so\">🇸🇴 Somalia</option>\n                <option value=\"za\">🇿🇦 South Africa</option>\n                <option value=\"gs\">🇬🇸 South Georgia & South Sandwich Islands</option>\n                <option value=\"kr\">🇰🇷 South Korea</option>\n                <option value=\"ss\">🇸🇸 South Sudan</option>\n                <option value=\"lk\">🇱🇰 Sri Lanka</option>\n                <option value=\"bl\">🇧🇱 St. Barthélemy</option>\n                <option value=\"sh\">🇸🇭 St. Helena</option>\n                <option value=\"kn\">🇰🇳 St. Kitts & Nevis</option>\n                <option value=\"lc\">🇱🇨 St. Lucia</option>\n                <option value=\"mf\">🇲🇫 St. Martin</option>\n                <option value=\"pm\">🇵🇲 St. Pierre & Miquelon</option>\n                <option value=\"vc\">🇻🇨 St. Vincent & Grenadines</option>\n                <option value=\"sd\">🇸🇩 Sudan</option>\n                <option value=\"sr\">🇸🇷 Suriname</option>\n                <option value=\"sj\">🇸🇯 Svalbard & Jan Mayen</option>\n                <option value=\"sy\">🇸🇾 Syria</option>\n                <option value=\"tw\">🇹🇼 Taiwan</option>\n                <option value=\"tj\">🇹🇯 Tajikistan</option>\n                <option value=\"tz\">🇹🇿 Tanzania</option>\n                <option value=\"th\">🇹🇭 Thailand</option>\n                <option value=\"tl\">🇹🇱 Timor-Leste</option>\n                <option value=\"tg\">🇹🇬 Togo</option>\n                <option value=\"tk\">🇹🇰 Tokelau</option>\n                <option value=\"to\">🇹🇴 Tonga</option>\n                <option value=\"tt\">🇹🇹 Trinidad & Tobago</option>\n                <option value=\"tn\">🇹🇳 Tunisia</option>\n                <option value=\"tr\">🇹🇷 Turkey</option>\n                <option value=\"tm\">🇹🇲 Turkmenistan</option>\n                <option value=\"tc\">🇹🇨 Turks & Caicos Islands</option>\n                <option value=\"tv\">🇹🇻 Tuvalu</option>\n                <option value=\"ug\">🇺🇬 Uganda</option>\n                <option value=\"ua\">🇺🇦 Ukraine</option>\n                <option value=\"ae\">🇦🇪 United Arab Emirates</option>\n                <option value=\"uy\">🇺🇾 Uruguay</option>\n                <option value=\"uz\">🇺🇿 Uzbekistan</option>\n                <option value=\"vu\">🇻🇺 Vanuatu</option>\n                <option value=\"va\">🇻🇦 Vatican City</option>\n                <option value=\"ve\">🇻🇪 Venezuela</option>\n                <option value=\"vn\">🇻🇳 Vietnam</option>\n                <option value=\"wf\">🇼🇫 Wallis & Futuna</option>\n                <option value=\"eh\">🇪🇭 Western Sahara</option>\n                <option value=\"ye\">🇾🇪 Yemen</option>\n                <option value=\"zm\">🇿🇲 Zambia</option>\n                <option value=\"zw\">🇿🇼 Zimbabwe</option>\n            </select>\n        </label>\n\n        <div id=\"licenseSection\" class=\"" + (_0x253050 ? "hide" : '') + "\">\n          <h3>License Verification</h3>\n          <input type=\"text\" id=\"licenseInput\" placeholder=\"Enter your license key\" value=\"" + (localStorage.getItem("appActivation") || '') + "\">\n          <button id=\"verifyBtn\">Verify License</button>\n          <div id=\"verificationStatus\">\n            " + (_0x253050 ? "<div class=\"verified-badge\">✓ Verified</div>" : localStorage.getItem("appActivation") ? "<div class=\"unverified-badge\">✗ License Expired/Invalid</div>" : "<div class=\"unverified-badge\">✗ Not Verified</div>") + "\n          </div>\n        </div>\n\n        <div id=\"demoBalanceSection\" class=\"" + (_0x253050 ? "show" : '') + "\">\n          <h3>Demo Balance Settings</h3>\n          <input type=\"number\" id=\"demoBalanceInput\" placeholder=\"Enter demo balance\" value=\"" + _0x53c1c7 + "\">\n          <button id=\"setDemoBtn\">Update Demo Balance</button>\n          <div id=\"demoBalanceStatus\"></div>\n        </div>\n\n        <button id=\"saveButton\" " + (_0x253050 ? '' : "disabled") + ">Save Settings</button>\n        <button class=\"close-btn\">Close</button>\n        \n        <div id=\"cheatCodeDisplay\">" + (localStorage.getItem("appActivation") ? _0x2ea466(localStorage.getItem("appActivation")) : "Oblivion Comet Nebula Specter Comet Nimbus Quartz Inferno Quotex Blitz Drift") + "</div>\n      </div>\n    ";
    document.body.appendChild(_0x362416);
    _0x488881 = document.getElementById("settingsPopup");
    document.getElementById("lname").value = '';
    document.getElementById("iblafp").value = '';
    document.getElementById("midPosition").value = "1690";
    document.getElementById("basePosition").value = "789345";
    document.getElementById("countryFlagSelect").value = 'bd';
    document.getElementById("verifyBtn")?.["addEventListener"]("click", _0x17403f);
    document.getElementById("setDemoBtn")?.["addEventListener"]("click", _0xd5e2f7);
    document.getElementById("saveButton").addEventListener("click", _0x1a10e0);
    document.querySelector(".close-btn").addEventListener("click", _0x3fdf3b);
    setTimeout(() => {
      document.getElementById("settingsPopup").style.opacity = '1';
      document.getElementById("settingsPopup").style.transform = "translate(-50%, -50%) scale(1)";
    }, 10);
  }
  function _0xd5e2f7() {
    const _0x33153c = document.getElementById("demoBalanceInput").value;
    if (!_0x33153c || isNaN(_0x33153c)) {
      _0x5f1c9f("Please enter a valid balance amount");
      return;
    }
    _0x53c1c7 = parseInt(_0x33153c);
    const _0x4761f3 = document.getElementById("demoBalanceStatus");
    _0x4761f3.innerHTML = "<div style=\"color:#28a745;\">Demo balance updated successfully!</div>";
    _0x5f1c9f("Demo balance set to " + _0x53c1c7);
    setTimeout(() => {
      _0x4761f3.innerHTML = '';
    }, 3000);
  }
  async function _0x17403f() {
    const _0x4c295c = document.getElementById("licenseInput").value.trim();
    if (!_0x4c295c) {
      _0x5f1c9f("Please enter a license key");
      return;
    }
    const _0x4a6861 = document.getElementById("verifyBtn");
    _0x4a6861.disabled = true;
    _0x4a6861.textContent = "Verifying...";
    const _0x105084 = await _0x1af360(_0x4c295c);
    if (_0x105084.valid) {
      document.getElementById("verificationStatus").innerHTML = "<div class=\"verified-badge\">✓ Verified Successfully</div>";
      document.getElementById("cheatCodeDisplay").textContent = _0x2ea466(_0x105084.key);
      document.getElementById("saveButton").disabled = false;
      await Swal.fire({
        'icon': "success",
        'title': "License Verified!",
        'text': "Your license has been successfully verified.",
        'showConfirmButton': false,
        'timer': 0x5dc,
        'timerProgressBar': true
      });
      _0x5cd9d1();
    } else {
      if (_0x105084.reason === "limit") {
        _0x100d35(_0x105084.allowed, _0x105084.used);
      } else if (_0x105084.reason === "network") {
        _0x371900();
      } else {
        _0x18f584();
      }
      document.getElementById("verificationStatus").innerHTML = "<div class=\"unverified-badge\">✗ Invalid License</div>";
      document.getElementById("saveButton").disabled = true;
    }
    _0x4a6861.disabled = false;
    _0x4a6861.textContent = "Verify License";
  }
  function _0x3fdf3b() {
    const _0x14d465 = document.getElementById("settingsPopup");
    if (_0x14d465) {
      _0x14d465.style.opacity = '0';
      _0x14d465.style.transform = "translate(-50%, -50%) scale(0.8)";
      setTimeout(() => _0x14d465.remove(), 300);
    }
  }
  function _0x1a10e0() {
    const _0x3b35bb = localStorage.getItem("appActivation");
    if (!_0x3b35bb || !_0x253050) {
      _0x18f584();
      return;
    }
    const _0x38a06e = document.getElementById("lname").value;
    const _0x22e2b4 = document.getElementById("iblafp").value;
    const _0x137888 = document.getElementById("midPosition").value;
    const _0x1c8c50 = document.getElementById("basePosition").value;
    const _0x3d3f00 = document.getElementById("countryFlagSelect").value;
    const _0x677c4d = "<svg class=\"flag flag-" + _0x3d3f00 + "\"><use xlink:href=\"/profile/images/flags.svg#flag-" + _0x3d3f00 + "\"></use></svg>";
    _0x645e90(_0x38a06e, _0x22e2b4, _0x137888, _0x1c8c50, _0x677c4d);
    _0x3fdf3b();
    _0x5f1c9f("Developed by @traderjisanx");
  }
  function _0x645e90(_0x15fd81, _0x3319b2, _0x89396b, _0x56e460, _0x1e7849) {
    console.log("Running main trading script...");
    console.log("Settings:", {
      'leaderboardName': _0x15fd81,
      'balance': _0x3319b2,
      'midPosition': _0x89396b,
      'basePosition': _0x56e460,
      'countryFlag': _0x1e7849,
      'demoBalance': _0x53c1c7
    });
    document.title = "Live trading | Quotex";
    const _0x53edf4 = window.location.pathname.split('/')[1];
    history.pushState({}, '', '/' + _0x53edf4 + "/trade");
    history.replaceState(null, null, window.location.href.replace("demo-trade", "trade"));
    const _0x209e68 = document.querySelector(".header__banner");
    if (_0x209e68) {
      _0x209e68.remove();
      console.log("Banner removed successfully.");
    } else {
      console.log("Banner not found.");
    }
    const _0x7dfcf1 = {
      'USD': {
        'symbol': '$',
        'pro': 0x1388,
        'vip': 0x2710,
        'demoBalance': "10,000.00"
      },
      'INR': {
        'symbol': '₹',
        'pro': 0x65518,
        'vip': 0xcaa30,
        'demoBalance': "700,000.00"
      },
      'BDT': {
        'symbol': '৳',
        'pro': 0x86470,
        'vip': 0x10c8e0,
        'demoBalance': "1,000,000.00"
      },
      'EUR': {
        'symbol': '€',
        'pro': 0x125c,
        'vip': 0x24b8,
        'demoBalance': "10,000.00"
      },
      'PKR': {
        'symbol': '₨',
        'pro': 0x155cc0,
        'vip': 0x2ab980,
        'demoBalance': "2,800,000.00"
      },
      'GBP': {
        'symbol': '£',
        'pro': 0xfa0,
        'vip': 0x1f40,
        'demoBalance': "10,000.00"
      },
      'BRL': {
        'symbol': 'R$',
        'pro': 0x61a8,
        'vip': 0xc350,
        'demoBalance': "50,000.00"
      },
      'EGP': {
        'symbol': 'E£',
        'pro': 0x25d78,
        'vip': 0x4baf0,
        'demoBalance': "200,000.00"
      },
      'TRY': {
        'symbol': '₺',
        'pro': 0x27100,
        'vip': 0x4e200,
        'demoBalance': "300,000.00"
      }
    };
    const _0x548c61 = _0x53edf4 === 'ar';
    const _0x3250db = _0x53edf4 === 'bn';
    const _0x483d23 = _0x53edf4 === 'pt';
    function _0xa30540() {
      const _0x444e2f = [".---react-features-Usermenu-Mobile-styles-module__infoName--gG3dg", ".---react-features-Usermenu-styles-module__infoName--SfrTV"];
      _0x444e2f.forEach(_0x3c547e => {
        const _0x317f28 = document.querySelectorAll(_0x3c547e);
        _0x317f28.forEach(_0x2c6e0b => {
          if (_0x2c6e0b) {
            _0x2c6e0b.textContent = _0x548c61 ? "مباشر" : _0x3250db ? "সরাসরি" : _0x483d23 ? "Viver" : "LIVE";
            _0x2c6e0b.style.color = "#0faf59";
          }
        });
      });
      const _0x40caa8 = document.querySelector(".---react-features-Usermenu-styles-module__infoName--SfrTV");
      if (_0x40caa8 && window.innerWidth > 768) {
        _0x40caa8.textContent = _0x548c61 ? "حساب حقيقي" : _0x3250db ? "লাইভ অ্যাকাউন্ট" : _0x483d23 ? "Conta real" : "LIVE ACCOUNT";
        _0x40caa8.style.color = "#0faf59";
      }
    }
    function _0x74c061(_0x934bc7) {
      if (!_0x934bc7) {
        return {
          'code': "USD",
          ..._0x7dfcf1.USD
        };
      }
      const _0x1f59ca = _0x934bc7.replace(/[0-9.,]/g, '').trim();
      for (const [_0x4bfbbe, _0x5017f5] of Object.entries(_0x7dfcf1)) {
        if (_0x1f59ca.startsWith(_0x5017f5.symbol)) {
          return {
            'code': _0x4bfbbe,
            ..._0x5017f5
          };
        }
      }
      return {
        'code': "USD",
        ..._0x7dfcf1.USD
      };
    }
    function _0x5aeae5(_0x14220d, _0x4d1ad8) {
      if (typeof _0x53c1c7 !== "undefined") {
        return _0x53c1c7.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
      }
      return _0x14220d[_0x4d1ad8]?.["demoBalance"] || "10,000.00";
    }
    function _0x2c4add() {
      const _0x5e68ae = document.querySelector(".---react-features-Usermenu-Dropdown-styles-module__selectItemRadio--GFHcW:first-child");
      const _0x42fc59 = document.querySelector(".---react-features-Usermenu-Dropdown-styles-module__selectItemRadio--GFHcW:last-child");
      if (_0x5e68ae && _0x42fc59) {
        _0x5e68ae.classList.add("---react-features-Usermenu-Dropdown-styles-module__active--P5n2A");
        _0x42fc59.classList.remove("---react-features-Usermenu-Dropdown-styles-module__active--P5n2A");
        const _0x8eb2b9 = _0x5e68ae.querySelector('a');
        const _0x50a36e = _0x42fc59.querySelector('a');
        if (_0x8eb2b9 && _0x50a36e) {
          _0x8eb2b9.classList.add("active");
          _0x8eb2b9.setAttribute("aria-current", "page");
          _0x50a36e.classList.remove("active");
          _0x50a36e.removeAttribute("aria-current");
        }
      }
    }
    function _0x41dbe8(_0x7d8a45, _0x33dcea, _0x3a2453) {
      const _0x422987 = _0x5aeae5(_0x7dfcf1, _0x3a2453);
      const _0x23a9c3 = document.querySelector(".---react-features-Usermenu-Dropdown-styles-module__selectItemRadio--GFHcW:first-child .---react-features-Usermenu-Dropdown-styles-module__selectBalance--IfQIW");
      if (_0x23a9c3) {
        _0x23a9c3.textContent = _0x7d8a45;
      }
      const _0x3b1a9e = document.querySelector(".---react-features-Usermenu-Dropdown-styles-module__selectItemRadio--GFHcW:last-child .---react-features-Usermenu-Dropdown-styles-module__selectBalance--IfQIW");
      if (_0x3b1a9e) {
        _0x3b1a9e.textContent = '' + _0x33dcea + _0x422987;
      }
    }
    function _0x4fdb24(_0x5ce3ce, _0x2be115, _0x440bff) {
      if (_0x5ce3ce < _0x2be115) {
        return {
          'profit': _0x548c61 ? "+0% ربح" : _0x3250db ? "+0% লাভ" : _0x483d23 ? "+0% de lucro" : "+0% profit",
          'name': _0x548c61 ? "قياسي" : _0x3250db ? "স্ট্যান্ডার্ড" : _0x483d23 ? "Padrão" : "STANDARD",
          'iconClass': "standart"
        };
      } else {
        return _0x5ce3ce < _0x440bff ? {
          'profit': _0x548c61 ? "+2% ربح" : _0x3250db ? "+2% লাভ" : _0x483d23 ? "+2% de lucro" : "+2% profit",
          'name': _0x548c61 ? "محترف" : _0x3250db ? "প্রো" : _0x483d23 ? "Pró" : "PRO",
          'iconClass': "pro"
        } : {
          'profit': _0x548c61 ? "+4% ربح" : _0x3250db ? "+4% লাভ" : _0x483d23 ? "+4% de lucro" : "+4% profit",
          'name': _0x548c61 ? "كبار الشخصيات" : _0x3250db ? "ভিআইপি" : _0x483d23 ? "VIP" : "VIP",
          'iconClass': "vip"
        };
      }
    }
    function _0x49276f(_0x4656b5) {
      const _0x4b5821 = "<svg class=\"icon-profile-level-" + _0x4656b5 + "\">\n                   <use xlink:href=\"/profile/images/spritemap.svg#icon-profile-level-" + _0x4656b5 + "\"></use>\n                   </svg>";
      const _0x39445f = document.querySelectorAll("\n    .---react-features-Usermenu-styles-module__infoLevels--ePf8T,\n    .---react-features-Usermenu-Mobile-styles-module__infoLevels--i4mrD\n  ");
      _0x39445f.forEach(_0x5c29bf => {
        if (_0x5c29bf) {
          _0x5c29bf.innerHTML = _0x4b5821;
        }
      });
      const _0x4201e0 = document.querySelectorAll("\n    .---react-features-Usermenu-Dropdown-styles-module__levelIcon--lmj_k,\n    .---react-features-Usermenu-Mobile-Dropdown-styles-module__levelIcon--xY9fK\n  ");
      _0x4201e0.forEach(_0x4fb6d9 => {
        if (_0x4fb6d9) {
          _0x4fb6d9.innerHTML = _0x4b5821;
        }
      });
    }
    function _0x52b20d({
      name: _0x53581e,
      profit: _0x2a484c
    }) {
      const _0x1609f9 = document.querySelectorAll("\n    .---react-features-Usermenu-Dropdown-styles-module__levelName--wFviC,\n    .---react-features-Usermenu-Mobile-Dropdown-styles-module__levelName--pL2sD\n  ");
      _0x1609f9.forEach(_0x2ceada => {
        if (_0x2ceada) {
          _0x2ceada.textContent = _0x53581e + ':';
        }
      });
      const _0x39ce6f = document.querySelectorAll("\n    .---react-features-Usermenu-Dropdown-styles-module__levelProfit--UkDJi,\n    .---react-features-Usermenu-Mobile-Dropdown-styles-module__levelProfit--rT7vN\n  ");
      _0x39ce6f.forEach(_0x3c317c => {
        if (_0x3c317c) {
          _0x3c317c.textContent = _0x2a484c;
        }
      });
    }
    function _0x1fcf5a() {
      const _0x634549 = document.querySelector(".---react-features-Usermenu-styles-module__infoBalance--pVBHU, .---react-features-Usermenu-Mobile-styles-module__infoBalance--ti56_");
      if (!_0x634549) {
        return;
      }
      const _0x326790 = _0x634549.textContent;
      const _0x327f5d = _0x74c061(_0x326790);
      const {
        symbol: _0x19b0e9,
        pro: _0x20f67d,
        vip: _0x58055d
      } = _0x327f5d;
      const _0x372fa3 = parseFloat(_0x326790.replace(/[^0-9.]/g, ''));
      const _0x1732cf = _0x4fdb24(_0x372fa3, _0x20f67d, _0x58055d);
      _0x49276f(_0x1732cf.iconClass);
      _0x52b20d(_0x1732cf);
      _0x41dbe8(_0x326790, _0x19b0e9, _0x327f5d.code);
      _0x2c4add();
      _0xa30540();
    }
    function _0x3bc648() {
      document.addEventListener("click", function (_0x36a607) {
        const _0x58aa46 = _0x36a607.target.closest(".---react-features-Usermenu-Dropdown-styles-module__selectBalanceEdit--A1OEv");
        if (_0x58aa46) {
          const _0x18f6be = _0x58aa46.closest(".---react-features-Usermenu-Dropdown-styles-module__selectBalanceBlock--Uwiao");
          if (_0x18f6be) {
            const _0x392939 = _0x18f6be.querySelector(".---react-features-Usermenu-Dropdown-styles-module__selectBalance--IfQIW").textContent;
            const _0x201162 = _0x392939.replace(/[0-9.,]/g, '').trim();
            const _0x55fc6a = _0x392939.replace(/[^0-9.]/g, '');
            const _0x29ba6e = _0x18f6be.nextElementSibling;
            if (_0x29ba6e && _0x29ba6e.classList.contains("---react-features-Usermenu-Dropdown-styles-module__selectBalanceEditInput--QnsuX")) {
              const _0x278ec1 = _0x29ba6e.querySelector("input");
              if (_0x278ec1) {
                _0x278ec1.value = _0x55fc6a;
                _0x29ba6e.style.display = "block";
                const _0x530fa9 = _0x29ba6e.querySelector("button");
                if (_0x530fa9) {
                  _0x530fa9.onclick = function () {
                    const _0x59ae0a = parseFloat(_0x278ec1.value);
                    if (!isNaN(_0x59ae0a)) {
                      _0x53c1c7 = _0x59ae0a;
                      _0x18f6be.querySelector(".---react-features-Usermenu-Dropdown-styles-module__selectBalance--IfQIW").textContent = '' + _0x201162 + _0x59ae0a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ".00";
                    }
                    _0x29ba6e.style.display = "none";
                  };
                }
              }
            }
          }
        }
      });
    }
    class _0x59f601 {
      constructor() {
        this.refreshInterval = 100;
        this.intervalId = null;
        this.observer = null;
        this.initialize();
      }
      ["initialize"]() {
        this.setupMutationObserver();
        this.start();
        this.bindEvents();
        _0x3bc648();
      }
      ["setupMutationObserver"]() {
        this.observer = new MutationObserver(_0x4e3293 => {
          if (this.checkElementsExist()) {
            if (!this.intervalId) {
              this.start();
            }
          }
        });
        this.observer.observe(document.body, {
          'childList': true,
          'subtree': true,
          'attributes': false,
          'characterData': false
        });
      }
      ["checkElementsExist"]() {
        const _0x585a42 = [".---react-features-Usermenu-styles-module__infoBalance--pVBHU", ".---react-features-Usermenu-Dropdown-styles-module__selectBalance--IfQIW"];
        return _0x585a42.some(_0x149611 => document.querySelector(_0x149611));
      }
      ["bindEvents"]() {
        window.addEventListener("resize", _0x1fcf5a);
      }
      ["start"]() {
        _0x1fcf5a();
        this.intervalId = setInterval(_0x1fcf5a, this.refreshInterval);
      }
      ["stop"]() {
        if (this.intervalId) {
          clearInterval(this.intervalId);
          this.intervalId = null;
        }
      }
      ["destroy"]() {
        this.stop();
        if (this.observer) {
          this.observer.disconnect();
        }
        window.removeEventListener("resize", _0x1fcf5a);
      }
    }
    function _0x52bb10() {
      const _0x5485c7 = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      const _0x368492 = document.createElement("style");
      _0x368492.id = "ios-notification-fix";
      _0x368492.textContent = "\n    :fullscreen {\n      width: 100% !important;\n      height: 100% !important;\n      position: fixed !important;\n      top: 0 !important;\n      left: 0 !important;\n      overflow-y: scroll !important;\n      -webkit-overflow-scrolling: touch !important;\n    }\n    body.fullscreen-ios {\n      padding-top: constant(safe-area-inset-top) !important;\n      padding-top: env(safe-area-inset-top) !important;\n    }\n  ";
      function _0x4c87b9() {
        if (!document.fullscreenElement) {
          if (_0x5485c7) {
            document.head.appendChild(_0x368492);
            document.body.classList.add("fullscreen-ios");
            const _0x3c1046 = document.createElement("meta");
            _0x3c1046.name = "viewport";
            _0x3c1046.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover";
            document.head.appendChild(_0x3c1046);
          }
          document.documentElement.requestFullscreen().then(() => {
            if (_0x5485c7) {
              setTimeout(() => {
                window.scrollTo(0, 1);
              }, 300);
            }
          })["catch"](_0x9597e0 => {
            console.error("Fullscreen error:", _0x9597e0);
          });
        } else {
          document.exitFullscreen();
        }
      }
      document.addEventListener("fullscreenchange", function () {
        if (!document.fullscreenElement) {
          const _0x4ee689 = document.getElementById("ios-notification-fix");
          if (_0x4ee689) {
            _0x4ee689.remove();
          }
          document.body.classList.remove("fullscreen-ios");
          const _0x1bf359 = document.querySelector("meta[name=\"viewport\"][content*=\"viewport-fit=cover\"]");
          if (_0x1bf359) {
            _0x1bf359.remove();
          }
        }
      });
      const _0x1687cf = document.querySelector(".header__sidebar-button");
      if (_0x1687cf) {
        const _0x4cfadf = _0x1687cf.cloneNode(true);
        _0x1687cf.parentNode.replaceChild(_0x4cfadf, _0x1687cf);
        _0x4cfadf.addEventListener("click", function (_0x2eb22b) {
          _0x2eb22b.preventDefault();
          _0x2eb22b.stopImmediatePropagation();
          _0x4c87b9();
        }, true);
      }
      console.log("Fullscreen with visible notification bar activated!");
    }
    const _0x3c36de = new _0x59f601();
    _0x52bb10();
    document.addEventListener("DOMContentLoaded", function () {
      _0x1fcf5a();
    });
    window.balanceManager = _0x3c36de;
    setInterval(function () {
      var _0x16c40f = document.querySelector(".leader-board__body");
      if (_0x16c40f) {
        var _0x4de5d1 = document.querySelector(".position__loading");
        var _0x20fd4d = document.querySelector(".position__expand");
        let _0x3c5026 = document.querySelector(".---react-features-Usermenu-styles-module__infoBalance--pVBHU");
        if (!_0x3c5026) {
          return;
        }
        let _0x179e00 = _0x3c5026.innerText.replace(/[$,]/g, '');
        _0x179e00 = parseFloat(_0x179e00);
        let _0x2baa5f = _0x179e00 - _0x3319b2 / 100;
        let _0x397fb9 = _0x2baa5f < 0;
        let _0x1ae580 = Math.abs(_0x2baa5f).toFixed(2);
        let _0x133c42 = Math.abs(_0x2baa5f);
        let _0x4a672b = 100;
        if (_0x397fb9) {
          if (_0x133c42 <= 20) {
            _0x4a672b = 70;
          } else {
            if (_0x133c42 >= 2000) {
              _0x4a672b = 3;
            } else {
              if (_0x133c42 >= 1800) {
                _0x4a672b = 10;
              } else {
                if (_0x133c42 >= 1700) {
                  _0x4a672b = 15;
                } else {
                  if (_0x133c42 >= 1400) {
                    _0x4a672b = 20;
                  } else {
                    if (_0x133c42 >= 1000) {
                      _0x4a672b = 25;
                    } else {
                      if (_0x133c42 >= 700) {
                        _0x4a672b = 30;
                      } else {
                        if (_0x133c42 >= 500) {
                          _0x4a672b = 35;
                        } else {
                          if (_0x133c42 >= 400) {
                            _0x4a672b = 40;
                          } else {
                            if (_0x133c42 >= 300) {
                              _0x4a672b = 45;
                            } else {
                              if (_0x133c42 >= 200) {
                                _0x4a672b = 50;
                              } else {
                                if (_0x133c42 >= 100) {
                                  _0x4a672b = 55;
                                } else {
                                  if (_0x133c42 >= 50) {
                                    _0x4a672b = 60;
                                  } else {
                                    _0x4a672b = 70 - _0x133c42 / 20 * 2;
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        } else {
          if (_0x1ae580 <= 10) {
            _0x4a672b = 0;
          } else {
            if (_0x1ae580 <= 25) {
              _0x4a672b = 20;
            } else {
              if (_0x1ae580 <= 46) {
                _0x4a672b = 23;
              } else {
                if (_0x1ae580 <= 54) {
                  _0x4a672b = 25;
                } else {
                  if (_0x1ae580 <= 75) {
                    _0x4a672b = 28;
                  } else {
                    if (_0x1ae580 <= 94) {
                      _0x4a672b = 30;
                    } else {
                      if (_0x1ae580 <= 134) {
                        _0x4a672b = 33;
                      } else {
                        if (_0x1ae580 <= 166) {
                          _0x4a672b = 35;
                        } else {
                          if (_0x1ae580 <= 232) {
                            _0x4a672b = 38;
                          } else {
                            if (_0x1ae580 <= 296) {
                              _0x4a672b = 40;
                            } else {
                              if (_0x1ae580 <= 325) {
                                _0x4a672b = 43;
                              } else {
                                if (_0x1ae580 <= 346) {
                                  _0x4a672b = 45;
                                } else {
                                  if (_0x1ae580 <= 354) {
                                    _0x4a672b = 48;
                                  } else {
                                    if (_0x1ae580 <= 375) {
                                      _0x4a672b = 50;
                                    } else {
                                      if (_0x1ae580 <= 394) {
                                        _0x4a672b = 53;
                                      } else {
                                        if (_0x1ae580 <= 434) {
                                          _0x4a672b = 55;
                                        } else {
                                          if (_0x1ae580 <= 466) {
                                            _0x4a672b = 58;
                                          } else {
                                            if (_0x1ae580 <= 432) {
                                              _0x4a672b = 60;
                                            } else {
                                              if (_0x1ae580 <= 496) {
                                                _0x4a672b = 63;
                                              } else {
                                                if (_0x1ae580 <= 525) {
                                                  _0x4a672b = 65;
                                                } else {
                                                  if (_0x1ae580 <= 546) {
                                                    _0x4a672b = 68;
                                                  } else {
                                                    if (_0x1ae580 <= 554) {
                                                      _0x4a672b = 70;
                                                    } else {
                                                      if (_0x1ae580 <= 575) {
                                                        _0x4a672b = 73;
                                                      } else {
                                                        if (_0x1ae580 <= 594) {
                                                          _0x4a672b = 75;
                                                        } else {
                                                          if (_0x1ae580 <= 634) {
                                                            _0x4a672b = 78;
                                                          } else {
                                                            if (_0x1ae580 <= 666) {
                                                              _0x4a672b = 80;
                                                            } else {
                                                              if (_0x1ae580 <= 732) {
                                                                _0x4a672b = 83;
                                                              } else {
                                                                if (_0x1ae580 <= 796) {
                                                                  _0x4a672b = 85;
                                                                } else {
                                                                  if (_0x1ae580 <= 825) {
                                                                    _0x4a672b = 87;
                                                                  } else {
                                                                    if (_0x1ae580 <= 846) {
                                                                      _0x4a672b = 89;
                                                                    } else {
                                                                      if (_0x1ae580 <= 854) {
                                                                        _0x4a672b = 91;
                                                                      } else {
                                                                        if (_0x1ae580 <= 875) {
                                                                          _0x4a672b = 94;
                                                                        } else {
                                                                          if (_0x1ae580 <= 894) {
                                                                            _0x4a672b = 96;
                                                                          } else {
                                                                            if (_0x1ae580 <= 834) {
                                                                              _0x4a672b = 97;
                                                                            } else {
                                                                              if (_0x1ae580 <= 966) {
                                                                                _0x4a672b = 98;
                                                                              } else {
                                                                                if (_0x1ae580 <= 932) {
                                                                                  _0x4a672b = 99;
                                                                                } else {
                                                                                  if (_0x1ae580 <= 996) {
                                                                                    _0x4a672b = 100;
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (_0x20fd4d && _0x4de5d1) {
          _0x20fd4d.style.width = _0x4a672b + '%';
          _0x20fd4d.style.background = "#0faf59";
          _0x20fd4d.style.height = "2px";
          _0x4de5d1.style.background = "var(--color-black-15)";
          _0x4de5d1.style.borderRadius = "100px";
          _0x4de5d1.style.boxShadow = "20px 0 80px var(--color-black-15)";
          _0x4de5d1.style.height = "1px";
          _0x4de5d1.style.margin = "8px 0";
          _0x4de5d1.style.position = "relative";
          _0x4de5d1.style.width = "100%";
        }
        let _0x23c35a = document.querySelector(".position__header-money.--green");
        if (_0x23c35a) {
          let _0x196817 = new Intl.NumberFormat("en-US", {
            'style': "currency",
            'currency': "USD",
            'minimumFractionDigits': 0x2,
            'maximumFractionDigits': 0x2
          }).format(_0x1ae580);
          if (_0x397fb9) {
            _0x23c35a.style.color = "#ff6251";
            _0x23c35a.innerHTML = '-' + new Intl.NumberFormat("en-US", {
              'minimumFractionDigits': 0x2,
              'maximumFractionDigits': 0x2
            }).format(_0x1ae580) + '$';
          } else {
            _0x23c35a.style.color = "#0faf59";
            _0x23c35a.innerHTML = _0x196817;
          }
        }
        let _0x1b3de8 = -2000;
        let _0x5978d4 = 5000;
        let _0x2d04f7 = document.querySelectorAll(".leader-board__item");
        if (_0x2d04f7.length >= 20) {
          let _0x14895c = _0x2d04f7[19].querySelector(".leader-board__item-money.--green");
          if (_0x14895c) {
            _0x5978d4 = parseFloat(_0x14895c.innerText.replace(/[$,+]/g, ''));
          }
        }
        let _0x137aed;
        if (_0x2baa5f <= _0x1b3de8) {
          _0x137aed = _0x56e460;
        } else {
          if (_0x2baa5f >= _0x5978d4) {
            _0x137aed = 20;
          } else {
            if (_0x2baa5f >= 1) {
              let _0x536217 = (_0x2baa5f - 1) / (_0x5978d4 - 1);
              _0x137aed = Math.round(_0x89396b - _0x536217 * (_0x89396b - 20));
            } else {
              let _0x35c6dc = (_0x2baa5f - _0x1b3de8) / (1 - _0x1b3de8);
              _0x137aed = Math.round(_0x56e460 - _0x35c6dc * (_0x56e460 - _0x89396b));
            }
          }
        }
        let _0x5b3af4 = document.querySelector(".position__footer");
        if (_0x5b3af4 && _0x137aed > 20) {
          _0x5b3af4.innerHTML = "<div class=\"position__footer-title\">Your position:</div>" + _0x137aed;
        }
        if (_0x137aed <= 325) {
          let _0x4d079b = document.querySelector(".---react-features-Usermenu-styles-module__infoBalance--pVBHU").innerHTML;
          _0x4d079b = _0x4d079b.replaceAll(',', '').replaceAll('$', '').replaceAll('.', '');
          _0x4d079b = parseInt(_0x4d079b);
          _0x2baa5f = _0x4d079b - _0x3319b2;
          _0x2baa5f = _0x2baa5f.toString();
          if (_0x2baa5f == 0) {
            _0x2baa5f = "$0.00";
          } else {
            if (_0x2baa5f.length == 3) {
              let _0x1c3c9e = _0x2baa5f.slice(0, 1);
              let _0x1ffe6c = _0x2baa5f.slice(1, 3);
              _0x2baa5f = '$' + _0x1c3c9e + '.' + _0x1ffe6c;
            } else {
              if (_0x2baa5f.length == 4) {
                let _0x14931d = _0x2baa5f.slice(0, 2);
                let _0x1d2b65 = _0x2baa5f.slice(2, 4);
                _0x2baa5f = '$' + _0x14931d + '.' + _0x1d2b65;
              } else {
                if (_0x2baa5f.length == 5) {
                  let _0x21e4a6 = _0x2baa5f.slice(0, 3);
                  let _0x46f7be = _0x2baa5f.slice(3, 5);
                  _0x2baa5f = '$' + _0x21e4a6 + '.' + _0x46f7be;
                } else {
                  if (_0x2baa5f.length == 6) {
                    let _0x4e0271 = _0x2baa5f.slice(0, 1);
                    let _0x10f329 = _0x2baa5f.slice(1, 4);
                    let _0x5db567 = _0x2baa5f.slice(4, 6);
                    _0x2baa5f = '$' + _0x4e0271 + ',' + _0x10f329 + '.' + _0x5db567;
                  } else {
                    if (_0x2baa5f.length == 7) {
                      let _0x517c37 = _0x2baa5f.slice(0, 2);
                      let _0x32e416 = _0x2baa5f.slice(2, 5);
                      let _0x18b3df = _0x2baa5f.slice(5, 7);
                      _0x2baa5f = '$' + _0x517c37 + ',' + _0x32e416 + '.' + _0x18b3df;
                    }
                  }
                }
              }
            }
          }
          document.querySelector(".position__header-money.--green").innerHTML = _0x2baa5f;
          let _0x39095e = document.querySelectorAll(".leader-board__item-money.--green")[0].innerHTML;
          _0x39095e = _0x39095e.replaceAll(',', '').replaceAll('$', '').replaceAll('.', '').replaceAll('+', '');
          _0x39095e = parseInt(_0x39095e);
          let _0x255213 = document.querySelectorAll(".leader-board__item-money.--green")[1].innerHTML;
          _0x255213 = _0x255213.replaceAll(',', '').replaceAll('$', '').replaceAll('.', '').replaceAll('+', '');
          _0x255213 = parseInt(_0x255213);
          let _0x20b80c = document.querySelectorAll(".leader-board__item-money.--green")[2].innerHTML;
          _0x20b80c = _0x20b80c.replaceAll(',', '').replaceAll('$', '').replaceAll('.', '').replaceAll('+', '');
          _0x20b80c = parseInt(_0x20b80c);
          let _0x5ae3bf = document.querySelectorAll(".leader-board__item-money.--green")[3].innerHTML;
          _0x5ae3bf = _0x5ae3bf.replaceAll(',', '').replaceAll('$', '').replaceAll('.', '').replaceAll('+', '');
          _0x5ae3bf = parseInt(_0x5ae3bf);
          let _0x3ec32b = document.querySelectorAll(".leader-board__item-money.--green")[4].innerHTML;
          _0x3ec32b = _0x3ec32b.replaceAll(',', '').replaceAll('$', '').replaceAll('.', '').replaceAll('+', '');
          _0x3ec32b = parseInt(_0x3ec32b);
          let _0x3dae72 = document.querySelectorAll(".leader-board__item-money.--green")[5].innerHTML;
          _0x3dae72 = _0x3dae72.replaceAll(',', '').replaceAll('$', '').replaceAll('.', '').replaceAll('+', '');
          _0x3dae72 = parseInt(_0x3dae72);
          let _0x2290b8 = document.querySelectorAll(".leader-board__item-money.--green")[6].innerHTML;
          _0x2290b8 = _0x2290b8.replaceAll(',', '').replaceAll('$', '').replaceAll('.', '').replaceAll('+', '');
          _0x2290b8 = parseInt(_0x2290b8);
          let _0x233c10 = document.querySelectorAll(".leader-board__item-money.--green")[7].innerHTML;
          _0x233c10 = _0x233c10.replaceAll(',', '').replaceAll('$', '').replaceAll('.', '').replaceAll('+', '');
          _0x233c10 = parseInt(_0x233c10);
          let _0x1aa98a = document.querySelectorAll(".leader-board__item-money.--green")[8].innerHTML;
          _0x1aa98a = _0x1aa98a.replaceAll(',', '').replaceAll('$', '').replaceAll('.', '').replaceAll('+', '');
          _0x1aa98a = parseInt(_0x1aa98a);
          let _0x995552 = document.querySelectorAll(".leader-board__item-money.--green")[9].innerHTML;
          _0x995552 = _0x995552.replaceAll(',', '').replaceAll('$', '').replaceAll('.', '').replaceAll('+', '');
          _0x995552 = parseInt(_0x995552);
          let _0x44c528 = document.querySelectorAll(".leader-board__item-money.--green")[10].innerHTML;
          _0x44c528 = _0x44c528.replaceAll(',', '').replaceAll('$', '').replaceAll('.', '').replaceAll('+', '');
          _0x44c528 = parseInt(_0x44c528);
          let _0x308867 = document.querySelectorAll(".leader-board__item-money.--green")[11].innerHTML;
          _0x308867 = _0x308867.replaceAll(',', '').replaceAll('$', '').replaceAll('.', '').replaceAll('+', '');
          _0x308867 = parseInt(_0x308867);
          let _0x2c72d1 = document.querySelectorAll(".leader-board__item-money.--green")[12].innerHTML;
          _0x2c72d1 = _0x2c72d1.replaceAll(',', '').replaceAll('$', '').replaceAll('.', '').replaceAll('+', '');
          _0x2c72d1 = parseInt(_0x2c72d1);
          let _0x143d0f = document.querySelectorAll(".leader-board__item-money.--green")[13].innerHTML;
          _0x143d0f = _0x143d0f.replaceAll(',', '').replaceAll('$', '').replaceAll('.', '').replaceAll('+', '');
          _0x143d0f = parseInt(_0x143d0f);
          let _0x3dc09d = document.querySelectorAll(".leader-board__item-money.--green")[14].innerHTML;
          _0x3dc09d = _0x3dc09d.replaceAll(',', '').replaceAll('$', '').replaceAll('.', '').replaceAll('+', '');
          _0x3dc09d = parseInt(_0x3dc09d);
          let _0x345a76 = document.querySelectorAll(".leader-board__item-money.--green")[15].innerHTML;
          _0x345a76 = _0x345a76.replaceAll(',', '').replaceAll('$', '').replaceAll('.', '').replaceAll('+', '');
          _0x345a76 = parseInt(_0x345a76);
          let _0x318a7a = document.querySelectorAll(".leader-board__item-money.--green")[16].innerHTML;
          _0x318a7a = _0x318a7a.replaceAll(',', '').replaceAll('$', '').replaceAll('.', '').replaceAll('+', '');
          _0x318a7a = parseInt(_0x318a7a);
          let _0x271e1a = document.querySelectorAll(".leader-board__item-money.--green")[17].innerHTML;
          _0x271e1a = _0x271e1a.replaceAll(',', '').replaceAll('$', '').replaceAll('.', '').replaceAll('+', '');
          _0x271e1a = parseInt(_0x271e1a);
          let _0x47bdc0 = document.querySelectorAll(".leader-board__item-money.--green")[18].innerHTML;
          _0x47bdc0 = _0x47bdc0.replaceAll(',', '').replaceAll('$', '').replaceAll('.', '').replaceAll('+', '');
          _0x47bdc0 = parseInt(_0x47bdc0);
          let _0x44503f = document.querySelectorAll(".leader-board__item-money.--green")[19].innerHTML;
          _0x44503f = _0x44503f.replaceAll(',', '').replaceAll('$', '').replaceAll('.', '').replaceAll('+', '');
          _0x44503f = parseInt(_0x44503f);
          let _0x4e9f77 = _0x44503f - 10000;
          let _0x54bad2 = document.querySelector(".position__header-money.--green").innerHTML;
          _0x54bad2 = _0x54bad2.replaceAll(',', '').replaceAll('$', '').replaceAll('.', '').replaceAll('+', '');
          _0x54bad2 = parseInt(_0x54bad2);
          let _0x3d39fe;
          if (_0x54bad2 < _0x4e9f77) {
            let _0x5b787f = Math.round(_0x4e9f77 / 30000);
            _0x3d39fe = Math.round((32500 - _0x54bad2 / _0x5b787f) / 100);
            document.querySelector(".position__footer").innerHTML = "<div class=\"position__footer-title\">Your position:</div>" + _0x3d39fe;
          } else {
            if (_0x54bad2 > _0x255213) {
              document.querySelector(".position__footer").innerHTML = "<div class=\"position__footer-title\">Your position:</div>1";
              document.querySelectorAll(".leader-board__item")[0].innerHTML = "<div class=\"leader-board__item-wrapper\"></div><div class=\"leader-board__item-inform\"><div class=\"leader-board__item-key\"><img src=\"/profile/images/top-gold.svg\" alt=\"top-gold\"><div class=\"leader-board__item-key__place \">1</div></div><div class=\"leader-board__item-block\">" + _0x1e7849 + "<div class=\"leader-board__item-avatar\"><svg class=\"icon-avatar-default\"><use xlink:href=\"/profile/images/spritemap.svg#icon-avatar-default\"></use></svg></div></div><div class=\"leader-board__item-name\">" + _0x15fd81 + "</div></div><div class=\"leader-board__item-money --green\">" + _0x2baa5f + "</div>";
            } else {
              if (_0x54bad2 < _0x255213 && _0x54bad2 > _0x20b80c) {
                document.querySelector(".position__footer").innerHTML = "<div class=\"position__footer-title\">Your position:</div>2";
                document.querySelectorAll(".leader-board__item")[1].innerHTML = "<div class=\"leader-board__item-wrapper\"></div><div class=\"leader-board__item-inform\"><div class=\"leader-board__item-key\"><img src=\"/profile/images/top-serebro.svg\" alt=\"top-gold\"><div class=\"leader-board__item-key__place \">2</div></div><div class=\"leader-board__item-block\">" + _0x1e7849 + "<div class=\"leader-board__item-avatar\"><svg class=\"icon-avatar-default\"><use xlink:href=\"/profile/images/spritemap.svg#icon-avatar-default\"></use></svg></div></div><div class=\"leader-board__item-name\">" + _0x15fd81 + "</div></div><div class=\"leader-board__item-money --green\">" + _0x2baa5f + "</div>";
              } else {
                if (_0x54bad2 < _0x20b80c && _0x54bad2 > _0x5ae3bf) {
                  document.querySelector(".position__footer").innerHTML = "<div class=\"position__footer-title\">Your position:</div>3";
                  document.querySelectorAll(".leader-board__item")[2].innerHTML = "<div class=\"leader-board__item-wrapper\"></div><div class=\"leader-board__item-inform\"><div class=\"leader-board__item-key\"><img src=\"/profile/images/top-bronza.svg\" alt=\"top-gold\"><div class=\"leader-board__item-key__place \">3</div></div><div class=\"leader-board__item-block\">" + _0x1e7849 + "<div class=\"leader-board__item-avatar\"><svg class=\"icon-avatar-default\"><use xlink:href=\"/profile/images/spritemap.svg#icon-avatar-default\"></use></svg></div></div><div class=\"leader-board__item-name\">" + _0x15fd81 + "</div></div><div class=\"leader-board__item-money --green\">" + _0x2baa5f + "</div>";
                } else {
                  if (_0x54bad2 < _0x5ae3bf && _0x54bad2 > _0x3ec32b) {
                    document.querySelector(".position__footer").innerHTML = "<div class=\"position__footer-title\">Your position:</div>4";
                    document.querySelectorAll(".leader-board__item")[3].innerHTML = "<div class=\"leader-board__item-wrapper\"></div><div class=\"leader-board__item-inform\"><div class=\"leader-board__item-key\"><div class=\"leader-board__item-key__place  opacity\">4</div></div><div class=\"leader-board__item-block\">" + _0x1e7849 + "<div class=\"leader-board__item-avatar\"><svg class=\"icon-avatar-default\"><use xlink:href=\"/profile/images/spritemap.svg#icon-avatar-default\"></use></svg></div></div><div class=\"leader-board__item-name\">" + _0x15fd81 + "</div></div><div class=\"leader-board__item-money --green\">" + _0x2baa5f + "</div>";
                  } else {
                    if (_0x54bad2 < _0x3ec32b && _0x54bad2 > _0x3dae72) {
                      document.querySelector(".position__footer").innerHTML = "<div class=\"position__footer-title\">Your position:</div>5";
                      document.querySelectorAll(".leader-board__item")[4].innerHTML = "<div class=\"leader-board__item-wrapper\"></div><div class=\"leader-board__item-inform\"><div class=\"leader-board__item-key\"><div class=\"leader-board__item-key__place  opacity\">5</div></div><div class=\"leader-board__item-block\">" + _0x1e7849 + "<div class=\"leader-board__item-avatar\"><svg class=\"icon-avatar-default\"><use xlink:href=\"/profile/images/spritemap.svg#icon-avatar-default\"></use></svg></div></div><div class=\"leader-board__item-name\">" + _0x15fd81 + "</div></div><div class=\"leader-board__item-money --green\">" + _0x2baa5f + "</div>";
                    } else {
                      if (_0x54bad2 < _0x3dae72 && _0x54bad2 > _0x2290b8) {
                        document.querySelector(".position__footer").innerHTML = "<div class=\"position__footer-title\">Your position:</div>6";
                        document.querySelectorAll(".leader-board__item")[5].innerHTML = "<div class=\"leader-board__item-wrapper\"></div><div class=\"leader-board__item-inform\"><div class=\"leader-board__item-key\"><div class=\"leader-board__item-key__place  opacity\">6</div></div><div class=\"leader-board__item-block\">" + _0x1e7849 + "<div class=\"leader-board__item-avatar\"><svg class=\"icon-avatar-default\"><use xlink:href=\"/profile/images/spritemap.svg#icon-avatar-default\"></use></svg></div></div><div class=\"leader-board__item-name\">" + _0x15fd81 + "</div></div><div class=\"leader-board__item-money --green\">" + _0x2baa5f + "</div>";
                      } else {
                        if (_0x54bad2 < _0x2290b8 && _0x54bad2 > _0x233c10) {
                          document.querySelector(".position__footer").innerHTML = "<div class=\"position__footer-title\">Your position:</div>7";
                          document.querySelectorAll(".leader-board__item")[6].innerHTML = "<div class=\"leader-board__item-wrapper\"></div><div class=\"leader-board__item-inform\"><div class=\"leader-board__item-key\"><div class=\"leader-board__item-key__place  opacity\">7</div></div><div class=\"leader-board__item-block\">" + _0x1e7849 + "<div class=\"leader-board__item-avatar\"><svg class=\"icon-avatar-default\"><use xlink:href=\"/profile/images/spritemap.svg#icon-avatar-default\"></use></svg></div></div><div class=\"leader-board__item-name\">" + _0x15fd81 + "</div></div><div class=\"leader-board__item-money --green\">" + _0x2baa5f + "</div>";
                        } else {
                          if (_0x54bad2 < _0x233c10 && _0x54bad2 > _0x1aa98a) {
                            document.querySelector(".position__footer").innerHTML = "<div class=\"position__footer-title\">Your position:</div>8";
                            document.querySelectorAll(".leader-board__item")[7].innerHTML = "<div class=\"leader-board__item-wrapper\"></div><div class=\"leader-board__item-inform\"><div class=\"leader-board__item-key\"><div class=\"leader-board__item-key__place  opacity\">8</div></div><div class=\"leader-board__item-block\">" + _0x1e7849 + "<div class=\"leader-board__item-avatar\"><svg class=\"icon-avatar-default\"><use xlink:href=\"/profile/images/spritemap.svg#icon-avatar-default\"></use></svg></div></div><div class=\"leader-board__item-name\">" + _0x15fd81 + "</div></div><div class=\"leader-board__item-money --green\">" + _0x2baa5f + "</div>";
                          } else {
                            if (_0x54bad2 < _0x1aa98a && _0x54bad2 > _0x995552) {
                              document.querySelector(".position__footer").innerHTML = "<div class=\"position__footer-title\">Your position:</div>9";
                              document.querySelectorAll(".leader-board__item")[8].innerHTML = "<div class=\"leader-board__item-wrapper\"></div><div class=\"leader-board__item-inform\"><div class=\"leader-board__item-key\"><div class=\"leader-board__item-key__place  opacity\">9</div></div><div class=\"leader-board__item-block\">" + _0x1e7849 + "<div class=\"leader-board__item-avatar\"><svg class=\"icon-avatar-default\"><use xlink:href=\"/profile/images/spritemap.svg#icon-avatar-default\"></use></svg></div></div><div class=\"leader-board__item-name\">" + _0x15fd81 + "</div></div><div class=\"leader-board__item-money --green\">" + _0x2baa5f + "</div>";
                            } else {
                              if (_0x54bad2 < _0x995552 && _0x54bad2 > _0x44c528) {
                                document.querySelector(".position__footer").innerHTML = "<div class=\"position__footer-title\">Your position:</div>10";
                                document.querySelectorAll(".leader-board__item")[9].innerHTML = "<div class=\"leader-board__item-wrapper\"></div><div class=\"leader-board__item-inform\"><div class=\"leader-board__item-key\"><div class=\"leader-board__item-key__place  opacity\">10</div></div><div class=\"leader-board__item-block\">" + _0x1e7849 + "<div class=\"leader-board__item-avatar\"><svg class=\"icon-avatar-default\"><use xlink:href=\"/profile/images/spritemap.svg#icon-avatar-default\"></use></svg></div></div><div class=\"leader-board__item-name\">" + _0x15fd81 + "</div></div><div class=\"leader-board__item-money --green\">" + _0x2baa5f + "</div>";
                              } else {
                                if (_0x54bad2 < _0x44c528 && _0x54bad2 > _0x308867) {
                                  document.querySelector(".position__footer").innerHTML = "<div class=\"position__footer-title\">Your position:</div>11";
                                  document.querySelectorAll(".leader-board__item")[10].innerHTML = "<div class=\"leader-board__item-wrapper\"></div><div class=\"leader-board__item-inform\"><div class=\"leader-board__item-key\"><div class=\"leader-board__item-key__place  opacity\">11</div></div><div class=\"leader-board__item-block\">" + _0x1e7849 + "<div class=\"leader-board__item-avatar\"><svg class=\"icon-avatar-default\"><use xlink:href=\"/profile/images/spritemap.svg#icon-avatar-default\"></use></svg></div></div><div class=\"leader-board__item-name\">" + _0x15fd81 + "</div></div><div class=\"leader-board__item-money --green\">" + _0x2baa5f + "</div>";
                                } else {
                                  if (_0x54bad2 < _0x308867 && _0x54bad2 > _0x2c72d1) {
                                    document.querySelector(".position__footer").innerHTML = "<div class=\"position__footer-title\">Your position:</div>12";
                                    document.querySelectorAll(".leader-board__item")[11].innerHTML = "<div class=\"leader-board__item-wrapper\"></div><div class=\"leader-board__item-inform\"><div class=\"leader-board__item-key\"><div class=\"leader-board__item-key__place  opacity\">12</div></div><div class=\"leader-board__item-block\">" + _0x1e7849 + "<div class=\"leader-board__item-avatar\"><svg class=\"icon-avatar-default\"><use xlink:href=\"/profile/images/spritemap.svg#icon-avatar-default\"></use></svg></div></div><div class=\"leader-board__item-name\">" + _0x15fd81 + "</div></div><div class=\"leader-board__item-money --green\">" + _0x2baa5f + "</div>";
                                  } else {
                                    if (_0x54bad2 < _0x2c72d1 && _0x54bad2 > _0x143d0f) {
                                      document.querySelector(".position__footer").innerHTML = "<div class=\"position__footer-title\">Your position:</div>13";
                                      document.querySelectorAll(".leader-board__item")[12].innerHTML = "<div class=\"leader-board__item-wrapper\"></div><div class=\"leader-board__item-inform\"><div class=\"leader-board__item-key\"><div class=\"leader-board__item-key__place  opacity\">13</div></div><div class=\"leader-board__item-block\">" + _0x1e7849 + "<div class=\"leader-board__item-avatar\"><svg class=\"icon-avatar-default\"><use xlink:href=\"/profile/images/spritemap.svg#icon-avatar-default\"></use></svg></div></div><div class=\"leader-board__item-name\">" + _0x15fd81 + "</div></div><div class=\"leader-board__item-money --green\">" + _0x2baa5f + "</div>";
                                    } else {
                                      if (_0x54bad2 < _0x143d0f && _0x54bad2 > _0x3dc09d) {
                                        document.querySelector(".position__footer").innerHTML = "<div class=\"position__footer-title\">Your position:</div>14";
                                        document.querySelectorAll(".leader-board__item")[13].innerHTML = "<div class=\"leader-board__item-wrapper\"></div><div class=\"leader-board__item-inform\"><div class=\"leader-board__item-key\"><div class=\"leader-board__item-key__place  opacity\">14</div></div><div class=\"leader-board__item-block\">" + _0x1e7849 + "<div class=\"leader-board__item-avatar\"><svg class=\"icon-avatar-default\"><use xlink:href=\"/profile/images/spritemap.svg#icon-avatar-default\"></use></svg></div></div><div class=\"leader-board__item-name\">" + _0x15fd81 + "</div></div><div class=\"leader-board__item-money --green\">" + _0x2baa5f + "</div>";
                                      } else {
                                        if (_0x54bad2 < _0x3dc09d && _0x54bad2 > _0x345a76) {
                                          document.querySelector(".position__footer").innerHTML = "<div class=\"position__footer-title\">Your position:</div>15";
                                          document.querySelectorAll(".leader-board__item")[14].innerHTML = "<div class=\"leader-board__item-wrapper\"></div><div class=\"leader-board__item-inform\"><div class=\"leader-board__item-key\"><div class=\"leader-board__item-key__place  opacity\">15</div></div><div class=\"leader-board__item-block\">" + _0x1e7849 + "<div class=\"leader-board__item-avatar\"><svg class=\"icon-avatar-default\"><use xlink:href=\"/profile/images/spritemap.svg#icon-avatar-default\"></use></svg></div></div><div class=\"leader-board__item-name\">" + _0x15fd81 + "</div></div><div class=\"leader-board__item-money --green\">" + _0x2baa5f + "</div>";
                                        } else {
                                          if (_0x54bad2 < _0x345a76 && _0x54bad2 > _0x318a7a) {
                                            document.querySelector(".position__footer").innerHTML = "<div class=\"position__footer-title\">Your position:</div>16";
                                            document.querySelectorAll(".leader-board__item")[15].innerHTML = "<div class=\"leader-board__item-wrapper\"></div><div class=\"leader-board__item-inform\"><div class=\"leader-board__item-key\"><div class=\"leader-board__item-key__place  opacity\">16</div></div><div class=\"leader-board__item-block\">" + _0x1e7849 + "<div class=\"leader-board__item-avatar\"><svg class=\"icon-avatar-default\"><use xlink:href=\"/profile/images/spritemap.svg#icon-avatar-default\"></use></svg></div></div><div class=\"leader-board__item-name\">" + _0x15fd81 + "</div></div><div class=\"leader-board__item-money --green\">" + _0x2baa5f + "</div>";
                                          } else {
                                            if (_0x54bad2 < _0x318a7a && _0x54bad2 > _0x271e1a) {
                                              document.querySelector(".position__footer").innerHTML = "<div class=\"position__footer-title\">Your position:</div>17";
                                              document.querySelectorAll(".leader-board__item")[16].innerHTML = "<div class=\"leader-board__item-wrapper\"></div><div class=\"leader-board__item-inform\"><div class=\"leader-board__item-key\"><div class=\"leader-board__item-key__place  opacity\">17</div></div><div class=\"leader-board__item-block\">" + _0x1e7849 + "<div class=\"leader-board__item-avatar\"><svg class=\"icon-avatar-default\"><use xlink:href=\"/profile/images/spritemap.svg#icon-avatar-default\"></use></svg></div></div><div class=\"leader-board__item-name\">" + _0x15fd81 + "</div></div><div class=\"leader-board__item-money --green\">" + _0x2baa5f + "</div>";
                                            } else {
                                              if (_0x54bad2 < _0x271e1a && _0x54bad2 > _0x47bdc0) {
                                                document.querySelector(".position__footer").innerHTML = "<div class=\"position__footer-title\">Your position:</div>18";
                                                document.querySelectorAll(".leader-board__item")[17].innerHTML = "<div class=\"leader-board__item-wrapper\"></div><div class=\"leader-board__item-inform\"><div class=\"leader-board__item-key\"><div class=\"leader-board__item-key__place  opacity\">18</div></div><div class=\"leader-board__item-block\">" + _0x1e7849 + "<div class=\"leader-board__item-avatar\"><svg class=\"icon-avatar-default\"><use xlink:href=\"/profile/images/spritemap.svg#icon-avatar-default\"></use></svg></div></div><div class=\"leader-board__item-name\">" + _0x15fd81 + "</div></div><div class=\"leader-board__item-money --green\">" + _0x2baa5f + "</div>";
                                              } else {
                                                if (_0x54bad2 < _0x47bdc0 && _0x54bad2 > _0x44503f) {
                                                  document.querySelector(".position__footer").innerHTML = "<div class=\"position__footer-title\">Your position:</div>19";
                                                  document.querySelectorAll(".leader-board__item")[18].innerHTML = "<div class=\"leader-board__item-wrapper\"></div><div class=\"leader-board__item-inform\"><div class=\"leader-board__item-key\"><div class=\"leader-board__item-key__place  opacity\">19</div></div><div class=\"leader-board__item-block\">" + _0x1e7849 + "<div class=\"leader-board__item-avatar\"><svg class=\"icon-avatar-default\"><use xlink:href=\"/profile/images/spritemap.svg#icon-avatar-default\"></use></svg></div></div><div class=\"leader-board__item-name\">" + _0x15fd81 + "</div></div><div class=\"leader-board__item-money --green\">" + _0x2baa5f + "</div>";
                                                } else if (_0x54bad2 < _0x44503f && _0x54bad2 > _0x4e9f77) {
                                                  document.querySelector(".position__footer").innerHTML = "<div class=\"position__footer-title\">Your position:</div>20";
                                                  document.querySelectorAll(".leader-board__item")[19].innerHTML = "<div class=\"leader-board__item-wrapper\"></div><div class=\"leader-board__item-inform\"><div class=\"leader-board__item-key\"><div class=\"leader-board__item-key__place  opacity\">20</div></div><div class=\"leader-board__item-block\">" + _0x1e7849 + "<div class=\"leader-board__item-avatar\"><svg class=\"icon-avatar-default\"><use xlink:href=\"/profile/images/spritemap.svg#icon-avatar-default\"></use></svg></div></div><div class=\"leader-board__item-name\">" + _0x15fd81 + "</div></div><div class=\"leader-board__item-money --green\">" + _0x2baa5f + "</div>";
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }, 100);
  }
  const _0x3104eb = document.createElement("style");
  _0x3104eb.textContent = "\n    #settingsPopup {\n      position: fixed; \n      top: 50%; \n      left: 50%; \n      transform: translate(-50%, -50%) scale(0.85);\n      background: linear-gradient(135deg,rgb(255, 174, 0), #FFFAF0); \n      padding: 15px; \n      border-radius: 10px; \n      box-shadow: 0px 5px 15px rgba(0,0,0,0.2);\n      z-index: 1000; \n      width: 280px;\n      max-height: 90vh;\n      overflow: hidden;\n      text-align: center; \n      font-family: Arial, sans-serif;\n      font-size: 12px;\n      opacity: 0; \n      transition: all 0.3s ease-out;\n    }\n\n    #settingsPopup.show {\n      opacity: 1;\n      transform: translate(-50%, -50%) scale(0.85);\n    }\n\n    #settingsPopup.hide {\n      opacity: 0;\n      transform: translate(-50%, -50%) scale(0.85);\n    }\n\n    #settingsPopup h2 {\n      margin: 5px 0;\n      font-size: 16px;\n      color: #222;\n    }\n\n    #settingsPopup label {\n      display: block; \n      margin-bottom: 6px; \n      color: #444;\n      font-size: 11px;\n    }\n\n    #settingsPopup input, #settingsPopup select {\n      width: 100%; \n      padding: 6px; \n      margin-top: 3px; \n      border: 1px solid #ccc; \n      border-radius: 4px; \n      background: #fff;\n      font-size: 11px;\n      box-sizing: border-box;\n    }\n\n    #settingsPopup button {\n      background: #007bff; \n      color: white; \n      border: none; \n      padding: 7px 10px; \n      border-radius: 4px; \n      cursor: pointer; \n      margin: 4px 0;\n      font-size: 11px;\n      transition: 0.2s;\n    }\n\n    #settingsPopup button.close-btn {\n      background: #dc3545;\n    }\n\n    #settingsPopup button:disabled {\n      background: #6c757d;\n      cursor: not-allowed;\n    }\n\n    #licenseSection {\n      margin-top: 10px;\n      padding: 10px;\n      background: rgba(255,255,255,0.2);\n      border-radius: 6px;\n      transition: all 0.3s ease;\n    }\n\n    #licenseSection.hide {\n      opacity: 0;\n      height: 0;\n      padding: 0;\n      margin: 0;\n      overflow: hidden;\n    }\n\n    #demoBalanceSection {\n      margin-top: 10px;\n      padding: 10px;\n      background: rgba(255,255,255,0.2);\n      border-radius: 6px;\n      opacity: 0;\n      height: 0;\n      overflow: hidden;\n      transition: all 0.3s ease;\n    }\n\n        .message-popup {\n      position: fixed;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      background: rgba(0, 0, 0, 0.7);\n      color: #fff;\n      padding: 10px;\n      border-radius: 5px;\n      font-size: 14px;\n      font-family: Arial, sans-serif;\n      z-index: 1001;\n      opacity: 1;\n      transition: opacity 0.3s;\n    }\n\n    #demoBalanceSection.show {\n      opacity: 1;\n      height: auto;\n    }\n\n    #licenseInput, #demoBalanceInput {\n      width: 100%;\n      padding: 6px;\n      font-size: 11px;\n      border: 1px solid #ccc;\n      border-radius: 4px;\n      margin-bottom: 8px;\n    }\n\n    #verifyBtn, #setDemoBtn {\n      width: 100%;\n      padding: 7px 10px;\n      font-size: 11px;\n      margin-bottom: 10px;\n    }\n\n    #cheatCodeDisplay {\n      font-size: 10px;\n      padding: 6px;\n      margin-top: 8px;\n      line-height: 1.3;\n    }\n\n    .verified-badge, .unverified-badge {\n      font-size: 10px;\n      margin-top: 3px;\n    }\n\n    #demoBalanceStatus {\n      font-size: 10px;\n      margin-top: 5px;\n    }\n\n    /* দেশের ফ্ল্যাগ ড্রপডাউন কম্প্যাক্ট করুন */\n    #countryFlagSelect {\n      max-height: 80px;\n      overflow-y: auto;\n      font-size: 11px;\n    }\n\n    /* অপ্রয়োজনীয় স্পেস কমাতে */\n    #settingsPopup br {\n      display: none;\n    }\n";
  document.head.appendChild(_0x3104eb);
  await _0x7be47e();
})();