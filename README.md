# PubNub Access Manager

> Grant Access with PubNub and a variable Concurrency
> Warning do not set concurrency too high.
> Setting concurrency too high will cause your server
> to overloaded and throw errors.

This screen capture demos a reasonable concurrency
`node index.js -n 200 -c 20`.

![PubNub Access Manager High Concurrency Grants](http://pubnub.s3.amazonaws.com/assets/pam.gif)

Issue 100 requests with concurrency of 10:

    node index.js -n 100 -c 10

Do something *very bad* **"too much concurrency"**:

    node index.js -n 10000 -c 2000

Test many grants with reasonable concurrency:

    node index.js -n 10000 -c 20

## Command Line Options

 - `-subscribe_key 'pam'` - Subscribe Key
 - `-publish_key   'pam'` - Publish Key
 - `-secret_key    'pam'` - Secret Key
 - `-ssl true`            - SSL Mode
 - `-ttl 10`              - TTL in Minutes of Session Life
 - `-n 100`               - Number of Grants to Issue
 - `-c 10`                - Number of Concurrent Requests

