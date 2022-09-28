import { Component, OnInit } from '@angular/core';
import { User } from '../../models/users';
import { UserService } from '../../services/users.service';
import {Pais} from '../../models/pais';
import { PaisService } from '../../services/pais.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  error: string;

  users: User;
  paises: Pais;

  constructor(
    private userService: UserService,
    private paisService: PaisService
    ) {}

  ngOnInit() {

    this.getUsuarios();
    this.getPaises();
    window.scrollTo(0, 0);

  }

  getUsuarios(){
    this.userService.getUsers().subscribe(
      (data: User) => this.users = data,
      error => this.error = error
    );
  }

  getPaises(){
    this.paisService.getPaises().subscribe(
      (data: Pais) => this.paises = data,
      error => this.error = error
    );
  }


}
