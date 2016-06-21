
'use strict';

const should = require('chai').should();
var DataManager = require('../lib/datamanager');

var dm1, dm2, mockNotes, mockNote;

describe('Datamanager', function() {

	describe('instances', function() {
		before(function() {
			dm1 = DataManager;
			dm2 = DataManager;
			
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
		})

		after(function() {
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
			l1.should.be.eq(1);

			var r1 = dm1.select(), r2=dm2.select();
			r1.should.be.property('length');
			r1[0].should.be.eq(r2[0]);
			r1[0].id.should.be.eq(1);
			r2[0].id.should.be.eq(1);
		})
	})
	
	it('should get all notes', function() {
		
	})
	
	it('should get one note by id', function() {
		
	})
	
	it('should create/add a new note', function() {
		
	})
	
	it('should mark a note as fave', function() {
		
	})
	
	it('should get all fave notes', function() {
		
	})
})