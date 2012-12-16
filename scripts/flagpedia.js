#!/usr/bin/env node


var missing = [ 'AI', 'AW', 'BM', 'FO', 'GG', 'GI', 'GL', 'GP',
 'GU', 'HK', 'IM', 'IO', 'JE', 'KY', 'MO', 'MP', 'MQ', 'NC', 'PF', 
 'PM', 'PR', 'PS', 'RE', 'TC', 'VG', 'VI', 'AX', 'BL', 'BQ', 'BV',
  'CK', 'CW', 'FK', 'GF', 'HM', 'MF', 'MS', 'NF', 'NU', 'SH', 'TK',
 'UM', 'WF', 'YT', 'A1', 'A2', 'AS', 'AP', 'AQ', 'EU' ];

var missingNames = [ 'Anguilla', 'Aruba', 'Bermuda', 'Faroe Islands', 'Guernsey', 
  'Gibraltar', 'Greenland', 'Guadeloupe', 'Guam', 'Hong Kong', 'Isle of Man', 
  'British Indian Ocean Territory', 'Jersey', 'Cayman Islands', 'Macau',
  'Northern Mariana Islands', 'Martinique', 'New Caledonia', 'French Polynesia',
  'Saint Pierre and Miquelon', 'Puerto Rico', 'Palestinian Territory', 
  'Reunion', 'Turks and Caicos Islands', 'Virgin Islands, British', 
  'Virgin Islands, U.S.', 'Aland Islands', 'Saint Barthelemy', 
  'Bonaire, Saint Eustatius and Saba', 'Bouvet Island', 'Cook Islands', 
  'Curacao', 'Falkland Islands (Malvinas)', 'French Guiana',
  'Heard Island and McDonald Islands', 'Saint Martin', 'Montserrat', 
  'Norfolk Island', 'Niue', 'Saint Helena', 'Tokelau',
  'United States Minor Outlying Islands', 'Wallis and Futuna', 'Mayotte', 
  'Anonymous Proxy', 'Satellite Provider', 'American Samoa', 
  'Asia/Pacific Region', 'Antarctica', 'Europe' ]


var getCountry = function(code, size) {
  var flagUrl = url(code, size);
  var flagDest = destination(code, size);

  mkdest(code);

  var command = "wget " + flagUrl + " -O " + flagDest;
  
  var details = execSync(command, true);
  if (details.stderr && details.stderr.search("ERROR 404") > 0) {
    failed(code, size);
  } else
    console.log("[" + code + "][" + size + "] Downloaded");
};

execSync = require('exec-sync')
  , fs = require('fs');


var url = function(code, size) {
  return "http://flagpedia.net/data/flags/" + size + "/" + code.toLowerCase() + ".png";
}

var mkdest = function(code) {
  if (!fs.existsSync("flags"))
    fs.mkdirSync("flags");
  if (!fs.existsSync("flags/" + code))
    fs.mkdirSync("flags/" + code);
}

var failed = function(code, size) {
  console.log("[" + code + "][" + size + "] ERROR: 404");
  fs.unlinkSync(destination(code, size));
  fs.rmdir("flags/" + code);
  misses.push(code);
}

var destination = function(code, size) {
  return "flags/" + code + "/" + size + ".png";
}

var countries = {
  "AD": "Andorra",
  "AE": "United Arab Emirates",
  "AF": "Afghanistan",
  "AG": "Antigua and Barbuda",
  "AI": "Anguilla",
  "AL": "Albania",
  "AM": "Armenia",
  "AR": "Argentina",
  "AT": "Austria",
  "AU": "Australia",
  "AW": "Aruba",
  "AZ": "Azerbaijan",
  "BA": "Bosnia and Herzegovina",
  "BB": "Barbados",
  "BD": "Bangladesh",
  "BE": "Belgium",
  "BF": "Burkina Faso",
  "BG": "Bulgaria",
  "BH": "Bahrain",
  "BM": "Bermuda",
  "BN": "Brunei Darussalam",
  "BO": "Bolivia",
  "BR": "Brazil",
  "BS": "Bahamas",
  "BW": "Botswana",
  "BY": "Belarus",
  "BZ": "Belize",
  "CA": "Canada",
  "CD": "Congo (DRC)",
  "CH": "Switzerland",
  "CI": "Cote D'Ivoire (Ivory Coast)",
  "CL": "Chile",
  "CM": "Cameroon",
  "CN": "China",
  "CO": "Colombia",
  "CR": "Costa Rica",
  "CU": "Cuba",
  "CY": "Cyprus",
  "CZ": "Czech Republic",
  "DE": "Germany",
  "DK": "Denmark",
  "DM": "Dominica",
  "DO": "Dominican Republic",
  "DZ": "Algeria",
  "EC": "Ecuador",
  "EE": "Estonia",
  "EG": "Egypt",
  "ES": "Spain",
  "ET": "Ethiopia",
  "FI": "Finland",
  "FJ": "Fiji",
  "FO": "Faroe Islands",
  "FR": "France",
  "GA": "Gabon",
  "GB": "United Kingdom",
  "GD": "Grenada",
  "GE": "Georgia",
  "GG": "Guernsey",
  "GH": "Ghana",
  "GI": "Gibraltar",
  "GL": "Greenland",
  "GM": "Gambia",
  "GP": "Guadeloupe",
  "GR": "Greece",
  "GT": "Guatemala",
  "GU": "Guam",
  "GY": "Guyana",
  "HK": "Hong Kong",
  "HN": "Honduras",
  "HR": "Croatia",
  "HT": "Haiti",
  "HU": "Hungary",
  "ID": "Indonesia",
  "IE": "Ireland",
  "IL": "Israel",
  "IM": "Isle of Man",
  "IN": "India",
  "IO": "British Indian Ocean Territory",
  "IQ": "Iraq",
  "IR": "Iran",
  "IS": "Iceland",
  "IT": "Italy",
  "JE": "Jersey",
  "JM": "Jamaica",
  "JO": "Jordan",
  "JP": "Japan",
  "KE": "Kenya",
  "KG": "Kyrgyzstan",
  "KH": "Cambodia",
  "KN": "Saint Kitts and Nevis",
  "KR": "South Korea",
  "KW": "Kuwait",
  "KY": "Cayman Islands",
  "KZ": "Kazakhstan",
  "LA": "Laos",
  "LB": "Lebanon",
  "LI": "Liechtenstein",
  "LK": "Sri Lanka",
  "LS": "Lesotho",
  "LT": "Lithuania",
  "LU": "Luxembourg",
  "LV": "Latvia",
  "LY": "Libya",
  "MA": "Morocco",
  "MC": "Monaco",
  "MD": "Moldova, Republic of",
  "ME": "Montenegro",
  "MG": "Madagascar",
  "MK": "Macedonia",
  "ML": "Mali",
  "MM": "Myanmar",
  "MN": "Mongolia",
  "MO": "Macau",
  "MP": "Northern Mariana Islands",
  "MQ": "Martinique",
  "MT": "Malta",
  "MU": "Mauritius",
  "MV": "Maldives",
  "MW": "Malawi",
  "MX": "Mexico",
  "MY": "Malaysia",
  "NA": "Namibia",
  "NC": "New Caledonia",
  "NG": "Nigeria",
  "NI": "Nicaragua",
  "NL": "Netherlands",
  "NO": "Norway",
  "NP": "Nepal",
  "NZ": "New Zealand",
  "OM": "Oman",
  "PA": "Panama",
  "PE": "Peru",
  "PF": "French Polynesia",
  "PG": "Papua New Guinea",
  "PH": "Philippines",
  "PK": "Pakistan",
  "PL": "Poland",
  "PM": "Saint Pierre and Miquelon",
  "PR": "Puerto Rico",
  "PS": "Palestinian Territory",
  "PT": "Portugal",
  "PY": "Paraguay",
  "QA": "Qatar",
  "RE": "Reunion",
  "RO": "Romania",
  "RS": "Serbia",
  "RU": "Russian Federation",
  "RW": "Rwanda",
  "SA": "Saudi Arabia",
  "SC": "Seychelles",
  "SD": "Sudan",
  "SE": "Sweden",
  "SG": "Singapore",
  "SI": "Slovenia",
  "SK": "Slovakia",
  "SN": "Senegal",
  "SR": "Suriname",
  "ST": "Sao Tome and Principe",
  "SV": "El Salvador",
  "SY": "Syrian Arab Republic",
  "SZ": "Swaziland",
  "TC": "Turks and Caicos Islands",
  "TH": "Thailand",
  "TJ": "Tajikistan",
  "TN": "Tunisia",
  "TR": "Turkey",
  "TT": "Trinidad and Tobago",
  "TW": "Taiwan",
  "TZ": "Tanzania, United Republic of",
  "UA": "Ukraine",
  "UG": "Uganda",
  "US": "United States",
  "UY": "Uruguay",
  "UZ": "Uzbekistan",
  "VC": "Saint Vincent and the Grenadines",
  "VE": "Venezuela",
  "VG": "Virgin Islands, British",
  "VI": "Virgin Islands, U.S.",
  "VN": "Vietnam",
  "WS": "Samoa",
  "YE": "Yemen",
  "ZA": "South Africa",
  "ZM": "Zambia",
  "ZW": "Zimbabwe",
  "AO": "Angola",
  "AX": "Aland Islands",
  "BI": "Burundi",
  "BJ": "Benin",
  "BL": "Saint Barthelemy",
  "BQ": "Bonaire, Saint Eustatius and Saba",
  "BT": "Bhutan",
  "BV": "Bouvet Island",
  "CF": "Central African Republic",
  "CG": "Congo",
  "CK": "Cook Islands",
  "CV": "Cape Verde",
  "CW": "Curacao",
  "DJ": "Djibouti",
  "ER": "Eritrea",
  "FK": "Falkland Islands (Malvinas)",
  "FM": "Micronesia, Federated States of",
  "GF": "French Guiana",
  "GN": "Guinea",
  "GQ": "Equatorial Guinea",
  "GW": "Guinea-Bissau",
  "HM": "Heard Island and McDonald Islands",
  "KI": "Kiribati",
  "KM": "Comoros",
  "KP": "Korea, Democratic People's Republic of",
  "LC": "Saint Lucia",
  "LR": "Liberia",
  "MF": "Saint Martin",
  "MH": "Marshall Islands",
  "MR": "Mauritania",
  "MS": "Montserrat",
  "MZ": "Mozambique",
  "NE": "Niger",
  "NF": "Norfolk Island",
  "NR": "Nauru",
  "NU": "Niue",
  "PW": "Palau",
  "SB": "Solomon Islands",
  "SH": "Saint Helena",
  "SL": "Sierra Leone",
  "SM": "San Marino",
  "SO": "Somalia",
  "TD": "Chad",
  "TG": "Togo",
  "TK": "Tokelau",
  "TL": "Timor-Leste",
  "TM": "Turkmenistan",
  "TO": "Tonga",
  "TV": "Tuvalu",
  "UM": "United States Minor Outlying Islands",
  "VA": "Holy See (Vatican City State)",
  "VU": "Vanuatu",
  "WF": "Wallis and Futuna",
  "YT": "Mayotte",
  "A1": "Anonymous Proxy",
  "A2": "Satellite Provider",
  "AS": "American Samoa",
  "AP": "Asia/Pacific Region",
  "AQ": "Antarctica",
  "EU": "Europe"
}


var misses = [];

var sizes = function() {
  var output = {};
  for (country in countries) {
    console.log("[" + country + "] Processing...")
    output[country] = {name: countries[country]};

    var path = "countries/" + country + ".png";
    if (fs.existsSync(path)) {
      var results = execSync("identify " + path);
      var dims = results.match(/PNG (\d+x\d+)/)[1].split("x");
      output[country].width = parseInt(dims[0]);
      output[country].height = parseInt(dims[1]);
    }
  }

  var json = JSON.stringify(output, null, 2);
  fs.writeFileSync("countries.json", json, "utf8");
  console.log("Wrote.")
}

var main = function() {
  
  for (country in countries)
    getCountry(country, "ultra");

  console.log(misses.length + " misses:");
  console.log(misses);
}

//main();

sizes();