"use strict";

$.require([
    'base!controller/file.js',
    'base!controller/response.js',
    'bootstrap!/part/file.js',
    'bootstrap!/part/option.js'
], function(
    fileWrapper,
    responseWrapper,
    file,
    option
) {

    module.exports = function(self, m, req, res) {
        console.log(req.origin(), req.url(), req.method(), req.data(), (req.remote() || {}).ip);
        if (req.method().toLowerCase() == 'options') {
            option(m, req, res);
        } else {
            m.query().origin(req.origin()).route(req.url()).method(req.method()).run({
                remote: req.remote(),
                raw: req.rawData(),
                body: req.data(),
                method: req.method(),
                headers: req.headers(),
                url: req._custom.url
            }).then(function(response) {
                if ($.is.instance(response, fileWrapper)) {
                    response.setHeader(res);
                    file(self, response.getPath(), res);
                } else {
                    console.log(response, req.url());
                    if ($.is.instance(response, responseWrapper)) {
                        var meta = response.meta();
                        res.status(meta.status).set(meta.header)[meta.type](meta.data);
                    } else {
                        throw new Error('response from module query is not a instance of this.res() in controller');
                    }
                }
            }, function(response) {
                var e = (!$.is.instance(response, Error) && response.toString() != 'Error: no routes matched.');

                if ($.is.instance(response, responseWrapper)) {
                    var meta = response.meta();
                    res.status(meta.status).set(meta.header)[meta.type](meta.data);
                    return;
                }

                if (m.cdn('/' + req.url())) {
                    file(self, m.cdn('/' + req.url()), res);
                    return;
                }

                res.status(404).json('no route matched.');
            });
        }
    };
});