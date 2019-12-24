module.exports = function(io){
    var that={};

    const _io = io;
    that.getInit = function(){
        return _get = _io.register('get');
    }
    that.putInit = function(){
        return put = _io.register('put');
    }
    // everything attached to that will be exposed
    // more like making public member functions and properties.
    return that;
}
