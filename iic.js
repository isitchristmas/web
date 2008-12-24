var christmas = {
  month: 11,
  date: 25
}

// Takes local timezone into account
function isItChristmas(countryCode) {
  var now = new Date();
  var isChristmas = (now.getMonth() == christmas.month && now.getDate() == christmas.date);
  
  if (isChristmas)
    return yes(countryCode);
  else
    return "NO";
}


// This array is IsItChristmas' sole IP
function yes(countryCode) {

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
    "KR": "NE", // Korea
    "CZ": "ANO", // Czech Republic
    "SK": "ÁNO", // Slovakia
    "GR": "NE", // Greece
    "IS": "JÁ", // Iceland
    "VE": "SÍ", // Venezuela
    "SI": "DA", // Slovenia
    "TH": "CHAI", // Thailand
    "LV": "JA", // Latvia
    "RU": "DA", // Russia
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
  }

  return codes[countryCode] || "YES";
}