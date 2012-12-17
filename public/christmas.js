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
    "AD": {
      "name": "Andorra",
      "width": 29,
      "height": 20
    },
    "AE": {
      "name": "United Arab Emirates",
      "width": 40,
      "height": 20
    },
    "AF": {
      "name": "Afghanistan",
      "width": 30,
      "height": 20
    },
    "AG": {
      "name": "Antigua and Barbuda",
      "width": 30,
      "height": 20
    },
    "AI": {
      "name": "Anguilla",
      "width": 40,
      "height": 20
    },
    "AL": {
      "name": "Albania",
      "width": 28,
      "height": 20
    },
    "AM": {
      "name": "Armenia",
      "width": 40,
      "height": 20
    },
    "AR": {
      "name": "Argentina",
      "width": 31,
      "height": 20
    },
    "AT": {
      "name": "Austria",
      "width": 30,
      "height": 20
    },
    "AU": {
      "name": "Australia",
      "width": 40,
      "height": 20
    },
    "AW": {
      "name": "Aruba"
    },
    "AZ": {
      "name": "Azerbaijan",
      "width": 40,
      "height": 20
    },
    "BA": {
      "name": "Bosnia and Herzegovina",
      "width": 40,
      "height": 20
    },
    "BB": {
      "name": "Barbados",
      "width": 30,
      "height": 20
    },
    "BD": {
      "name": "Bangladesh",
      "width": 33,
      "height": 20
    },
    "BE": {
      "name": "Belgium",
      "width": 23,
      "height": 20
    },
    "BF": {
      "name": "Burkina Faso",
      "width": 30,
      "height": 20
    },
    "BG": {
      "name": "Bulgaria",
      "width": 33,
      "height": 20
    },
    "BH": {
      "name": "Bahrain",
      "width": 33,
      "height": 20
    },
    "BM": {
      "name": "Bermuda",
      "width": 40,
      "height": 20
    },
    "BN": {
      "name": "Brunei Darussalam",
      "width": 40,
      "height": 20
    },
    "BO": {
      "name": "Bolivia",
      "width": 29,
      "height": 20
    },
    "BR": {
      "name": "Brazil",
      "width": 29,
      "height": 20
    },
    "BS": {
      "name": "Bahamas",
      "width": 40,
      "height": 20
    },
    "BW": {
      "name": "Botswana",
      "width": 30,
      "height": 20
    },
    "BY": {
      "name": "Belarus",
      "width": 40,
      "height": 20
    },
    "BZ": {
      "name": "Belize",
      "width": 30,
      "height": 20
    },
    "CA": {
      "name": "Canada",
      "width": 40,
      "height": 20
    },
    "CD": {
      "name": "Congo (DRC)",
      "width": 30,
      "height": 20
    },
    "CH": {
      "name": "Switzerland",
      "width": 20,
      "height": 20
    },
    "CI": {
      "name": "Cote D'Ivoire (Ivory Coast)",
      "width": 30,
      "height": 20
    },
    "CL": {
      "name": "Chile",
      "width": 30,
      "height": 20
    },
    "CM": {
      "name": "Cameroon",
      "width": 30,
      "height": 20
    },
    "CN": {
      "name": "China",
      "width": 30,
      "height": 20
    },
    "CO": {
      "name": "Colombia",
      "width": 30,
      "height": 20
    },
    "CR": {
      "name": "Costa Rica",
      "width": 33,
      "height": 20
    },
    "CU": {
      "name": "Cuba",
      "width": 40,
      "height": 20
    },
    "CY": {
      "name": "Cyprus",
      "width": 33,
      "height": 20
    },
    "CZ": {
      "name": "Czech Republic",
      "width": 30,
      "height": 20
    },
    "DE": {
      "name": "Germany",
      "width": 33,
      "height": 20
    },
    "DK": {
      "name": "Denmark",
      "width": 26,
      "height": 20
    },
    "DM": {
      "name": "Dominica",
      "width": 40,
      "height": 20
    },
    "DO": {
      "name": "Dominican Republic",
      "width": 32,
      "height": 20
    },
    "DZ": {
      "name": "Algeria",
      "width": 30,
      "height": 20
    },
    "EC": {
      "name": "Ecuador",
      "width": 40,
      "height": 20
    },
    "EE": {
      "name": "Estonia",
      "width": 31,
      "height": 20
    },
    "EG": {
      "name": "Egypt",
      "width": 30,
      "height": 20
    },
    "ES": {
      "name": "Spain",
      "width": 30,
      "height": 20
    },
    "ET": {
      "name": "Ethiopia",
      "width": 40,
      "height": 20
    },
    "FI": {
      "name": "Finland",
      "width": 33,
      "height": 20
    },
    "FJ": {
      "name": "Fiji",
      "width": 40,
      "height": 20
    },
    "FO": {
      "name": "Faroe Islands",
      "width": 27,
      "height": 20
    },
    "FR": {
      "name": "France",
      "width": 30,
      "height": 20
    },
    "GA": {
      "name": "Gabon",
      "width": 27,
      "height": 20
    },
    "GB": {
      "name": "United Kingdom",
      "width": 40,
      "height": 20
    },
    "GD": {
      "name": "Grenada",
      "width": 33,
      "height": 20
    },
    "GE": {
      "name": "Georgia",
      "width": 30,
      "height": 20
    },
    "GG": {
      "name": "Guernsey",
      "width": 30,
      "height": 20
    },
    "GH": {
      "name": "Ghana",
      "width": 30,
      "height": 20
    },
    "GI": {
      "name": "Gibraltar",
      "width": 40,
      "height": 20
    },
    "GL": {
      "name": "Greenland",
      "width": 30,
      "height": 20
    },
    "GM": {
      "name": "Gambia",
      "width": 30,
      "height": 20
    },
    "GP": {
      "name": "Guadeloupe",
      "width": 30,
      "height": 20
    },
    "GR": {
      "name": "Greece",
      "width": 30,
      "height": 20
    },
    "GT": {
      "name": "Guatemala",
      "width": 32,
      "height": 20
    },
    "GU": {
      "name": "Guam",
      "width": 37,
      "height": 20
    },
    "GY": {
      "name": "Guyana",
      "width": 33,
      "height": 20
    },
    "HK": {
      "name": "Hong Kong",
      "width": 30,
      "height": 20
    },
    "HN": {
      "name": "Honduras",
      "width": 40,
      "height": 20
    },
    "HR": {
      "name": "Croatia",
      "width": 40,
      "height": 20
    },
    "HT": {
      "name": "Haiti",
      "width": 33,
      "height": 20
    },
    "HU": {
      "name": "Hungary",
      "width": 40,
      "height": 20
    },
    "ID": {
      "name": "Indonesia",
      "width": 30,
      "height": 20
    },
    "IE": {
      "name": "Ireland",
      "width": 40,
      "height": 20
    },
    "IL": {
      "name": "Israel",
      "width": 28,
      "height": 20
    },
    "IM": {
      "name": "Isle of Man",
      "width": 40,
      "height": 20
    },
    "IN": {
      "name": "India",
      "width": 30,
      "height": 20
    },
    "IO": {
      "name": "British Indian Ocean Territory",
      "width": 40,
      "height": 20
    },
    "IQ": {
      "name": "Iraq",
      "width": 30,
      "height": 20
    },
    "IR": {
      "name": "Iran",
      "width": 35,
      "height": 20
    },
    "IS": {
      "name": "Iceland",
      "width": 28,
      "height": 20
    },
    "IT": {
      "name": "Italy",
      "width": 30,
      "height": 20
    },
    "JE": {
      "name": "Jersey",
      "width": 33,
      "height": 20
    },
    "JM": {
      "name": "Jamaica",
      "width": 40,
      "height": 20
    },
    "JO": {
      "name": "Jordan",
      "width": 40,
      "height": 20
    },
    "JP": {
      "name": "Japan",
      "width": 30,
      "height": 20
    },
    "KE": {
      "name": "Kenya",
      "width": 30,
      "height": 20
    },
    "KG": {
      "name": "Kyrgyzstan",
      "width": 33,
      "height": 20
    },
    "KH": {
      "name": "Cambodia",
      "width": 30,
      "height": 20
    },
    "KN": {
      "name": "Saint Kitts and Nevis",
      "width": 30,
      "height": 20
    },
    "KR": {
      "name": "South Korea",
      "width": 30,
      "height": 20
    },
    "KW": {
      "name": "Kuwait",
      "width": 40,
      "height": 20
    },
    "KY": {
      "name": "Cayman Islands",
      "width": 40,
      "height": 20
    },
    "KZ": {
      "name": "Kazakhstan",
      "width": 40,
      "height": 20
    },
    "LA": {
      "name": "Laos",
      "width": 30,
      "height": 20
    },
    "LB": {
      "name": "Lebanon",
      "width": 30,
      "height": 20
    },
    "LI": {
      "name": "Liechtenstein",
      "width": 33,
      "height": 20
    },
    "LK": {
      "name": "Sri Lanka",
      "width": 40,
      "height": 20
    },
    "LS": {
      "name": "Lesotho",
      "width": 30,
      "height": 20
    },
    "LT": {
      "name": "Lithuania",
      "width": 33,
      "height": 20
    },
    "LU": {
      "name": "Luxembourg",
      "width": 33,
      "height": 20
    },
    "LV": {
      "name": "Latvia",
      "width": 40,
      "height": 20
    },
    "LY": {
      "name": "Libya",
      "width": 40,
      "height": 20
    },
    "MA": {
      "name": "Morocco",
      "width": 30,
      "height": 20
    },
    "MC": {
      "name": "Monaco",
      "width": 25,
      "height": 20
    },
    "MD": {
      "name": "Moldova, Republic of",
      "width": 40,
      "height": 20
    },
    "ME": {
      "name": "Montenegro",
      "width": 40,
      "height": 20
    },
    "MG": {
      "name": "Madagascar",
      "width": 30,
      "height": 20
    },
    "MK": {
      "name": "Macedonia",
      "width": 40,
      "height": 20
    },
    "ML": {
      "name": "Mali",
      "width": 30,
      "height": 20
    },
    "MM": {
      "name": "Myanmar",
      "width": 36,
      "height": 20
    },
    "MN": {
      "name": "Mongolia",
      "width": 40,
      "height": 20
    },
    "MO": {
      "name": "Macau",
      "width": 30,
      "height": 20
    },
    "MP": {
      "name": "Northern Mariana Islands",
      "width": 40,
      "height": 20
    },
    "MQ": {
      "name": "Martinique",
      "width": 30,
      "height": 20
    },
    "MT": {
      "name": "Malta",
      "width": 30,
      "height": 20
    },
    "MU": {
      "name": "Mauritius",
      "width": 30,
      "height": 20
    },
    "MV": {
      "name": "Maldives",
      "width": 30,
      "height": 20
    },
    "MW": {
      "name": "Malawi",
      "width": 30,
      "height": 20
    },
    "MX": {
      "name": "Mexico",
      "width": 35,
      "height": 20
    },
    "MY": {
      "name": "Malaysia",
      "width": 40,
      "height": 20
    },
    "NA": {
      "name": "Namibia",
      "width": 30,
      "height": 20
    },
    "NC": {
      "name": "New Caledonia",
      "width": 40,
      "height": 20
    },
    "NG": {
      "name": "Nigeria",
      "width": 40,
      "height": 20
    },
    "NI": {
      "name": "Nicaragua",
      "width": 33,
      "height": 20
    },
    "NL": {
      "name": "Netherlands",
      "width": 30,
      "height": 20
    },
    "NO": {
      "name": "Norway",
      "width": 28,
      "height": 20
    },
    "NP": {
      "name": "Nepal",
      "width": 16,
      "height": 20
    },
    "NZ": {
      "name": "New Zealand",
      "width": 40,
      "height": 20
    },
    "OM": {
      "name": "Oman",
      "width": 40,
      "height": 20
    },
    "PA": {
      "name": "Panama",
      "width": 30,
      "height": 20
    },
    "PE": {
      "name": "Peru",
      "width": 30,
      "height": 20
    },
    "PF": {
      "name": "French Polynesia",
      "width": 30,
      "height": 20
    },
    "PG": {
      "name": "Papua New Guinea",
      "width": 27,
      "height": 20
    },
    "PH": {
      "name": "Philippines",
      "width": 40,
      "height": 20
    },
    "PK": {
      "name": "Pakistan",
      "width": 30,
      "height": 20
    },
    "PL": {
      "name": "Poland",
      "width": 32,
      "height": 20
    },
    "PM": {
      "name": "Saint Pierre and Miquelon",
      "width": 30,
      "height": 20
    },
    "PR": {
      "name": "Puerto Rico",
      "width": 30,
      "height": 20
    },
    "PS": {
      "name": "Palestinian Territory",
      "width": 40,
      "height": 20
    },
    "PT": {
      "name": "Portugal",
      "width": 30,
      "height": 20
    },
    "PY": {
      "name": "Paraguay",
      "width": 33,
      "height": 20
    },
    "QA": {
      "name": "Qatar",
      "width": 51,
      "height": 20
    },
    "RE": {
      "name": "Reunion",
      "width": 37,
      "height": 20
    },
    "RO": {
      "name": "Romania",
      "width": 30,
      "height": 20
    },
    "RS": {
      "name": "Serbia",
      "width": 30,
      "height": 20
    },
    "RU": {
      "name": "Russian Federation",
      "width": 30,
      "height": 20
    },
    "RW": {
      "name": "Rwanda",
      "width": 30,
      "height": 20
    },
    "SA": {
      "name": "Saudi Arabia",
      "width": 30,
      "height": 20
    },
    "SC": {
      "name": "Seychelles",
      "width": 40,
      "height": 20
    },
    "SD": {
      "name": "Sudan",
      "width": 40,
      "height": 20
    },
    "SE": {
      "name": "Sweden",
      "width": 32,
      "height": 20
    },
    "SG": {
      "name": "Singapore",
      "width": 30,
      "height": 20
    },
    "SI": {
      "name": "Slovenia",
      "width": 40,
      "height": 20
    },
    "SK": {
      "name": "Slovakia",
      "width": 30,
      "height": 20
    },
    "SN": {
      "name": "Senegal",
      "width": 30,
      "height": 20
    },
    "SR": {
      "name": "Suriname",
      "width": 30,
      "height": 20
    },
    "ST": {
      "name": "Sao Tome and Principe",
      "width": 40,
      "height": 20
    },
    "SV": {
      "name": "El Salvador",
      "width": 35,
      "height": 20
    },
    "SY": {
      "name": "Syrian Arab Republic",
      "width": 30,
      "height": 20
    },
    "SZ": {
      "name": "Swaziland",
      "width": 30,
      "height": 20
    },
    "TC": {
      "name": "Turks and Caicos Islands",
      "width": 40,
      "height": 20
    },
    "TH": {
      "name": "Thailand",
      "width": 30,
      "height": 20
    },
    "TJ": {
      "name": "Tajikistan",
      "width": 40,
      "height": 20
    },
    "TN": {
      "name": "Tunisia",
      "width": 30,
      "height": 20
    },
    "TR": {
      "name": "Turkey",
      "width": 30,
      "height": 20
    },
    "TT": {
      "name": "Trinidad and Tobago",
      "width": 33,
      "height": 20
    },
    "TW": {
      "name": "Taiwan",
      "width": 30,
      "height": 20
    },
    "TZ": {
      "name": "Tanzania, United Republic of",
      "width": 30,
      "height": 20
    },
    "UA": {
      "name": "Ukraine",
      "width": 30,
      "height": 20
    },
    "UG": {
      "name": "Uganda",
      "width": 30,
      "height": 20
    },
    "US": {
      "name": "United States",
      "width": 38,
      "height": 20
    },
    "UY": {
      "name": "Uruguay",
      "width": 30,
      "height": 20
    },
    "UZ": {
      "name": "Uzbekistan",
      "width": 40,
      "height": 20
    },
    "VC": {
      "name": "Saint Vincent and the Grenadines",
      "width": 30,
      "height": 20
    },
    "VE": {
      "name": "Venezuela",
      "width": 30,
      "height": 20
    },
    "VG": {
      "name": "Virgin Islands, British",
      "width": 40,
      "height": 20
    },
    "VI": {
      "name": "Virgin Islands, U.S.",
      "width": 30,
      "height": 20
    },
    "VN": {
      "name": "Vietnam",
      "width": 30,
      "height": 20
    },
    "WS": {
      "name": "Samoa",
      "width": 40,
      "height": 20
    },
    "YE": {
      "name": "Yemen",
      "width": 30,
      "height": 20
    },
    "ZA": {
      "name": "South Africa",
      "width": 30,
      "height": 20
    },
    "ZM": {
      "name": "Zambia",
      "width": 30,
      "height": 20
    },
    "ZW": {
      "name": "Zimbabwe",
      "width": 40,
      "height": 20
    },
    "AO": {
      "name": "Angola",
      "width": 30,
      "height": 20
    },
    "AX": {
      "name": "Aland Islands",
      "width": 31,
      "height": 20
    },
    "BI": {
      "name": "Burundi",
      "width": 33,
      "height": 20
    },
    "BJ": {
      "name": "Benin",
      "width": 30,
      "height": 20
    },
    "BL": {
      "name": "Saint Barthelemy",
      "width": 30,
      "height": 20
    },
    "BQ": {
      "name": "Bonaire, Saint Eustatius and Saba",
      "width": 30,
      "height": 20
    },
    "BT": {
      "name": "Bhutan",
      "width": 30,
      "height": 20
    },
    "BV": {
      "name": "Bouvet Island"
    },
    "CF": {
      "name": "Central African Republic",
      "width": 30,
      "height": 20
    },
    "CG": {
      "name": "Congo",
      "width": 30,
      "height": 20
    },
    "CK": {
      "name": "Cook Islands",
      "width": 40,
      "height": 20
    },
    "CV": {
      "name": "Cape Verde",
      "width": 34,
      "height": 20
    },
    "CW": {
      "name": "Curacao",
      "width": 30,
      "height": 20
    },
    "DJ": {
      "name": "Djibouti",
      "width": 30,
      "height": 20
    },
    "ER": {
      "name": "Eritrea",
      "width": 40,
      "height": 20
    },
    "FK": {
      "name": "Falkland Islands (Malvinas)",
      "width": 40,
      "height": 20
    },
    "FM": {
      "name": "Micronesia, Federated States of",
      "width": 38,
      "height": 20
    },
    "GF": {
      "name": "French Guiana",
      "width": 30,
      "height": 20
    },
    "GN": {
      "name": "Guinea",
      "width": 30,
      "height": 20
    },
    "GQ": {
      "name": "Equatorial Guinea",
      "width": 30,
      "height": 20
    },
    "GW": {
      "name": "Guinea-Bissau",
      "width": 40,
      "height": 20
    },
    "HM": {
      "name": "Heard Island and McDonald Islands"
    },
    "KI": {
      "name": "Kiribati",
      "width": 40,
      "height": 20
    },
    "KM": {
      "name": "Comoros",
      "width": 33,
      "height": 20
    },
    "KP": {
      "name": "Korea, Democratic People's Republic of",
      "width": 40,
      "height": 20
    },
    "LC": {
      "name": "Saint Lucia",
      "width": 40,
      "height": 20
    },
    "LR": {
      "name": "Liberia",
      "width": 38,
      "height": 20
    },
    "MF": {
      "name": "Saint Martin"
    },
    "MH": {
      "name": "Marshall Islands",
      "width": 38,
      "height": 20
    },
    "MR": {
      "name": "Mauritania",
      "width": 30,
      "height": 20
    },
    "MS": {
      "name": "Montserrat",
      "width": 40,
      "height": 20
    },
    "MZ": {
      "name": "Mozambique",
      "width": 30,
      "height": 20
    },
    "NE": {
      "name": "Niger",
      "width": 23,
      "height": 20
    },
    "NF": {
      "name": "Norfolk Island",
      "width": 40,
      "height": 20
    },
    "NR": {
      "name": "Nauru",
      "width": 40,
      "height": 20
    },
    "NU": {
      "name": "Niue",
      "width": 40,
      "height": 20
    },
    "PW": {
      "name": "Palau",
      "width": 32,
      "height": 20
    },
    "SB": {
      "name": "Solomon Islands",
      "width": 40,
      "height": 20
    },
    "SH": {
      "name": "Saint Helena",
      "width": 40,
      "height": 20
    },
    "SL": {
      "name": "Sierra Leone",
      "width": 30,
      "height": 20
    },
    "SM": {
      "name": "San Marino",
      "width": 27,
      "height": 20
    },
    "SO": {
      "name": "Somalia",
      "width": 30,
      "height": 20
    },
    "TD": {
      "name": "Chad",
      "width": 30,
      "height": 20
    },
    "TG": {
      "name": "Togo",
      "width": 32,
      "height": 20
    },
    "TK": {
      "name": "Tokelau",
      "width": 40,
      "height": 20
    },
    "TL": {
      "name": "Timor-Leste",
      "width": 40,
      "height": 20
    },
    "TM": {
      "name": "Turkmenistan",
      "width": 30,
      "height": 20
    },
    "TO": {
      "name": "Tonga",
      "width": 40,
      "height": 20
    },
    "TV": {
      "name": "Tuvalu",
      "width": 40,
      "height": 20
    },
    "UM": {
      "name": "United States Minor Outlying Islands"
    },
    "VA": {
      "name": "Holy See (Vatican City State)",
      "width": 20,
      "height": 20
    },
    "VU": {
      "name": "Vanuatu",
      "width": 33,
      "height": 20
    },
    "WF": {
      "name": "Wallis and Futuna",
      "width": 30,
      "height": 20
    },
    "YT": {
      "name": "Mayotte",
      "width": 30,
      "height": 20
    },
    "A1": {
      "name": "Anonymous Proxy"
    },
    "A2": {
      "name": "Satellite Provider"
    },
    "AS": {
      "name": "American Samoa",
      "width": 40,
      "height": 20
    },
    "AP": {
      "name": "Asia/Pacific Region"
    },
    "AQ": {
      "name": "Antarctica"
    },
    "EU": {
      "name": "Europe"
    },
    "EO": {
      "name": "Esperanto",
      "width": 30,
      "height": 20
    }
  }
};


// use this client-side and server-side

if (typeof(window) !== "undefined")
  window.Christmas = Christmas;

if (typeof(module) !== "undefined" && module.exports)
  module.exports = Christmas;