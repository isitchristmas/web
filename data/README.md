Place a Maxmind (or other GeoIP-compatible database) here for country-level lookups.

This has been tested with the MaxMind `GeoIP Legacy Binary` format, which may be provided as a zipped `.dat` file.

Rename the `.dat` file to be `countries.dat`, and place it in this directory. `data/countries.dat` is in this project's `.gitignore`.

See [kuno/GeoIP](https://github.com/kuno/GeoIP) for more information.

Note: Until `kuno/GeoIP` supports newer versions of Node (6.x and up), the project uses a fork that maintains an (outstanding pull request) for Node 6.x support.

* Fork: https://github.com/dankang/GeoIP
* Fork backup: https://github.com/konklone/GeoIP
* branch: `feature/support_nodejs_6x`
