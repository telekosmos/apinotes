'use strict';

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

var _FILENAME = '.notes.json';

var DataManager = function() {

	var current = [];
	var maxId = 0;
	var tmpl = {
		id: 0,
		content: 'This is only a test',
		fave: false
	};

	(function initialize() {
		// TODO ver cómo va esto con atacar el api de cabeza
		console.log('Initializing Datamanager');
		fs.readFileAsync(_FILENAME, 'utf8')
			.then(function(resp) {
				console.log(`datamanager initialize: ${resp}`);
				current = JSON.parse(resp);
				maxId = current.length;
			})
			.catch(function(err) {
				// console.error(err);
				if (err.code === 'ENOENT') { // not file found
					fs.writeFileAsync(_FILENAME, '', 'utf8')
				}
				if (err.code === 'EACCESS')
					throw err;
			})
	})()

	var insert = function(note) {
		return current.push(note);		
	}
	
	var select = function() {
		return current;
	} 
	
	var getAll = function() {
		return current;
	}


	var create = function(text) {
		var newNote = Object.assign({}, tmpl, {id: ++maxId, content: text});
		console.log('datamanager.create: '+JSON.stringify(newNote))
		var data = JSON.stringify(current.concat([newNote]));
		return fs.writeFileAsync(_FILENAME, data, 'utf8')
			.then(function(err) {
				if (err)
					throw err;

				return current.push(newNote);
			})
	}

	var get = function(id) {

	}

	var setFav = function(id, what) {

	}

	var faves = function() {

	}
	
	var clearAll = function() {
		return fs.writeFileAsync(_FILENAME, '', 'utf8')
			.then(function(err) {
				if (err)
					throw err;

				current = [];
				maxId = 0;
			})
	}

	return {
		insert: insert,
		select: select,
		create: create,
		getAll: getAll,
		
		clearAll: clearAll
	}
}

exports = DataManager();
module.exports = exports;