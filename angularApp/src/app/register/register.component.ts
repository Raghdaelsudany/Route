import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  apiError: string = "";

  constructor
  (
    private router: Router,
    private authservice : AuthService,
  ) { }


  ngOnInit() {
  }

  isLoading: boolean = false

  registerForm :FormGroup = new FormGroup({
    name: new FormControl  (null, [ Validators.required, Validators.minLength(3)] ),
    email: new FormControl ( null, [ Validators.required, Validators.email] ),
    password: new FormControl (null, [ Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/) ]),
    rePassword: new FormControl (null, [ Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/) ]),
    phone: new FormControl (null, [Validators.required, Validators.pattern(/^[01][0125][0-8]/)])
  });


 register(form:FormGroup){
  this.isLoading = true;
  if(this.registerForm.valid){
    this.authservice.register(form.value).subscribe(
      {
        next:(response) => {
          this.isLoading = false;
          this.router.navigate(['/login']);
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


