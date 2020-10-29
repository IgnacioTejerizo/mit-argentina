/*
 * Script que se encarga de poblar la base de datos  
 * 
 */

print("STARTING SCRIPT");
conn = new Mongo("localhost");
db = conn.getDB("mit-db");

db.dropDatabase();

db.createCollection("users");
db.createCollection("affiliates");
db.createCollection("credits");

print("***********CREAR USUSARIO*********");

user = {
    "_id": "1",
    "name": "Initial",
    "surname": "Initial",
    "dni": "Initial",
    "address": "Initial",
    "email": "Initial",
    "phone": "Initial",
    "username": "Initial",
    "password": "Initial",
    "role": "ROLE_ADMIN",
    "image": "null",
    "region": 1
}

print("***********CREAR AFILIADOS*********");

afiliado = {
    "_id": "1",
    "name": "",
    "surname": "",
    "dni": "",
    "cuil": "",
    "address": "",
    "email": "",
    "phone": "",
    "cbu": "",
    "admissionDate": Date.now,
    "nextColectionDate": Date.now,
    "situation": "",
    "condition": "",
    "assets": "",
    "observation": "",
    "region": 1
}

print("***********CREAR CREDITOS*********");

credit = {
    "capital": 1,
    "dues": 1,
    "importes": 1,
    "amount": 1,
    "region": 1,
    "user": "1",
    "affiliate": "1"
};

print("***********GUARDAR USUARIO*********");
db.users.save(user);

print("***********GUARDAR AFILIADOS*********");
db.affiliates.save(afiliado);

print("***********GUARDAR CREDITOS*********");
db.credits.save(credit);

print("SCRIPT FINISHED");