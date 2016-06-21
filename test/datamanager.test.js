
'use strict';

process.env['NOTES_APP'] = 'TEST'

var chai = require('chai')
// const should = require('chai').should();
var should = chai.should();
var chaiAsPromised = require('chai-as-promised');
var sinon = require('sinon')
var sinonChai = require('sinon-chai')

chai.use(chaiAsPromised);
chai.use(sinonChai)

var DataManager = require('../lib/datamanager');

var dm1, dm2, mockNotes, mockNote;

describe('Datamanager', function() {

	describe('instances', function() {
		before(function() {
			dm1 = DataManager.datamanager;
			dm2 = DataManager.datamanager;
			
			mockNotes = [{
				id: 1,
				content: 'Note one',
				fave: false
			}, {
				id: 2,
				content: 'Note two',
				fave: false
			}];
				
			mockNote = {id: 3, content: 'Note three', fave: false}
			dm1.clearAll()
		})


		it('should exist both', function() {
			should.exist(dm1);
			should.exist(dm2);
		})

		it('should be the same (singleton)', function() {
			dm1.should.be.deep.eq(dm2);
			dm1.should.be.eq(dm2);
		})

		it('shouldnt have diff content', function() {
			var n1 = {id: 1, content:'one'}, n2 = {id:2, content:'two'};
			var l1 = dm1.insert(n1), l2 = dm2.insert(n2);
			l1.should.be.eq(1);
			l2.should.be.eq(2);

			var r1 = dm1.select(), r2=dm2.select();
			r1.should.be.property('length');
			r1[0].should.be.eq(r2[0]);
			r1[0].id.should.be.eq(1);
			r2[0].id.should.be.eq(1);
		})
	})

	describe('Operations', function() {
		var dm, myStub;
		before(function() {
			dm = DataManager.DataManager('.notes.test.json');
		})

		it('should create/add a new note', function() {
			var promise = dm.create('This is a new creted note');
			promise.should.be.fulfilled;
			promise.should.eventually.be.a('number')
			return promise.should.eventually.be.eq(1)
		})

		it('should get all notes', function() {
			return dm.create('This is the second note')
				.then(function(resp) {
					var all = dm.getAll();
					should.exist(all);
					all.should.have.property('length')
					all.length.should.be.eq(2)
				})

		})

		it('should get one note by id', function() {
			var elem = dm.get(2);
			should.exist(elem)
			elem.should.have.property('id', 2)
			elem.should.have.property('fave', false)
		})

		it('should return not found when note is not found', function() {
			var elem = dm.get(5);
			should.exist(elem)
			elem.should.have.property('id', 5)
			elem.should.have.property('msg', 'Not found')
		})

		it('shouldnt get any fave notes', function() {
			var faves = dm.faves();
			faves.should.have.property('length', 0)
		})

		it('should mark a note as fave', function() {
			var elem = dm.setFave(2)
			elem.should.be.fulfilled;
			return elem.should.eventually.have.property('fave', true)
		})

		it('should return not found when no note found to fave', function() {
			var promise = dm.setFave(5)
			promise.should.be.fulfilled;
			return promise.should.eventually.have.property('msg', 'Not found')
		})

		it('should get all fave notes', function() {
			var faves = dm.faves();
			faves.should.have.property('length', 1)
			faves[0].should.have.property('id', 2)
			faves[0].should.have.property('content')
		})

		it ('should clear all', function() {
			var promise = dm.clearAll();
			promise.should.be.fulfilled;
			promise.should.eventually.have.property('res')
		})
	})

})