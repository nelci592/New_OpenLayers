/**
 * The module
 * @package run-php
 * @version 0.0.1
 */

if(typeof Proxy == 'undefined')
    throw new Error("`run-php` module need `Proxy` object to be exists. Please run your application with `--harmony-proxies` flag.");

var tmp   = require('tmp');
var fs    = require('fs');
var path  = require('path');
var child = require('child_process');

var objPHP;
var RunPHP;

var phpCLI = path.resolve(__dirname, 'php', 'run-php.php');

objPHP = {
    /**
     * List of options to send to PHP
     * @var object
     */
    options: {},
    
    /**
     * Last execution result
     * @var object
     */
    results: {},
    
    /**
     * User PHP Binary file
     * @var string
     */
    binaryFile: '/usr/bin/php',
    
    /**
     * Call PHP function within nodejs application. I believe i seen this before.
     * @param string fn The function name to call.
     */
    callFunction: function(fn){
        objPHP.options.function = fn;
        
        return function(){
            var args = [].slice.call(arguments);
            objPHP.options.args = args;
            
            return objPHP.run();
        }
    },
    
    /**
     * Add new `source` to config to be run oh PHP
     * @param string source The source to execute later.
     * @return object RunPHP
     */
    eval: function(source){
        objPHP.options.source = source;
        return RunPHP;
    },
    
    /**
     * Get printed string from last execution
     * @return string printed string from last execution
     */
    ob_get_contents: function(){
        return objPHP.results.printed;
    },
    
    /**
     * Finalize to configuration and just run the PHP
     */
    run: function(){
        objPHP.results = {};
        
        var tmpFile = tmp.fileSync();
        fs.writeSync(tmpFile.fd, JSON.stringify(objPHP.options));
        
        var cliOpts = {
                stdio: 'pipe'
            };
        
        if(objPHP.options.cwd)
            cliOpts.cwd = objPHP.options.cwd;
        
        objPHP.options = {};
        
        try{
            child.execFileSync(objPHP.binaryFile, ['-f'+phpCLI, tmpFile.name], cliOpts);
            var result = fs.readFileSync(tmpFile.name, 'utf8');
            objPHP.results = JSON.parse(result);
        }catch(e){
            objPHP.results = {
                printed: e.message
            }
        }
        
        return objPHP.results.returned;
    },
    
    /**
     * Add file to require later on script
     * @param string file The file name to require
     * @return object RunPHP
     */
    require: function(file){
        file = path.resolve(path.dirname(module.parent.id), file);
        if(!objPHP.options.requires)
            objPHP.options.requires = [];
        objPHP.options.requires.push(file);
        
        return RunPHP;
    },
    
    /**
     * Set PHP Binary file path
     * @param string file Absolute path to php binary file
     */
    setBinaryFile: function(file){
        // test if target file is exists
        try{
            var stats = fs.statSync(file);
        }catch(e){
            throw new Error("Target binary file not found");
        }
        
        // check if it's directory
        if(stats.isDirectory())
            throw new Error("Target binary file is directory");
        
        // check if it's not php binary file.
        var ver = child.execFileSync(file,['-v']);
        if(!/PHP/.test(ver.toString()))
            throw new Error("Target file is not php binary file");
        
        return (objPHP.binaryFile = file);
    }
};

RunPHP = Proxy.create({
    
    get: function(rcvr, prop){
        if(objPHP.hasOwnProperty(prop))
            return objPHP[prop];
        return objPHP.callFunction(prop);
    },
    
    set: function(rcvr, prop, value){
        if(prop == 'binaryFile')
            return objPHP.setBinaryFile(value);
        else
            return (objPHP[prop] = value);
    }
});

module.exports = RunPHP;