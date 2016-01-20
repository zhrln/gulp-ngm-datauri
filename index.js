/**
 * Created by zhangrui on 1/20/16.
 */
var fs = require('fs');
var path = require('path');
var util = require('util');
var PluginError = require('gulp-util').PluginError;
var through = require('through2');
var datauri = require('ngm-datauri');
var css = require('css');

// consts
var PLUGIN_NAME = 'gulp-ngm-datauri';

function process(ctn, file){
    var obj = css.parse(ctn);
    obj.stylesheet.rules.forEach(function(rule){
        rule.declarations.forEach(function(n){
            var regexp = new RegExp('url\\((.+)\\)');
            var url = (n.value.match(regexp) || [])[1];
            if(url){
                var filepath = path.join(file.base, url);
                if(fs.existsSync(filepath)){
                    n.value = n.value.replace(regexp, util.format("url(%s)", datauri.base64ImageSync(filepath)));
                }
            }
        });
    });
    return css.stringify(obj);
}

module.exports = function(options) {
    return through.obj(function(file, encoding, callback) {
        if(file.isNull()){
            return callback(null, file);
        }
        if(file.isStream()){
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
        }else if(file.isBuffer()){
            var data = Buffer.concat([file.contents]).toString();
            data = process(data, file);
            file.contents = new Buffer(data);
            return callback(null, file);
        }
    });
};