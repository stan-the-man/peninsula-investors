describe("Configuration setup", function() {
    it("should load local configurations", function(next) {
            var config = require('../config')();
            expect(config.mode).toBe('local');
            next();
        });
    it("should load staging configurations", function(next) {
            var config = require('../config')('staging');
            expect(config.mode).toBe('staging');
            next();
        });
    it("should load production configurations", function(next) {
            var config = require('../config')('prod');
            expect(config.mode).toBe('prod');
            next();
        });
});
