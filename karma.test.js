describe("karma.test.js", function(){
    var n = '';
    afterEach(function(){
        console.log('测试' + n+'的结果：')
        n = ''
    })
    it("string",function(){
        expect("ABCD").toEqual(copy("ABCD"));
        expect(1).toEqual(copy(1));
        n = "string"
    });


})
