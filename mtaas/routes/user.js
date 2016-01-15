var mysql = require('./mysql');
var nodemailer = require('nodemailer');
/*
 * GET users listing.
 */
//var uname;
//LOGOUT FUNCTION
exports.logoutsession = function(req, res) {
	console.log("checking logout");
	req.session.destroy();
	res.send({
		"status" : 200
	});
};

//MAINTAINING SESSION LOGIN
exports.checklogin = function(req, res) {
	console.log("checking session");
	console.log(req.session.uname);
	if (req.session.uname) {
		console.log("session is" + req.session.uname);
		res.send({
			"status" : 200
		});
	} else {
		res.send({
			"status" : 300
		});
	}
};


//incentives
exports.incentives = function(req, res) {
	res.render('incentives');
};
//make payment
exports.paypal = function(req, res) {
	res.render('paypal');
};

//about us
exports.aboutus = function(req, res) {
	res.render('aboutus');
};
//contact us
exports.contactus = function(req, res){
	res.render('contactus');
};

//terms and conditions
exports.terms=function(req,res){
	res.render('terms');
};

//DEVELOPER===============================================================================================================
//=========================================================================================================================
// developer LOGIN PAGE
exports.signin = function(req, res) {

	console.log(req.param("name", "password"));
	var name = req.param("name");
	var password = req.param("password");

	var myquery = "Select * from developersignup where username1 = '"+name+"'and password1='"+password+"' ";
	
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results.length > 0) {
				req.session.uname = results[0].username1;
                req.session.ptype = results[0].projecttype1;
                req.session.pemail = results[0].email1;
                req.session.pdid = results[0].developer_id;
                
                
				console.log("success");
				res.render('home');
			} else {
				console.log("Invalid User Name & Password");
				res.send({
					"status" : 100
				});
			}

		}

	}, myquery);
};
//developer signup
exports.signupdeveloper = function(req, res) {
	console.log(req.param("firstname1", "lastname1", "email1",
			"username1", "password1","cpassword1",
			"sex1", "projecttype1", "cardtype1", "cardnumber1", "cardholdername1"));
	var firstname1 = req.param("firstname1");
	var lastname1 = req.param("lastname1");
	var email1	 = req.param("email1");
	var username1 = req.param("username1");
	var password1 = req.param("password1");
	var cpassword1 = req.param("cpassword1");
	var sex1 = req.param("sex1");
	var projecttype1 = req.param("projecttype1");
	var cardtype1 = req.param("cardtype1");
	var cardnumber1 = req.param("cardnumber1");
	var cardholdername1 = req.param("cardholdername1");
	
	var myquery = "insert into developersignup (firstname1, lastname1,email1,username1,password1,cpassword1,sex1,projecttype1,cardtype1,cardnumber1,cardholdername1) values ('" + firstname1 + "','" + lastname1 + "','" + email1 + "','" + username1 + "','"+password1+"','" + cpassword1 + "','" + sex1 + "','" + projecttype1 + "','" + cardtype1 + "','" + cardnumber1 + "','" + cardholdername1 + "')";	
	mysql
			.fetchData(
					function(err, results) {
						if (err) {
							throw err;
						} 
						else {
							console	.log("Entry successfully made in developersignup table");
							res.render('index');
						}
					}, myquery);
};


/////////paymenttttttttttttttttttttttttttttttttttttttttt
exports.paynow = function(req, res) {
	console.log(req.param("amount", "currency", "description"));
	var amount = req.param("amount");
	var currency = req.param("currency");
	var description	 = req.param("description");
	
	var myquery = "insert into payment (payername, amount,currency,description) values ('" + req.session.uname + "','" + amount + "','" + currency + "','" + description + "')";	
	mysql
			.fetchData(
					function(err, results) {
						if (err) {
							throw err;
						} 
						else {
							console	.log("Entry successfully made in payment table");
							res.render('thankyou');
						}
					}, myquery);
};



//DEVELOER PROFILE PAGE DETAILS FETCHED////////////////////////////////////////////////
exports.profileusername = function(req, res){
	   console.log(req.session.uname);
	   var myquery = "select * from developersignup where username1 = '"+req.session.uname+"'";
	   mysql.fetchData(function(err, results) {
			if (err) {
				throw err;
			} else {
				console.log(results);
				var jsonstr=JSON.stringify(results);
				console.log(jsonstr);
				console.log("Entry successfully fethced and displayed on PROFILE GUI");
				//res.send(JSON.stringify(results));
					res.send({"result":jsonstr});
			}
		}, myquery);

	};
	//develoer my projects individual///////////////////////////////////////////////////////
	exports.developermyprojects = function(req, res){
		   console.log(req.session.uname);
		   var myquery = "select * from projectdetails where d_username = '"+req.session.uname+"'";
		   mysql.fetchData(function(err, results) {
				if (err) {
					throw err;
				} else {
					console.log(results);
					var jsonstr=JSON.stringify(results);
					console.log(jsonstr);
					console.log("Entry successfully fethced and displayed on myprojects GUI");
					//res.send(JSON.stringify(results));
						res.send({"result":jsonstr});
				}
			}, myquery);

		};

//FECTH DEVELOPER NAME ON HOM EPAGE		///////////////////////////////////////////////////////////
		   exports.homeusername = function(req, res){
			   console.log(req.session.uname);
			   var myquery = "select * from developersignup where username1 = '"+req.session.uname+"'";
			   mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {
						console.log(results);
						var jsonstr=JSON.stringify(results);
						console.log(jsonstr);
						console.log("Entry successfully fethced and displayed on GUI & billing");
						//res.send(JSON.stringify(results));
							res.send({"result":jsonstr});
					}
				}, myquery);

			};
//plan charges on billingg page	///////////////////////////////////////////////////////////
		   exports.plandetails = function(req, res){
			   console.log(req.session.uname);
			   var myquery = "select * from projectdetails d, services s where d.d_username = '"+req.session.uname+"' and d.plan=s.servicename ";
			   mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {
						console.log(results);
						var jsonstr=JSON.stringify(results);
						console.log(jsonstr);
						console.log("Entry successfully fethced and displayed on GUI & billing");
						//res.send(JSON.stringify(results));
							res.send({"result":jsonstr});
					}
				}, myquery);

			};



			
//retrieving testers for on search testers button/////////////////////////////////////////////////////////////
			exports.fetchtesters = function(req, res){
							var getUser="select * from testersignup order by experience ASC";
						
							console.log("Query is:"+getUser);	
							mysql.fetchData(function(err,results){
											if(!err){
												console.log(results);
												var jsonstr=JSON.stringify(results);
											console.log("Successfully Fetched");
											 res.send({"result":JSON.stringify(results)});
											        }
											        else {
											            console.log(err);
											        }  
										}
								,getUser);
						};
			
	//count number of developers		
						exports.countdevelopers = function(req, res){
							var count1="SELECT COUNT(DISTINCT developer_id) AS developer_id FROM developersignup";
						
							console.log("Query is:"+count1);	
							mysql.fetchData(function(err,results){
											if(!err){
												console.log(results);
												var jsonstr=JSON.stringify(results);
											console.log("Successfully Fetched count of developers");
											 res.send({"result":JSON.stringify(results)});
											        }
											        else {
											            console.log(err);
											        }  
										}
								,count1);
						};

//retrieving testers for projects ==myprojects page//////////////////////////////////////////////////////
exports.gettester = function(req, res){
				var getUser="SELECT * FROM testersignup where projecttype in (select projecttype1 from developersignup where projecttype1 ='"+req.session.ptype+"') and tester_id not in (select testerid123 from assign group by testerid123 having count(testerid123)>5) order by experience ASC";  
    
   
			
				console.log("Query is:"+getUser);	
				mysql.fetchData(function(err,results){
								if(!err){
									console.log(results);
									var jsonstr=JSON.stringify(results);
								console.log("Successfully Fetched");
								 res.send({"result":JSON.stringify(results)});
								        }
								        else {
								            console.log(err);
								        }  
							}
					,getUser);
			};









//VIEW PLANS PAGE////////////////////////////////////////////////////////////
exports.viewplans = function(req, res) {
	res.render('viewplans');
};




//SIGNUP PAGE
exports.register = function(req, res) {
	res.render('signup');
};
//index
//SIGNUP PAGE
exports.index = function(req, res) {
	res.render('index');
};

exports.login = function(req, res) {
	res.render('login');
};
exports.registerdeveloper = function(req, res) {
	res.render('registerdeveloper');
};
//ADD PROJECT PAGE
exports.addproject = function(req, res) {
	res.render('addproject');
};
//SEARCH TESTERS PAGE
exports.searchtesters = function(req, res) {
	res.render('searchtesters');
};
//developer dashboard PAGE
exports.developerdashboard = function(req, res) {
	res.render('developerdashboard');
};//developer profile PAGE
exports.developerprofile = function(req, res) {
	res.render('developerprofile');
};//developer projects PAGE
exports.developerproject = function(req, res) {
	res.render('developerproject');
};
exports.developerdefects = function(req, res) {
	res.render('developerdefects');
};
exports.thankyou = function(req, res) {
	res.render('thankyou');
};
exports.adminhome = function(req, res) {
	res.render('adminhome');
};
exports.adminlogin = function(req, res) {
	res.render('adminlogin');
};




// DEVELOPER HOME  PAGE
exports.home = function(req, res) {
	res.render('home');
};


//add project details PAGE
exports.addprojectdetails = function(req, res) {
	console.log(req.param("projectname", "description",
			"requirement", "plan","addressline1",
			"addressline2", "city", "postcode", "country", "state",
			 "phone","developeremail" ));
	var projectname = req.param("projectname");
	var description = req.param("description");
	var requirement = req.param("requirement");
	var plan = req.param("plan");
	var addressline1 = req.param("addressline1");
	var addressline2 = req.param("addressline2");
	var city = req.param("city");
	var postcode = req.param("postcode");
	var country = req.param("country");
	var state = req.param("state");
	var phone = req.param("phone");
	var developeremail = req.param("developeremail");
	
	var myquery = "insert into projectdetails(d_username, projectname,description,requirement,plan,addressline1,addressline2,city,postcode,country,state,phone,developeremail) values ('"+req.session.uname+"','" + projectname + "','" + requirement + "','" + description + "','"+plan+"','" + addressline1 + "','" + addressline2 + "','" + city + "','" + postcode + "','" + country + "','" + state + "','" + phone + "','"+developeremail+"')";	mysql
			.fetchData(
					function(err, results) {
						if (err) {
							throw err;
						} 
						else {
                            console	.log("Entry successfully made in projectdetails table");
							res.render('home');
						}
					}, myquery);
};

//fetch defects for developer
exports.fecthdefectsdevelopers = function(req, res){
	var defect1="select * from defect where defectdeveloper = '"+req.session.uname+"'order by defectprojectname ASC";

	console.log("Query is:"+defect1);	
	mysql.fetchData(function(err,results){
					if(!err){
						console.log(results);
						var jsonstr=JSON.stringify(results);
					console.log("Successfully Fetched");
					 res.send({"result":JSON.stringify(results)});
					        }
					        else {
					            console.log(err);
					        }  
				}
		,defect1);
};

//COUNT NUMBER OF projects ON developer dashboard page

exports.countprojectsprofiled = function(req, res){
	var count1="SELECT COUNT(DISTINCT projectdetails_id) AS projectdetails_id FROM projectdetails where d_username ='"+req.session.uname+"' ";

	console.log("Query is:"+count1);	
	mysql.fetchData(function(err,results){
					if(!err){
						console.log(results);
						var jsonstr=JSON.stringify(results);
					console.log("Successfully Fetched count of projects");
					 res.send({"result":JSON.stringify(results)});
					        }
					        else {
					            console.log(err);
					        }  
				}
		,count1);
};
//count number of testers on developer dashboard page
exports.countprojectsdefect = function(req, res){
	var count1="SELECT COUNT(DISTINCT testerid123) AS testerid123 FROM assign where developername123 ='"+req.session.uname+"' ";

	console.log("Query is:"+count1);	
	mysql.fetchData(function(err,results){
					if(!err){
						console.log(results);
						var jsonstr=JSON.stringify(results);
					console.log("Successfully Fetched count of defects");
					 res.send({"result":JSON.stringify(results)});
					        }
					        else {
					            console.log(err);
					        }  
				}
		,count1);
};

//count individual defeects
exports.individualtesterdefect = function(req, res){
	var count1="SELECT distinct defect_tester, COUNT(DISTINCT defect_id) AS defect_id FROM defect where defectdeveloper ='"+req.session.uname+"' group by defect_tester";

	console.log("Query is:"+count1);	
	mysql.fetchData(function(err,results){
					if(!err){
						console.log(results);
						var jsonstr=JSON.stringify(results);
					console.log("Successfully Fetched count of individual tester defects");
					 res.send({"result":JSON.stringify(results)});
					        }
					        else {
					            console.log(err);
					        }  
				}
		,count1);
};
//count  defeects per projects
exports.defectsperprojects = function(req, res){
	var count1="SELECT distinct defectprojectname, COUNT(DISTINCT defect_id) AS defect_id FROM defect where defectdeveloper ='"+req.session.uname+"' group by defectprojectname";

	console.log("Query is:"+count1);	
	mysql.fetchData(function(err,results){
					if(!err){
						console.log(results);
						var jsonstr=JSON.stringify(results);
					console.log("Successfully Fetched count of individual tester defects");
					 res.send({"result":JSON.stringify(results)});
					        }
					        else {
					            console.log(err);
					        }  
				}
		,count1);
};

//testers assigned to developers

exports.developertesters = function(req, res){
	var defect1="select * from assign where developername123 = '"+req.session.uname+"'order by projectname123 ASC";

	console.log("Query is:"+defect1);	
	mysql.fetchData(function(err,results){
					if(!err){
						console.log(results);
						var jsonstr=JSON.stringify(results);
					console.log("Successfully Fetched");
					 res.send({"result":JSON.stringify(results)});
					        }
					        else {
					            console.log(err);
					        }  
				}
		,defect1);
};
//displaying the project details on tester dashboard page
exports.projectdata = function(req, res){
	var defect1="select * from assign where testername123 = '"+req.session.uname+"'order by projectname123 ASC";

	console.log("Query is:"+defect1);	
	mysql.fetchData(function(err,results){
					if(!err){
						console.log(results);
						var jsonstr=JSON.stringify(results);
					console.log("Successfully Fetched");
					 res.send({"result":JSON.stringify(results)});
					        }
					        else {
					            console.log(err);
					        }  
				}
		,defect1);
};


//retrieving comments for on defects//////////////////////////////////////////////////////////
exports.fetchdevelopercomments = function(req, res){
				var defect1="select * from comment where comment_developer_name = '"+req.session.uname+"' order by comment_defect_id";
			
				console.log("Query is:"+defect1);	
				mysql.fetchData(function(err,results){
								if(!err){
									console.log(results);
									var jsonstr=JSON.stringify(results);
								console.log("Successfully Fetched");
								 res.send({"result":JSON.stringify(results)});
								        }
								        else {
								            console.log(err);
								        }  
							}
					,defect1);
			};
exports.fetchtestercomments = function(req, res){
				var defect1="select * from comment where comment_defect_tester = '"+req.session.uname+"' order by comment_defect_id";
			
				console.log("Query is:"+defect1);	
				mysql.fetchData(function(err,results){
								if(!err){
									console.log(results);
									var jsonstr=JSON.stringify(results);
								console.log("Successfully Fetched");
								 res.send({"result":JSON.stringify(results)});
								        }
								        else {
								            console.log(err);
								        }  
							}
					,defect1);
			};



 //sandeep code
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* exports.searchsupplierdetails = function(req, res) {
	var getUser = "se0lect * from addsupplierpage";

	console.log("Query is:" + getUser);
	mysql.fetchData(function(err, results) {
		if (!err) {
			//console.log(results);
			var myjsondata = [];

			for (var i = 0; i < results.length; i++) {
				var item = results[i];
				// Each column of the database can be accessed through its name:
				//console.log(">------------------------name = " + item.suppliername);
				//console.log(">------------------------email-address = " + item.emailaddress);
				myjsondata.push({
					"label" : item.suppliername,
					"value" : item.addsupplierpage_id.toString()
				});
			}
			var jsonstr = JSON.stringify(myjsondata);
			console.log("Successfully jsondd - ", jsonstr);
			res.send({
				"result" : jsonstr
			});
		} else {
			console.log(err);
		}
	}, getUser);
};

*/
//////////////////////////////////////////////////sandeep code



//TESTER============================================================================================================
//===================================================================================================================
	//===============================================================================================================
exports.testerlogin = function(req, res) {
	res.render('testerlogin');
};
exports.registertester = function(req, res) {
	res.render('registertester');
};
		// tester LOGIN PAGE
		exports.testersignin = function(req, res) {
			console.log(req.param("name", "password"));
			var name = req.param("name");
			var password = req.param("password");

			var myquery = "Select * from testersignup where username = '"+name+"'and passwordd='"+password+"' ";
			
			mysql.fetchData(function(err, results) {
				if (err) {
					throw err;
				} else {
					if (results.length > 0) {
						req.session.uname = results[0].username;																
						console.log("success");
						res.render('testerhome');
					} else {
						console.log("Invalid User Name & Password");
						res.send({
							"status" : 100
						});
					}
				}
			}, myquery);
		};

//FETCH TESTERS NAME ON TESTERHOME PAGE
		
		//FECTH DEVELOPER NAME ON HOM EPAGE		///////////////////////////////////////////////////////////
		   exports.testerhomeusername = function(req, res){
			   console.log(req.session.uname);
			   var myquery = "select * from testersignup where username = '"+req.session.uname+"'";
			   mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {
						console.log(results);
						var jsonstr=JSON.stringify(results);
						console.log(jsonstr);
						console.log("Entry successfully fethced and displayed on GUI");
						//res.send(JSON.stringify(results));
							res.send({"result":jsonstr});
					}
				}, myquery);

			};
//statistics page
// DEVELOPER HOME  PAGE
			exports.statistics = function(req, res) {
				res.render('statistics');
			};
			// DEVELOPER HOME  PAGE
			exports.testerprofile = function(req, res) {
				res.render('testerprofile');
			};

			// DEVELOPER HOME  PAGE
			exports.testerdashboard = function(req, res) {
				res.render('testerdashboard');
			};

			// DEVELOPER HOME  PAGE
			exports.testerhome = function(req, res) {
				res.render('testerhome');
			};

			// DEVELOPER HOME  PAGE
			exports.testerproject = function(req, res) {
				res.render('testerproject');
			};
//developer search project page
			exports.searchproject = function(req, res) {
				res.render('searchproject');
			};
//billing page
exports.billing = function(req, res) {
				res.render('billing');
			};
			
//retrieving projects for on search projects button/////////////////////////////////////////////////////////////
			exports.fetchprojects = function(req, res){
							var getUser="select * from projectdetails p, developersignup d where p.d_username = d.username1";
						
							console.log("Query is:"+getUser);	
							mysql.fetchData(function(err,results){
											if(!err){
												console.log(results);
												var jsonstr=JSON.stringify(results);
											console.log("Successfully Fetched");
											 res.send({"result":JSON.stringify(results)});
											        }
											        else {
											            console.log(err);
											        }  
										}
								,getUser);
						};

//tester PROFILE PAGE DETAILS FETCHED////////////////////////////////////////////////
						exports.testerprofileusername = function(req, res){
							   console.log(req.session.uname);
							   var myquery = "select * from testersignup where username = '"+req.session.uname+"'";
							   mysql.fetchData(function(err, results) {
									if (err) {
										throw err;
									} else {
										console.log(results);
										var jsonstr=JSON.stringify(results);
										console.log(jsonstr);
										console.log("Entry successfully fethced and displayed on tester PROFILE GUI");
										//res.send(JSON.stringify(results));
											res.send({"result":jsonstr});
									}
								}, myquery);

							};

exports.testerdefects = function(req, res) {
res.render('testerdefects');
};
						
						
//add project details PAGE
exports.raisedefect = function(req, res) {
	console.log(req.param("projectname", "defectprojecttype", "defectdescription",
			"defectsteps", "defectpriority","defectseverity"));
	var defectprojectname = req.param("defectprojectname");
	var defectprojecttype = req.param("defectprojecttype");
	var defectdescription = req.param("defectdescription");
	var defectsteps = req.param("defectsteps");
	var defectpriority = req.param("defectpriority");
	var defectseverity = req.param("defectseverity");
	var defectdeveloper = req.param("defectdeveloper");
	
	var myquery = "insert into defect(defect_tester,defectprojectname,defectprojecttype,defectdescription,defectsteps,defectpriority,defectseverity,defectdeveloper) values ('"+req.session.uname+"','" + defectprojectname + "','" + defectprojecttype + "','" + defectdescription + "','" + defectsteps + "','"+defectpriority+"','" + defectseverity + "','"+defectdeveloper+"')";
	mysql
			.fetchData(
					function(err, results) {
						if (err) {
							throw err;
						} 
						else {
							console	.log("Entry successfully made in defect table");
							res.render('testerdefects');
						}
					}, myquery);
};

//retrieving defects for on defects//////////////////////////////////////////////////////////
exports.fetchdefects = function(req, res){
				var defect1="select * from defect where defect_tester = '"+req.session.uname+"'order by defectprojectname";
			
				console.log("Query is:"+defect1);	
				mysql.fetchData(function(err,results){
								if(!err){
									console.log(results);
									var jsonstr=JSON.stringify(results);
								console.log("Successfully Fetched");
								 res.send({"result":JSON.stringify(results)});
								        }
								        else {
								            console.log(err);
								        }  
							}
					,defect1);
			};
			//count number o ftesters INDEX PAGE
			
exports.counttesters = function(req, res){
				var count1="SELECT COUNT(DISTINCT tester_id) AS tester_id FROM testersignup";
			
				console.log("Query is:"+count1);	
				mysql.fetchData(function(err,results){
								if(!err){
									console.log(results);
									var jsonstr=JSON.stringify(results);
								console.log("Successfully Fetched count of testers");
								 res.send({"result":JSON.stringify(results)});
								        }
								        else {
								            console.log(err);
								        }  
							}
					,count1);
			};

			
			//count number of  INDEX PAGE
			
					
								exports.countprojects = function(req, res){
									var count1="SELECT COUNT(DISTINCT projectdetails_id) AS projectdetails_id FROM projectdetails";
								
									console.log("Query is:"+count1);	
									mysql.fetchData(function(err,results){
													if(!err){
														console.log(results);
														var jsonstr=JSON.stringify(results);
													console.log("Successfully Fetched count of projects");
													 res.send({"result":JSON.stringify(results)});
													        }
													        else {
													            console.log(err);
													        }  
												}
										,count1);
								};

				//tester signup
								exports.signuptester = function(req, res) {
									console.log(req.param("firstname", "lastname", "email",
											"username", "passwordd","cpasswordd",
											"sex", "projecttype", "experience"));
									var firstname = req.param("firstname");
									var lastname = req.param("lastname");
									var email	 = req.param("email");
									var username = req.param("username");
									var passwordd = req.param("passwordd");
									var cpasswordd = req.param("cpasswordd");
									var sex = req.param("sex");
									var projecttype = req.param("projecttype");
									var experience = req.param("experience");
									
									var myquery = "insert into testersignup (firstname, lastname,email,username,passwordd,cpasswordd,sex,projecttype,experience) values ('" + firstname + "','" + lastname + "','" + email + "','" + username + "','"+passwordd+"','" + cpasswordd + "','" + sex + "','" + projecttype + "','" + experience + "')";	
									mysql
											.fetchData(
													function(err, results) {
														if (err) {
															throw err;
														} 
														else {
															console	.log("Entry successfully made in testersignup table");
															res.render('index');
														}
													}, myquery);
								};
//COUNT NUMBER OF DEFECT ON TESTER dashboard
								
								exports.countdefectsprofile = function(req, res){
								var count1="SELECT COUNT(DISTINCT defect_id) AS defect_id FROM defect where defect_tester ='"+req.session.uname+"' ";
								
									console.log("Query is:"+count1);	
									mysql.fetchData(function(err,results){
													if(!err){
														console.log(results);
														var jsonstr=JSON.stringify(results);
													console.log("Successfully Fetched count of projects");
													 res.send({"result":JSON.stringify(results)});
													        }
													        else {
													            console.log(err);
													        }  
												}
										,count1);
								};


//total number of defects on developerrrrrrrrrrrrrrrrrrrrrrr dashboard
exports.developerdashboarddefect = function(req, res){
								var count1="SELECT COUNT(DISTINCT defect_id) AS defect_id FROM defect where defectdeveloper ='"+req.session.uname+"' ";
								
									console.log("Query is:"+count1);	
									mysql.fetchData(function(err,results){
													if(!err){
														console.log(results);
														var jsonstr=JSON.stringify(results);
													console.log("Successfully Fetched count of projects");
													 res.send({"result":JSON.stringify(results)});
													        }
													        else {
													            console.log(err);
													        }  
												}
										,count1);
								};
//COUNT NUMBER OF project ON TESTER dashboard
								
								exports.countprojectsprofile = function(req, res){
								var count1="SELECT COUNT(DISTINCT projectname123) AS projectname123 FROM assign where testername123 ='"+req.session.uname+"' ";
								
									console.log("Query is:"+count1);	
									mysql.fetchData(function(err,results){
													if(!err){
														console.log(results);
														var jsonstr=JSON.stringify(results);
													console.log("Successfully Fetched count of projects");
													 res.send({"result":JSON.stringify(results)});
													        }
													        else {
													            console.log(err);
													        }  
												}
										,count1);
								};



								
								
//emailllll///////////////

exports.email = function(req, res) {
	console.log("In user JS Email");
	
var transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
        user: 'mtaascrowdsourcing@yahoo.com',
        pass: 'password2015'
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'mtaascrowdsourcing@yahoo.com', // sender address
    to: req.param("email"), // list of receivers
    subject: 'MTaaS Crowdsourcing Project Allocation', // Subject line
    text: 'Hi Tester, ', // plaintext body
    html: '<h4>Hello Tester, <br></br><br></br>Weclome to the world of MTaaS Crowdsourcing. You have been selected to the project uploaded on MTaaS Crowdsourcing. Looking to see you forward. <br></br><br></br> In case of any issues please feel free to contact us on mtaascrowdsourcing@yahoo.com<br></br><br></br>Have a Great Day. <br></br><br></br>Thanks,<br></br>MTaaS Crowdsourcing</h4>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    else
    	{
        console.log('Message sent: ' + info.response);
        res.send({"status" : 200});
    	}


});
};

//assigning///////////////////
		exports.assign = function(req, res) {
					console.log(req.param("username","projectname123","tester_id"));
					var username = req.param("username");
                    var tester_id = req.param("tester_id");
                    var projectname123 = req.param("projectname123");
            
				var myquery = "insert into assign (developername123,developerid123, projectname123, testername123,testerid123) values ('"+req.session.uname+"','"+req.session.pdid+"','"+projectname123+"','"+username+"','"+tester_id+"')";	
									 console.log("Query is:"+myquery);
    
    mysql.fetchData(function(err,results){
      if(!err){
      console.log("Successfully insterdddd data");
      res.render('developerproject');
              }
      
              else {
                  console.log(err);
              }  
    }
    ,myquery);
	
	}; 

//developer comments on defect

/////////////////////
		exports.comment = function(req, res) {
					console.log(req.param("defect_id","defect_tester","defectprojectname","developercomment"));
					var defect_id = req.param("defect_id");
                    var defect_tester = req.param("defect_tester");
                    var defectprojectname = req.param("defectprojectname");
            var comment_developer = req.param("comment_developer");
            
				var myquery = "insert into comment (comment_Defect_id,comment_defect_tester, comment_projectname, comment_developer, comment_developer_name) values ('"+defect_id+"','"+defect_tester+"','"+defectprojectname+"','"+comment_developer+"','"+req.session.uname+"')";	
									 console.log("Query is:"+myquery);
    
    mysql.fetchData(function(err,results){
      if(!err){
      console.log("Successfully insterd data into comment table");
      res.render('developerdefects');
              }
      
              else {
                  console.log(err);
              }  
    }
    ,myquery);
	
	};


//TESTERSSSSSSSSSSSSSS   comments on defect

/////////////////////
		exports.commenttester = function(req, res) {
					console.log(req.param("defect_id","defect_tester","defectprojectname","developercomment"));
					var comment_defect_id = req.param("comment_defect_id");
                    var comment_defect_tester = req.param("comment_defect_tester");
                    var comment_projectname = req.param("comment_projectname");
                    var comment_developer = req.param("comment_developer");
                    var comment_developer_name = req.param("comment_developer_name");
                    var comment_tester = req.param("comment_tester");
            
				var myquery = "insert into comment (comment_Defect_id,comment_defect_tester, comment_projectname, comment_developer,                                    comment_developer_name,comment_tester) values                                                                                                           ('"+comment_defect_id+"','"+comment_defect_tester+"','"+comment_projectname+"','"+comment_developer+"','"+comment_developer_name+"','"+comment_tester+"')";	
									 console.log("Query is:"+myquery);
    
    mysql.fetchData(function(err,results){
      if(!err){
      console.log("Successfully insterd data into comment table");
      res.render('developerdefects');
              }
      
              else {
                  console.log(err);
              }  
    }
    ,myquery);
	
	};
//ratinggggggggggggggg
exports.rate = function(req, res) {
		
		var testername = req.param("tname");
	    var numStars = req.param("rated");
	    console.log(testername);
	    console.log(numStars);
	        
	    var myquery = "insert into rate (d_name, t_name,rate) values ('"+req.session.uname+"','"+testername+"','"+numStars+"')";
	    console.log("Query is:"+myquery);
	    
	    mysql.fetchData(function(err,results){
	      if(!err){
	      console.log("Successfully insterdddd data");
	      res.render('index');
	              }
	      
	              else {
	                  console.log(err);
	              }  
	    }
	    ,myquery);
		
		};



//adminlogin verification

		exports.adminsignin = function(req, res) {
			console.log(req.param("name", "password"));
			var name = req.param("name");
			var password = req.param("password");

			var myquery = "Select * from admin where username = '"+name+"'and password='"+password+"' ";
			
			mysql.fetchData(function(err, results) {
				if (err) {
					throw err;
				} else {
					if (results.length > 0) {
						req.session.uname = results[0].username;																
						console.log("success");
						res.render('testerhome');
					} else {
						console.log("Invalid User Name & Password");
						res.send({
							"status" : 100
						});
					}
				}
			}, myquery);
		};



//admin homepage username

exports.adminusername = function(req, res){
	   console.log(req.session.uname);
	   var myquery = "select * from admin where username = '"+req.session.uname+"'";
	   mysql.fetchData(function(err, results) {
			if (err) {
				throw err;
			} else {
				console.log(results);
				var jsonstr=JSON.stringify(results);
				console.log(jsonstr);
				console.log("Entry successfully fethced and displayed on PROFILE GUI");
				//res.send(JSON.stringify(results));
					res.send({"result":jsonstr});
			}
		}, myquery);

	};


//tester rating page
exports.testerrate = function(req, res){
			   console.log(req.session.uname);
			   var myquery = "SELECT rate FROM rate where t_name= '"+req.session.uname+"'";
			   mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {
						console.log(results);
						var jsonstr=JSON.stringify(results);
						console.log(jsonstr);
						console.log("Successfully fected tester rating");
						//res.send(JSON.stringify(results));
							res.send({"result":jsonstr});
					}
				}, myquery);

			};
