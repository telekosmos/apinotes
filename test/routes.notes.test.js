'use strict';

var request = require('supertest');
var agent = require('supertest').agent();
const app = require('../app');
const should = require('chai').should();

describe('Notes API routing', function() {

	const postNote = function(req, postParams, func) {
		req.post('/notes/create')
			.send(postParams)
			.expect(200)
			.expect(function(resp) {
				should.exist(resp);
				resp.should.be.an('object')
				resp.should.have.property('ok')
				resp.ok.should.be.true;
			})
			.end(func);
	}

	before(function(done) {
		request(app.listen())
			.post('/notes/clearall')
			.expect(200)
			.expect(function(resp) {
				should.exist(resp)
				resp.should.have.property('ok')
				resp.ok.should.be.true;
			})
			.end(done)
	})

	it('POST /notes/create creates a note', function (done) {
		var note1 = {content: 'This is only a test'};
		postNote(request(app.listen()), note1, done);
	})


	describe('Multiple notes', function() {
		before(function(done) {
			postNote(request(app.listen()), {content: '2nd note'}, done);
			// done();
		})

		it('GET /notes/ get all notes', function(done) {
			request(app.listen())
				.get('/notes')
				.expect(200)
				.expect(function(resp) {
					should.exist(resp);
					resp.body.should.have.property('length');
					resp.body.length.should.be.gt(1);
				})
				.end(done)
		})

		it('Get /notes/all get all notes', function(done) {
			request(app.listen())
				.get('/notes/all')
				.expect(200)
				.expect(function(resp) {
					should.exist(resp);
					resp.body.should.have.property('length');
					resp.body.length.should.be.gt(1);
				})
				.end(done)
		})

		it('GET /notes/:id get note by id', function(done) {
			request(app.listen())
				.get('/notes/1')
				.expect(200)
				.expect(function(resp) {
					should.exist(resp);
					resp.body.should.be.an('object')
					resp.body.should.have.property('id')
					resp.body.id.should.be.eq(1)
				})
				.end(done)
		})

		/*
		it('POST /fave/:id mark a note as fave', function(done) {
			done()
		})

		it('GET /faves get all favourite notes', function (done) {
			done()

		})
		*/
	})

})
