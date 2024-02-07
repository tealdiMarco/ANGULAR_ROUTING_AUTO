import { Component } from '@angular/core';
import { FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms'; //si creano da soli il form
import { WebserviceService } from 'src/services/webservice.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  

  reactiveForm:FormGroup;
  mail:string="";
  arrayCars:any[]=[];

  login:boolean=true;
  registration:boolean=false;
  car_show:boolean=false;
  pError:boolean=false;

  
  
  
  constructor(private formBuilder:FormBuilder){
    this.reactiveForm=this.formBuilder.group({ // form Composto da:
      user:[
        '',//valore inziziale di user
        [
          //vincoli che voglio applicare su user
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(12)
          
        ],
      ],
      password:[
        '',
        [
          //vincoli 
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20)
        ],
      ]
      
    });
  }


  async check() {
  
    
    let info ={
      user:this.reactiveForm.controls['user'].value,
      password:this.reactiveForm.controls['password'].value,

    }
    // console.log(info);

    let busta = await fetch("http://localhost:8888/check", 
    {
      "method":"POST",
      "headers":{"Content-Type":"application/x-www-form-urlencoded"},
      "body": JSON.stringify(info)
    });

    let risposta = await busta.json()
    // console.log(risposta);

  
    if(risposta.risposta=="ACCESSO CONSENTITO")
    {
      document.getElementById('cliente')?.click();
      sessionStorage.setItem("amministratore", risposta.amministratore);
      sessionStorage.setItem("id", risposta.id);
      // console.log("amm:"+risposta.amministratore);
      // console.log("id:"+risposta.id);
    }
    else
    {
      this.pError = true;
    }
  }

  reset(){
    this.pError = false;
  }
}
