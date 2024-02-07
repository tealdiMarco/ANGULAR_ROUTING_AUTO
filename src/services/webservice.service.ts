import { Injectable } from '@angular/core';
import { ConnctionService } from './connection.service';

@Injectable({
  providedIn: 'root'
})
export class WebserviceService {

  

  constructor(private connectionService:ConnctionService) {}

  DataCheck: any;
  DataGetCars: any = [];
  


  check(info:any){

    this.connectionService.sendPostRequest("check",info).subscribe(
        (data:any)=>{// se va a buon fine..
          console.log("data:"+data);
          this.DataCheck;
          console.log("datacheck:"+this.DataCheck);

        },
        (error:any)=>{// se non va a buon fine..
          console.log("Errore esecuzione Web Service Post")
          console.log(error);
        },
    );
  }

  getCars(EndPoint:string){
    this.connectionService.sendGetRequest(EndPoint).subscribe(
      (data:any)=>{// se va a buon fine..
        //console.log(data);
        this.DataGetCars=data;
      },
      (error:any)=>{// se non va a buon fine..
        console.log("Errore Get Server Data");
        console.log(error);
      },
    );
  }

  
}
