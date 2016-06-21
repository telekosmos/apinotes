'use strict';

var Promise = require('bluebird');

var chai = require('chai');
const should = chai.should();
var chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

describe('Very basics of mocha, chai', function() {
	it ('should assert basics', function() {
		let foo = 'bar'
			, beverages = { tea: [ 'chai', 'matcha', 'oolong' ] },
			verdad = true, num = 1;

		const longerThan3 = function(words) {
			return words.every(function(w) {
				return w.length > 3;
			});
		}

		should.exist(foo);
		should.exist(beverages);
		should.exist(verdad);
		verdad.should.be.true;
		foo.should.be.a('string');
		foo.should.equal('bar');
		foo.should.have.length(3);
		beverages.should.have.property('tea').with.length(3);
		beverages.tea.should.satisfy(longerThan3);
		num.should.be.a('number');
		num.should.be.gt(-1);
	})

	it('should work with promises', function() {
		var prom = Promise.resolve({op1: 2, op2: 2, res: 4});
		prom.should.be.fulfilled;
		prom.should.eventually.have.property('op1')
	})
})
