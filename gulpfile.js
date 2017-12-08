console.log("server starts in a bit..");
var gulp = require('gulp');
var dust = require('gulp-dust');
var express = require('express');

var fs = require('fs');
var bodyParser = require("body-parser");

console.log("express starting..");

var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');


//For session management
app.use(bodyParser.urlencoded({extended :false}));
app.use(cookieParser());

gulp.task('default', function () {
  
    app.use(bodyParser.json());
    app.use(session({
        secret : 'love pingu',
        resave : false , 
        saveUninitialized : true , 
        cookie : {secure : false}
    
    }));
    app.use('/', express.static('public'));
    app.use('/dust', express.static('publicdust'));

    app.get('/contactsList', function (request, response) {
        response.sendFile(__dirname + "/data/contactList.json");
    });
    app.get('/dust/contactsList', function (request, response) {
        response.sendFile(__dirname + "/data/contactList.json");
    });
    app.post('/addContact', function (request, response) {
        //response.sendFile(__dirname + "/data/contactList.json");
        //read the file and update it
        console.log("Add Contacts ---- incoming data=----->>" + JSON.stringify(request.body));
        fs.readFile(__dirname + "/data/contactList.json", 'utf-8', function (err, data) {
            //console.log('file data' + data);
            var fileJsonData = JSON.parse(data);
            var newContact = request.body;
            //
            var max = 0;
            for (var i = 0; i < fileJsonData.contactList.length; i++) {
                if (fileJsonData.contactList[i].id > max) {
                    max = fileJsonData.contactList[i].id;
                }
            }
            console.log("------->>" + newContact);
            newContact.id = parseInt(max) + 1;
            console.log(newContact);
            //
            /*newContact.id = fileJsonData.contactList.length + 1;*/
            console.log("newContact=" + JSON.stringify(newContact));
            fileJsonData.contactList.push(newContact);
            var stringFile = JSON.stringify(fileJsonData);
            fs.writeFile(__dirname + "/data/contactList.json", stringFile);
            //fs.close();
            response.send(stringFile);
        });
    });
    app.post('/deleteContact', function (request, response) {
        console.log("Delete Contact ---- incoming data=" + JSON.stringify(request.body));
        fs.readFile(__dirname + "/data/contactList.json", 'utf-8', function (err, data) {
            //console.log('file data' + data);
            var fileJsonData = JSON.parse(data);
            var deletedContact = request.body;
            var index = -1;
            for (var i = 0; i < fileJsonData.contactList.length; i++) {
                if (fileJsonData.contactList[i].id == deletedContact.id) {
                    index = i;
                }
            }
            console.log("index=" + index);
            if (index >= 0) {
                var newContactsList = fileJsonData.contactList.splice(index, 1);
                var stringFile = JSON.stringify(fileJsonData);
                console.log("after Delete=" + stringFile);
                fs.writeFile(__dirname + "/data/contactList.json", stringFile);
                response.send(stringFile);
            } else {
                response.send(JSON.stringify(fileJsonData));
            }
        });
    });
    app.get('/getContact', function (request, response) {
        var id = request.query.id;
        console.log("id=" + id);
        fs.readFile(__dirname + "/data/contactList.json", 'utf-8', function (err, data) {
            //console.log('file data' + data);
            var fileJsonData = JSON.parse(data);
            var foundContact = {};
            for (var i = 0; i < fileJsonData.contactList.length; i++) {
                if (fileJsonData.contactList[i].id == id) {
                    foundContact = fileJsonData.contactList[i];
                }
            }
            var stringFile = JSON.stringify(foundContact);
            response.send(stringFile);
        });
        return "success";
    });
    app.post('/searchContact', function (request, response) {
        //response.sendFile(__dirname + "/data/contactList.json");
        //read the file and update it
        return "success";
    });
    app.post('/updateContact', function (request, response) {
        console.log("Update Contact ---- incoming data=" + JSON.stringify(request.body));
        fs.readFile(__dirname + "/data/contactList.json", 'utf-8', function (err, data) {
            //console.log('file data' + data);
            var fileJsonData = JSON.parse(data);
            var updatedContact = request.body;
            for (var i = 0; i < fileJsonData.contactList.length; i++) {
                if (fileJsonData.contactList[i].id == updatedContact.id) {
                    fileJsonData.contactList[i] = updatedContact;
                    break;
                }
            }
            var stringFile = JSON.stringify(fileJsonData);
            fs.writeFile(__dirname + "/data/contactList.json", stringFile);
            //fs.close();
            response.send(stringFile);
        });
    });

    
    //Session Management
    app.get('/login',function(req,res){
        res.sendFile(__dirname+'/public/login.html');
    });
    
    app.post('/login',function(req,res){
        req.session.isLogged = true;
        req.session.username = req.body.uname;
        res.send(req.session.username);
    });
    
    app.get('/logout',function(req,res){
       req.session.destroy();
       res.redirect('/');
    });
    
    app.get('/products',function(req,res){
            if(!req.session.isLogged){
                res.redirect('/login');
            }
            res.send('<html><head></head><body><p>Welcome , '+req.session.username+'  to Products</p><a href="/logout">Logout</a></body></html>');
    });
    
    var server = app.listen(3000, function () {
        console.log("server started at port 3000");
    });
})