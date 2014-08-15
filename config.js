module.exports = require('rc')('pubnub', {
	subscribe_key: '',
	publish_key: '',
	secret_key: '',
	ssl: true,
	ttl: 0,
	use_cipher_key: true,
	n: 100
});