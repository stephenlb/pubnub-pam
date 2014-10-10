// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Configuration
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = require('rc')( 'pubnub', {
    subscribe_key  : 'pam',
    publish_key    : 'pam',
    secret_key     : 'pam',
    ssl            : true,
    ttl            : 10,
    use_cipher_key : true,
    n              : 1000,
    c              : 10
} );
