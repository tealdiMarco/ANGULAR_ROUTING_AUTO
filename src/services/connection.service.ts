import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ConnctionService { // ng g s service/connection
  //instrada metodi get e post x chiamate

  constructor(private httpClient: HttpClient) { }

  private URL_SERVICE ="https://randomuser.me/api/?results="; //?results -> quanti utenti voglio generare
  private URL_SERVICE_ZIPS ="http://localhost:8888/"; 

  private URL_SERVER="http://localhost:8888/"; 


  public sendGetRequest(EndPoint :string){
    console.log(this.URL_SERVICE_ZIPS+EndPoint);
    return this.httpClient.get(this.URL_SERVICE_ZIPS+EndPoint);
  };
  public sendPostRequest(EndPoint :string, par:any){
    let options={headers:new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')};
    return this.httpClient.post(this.URL_SERVER+EndPoint,par,options);
  };
}
