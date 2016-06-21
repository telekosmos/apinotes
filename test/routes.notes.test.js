'use strict';

process.env['NOTES_APP'] = 'TEST';

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


		it('GET /faves gets nothing', function(done) {
			request(app.listen())
				.get('/notes/faves')
				.expect(200)
				.expect(function(resp) {
					resp.body.should.have.property('length', 0)
				})
				.end(done)
		})

		it('POST /fave/:id mark a note as fave', function(done) {
			var postParams = {id: 1}
			request(app.listen())
				.post('/notes/fave')
				.send(postParams)
				.expect(200)
				.expect(function(resp) {
					should.exist(resp)
					resp.body.should.have.property('id', 1)
					resp.body.should.have.property('fave', true)
				})
				.end(done)
		})


		it('GET /faves get all favourite notes', function (done) {
			request(app.listen())
				.get('/notes/faves')
				.expect(200)
				.expect(function(resp) {
					resp.body.should.have.property('length', 1)
					resp.body[0].should.have.property('fave', true)
				})
				.end(done)

		})

	})

})
