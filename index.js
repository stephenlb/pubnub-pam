var log = require('debug')('pubnub:log');
var error = require('debug')('pubnub:err');
var PUBNUB = require('pubnub');
var uuid = require('uuid');
var when = require('when');
var config = require('./config');

var Counters = {
	success: 0,
	err: 0,
	unknown_err: 0
};

var grant = function(channel, auth_key, cipher_key) {
	return when.promise(function(resolve, reject) {
		var args = {
			secret_key: config.secret_key,
			publish_key: config.publish_key,
			subscribe_key: config.subscribe_key,
			auth_key: auth_key, /* this shouldn't matter, we are using a secret_key */
			ssl: config.ssl
		};
		if (config.use_cipher_key)
			args.cipher_key = cipher_key;
		PUBNUB(args).grant({
			channel: channel,
			auth_key: auth_key,
			ttl: config.ttl,
			read: true,
			write: true,
			callback: function(data) {
				log('success:', data);
				Counters.success++;
				resolve(data);
			},
			error: function(err) {
				error('err:', err);
				if (err) {
					Counters.err++;
					reject(new Error(err.message));
				} else {
					Counters.unknown_err++;
					reject(new Error('empty error'));
				}
			}
		});
	});
};

var arr = [];
for (var i = 0; i < config.n; i++) {
	arr.push(grant(uuid.v4(), uuid.v4(), uuid.v4()));
}

when.all(arr)
	.done(function(data) {
		console.log(Counters);
		process.exit(0);
	}, function(err) {
		console.log(Counters);
		process.exit(1);
	});