'use strict';

const Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
const _find = require('lodash.find');

const _FILENAME = '.notes.json';

var DataManager = function(filename) {

	var current = [];
	var maxId = 0;
	var notesFile = filename || _FILENAME; 
	var tmpl = {
		id: 0,
		content: 'This is only a test',
		fave: false
	};

	(function initialize() {
		// TODO ver cómo va esto con atacar el api de cabeza
		fs.readFileAsync(notesFile, 'utf8')
			.then(function(resp) {
				console.log(`datamanager initialize: ${resp}`);
				current = JSON.parse(resp);
				maxId = current.length;
			})
			.catch(function(err) {
				// console.error(err);
				if (err.code === 'ENOENT') { // not file found
					// fs.writeFileAsync(_FILENAME, '', 'utf8')
					_writeData('')
				}
				if (err.code === 'EACCESS')
					throw err;
			})
	})()

	function _writeData(data) {
		return fs.writeFileAsync(notesFile, data, 'utf8')
	}

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
		// console.log('datamanager.create: '+JSON.stringify(newNote))
		var data = JSON.stringify(current.concat([newNote]));
		return _writeData(data)
			.then(function(err) {
				if (err)
					throw err;

				return current.push(newNote);
			})
	}

	var get = function(id) {
		var elem = _find(current, item => item.id == id);
		return !!elem? elem: {id: id, msg: 'Not found'}
	}

	var setFav = function(id) {
		var elem = _find(current, item => item.id == id)
		if (elem) {
			elem.fave = !elem.fave;
			return _writeData(JSON.stringify(current))
				.then(function(err) {
					if (err)
						throw err;

					return elem;
				})
		}
		else
			return Promise.resolve({id: id, msg: 'Not found'})
	}

	var faves = function() {
		return current.filter(item => item.fave == true)
	}
	
	var clearAll = function() {
		return _writeData('')
			.then(function(err) {
				if (err)
					throw err;

				current = [];
				maxId = 0;
				console.log('[datamanager.clearall] Cleared all notes!!!')
				return {res: true}
			})
	}

	return {
		insert: insert,
		select: select,
		create: create,
		getAll: getAll,
		faves: faves,
		get: get,
		setFave: setFav,

		clearAll: clearAll
	}
}

exports = {
	datamanager: DataManager(process.env.NOTES_APP == 'TEST'
		? '.notes.test.json'
		:_FILENAME),
	DataManager: DataManager
};

module.exports = exports;