'use strict';
/* jshint -W098, -W117 */

describe('Unit: Testing conf loading', function() {
    beforeEach(module('app'));

    beforeEach(function () {
        jasmine.getJSONFixtures().fixturesPath = 'http://localhost:9876/base/app/shared/res';
        var fixtures = loadJSONFixtures('conf.json');
        conf = fixtures['conf.json'];
    });

    describe('init conf loading', function() {
        it('should have value', function() {
            expect(conf.VALUE_TEST_KARMA).toBe(42);
        });

    });
});