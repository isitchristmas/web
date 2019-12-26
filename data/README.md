## GeoIP data for isitchristmas.com

This app uses the [`geoip-lite`](https://github.com/bluesmoon/node-geoip) library to process GeoIP2 CSV files into a binary `.dat` format, that is then read in directly by the app.

Unfortunately, the process of doing this is a little complicated.

1. Buy the paid GeoIP2 country CSV from Maxmind.
2. Download the free GeoLite2 city CSV from Maxmind. (Needed for parsing, not for looking up user city.)
3. Symlink the `data/` folder in this directory to be the local `data` folder inside `./node_modules/geoip-lite`, so that the results of the update script drop them here.
4. Update `geoip-lite`'s update script to use/download these CSVs during its update process.
5. Run the update script, which should create/update `geoip-city-name.dat`, `geoip-city.dat`, `geoip-city6.dat`, `geoip-country.dat`, and `geoip-country6.dat` inside the `/data` folder.

When the app is run, running `require('geoip-lite')` should use the `.dat` files to populate the database.


### Implementation notes

Example of database object to use in `updatedb.js`:

```javascript
var databases = [
  {
    type: 'country',
    url: 'http://localhost:5000/GeoIP2-Country-CSV_20191224.zip',
    src: [
      'GeoIP2-Country-Locations-en.csv',
      'GeoIP2-Country-Blocks-IPv4.csv',
      'GeoIP2-Country-Blocks-IPv6.csv'
    ],
    dest: [
      '',
      'geoip-country.dat',
      'geoip-country6.dat'
    ]
  },
  {
    type: 'city',
    url: 'http://localhost:5000/GeoLite2-City-CSV_20191224.zip',
    src: [
      'GeoLite2-City-Locations-en.csv',
      'GeoLite2-City-Blocks-IPv4.csv',
      'GeoLite2-City-Blocks-IPv6.csv'
    ],
    dest: [
      'geoip-city-names.dat',
      'geoip-city.dat',
      'geoip-city6.dat'
    ]
  }
];
```