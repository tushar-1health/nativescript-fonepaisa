var Fonepaisa = require("nativescript-fonepaisa").Fonepaisa;
var fonepaisa = new Fonepaisa();

// TODO replace 'functionname' with an acual function name of your plugin class and run with 'npm test <platform>'
describe("functionname", function() {
  it("exists", function() {
    expect(fonepaisa.functionname).toBeDefined();
  });

  it("returns a promise", function() {
    expect(fonepaisa.functionname()).toEqual(jasmine.any(Promise));
  });
});