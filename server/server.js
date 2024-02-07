"option strict";
const http = require('http');
const url = require('url');
const fs = require('fs');
 
let server = http.createServer((richiesta, risposta) => {
    let indirizzoRichiesta =  url.parse(richiesta.url, true);
    let nomeRisorsa = indirizzoRichiesta.pathname;
 
    console.log(indirizzoRichiesta);
    console.log(nomeRisorsa);
 
    let header = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    };
 
    switch(nomeRisorsa) {
        case "/check":
            obj = "";

            richiesta.on("data", (dato)=>{
                obj += dato;
            });

            richiesta.on("end", ()=>{
                let amm="0";
                let id="";
                let si=false;

                obj=JSON.parse(obj);

                let mysql = require("mysql");
                let con = mysql.createConnection({
                    host:"localhost",
                    user:"root",
                    password:"",
                    database:"automobili",//nome db a cui mi collego 
                });
                con.connect(function(err){
                    if(!err){// Connessione OK
                        con.query("SELECT * FROM utenti",function(errQuery,results){
                            if(errQuery){
                                risposta.writeHead(500, header);
                                risposta.end("Errore esecuzione query utenti");
                            }
                            else{

                                results.forEach(element => {
                                    if(element.username == obj.user && element.pwd == obj.password){
                                        si=true;
                                        id=element.id;
                                        if(element.amministratore==1){
                                            amm="1";
                                        }
                                    }
                                });

                                // console.log(si);
                                risposta.writeHead(200, {"Content-type":"text/plain","Access-Control-Allow-Origin":"*"});
                                if(si)
                                {
                                    risposta.write(JSON.stringify({"risposta":"ACCESSO CONSENTITO","amministratore":amm,"id":id}));
                                }
                                else
                                {
                                    risposta.write(JSON.stringify({"risposta":"ACCESSO NEGATO"}));
                                }
                                risposta.end();
                            }
                        });
                    }
                    else{// Connessione Fallita
                        risposta.writeHead(500, header);
                        risposta.end("Errore di connessione a mysql");
                    }
                    con.end();
                })
                
            });
                
        break;
        
        case '/getCars':
            let mysql1 = require("mysql");
                con = mysql1.createConnection({
                host:"localhost",
                user:"root",
                password:"",
                database:"automobili",//nome db a cui mi collego 
            });
            con.connect(function(err){
                if(!err){// Connessione OK
                    con.query("SELECT modelli.id,modelli.nome,marche.nome AS marca,nPorte,cilindrata,colore,anno,prezzo,targa,km FROM `modelli` INNER JOIN `marche` ON modelli.codMarca = marche.id",function(errQuery,results){
                        if(errQuery){
                            risposta.writeHead(500, header);
                            risposta.end("Errore esecuzione query utenti");
                        }
                        else{
                            console.log(results);
                            risposta.writeHead(200, header);
                            risposta.end(JSON.stringify(results));
                        }
                    });
                }
                else{// Connessione Fallita
                    risposta.writeHead(500, header);
                    risposta.end("Errore di connessione a mysql");
                }
                con.end();
            })
        break;

        case '/save':
            obj = "";

            richiesta.on("data", (dato)=>{
                obj += dato;
            });

            richiesta.on("end", ()=>{
                let si=true;

                obj=JSON.parse(obj);

                let mysql2 = require("mysql");
                let con = mysql2.createConnection({
                    host:"localhost",
                    user:"root",
                    password:"",
                    database:"automobili",//nome db a cui mi collego 
                });
                con.connect(function(err){
                    if(!err){// Connessione OK
                        con.query("INSERT INTO `log_vendita`(`cod_utente`, `cod_modello`, `data`) VALUES ('"+obj.cod_utente+"','"+obj.id_auto+"','"+obj.data+"')",
                        function(errQuery,results){
                            if(errQuery){
                                risposta.writeHead(500, header);
                                risposta.end("Errore esecuzione query utenti");
                                si = false;
                            }
                            else{

                                // console.log(si);
                                risposta.writeHead(200, {"Content-type":"text/plain","Access-Control-Allow-Origin":"*"});
                                if(si)
                                {
                                    risposta.write(JSON.stringify({"risposta":"TRANSAZIONE EFFETTUATA CON SUCCESSO"}));
                                }
                                else
                                {
                                    risposta.write(JSON.stringify({"risposta":"TRANSAZIONE NEGATA"}));
                                }
                                risposta.end();
                            }
                        });
                    }
                    else{// Connessione Fallita
                        risposta.writeHead(500, header);
                        risposta.end("Errore di connessione a mysql");
                    }
                    con.end();
                })
                
            });
        break;

        case '/insert':
            obj = "";

            richiesta.on("data", (dato)=>{
                obj += dato;
            });

            richiesta.on("end", ()=>{
                let si=true;

                obj=JSON.parse(obj);

                let mysql5 = require("mysql");
                let con = mysql5.createConnection({
                    host:"localhost",
                    user:"root",
                    password:"",
                    database:"automobili",//nome db a cui mi collego 
                });
                con.connect(function(err){
                    if(!err){// Connessione OK
                        con.query("INSERT INTO `modelli`(`nome`, `codMarca`, `nPorte`, `cilindrata`, `colore`, `anno`, `prezzo`, `targa`, `km`) VALUES ('"+obj.modello+"','"+obj.cod_marca+"','"+obj.nPorte+"','"+obj.cilindrata+"','"+obj.colore+"','"+obj.anno+"','"+obj.prezzo+"','"+obj.targa+"','"+obj.km+"')",
                        function(errQuery,results){
                            if(errQuery){
                                risposta.writeHead(500, header);
                                risposta.end("Errore esecuzione query utenti");
                                si = false;
                            }
                            else{

                                // console.log(si);
                                risposta.writeHead(200, {"Content-type":"text/plain","Access-Control-Allow-Origin":"*"});
                                if(si)
                                {
                                    risposta.write(JSON.stringify({"risposta":"INSERIMENTO EFFETTUATO CON SUCCESSO"}));
                                }
                                else
                                {
                                    risposta.write(JSON.stringify({"risposta":"INSERIMENTO NEGATO"}));
                                }
                                risposta.end();
                            }
                        });
                    }
                    else{// Connessione Fallita
                        risposta.writeHead(500, header);
                        risposta.end("Errore di connessione a mysql");
                    }
                    con.end();
                })
                
            });
        break;

        case '/trad':
            obj = "";

            richiesta.on("data", (dato)=>{
                obj += dato;
            });

            richiesta.on("end", ()=>{
                let si=true;

                obj=JSON.parse(obj);

                let mysql3 = require("mysql");
                let con = mysql3.createConnection({
                    host:"localhost",
                    user:"root",
                    password:"",
                    database:"automobili",//nome db a cui mi collego 
                });
                con.connect(function(err){
                    if(!err){// Connessione OK
                        con.query("SELECT id FROM `marche` WHERE `nome` = '"+ obj.marca+"'",
                        function(errQuery,results){
                            if(errQuery){
                                risposta.writeHead(500, header);
                                risposta.end("Errore esecuzione query marche");
                                si = false;
                            }
                            else{

                                // console.log(si);
                                if(si)
                                {
                                    console.log(results);
                                    risposta.writeHead(200, header);
                                    risposta.end(JSON.stringify(results));
                                }
                                else
                                {
                                    risposta.write(JSON.stringify({"risposta":"TRANSAZIONE NEGATA"}));
                                }
                                risposta.end();
                            }
                        });
                    }
                    else{// Connessione Fallita
                        risposta.writeHead(500, header);
                        risposta.end("Errore di connessione a mysql");
                    }
                    con.end();
                })
                
            });
        break;
    }
});
 
server.listen(8888);
console.log('Server avviato sulla porta 8888...');
 
function getLastId(file) {
    let zips = JSON.parse(file);
    return zips[zips.length - 1]._id + 1;
}
 