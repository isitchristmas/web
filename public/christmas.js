var Christmas = {
  time: {
    month: 11,
    date: 25
  },

  isIt: function(countryCode, date) {
    if (!date) date = new Date();
    var isChristmas = (date.getMonth() == Christmas.time.month && date.getDate() == Christmas.time.date);
    
    if (isChristmas)
      return Christmas.yes(countryCode);
    else
      return Christmas.no(countryCode);
  },


  // This array is IsItChristmas' sole IP
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
    "VN": "ĐÚNG" // Vietnam
    }

    return codes[countryCode] || "YES";
  },

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
      "CN": "BÙ SHÌ", // China (Mandarin)
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
      "VN": "SAI" // Vietnam
    }

    return codes[countryCode] || "NO";
  }
};


// use this client-side and server-side

if (typeof(window) !== "undefined")
  window.Christmas = Christmas;

if (typeof(module) !== "undefined" && module.exports)
  module.exports = Christmas;