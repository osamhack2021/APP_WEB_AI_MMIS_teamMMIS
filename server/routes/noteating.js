var express = require('express');
var router = express.Router();
const mysql = require('mysql');


const connection =   mysql.createPool({
    user:'admin',
    password:'05751234',
    database: 'MMIS',
    host:'mmis.cip9531xqh6o.ap-northeast-2.rds.amazonaws.com',
    multipleStatements:true,
});

router.post('/', async (req, res) => {
        var year = req.body.year;
        var month =req.body.month;
        var day = req.body.day;
	var time = req.body.time;
        var menus = req.body.menus;
        var yearmonthdaytime = year+"/"+month+"/"+day+"/"+time;
        var diet_reg = `insert into diet (yearmonthdaytime, year, month, day, time, menus, createtime, updatetime) value (\'${yearmonthdaytime}\',\'${year}\',\'${month}\',\'${day}\',\'${time}\',\'${menus}\', now(), now());`;
        connection.query(diet_reg, (error, results, fields) => {
                if (error) {
                        console.log(error);
	                res.send({"code" : -1});
                }
	        else{
			//console.log(menus);
		//	res.send(menus);
			var diet_query = `select * from diet where yearmonthdaytime = \'${yearmonthdaytime}\'and year = \'${year}\' and month = \'${month}\'and day = \'${day}\' and time = \'${time}\' and menus = \'${menus}\';`;
			 connection.query(diet_query, (error, results1, fields) => {
                		if (error) {
                        		console.log(error);
	                		res.send({"code" : -1});
                		}
	        		else{
					newsql = "";
					tempsql = "";
					for(var i in menus){
						tempsql= `select 칼로리, 탄수화물, 지방, 단백질, 나트륨, 콜레스테롤 from nutrition where name = \'${menus[i]}\';`;
						console.log(tempsql);
						newsql+=tempsql;
					}
					connection.query(newsql, (error, results2, fields) => {
                				if (error) {
                        				console.log(error);
	                				res.send({"code" : -1});
                				}
	        				else{
        						newsql2 = "";
							tempsql2 = "";
							for(var i in menus){
								tempsql2= `select 계란류, 우유, 메밀, 땅콩, 대두, 밀, 고등어, 게, 새우, 돼지고기, 복숭아, 토마토, 아황산류, 호두, 닭고기, 쇠고기, 오징어, 조개류, 잣 from allergy where name = \'${menus[i]}\';`;
								newsql2+=tempsql2;
							}
							connection.query(newsql2, (error, results3, fields) => {
                						if (error) {
                        						console.log(error);
	                						res.send({"code" : -1});
                						}
	        						else{
									console.log(results2[0]);
									console.log(results3[0]);
									var menusarray = [];
									var namenutritionallergy;
									for(var i in menus){
										namenutritionallergy = {"name": menus[i], "nutrition": results2[i][0], "allergy": results3[i][0]};
										menusarray.push(namenutritionallergy);
									}
									var data = {"id": results1[0].id,"menus": menusarray, "create": results1[0].createtime, "update": results1[0].updatetime};
									var response = {"code": 1, "msg":"success", "data": data};
									res.send(response);
								}

							})	
	
        					}
        				})

	
        			}
        		})
    		}
	})
});

router.put('/:year/:month/:day/:time', async (req, res) => {
        var year = req.params.year;
        var month = req.params.month;
	var day = req.params.day;
	var time = req.params.time;
	var updatequery = `UPDATE diet SET menus =\'${req.body.menus}\', updatetime = now() where year = \'${year}\' and month = \'${month}\' and day = \'${day}\'and time = \'${time}\';`;

        connection.query(updatequery, (error, results, fields) => {
        	if (error) {
            		console.log(error);
	    		res.send({"code" : -1});
		}
		else{
			//console.log(menus);
		//	res.send(menus);
			var diet_query = `select * from diet where year = \'${year}\' and month = \'${month}\'and day = \'${day}\' and time = \'${time}\';`;
			 connection.query(diet_query, (error, results1, fields) => {
                		if (error) {
                        		console.log(error);
	                		res.send({"code" : -1});
                		}
	        		else{
					console.log(diet_query);
					console.log(results1);
					var strmenus = results1[0].menus;
					console.log(strmenus);
					var menus = strmenus.split(',');
					console.log(menus);
					newsql = "";
					tempsql = "";
					for(var i in menus){
						tempsql= `select 칼로리, 탄수화물, 지방, 단백질, 나트륨, 콜레스테롤 from nutrition where name = \'${menus[i]}\';`;
						console.log(tempsql);
						newsql+=tempsql;
					}
					connection.query(newsql, (error, results2, fields) => {
                				if (error) {
                        				console.log(error);
	                				res.send({"code" : -1});
                				}
	        				else{
        						newsql2 = "";
							tempsql2 = "";
							for(var i in menus){
								tempsql2= `select 계란류, 우유, 메밀, 땅콩, 대두, 밀, 고등어, 게, 새우, 돼지고기, 복숭아, 토마토, 아황산류, 호두, 닭고기, 쇠고기, 오징어, 조개류, 잣 from allergy where name = \'${menus[i]}\';`;
								newsql2+=tempsql2;
							}
							connection.query(newsql2, (error, results3, fields) => {
                						if (error) {
                        						console.log(error);
	                						res.send({"code" : -1});
                						}
	        						else{
									console.log(results2[0]);
									console.log(results3[0]);
									var menusarray = [];
									var namenutritionallergy;
									for(var i in menus){
										namenutritionallergy = {"name": menus[i], "nutrition": results2[i][0], "allergy": results3[i][0]};
										menusarray.push(namenutritionallergy);
									}
									var data = {"id": results1[0].id,"menus": menusarray, "create": results1[0].createtime, "update": results1[0].updatetime};
									var response = {"code": 1, "msg":"success", "data": data};
									res.send(response);
								}

							})	
	
        					}
        				})

	
        			}
        		})
    		}

		
    	})
});


router.get('/:year/:month', async (req, res) => {
        var month = req.params.month;
	var year = req.params.year;
	var diet_query = `select * from diet where year = \'${year}\' and month = \'${month}\';`;
        connection.query(diet_query, (error, results, fields) => {
        	if (error) {
            		console.log(error);
	    		res.send({"code" : -1});
		}
		else{
		//	console.log(results.length);
			var dietarray=[], onedaydiet, yearmonthdaytime = [], now;
			for(var i in results){
		//		console.log(results[i]);
				onedaydiet = results[i].menus.split(',');
				now = results[i].yearmonthdaytime;
				yearmonthdaytime.push(now);
				dietarray.push(onedaydiet);
			}
			var sequencesql = "";
			for(var i in dietarray){
				for(var k in dietarray[i]){
					sequencesql+= `select 칼로리, 탄수화물, 지방, 단백질, 나트륨, 콜레스테롤 from nutrition where name = \'${dietarray[i][k]}\';`;
				}
			}
			console.log(sequencesql);
			connection.query(sequencesql, (error, results2, fields) => {
        			if (error) {
            				console.log(error);
	    				res.send({"code" : -1});
				}
				else{
					//console.log(results2);
					var sequencesql2="";
					for(var i in dietarray){
						for(var k in dietarray[i]){
							sequencesql2+= `select 계란류, 우유, 메밀, 땅콩, 대두, 밀, 고등어, 게, 새우, 돼지고기, 복숭아, 토마토, 아황산류, 호두, 닭고기, 쇠고기, 오징어, 조개류, 잣 from allergy where name = \'${dietarray[i][k]}\';`;

						}

					}
					//console.log(sequencesql2);
					connection.query(sequencesql2, (error, results3, fields) => {
        					if (error) {
            						console.log(error);
	    						res.send({"code" : -1});
						}
						else{
							console.log(results3);
							var menusarray = [];
							var data = [];
							var index = 0;
							for(var i in dietarray){
								menusarray = [];
								for(var k in dietarray[i]){
									menusarray.push({"name":dietarray[i][k], "nutrition": results2[index][0], "allergy": results3[index][0]});
									index++;
								}
								data.push({"now": yearmonthdaytime[i], "menus": menusarray, "create": results[0].createtime, "update": results[0].updatetime} );
							}
							var response = {"code": 1, "msg":"success", "data": data};
							res.send(response);

						}
    					})

				}
    			})

    		}

		
    	})
});


router.get('/:year/:month/:day', async (req, res) => {
        var month = req.params.month;
	var year = req.params.year;
	var day = req.params.day;
	var diet_query = `select * from noteating where year = \'${year}\' and month = \'${month}\' and day = \'${day}\';`;
    	connection.query(diet_query, (error, results, fields) => {
        if (error) {
        	console.log(error);
	  		res.send({"code" : -1});
		}	
		else{
		//	console.log(results.length);
			
	    		var dutyarray=[], vacationarray=[], go_outarray=[], workarray=[], etcarray = [];
			console.log(results[0].duty);

		//		console.log(results[i]);
			dutyarray = results[0].duty.split(',');
			vacationarray = results[0].vacation.split(',');
			go_outarray = results[0].go_out.split(',');
			workarray = results[0].work.split(',');
			etcarray = results[0].etc.split(',');
			console.log(dutyarray)
			console.log(vacationarray);
			var dutysql="", goonbeon;
			for(var i in dutyarray){
				goonbeon = dutyarray[i];
				dutysql+=`select * from normaluser where militaryNumber = \'${goonbeon}\';`;
			}
			//console.log(dutysql);
			connection.query(dutysql, (error, results1, fields) => {
        			if (error) {
        				console.log(error);
	  				res.send({"code" : -1});
				}	
				else{
					//console.log(results1);
		//	console.log(results.length);
					var vacationsql="";
					for(var i in vacationarray){
						vacationsql+=`select * from normaluser where militaryNumber = \'${vacationarray[i]}\';`;
					}
					
			//console.log(dutysql);
					connection.query(vacationsql, (error, results2, fields) => {
        				if (error) {
        					console.log(error);
	  						res.send({"code" : -1});
						}	
						else{
					//		console.log(results2);
		//	console.log(results.length);
							var go_outsql="";
							for(var i in go_outarray){
								go_outsql+=`select * from normaluser where militaryNumber = \'${go_outarray[i]}\';`;
							}
							connection.query(go_outsql, (error, results3, fields) => {
        						if (error) {
        							console.log(error);
	  								res.send({"code" : -1});
								}	
								else{
					//				console.log(results3);
		//	console.log(results.length);
									var worksql="";
									for(var i in workarray){
										worksql+=`select * from normaluser where militaryNumber = \'${workarray[i]}\';`;
									}
					
			//console.log(dutysql);
									connection.query(worksql, (error, results4, fields) => {
        								if (error) {
        									console.log(error);
	  										res.send({"code" : -1});
										}	
										else{
					//						console.log(results4);
		//	console.log(results.length);
											var etcsql="";
											for(var i in etcarray){
												etcsql+=`select * from normaluser where militaryNumber = \'${etcarray[i]}\';`;
											}
											connection.query(etcsql, (error, results5, fields) => {
        										if (error) {
        											console.log(error);
	  												res.send({"code" : -1});
												}	
												else{
					//								console.log(results5);
													var reason = {"당직": results1, "휴가": results2, "외출": results3, "근무": results4, "기타": results5};
													console.log(results1.length);
													console.log(results2.length);
													console.log(results3.length);
													console.log(results4.length);
													console.log(results5.length);

														
													

													res.send(reason);

    											}

		
   											})
	
			//console.log(dutysql);
			

    									}

		
   									})


			

    							}

		
   							})

			//console.log(dutysql);
			

    						}

		
   					})



    				}

		
   			})


    		}

		
   	})
});


router.get('/:year/:month/:day/:time', async (req, res) => {
        var month = req.params.month;
	var year = req.params.year;
	var day = req.params.day;
	var time = req.params.time;
	var diet_query = `select * from diet where year = \'${year}\' and month = \'${month}\' and day = \'${day}\' and time = \'${time}\';`;
        connection.query(diet_query, (error, results, fields) => {
        	if (error) {
            		console.log(error);
	    		res.send({"code" : -1});
		}
		else{
		//	console.log(results.length);
			var dietarray=[], onedaydiet, yearmonthdaytime = [], now;
			for(var i in results){
		//		console.log(results[i]);
				onedaydiet = results[i].menus.split(',');
				now = results[i].yearmonthdaytime;
				yearmonthdaytime.push(now);
				dietarray.push(onedaydiet);
			}
			var sequencesql = "";
			for(var i in dietarray){
				for(var k in dietarray[i]){
					sequencesql+= `select 칼로리, 탄수화물, 지방, 단백질, 나트륨, 콜레스테롤 from nutrition where name = \'${dietarray[i][k]}\';`;
				}
			}
			console.log(sequencesql);
			connection.query(sequencesql, (error, results2, fields) => {
        			if (error) {
            				console.log(error);
	    				res.send({"code" : -1});
				}
				else{
					//console.log(results2);
					var sequencesql2="";
					for(var i in dietarray){
						for(var k in dietarray[i]){
							sequencesql2+= `select 계란류, 우유, 메밀, 땅콩, 대두, 밀, 고등어, 게, 새우, 돼지고기, 복숭아, 토마토, 아황산류, 호두, 닭고기, 쇠고기, 오징어, 조개류, 잣 from allergy where name = \'${dietarray[i][k]}\';`;

						}

					}
					//console.log(sequencesql2);
					connection.query(sequencesql2, (error, results3, fields) => {
        					if (error) {
            						console.log(error);
	    						res.send({"code" : -1});
						}
						else{
							console.log(results3);
							var menusarray = [];
							var data = [];
							var index = 0;
							for(var i in dietarray){
								menusarray = [];
								for(var k in dietarray[i]){
									menusarray.push({"name":dietarray[i][k], "nutrition": results2[index][0], "allergy": results3[index][0]});
									index++;
								}
								data.push({"now": yearmonthdaytime[i], "menus": menusarray, "create": results[0].createtime, "update": results[0].updatetime} );
							}
							var response = {"code": 1, "msg":"success", "data": data};
							res.send(response);

						}
    					})

				}
    			})

    		}

		
    	})
});



module.exports = router;
