import { Component, OnInit } from '@angular/core';
import { WebserviceService } from 'src/services/webservice.service';

@Component({
  selector: 'cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit{

  listaCars:any[]=[]; 
  thing:any=[]; 
  writeResult:boolean=false;
  strWriteResult:string="";

  admin = sessionStorage.getItem('amministratore');
  

  async ngOnInit(){
    

    const busta = await fetch("http://localhost:8888/getCars");
    let risposta = await busta.json()
    // console.log(risposta);
    this.listaCars=risposta;
  }

  identify(marca:any,modello:any) {
    // console.log("admin:"+this.admin);
    this.listaCars.forEach(element => {
      if(element.marca == marca && element.nome == modello ) 
      {
        this.thing=element;
      }
    });


  }

  closeCard()
  {
    this.thing=[];
    this.strWriteResult="";
    this.writeResult=false;
  }
  data = new Date()
  async buyCar(){
    let info = {
      id_auto: this.thing.id,
      cod_utente: sessionStorage.getItem('id'),
      data: this.data.getDate()+"/"+(this.data.getMonth()+1)+"/"+this.data.getFullYear()
    }
    console.log(info);

    let busta = await fetch("http://localhost:8888/save", 
    {
      "method":"POST",
      "headers":{"Content-Type":"application/x-www-form-urlencoded"},
      "body": JSON.stringify(info)
    });

    let risposta = await busta.json()
    // console.log(risposta.risposta);

    this.strWriteResult=risposta.risposta;
    this.writeResult=true;

  }

  esci(){
    document.getElementById('login')?.click();
  }

  aggiungi(){
    document.getElementById('amministratore')?.click();
  }



}
