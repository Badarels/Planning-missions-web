import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup;
  err='';
  router: any;
  
  constructor (
    private formBuilder: FormBuilder,
    private auth: AuthService
  ){
      this.form = this.formBuilder.group({
          login:[null,Validators.compose([Validators.required])],
          password: [null,Validators.compose([Validators.required])]
      });
  }

  ngOnInit():void{}
  /*login(): void {
    const val = this.form?.value;
    this.auth.login(val.login!).then(
      this.router.navigateByUrl('/')
    );
  }*/
  login(){
    const val = this.form?.value;
    if(val.login && val.password){
      this.auth.login(val).then(
        (x)=>{
          if(x){
            this.err='Login ou mot de passe incorrect';
          }else{
            this.err='';
          }
        }
      ); 
    }else{
      this.err='Tous les champs sont obligatoires';
    }
  }
}
