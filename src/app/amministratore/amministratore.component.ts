import { Component } from '@angular/core';
import { FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms'; //si creano da soli il form

@Component({
  selector: 'amministratore',
  templateUrl: './amministratore.component.html',
  styleUrls: ['./amministratore.component.css']
})
export class AmministratoreComponent {
  reactiveForm:FormGroup;
  End:String="";

  constructor(private formBuilder:FormBuilder){
    this.reactiveForm=this.formBuilder.group({ // form Composto da:
      modello:[
        '',
        [
          
          Validators.required,
          Validators.minLength(3),
        ],
      ],
      marca:[
        '',
        [
          
          Validators.required,
          Validators.minLength(3),
        ],
      ],
      nPorte:[
        '',
        [
          Validators.required,
        ],
      ],
      cilindrata:[
        '',
        [
          Validators.required,
        ],
      ],
      colore:[
        '',
        [
          
          Validators.required,
          Validators.minLength(3),
        ],
      ],
      anno:[
        '',
        [
          
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4)
        ],
      ],
      prezzo:[
        '',
        [
          
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(6)
        ],
      ],
      targa:[
        '',
        [
          
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(7)
        ],
      ],
      km:[
        '',
        [
          Validators.required,
        ],
      ],
      
    });
  }

  async confirm(){
    this.End="";
    let obj_marca={marca:this.reactiveForm.controls['marca'].value};
    
    
    let busta1 = await fetch("http://localhost:8888/trad", 
    {
      "method":"POST",
      "headers":{"Content-Type":"application/x-www-form-urlencoded"},
      "body": JSON.stringify(obj_marca)
    });

    let risposta1 = await busta1.json();
    // console.log(risposta1[0].id);
    let info ={
      modello:this.reactiveForm.controls['modello'].value,
      cod_marca:risposta1[0].id,
      nPorte:this.reactiveForm.controls['nPorte'].value,
      cilindrata:this.reactiveForm.controls['cilindrata'].value,
      colore:this.reactiveForm.controls['colore'].value,
      anno:this.reactiveForm.controls['anno'].value,
      prezzo:this.reactiveForm.controls['prezzo'].value,
      targa:this.reactiveForm.controls['targa'].value,
      km:this.reactiveForm.controls['km'].value,
    }
    // console.log(info)
  
  
    let busta = await fetch("http://localhost:8888/insert", 
    {
      "method":"POST",
      "headers":{"Content-Type":"application/x-www-form-urlencoded"},
      "body": JSON.stringify(info)
    });

    let risposta = await busta.json()
    this.End=risposta.risposta;
    console.log(risposta.risposta);
  }


  back(){
    document.getElementById('login')?.click(); 
  }
}
