import { BehaviorSubject } from 'rxjs';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent {

  isLogin: boolean = false;

  constructor(
    private authService : AuthService
  ){}

  ngOnInit() {
    this.authService.userData.subscribe(
    {
      next:(response) => {
        if(this.authService.userData.getValue !== null){
          this.isLogin = true;
        }
        else{
          this.isLogin = false;
        }
      },
    });
  }

  logOut(){
    this.authService.logout();
  }

}
