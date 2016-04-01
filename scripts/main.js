define([
        "jquery",
        "app",
        "router"
    ],
    function ($, App, router) {
        "use strict";

        $(function() {
            App.Router = router;
            App.start();

        });


    });