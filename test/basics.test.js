'use strict';

const should = require('chai').should();

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
})
