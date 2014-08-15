pubnub-crash-test
=================

issue 10 requests:

    node index.js -n 10

with debug messages:

    DEBUG=* node index.js


## Cmd line options

* -subscribe_key ''
* -publish_key ''
* -secret_key ''
* -ssl true
* -ttl 0
* -use_cipher_key true
* -n 100

These can be also set in a .pubnubrc json file.
