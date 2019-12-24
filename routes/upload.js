const fs = require('fs');
const IncomingForm = require('formidable').IncomingForm;
const shell = require('shelljs');

const d = new Date().getTime();
const y = new Date().getFullYear();
const m = new Date().getMonth();
//const path = 'c:/temp/upload/'+y+'/'+m+'/';
const path = '/var/www/upload/'+y+'/'+m+'/';
module.exports = function upload(req, res) {
    shell.mkdir('-p', path);
    var form = new IncomingForm();
    form.on('end', () => {
        res.json()
    });
    form.parse(req, (err, fields, files) => {
        var oldpath = files.file.path;
        //var newpath = 'c:/temp/upload/'+d+files.file.name;
        var newpath = path+files.file.name;
        //var newpath = './upload/' + files.file.name;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
        });
    });

};
