import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users.service';
import { User } from '../../models/users';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {


  error: string;

  users: User;

  constructor(
    private userService: UserService,
    private authService: AuthService
    ) {}



  ngOnInit() {

    this.userService.getUsers().subscribe(
      (data: User) => this.users = data,
      error => this.error = error
    );

  }


  openMenu(){

    var menuLateral = document.getElementsByClassName("mini-sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.toggle("show-sidebar");
        //console.log('pulsado', menuLateral);

      }
  }

  logout(){
    this.authService.logout();
  }


}
