/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
var app = express();

app.use(express.cookieParser());
app.use(express.session({secret:'Mtaas',duration:30*60*1000}));
// all environments
app.set('port', process.env.PORT || 3037);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development'  === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/addprojectdetails',user.addprojectdetails);

//COMMON FUNCTION
app.get('/logoutsession', user.logoutsession);
app.get('/checklogin', user.checklogin);
app.get('/countprojects', user.countprojects);
app.get('/index',user.index);
app.post('/email',user.email);
app.post('/assign',user.assign);
app.get('/adminlogin', user.adminlogin);
app.get('/adminhome', user.adminhome);
app.post('/adminsignin', user.adminsignin);
app.get('/adminusername', user.adminusername);
app.get('/statistics', user.statistics);
app.get('/aboutus',user.aboutus);
app.get('/contactus',user.contactus);
app.get('/terms',user.terms);

//DEVELOPERS
app.get('/login', user.login); //
app.post('/signin',user.signin);
app.get('/registerdeveloper',user.registerdeveloper);
app.get('/home', user.home);
app.get('/homeusername', user.homeusername);
app.get('/searchtesters', user.searchtesters);
app.get('/addproject', user.addproject);
app.get('/profileusername', user.profileusername);
app.get('/developermyprojects', user.developermyprojects);
app.get('/developerprofile', user.developerprofile);
app.get('/developerdashboard', user.developerdashboard);
app.get('/developerproject', user.developerproject);
app.get('/viewplans', user.viewplans);
app.get('/gettester', user.gettester);
app.get('/fetchtesters', user.fetchtesters);
app.get('/developerdefects', user.developerdefects);
app.get('/countdevelopers', user.countdevelopers);
app.get('/fecthdefectsdevelopers', user.fecthdefectsdevelopers);
app.post('/signupdeveloper',user.signupdeveloper);
app.get('/countprojectsprofiled', user.countprojectsprofiled);
app.get('/countprojectsdefect', user.countprojectsdefect);
app.get('/developertesters', user.developertesters);
app.post('/comment', user.comment);
app.get('/fetchdevelopercomments', user.fetchdevelopercomments);
app.get('/individualtesterdefect', user.individualtesterdefect);
app.post('/rate', user.rate);
app.get('/billing', user.billing);
app.get('/plandetails', user.plandetails);
app.get('/developerdashboarddefect', user.developerdashboarddefect);
app.get('/defectsperprojects', user.defectsperprojects);
app.get('/thankyou', user.thankyou);
app.get('/incentives', user.incentives);







//TESTERS
app.post('/testersignin',user.testersignin);
app.get('/testerlogin', user.testerlogin);
app.get('/registertester',user.registertester);
app.get('/testerhome', user.testerhome);
app.get('/testerhomeusername', user.testerhomeusername);
app.get('/testerproject', user.testerproject);
app.get('/testerprofile', user.testerprofile);
app.get('/testerdashboard', user.testerdashboard);
app.get('/searchproject', user.searchproject);
app.get('/fetchprojects', user.fetchprojects);
app.get('/testerprofileusername', user.testerprofileusername);
app.get('/testerdefects', user.testerdefects);
app.post('/raisedefect', user.raisedefect);
app.get('/fetchdefects', user.fetchdefects);
app.get('/counttesters', user.counttesters);
app.post('/signuptester',user.signuptester);
app.get('/countdefectsprofile', user.countdefectsprofile);
app.get('/fetchtestercomments', user.fetchtestercomments);
app.post('/commenttester', user.commenttester);
app.get('/countprojectsprofile', user.countprojectsprofile);
app.get('/projectdata', user.projectdata);
app.get('/paypal', user.paypal);
app.post('/paynow', user.paynow);
app.get('/testerrate', user.testerrate);




//app.get('/managerhome',user.managerhome);




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
