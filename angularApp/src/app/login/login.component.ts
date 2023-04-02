import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  apiError: string = "";

  constructor
  (
    private router: Router,
    private authservice : AuthService,
  ) {}


  ngOnInit() {
  }

  isLoading: boolean = false

  loginForm :FormGroup = new FormGroup({
    email: new FormControl ( null, [ Validators.required, Validators.email] ),
    password: new FormControl (null, [ Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}/) ]),
  });


 login(form:FormGroup){
  this.isLoading = true;

  if(this.loginForm.valid){
    this.authservice.login(form.value).subscribe(
      {
        next:(response) => {
          this.isLoading = false;
          localStorage.setItem('accessToken', response.token);
          this.authservice.decodedUserData();
          this.router.navigate(['/home']);
        },
        error:(err)=>{
          this.isLoading = false;
          this.apiError= err.error.errors.msg
        }
      });
      return true;
    } else {
    return false
  }
 }

 
}
