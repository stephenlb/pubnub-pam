// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Config and UUID
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var uuid   = require('uuid');
var config = require('./config');

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Counters
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var Counters = {
    success       : 0,
    err           : 0,
    unknown_err   : 0
};

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// PubNub
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var PUBNUB = require('pubnub')({
    secret_key    : config.secret_key,
    publish_key   : config.publish_key,
    subscribe_key : config.subscribe_key,
    ssl           : config.ssl
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Grant Access to a PubNub Channel
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function grant( channel, auth_key, retry ) {

    // ------------------------
    // Continue when Successful
    // ------------------------
    function proceed() {
        if (!QUEUE.length) return;
        grant.apply( {}, QUEUE.shift() );
    }

    // ------------------------
    // Retry on Failure
    // ------------------------
    function retry() {
        if (retry && retry > 4) return console.log("gave up");
        grant.apply( this, [ channel, auth_key, retry && ++retry || 1 ] );
    }

    // ------------------------
    // Produce a Grant
    // ------------------------
    PUBNUB.grant({
        channel   : channel,
        auth_key  : auth_key,
        ttl       : config.ttl,
        read      : true,
        write     : true,
        callback  : function(data) {
            Counters.success++;
            console.log(Counters);
            proceed();
        },
        error     : function(err) {
            if (err) Counters.err++;
            else     Counters.unknown_err++;

            console.log(Counters);
            console.log('err:', err);

            retry();
        }
    });

}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Queue of Grants
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var QUEUE = [];
for (var i=0;i<config.n;i++) QUEUE.push([uuid.v4(),uuid.v4(),uuid.v4()]);

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Start Granting
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
for (var i=0;i<config.c;i++) QUEUE.length && grant.apply({},QUEUE.shift());

