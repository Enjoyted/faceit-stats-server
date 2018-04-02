"use strict";

$.require([
    //
], function(
    //
) {

    module.exports = function(m, req, res) {
        if (!$.config.get('server.http.optionCheck')) {
            return (res.status(200).json({}));
        }

        var data = {}, found = 0, list = ['get', 'post', 'delete', 'put'], wait = [];
        for (var i in list) {
            wait.push((function(i) {
                return (m.query().origin(req.origin()).route(req.url()).method(list[i]).info(true).run().then(function(res) {
                    data[list[i]] = res;
                    found += 1;
                    return (true);
                }, function() {
                    return (true);
                }));
            })(i));
        }

        return ($.all(wait).then(function() {
            if (found == 0) {
                res.status(404).json({});
            } else {
                res.status(200).json(data);
            }
        }));
    };
});