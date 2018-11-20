run-php
=======

Run PHP function/script with-in nodejs application. Please note that I never use
this script on production system. So far this project is used to test my php
application.

Please report any bug somewhere on the github page.

Installation
------------

    npm install run-php --save

Usage
-----

    var php = require('run-php');
    
    // set PHP Binary file
    php.binaryFile = '/usr/bin/php';
    
    // get output buffer
    var str = php.eval('echo "a"').ob_get_content();
    // str == 'a'
    
    // get returned function value
    var len = php.strlen('str');
    // len == 3
    
    // require user file and call user function
    var str = php.require('./file.php').myFunction('lorem');
    // str == 'lorem'
    // in `./file.php` file:
    //    <?php
    //    function myFunction($str){ return $str; }

Note
----

You've to run your application with `--harmony-proxies` to be able to use this module.
If you're not allowed to do so, please use [exec-php](https://www.npmjs.com/package/exec-php) instead.

    node --harmony-proxies app.js