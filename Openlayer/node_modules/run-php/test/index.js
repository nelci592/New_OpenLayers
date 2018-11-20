var should = require('should');
var php = require('../index.js');
var path = require('path');

var phpBinaryFile = '/usr/local/php/bin/php'; // change it to your local php binary file abs~ path

describe('RUN-PHP', function(){
    
    php.binaryFile = phpBinaryFile;
    
    describe('PHP Binary', function(){
        
        it('should throw error if the binary file is not found', function(){
            (function(){
                php.binaryFile = '/usr/bin/not-found';
            }).should.throw(/not found/);
        });
        
        it('should throw error if the binary file is directory', function(){
            (function(){
                php.binaryFile = '/usr/bin';
            }).should.throw(/is directory/);
        });
        
        it('should throw error if the binary file is not php file', function(){
            (function(){
                php.binaryFile = '/usr/bin/ls';
            }).should.throw(/not php/);
        });
        
        it('should return the php file it self if it\'s correct', function(){
            
            ( php.binaryFile = phpBinaryFile ) .should.equal(phpBinaryFile);
        });
        
    });
    
    describe('PHP Build-in Function', function(){
        
        it('should be able to evaluate PHP script', function(){
            php.eval('return "a";').run().should.be.equal('a');
            
        });
        
        it('should be able to call php native function', function(){
            php.strlen('lorem').should.be.equal(5);
            
        });
        
        it('should print php error like `invalid function name` if php function to call not exists', function(){
            php.nonExistsFunction();
            php.ob_get_contents().should.match(/invalid function name/);
        });
        
        it('should print php error message like `syntax error` if php script error', function(){
            php.eval('return "a;').run();
            php.ob_get_contents().should.match(/syntax error/);
        });
    });
    
    describe('PHP File Requirer', function(){
        
        it('should be able to require my file that relative to this file', function(){
            php.require('./php/echo-abc.php').run();
            php.ob_get_contents().should.be.equal('abc');
        });
        
        it('should be allow user php file to require file that relative to it with cwd option', function(){
            php.options.cwd = path.resolve(__dirname, './php');
            php.require('./php/require-echo-abc.php').run();
            php.ob_get_contents().should.be.equal('abc');
        });
        
        it('should be able to call my custom function', function(){
            php.require('./php/my-function.php')
               .calculate(['a','b','c'], 2)
               .should.be.equal(5);
        });
        
        it('should be able to call my custom function ignore case', function(){
            php.require('./php/my-function.php')
               .CALCULATE(['a','b','c'], 2)
               .should.be.equal(5);
        });
        
        it('should be able to call my custom function ignore case 2', function(){
            php.require('./php/my-function.php')
               .Anothercalculate(['a','b','c'], 2)
               .should.be.equal(5);
        });
    });
});