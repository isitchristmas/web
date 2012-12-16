// high-performance modern Christmas detection technology

var Christmas = {
  time: {
    month: 11,
    date: 25
  },

  isIt: function(date) {
    if (!date) date = new Date();
    return (date.getMonth() == Christmas.time.month && date.getDate() == Christmas.time.date);
  },

  answer: function(countryCode, date) {
    if (Christmas.isIt(date))
      return Christmas.yes(countryCode);
    else
      return Christmas.no(countryCode);
  },


  // missing your country?
  // post a ticket here: https://github.com/isitchristmas/web/issues
  yes: function(countryCode) {

    var codes = {
      "US": "YES", // United States
      "FR": "OUI", // France
      "NL": "JA", // Netherlands
      "ZA": "JA", // South Africa
      "ES": "SÍ", // Spain
      "UK": "YES", // United Kingdom
      "CA": "YES/OUI", // Canada (English/French)
      "PL": "TAK", // Poland
      "SE": "JA", // Sweden
      "LT": "TAIP", // Lithuania
      "DE": "JA", // Germany
      "IE": "IS EA", // Ireland
      "AU": "YES", // Australia
      "JP": "HAI", // Japan
      "NO": "JA", // Norway
      "IT": "SÌ", // Italy
      "HU": "IGEN", // Hungary
      "DK": "JA", // Denmark
      "FI": "KYLLÄ", // Finland
      "BE": "JA", // Belgium
      "CL": "SÍ", // Chile
      "MX": "SÍ", // Mexico
      "NZ": "YES", // New Zealand
      "AT": "JA", // Austria
      "RO": "DA", // Romania
      "CH": "JA/OUI", // Switzerland (German/French)
      "PT": "SIM", // Portugal
      "BR": "SIM", // Brazil
      "AR": "SÍ", // Argentina
      "EE": "JAA", // Estonia
      "HR": "DA", // Croatia
      "CN": "SHI", // China (Mandarin)
      "IN": "HAJI", // India
      "SG": "YA", // Singapore
      "PH": "ÓO", // Phillipines
      "IL": "KEN", // Israel
      "KR": "YE", // Korea
      "CZ": "ANO", // Czech Republic
      "SK": "ÁNO", // Slovakia
      "GR": "NE", // Greece
      "IS": "JÁ", // Iceland
      "VE": "SÍ", // Venezuela
      "SI": "DA", // Slovenia
      "TH": "CHAI", // Thailand
      "LV": "JĀ", // Latvia
      "RU": "ДА", // Russia
      "HK": "HAI", // Hong Kong (Cantonese)
      "TR": "EVET", // Turkey
      "MY": "YA", // Malaysia
      "PR": "SÍ", // Puerto Rico
      "CO": "SÍ", // Colombia
      "EC": "SÍ", // Ecuador
      "PE": "SÍ", // Peru
      "CR": "SÍ", // Costa Rica
      "UY": "SÍ", // Uruguay
      "CY": "NE", // Cyprus
      "GT": "SÍ", // Guatemala
      "SV": "SÍ", // El Salvador
      "DO": "SÍ", // Dominican Republic
      "BM": "SIM", // Bermuda
      "PA": "SÍ", // Panama
      "BO": "SÍ", // Bolivia
      "TT": "SÍ", // Trinidad & Tobago
      "DM": "WÍ", // Dominica (Creole)
      "HT": "WÍ", // Haiti (Creole)
      "JM": "YES", // Jamaica
      "BB": "YES", // Barbado
      "BZ": "YES", // Belize
      "KY": "YES", // Cayman Islands
      "NI": "SÍ", // Nicaragua
      "PY": "HÊE", // Paraguay
      "VN": "ĐÚNG", // Vietnam
      "MM": "ဟုတ္တယ္။" // Myanmar (Burmese)
    }

    return codes[countryCode] || "YES";
  },

  // missing your country?
  // post a ticket here: https://github.com/isitchristmas/web/issues
  no: function(countryCode) {

    var codes = {
      "US": "NO", // United States
      "FR": "NON", // France
      "NL": "NEE", // Netherlands
      "ZA": "NEE", // South Africa
      "ES": "NO", // Spain
      "UK": "NO", // United Kingdom
      "CA": "NO/NON", // Canada (English/French)
      "PL": "NIE", // Poland
      "SE": "NEJ", // Sweden
      "LT": "NO", // Lithuania
      "DE": "NEIN", // Germany
      "IE": "NÍ HA", // Ireland
      "AU": "NO", // Australia
      "JP": "IIE", // Japan
      "NO": "NEI", // Norway
      "IT": "NO", // Italy
      "HU": "NEM", // Hungary
      "DK": "NEJ", // Denmark
      "FI": "EI", // Finland
      "BE": "NEE", // Belgium
      "CL": "NO", // Chile
      "MX": "NO", // Mexico
      "NZ": "NO", // New Zealand
      "AT": "NEIN", // Austria
      "RO": "NU", // Romania
      "CH": "NEIN/NON", // Switzerland (German/French)
      "PT": "NÃO", // Portugal
      "BR": "NÃO", // Brazil
      "AR": "NO", // Argentina
      "EE": "EI", // Estonia
      "HR": "NE", // Croatia
      "CN": "BÚ SHÌ", // China (Mandarin)
      "IN": "NAHIM", // India
      "SG": "TIDAK", // Singapore
      "PH": "HINDI", // Phillipines
      "IL": "LO", // Israel
      "KR": "ANIYO", // Korea
      "CZ": "NE", // Czech Republic
      "SK": "NIE", // Slovakia
      "GR": "OHI", // Greece
      "IS": "NEI", // Iceland
      "VE": "NO", // Venezuela
      "SI": "NE", // Slovenia
      "TH": "MAI CHAI", // Thailand
      "LV": "NĒ", // Latvia
      "RU": "НЕТ", // Russia
      "HK": "M̀H HAIH", // Hong Kong (Cantonese)
      "TR": "HAYIR", // Turkey
      "MY": "TIDAK", // Malaysia
      "PR": "NO", // Puerto Rico
      "CO": "NO", // Colombia
      "EC": "NO", // Ecuador
      "PE": "NO", // Peru
      "CR": "NO", // Costa Rica
      "UY": "NO", // Uruguay
      "CY": "OHI", // Cyprus
      "GT": "NO", // Guatemala
      "SV": "NO", // El Salvador
      "DO": "NO", // Dominican Republic
      "BM": "NÃO", // Bermuda
      "PA": "NO", // Panama
      "BO": "NO", // Bolivia
      "TT": "NO", // Trinidad & Tobago
      "DM": "NON", // Dominica (Creole)
      "HT": "NON", // Haiti (Creole)
      "JM": "NO", // Jamaica
      "BB": "NO", // Barbado
      "BZ": "NO", // Belize
      "KY": "NO", // Cayman Islands
      "NI": "NO", // Nicaragua
      "PY": "NO", // Paraguay
      "VN": "SAI", // Vietnam
      "MM": "မဟုတ္ဘူ။" // Myanmar (Burmese)
    }

    return codes[countryCode] || "NO";
  },

  countries: {
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
};


// use this client-side and server-side

if (typeof(window) !== "undefined")
  window.Christmas = Christmas;

if (typeof(module) !== "undefined" && module.exports)
  module.exports = Christmas;