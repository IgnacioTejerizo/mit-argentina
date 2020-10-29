/*
 * Script que se encarga de actualizar la base de datos  
 * 
 */

print("STARTING SCRIPT");
conn = new Mongo("localhost");
db = conn.getDB("mit-db");

var i_int = 0;
var modificados_int = 0;
var ignorados_int = 0;
var erroneos_int = 0;

var credits_cur = db.credits.find().snapshot();
var totalSize_int = credits_cur.count();

print("******FIRST PART UPDATING************");

credits_cur.forEach(function(credit){
 i_int++;
 print("*********************************");
    print("RECORD "+i_int +" of " + totalSize_int);   
 print("PROCESSING:"+ credit.capital + "("+credit._id+")");
 
 credit.dues = 2;
   
 db.credits.save(credit);
 
 print("UPDATED");
});

print("******END FIRST PART************");

print("******SECOND PART ADDING************");

credits_cur = db.credits.find().snapshot();
credits_cur.forEach(function(credit){
   print("*********************************");
   print("PROCESSING CREDIT:"+ credit.capital + "("+credit._id+")");
   var id_credit = credit._id;
   
   var affiliate_cur = db.affiliates.find().snapshot();
         
   affiliate_cur.forEach(function(affiliate){
    
    print("PROCESSING AFFILIATE:"+ affiliate.name + "("+affiliate._id+")");
    var id_affiliado = affiliate._id;    
    db.credits.update({_id:id_credit},{$addToSet:{"affiliate":id_affiliado}});
    
    print("AFFILIATE ADDED CREDIT");
 
   });
});

print("SCRIPT FINISHED");