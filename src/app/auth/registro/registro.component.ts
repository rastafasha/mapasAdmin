import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../models/users';
import { UserService } from '../../services/users.service';

import Swal from 'sweetalert2';

//declare function init_plugins();

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  forma: FormGroup;
  user: User;
  imagePath: string;
  error: string;
  uploadError: string;

  constructor(
    public userService: UserService,
    public router: Router,
    private fb: FormBuilder,
  ) { }

  sonIguales( campo1: string, campo2: string) {

    return( group: FormGroup) => {

      let pass1 = group.controls[ campo1].value;
      let pass2 = group.controls[ campo2].value;

      if ( pass1 ===  pass2 ) {
        return null;
      }

      return {
        sonIguales: true
      };

    };

  }

  ngOnInit() {
    //init_plugins();


    this.forma = this.fb.group({
      id: [''],
      username: ['',],
      first_name: ['',],
      last_name: [''],
      email: [''],
      password: [''],
      password2: [''],
      is_active: ['1'],
      user_role: ['user'],
      condiciones: new FormControl(false)
    }, { validators: this.sonIguales( 'password', 'password2' ) } );

    /*this.forma = new FormGroup({
      username: new FormControl( '', Validators.required ),
      first_name: new FormControl( '', Validators.required ),
      last_name: new FormControl( '', Validators.required ),
      image: new FormControl( '', Validators.required ),
      email: new FormControl( '', [Validators.required, Validators.email]),
      password: new FormControl( '', Validators.required ),
      password2: new FormControl( '', Validators.required ),
      condiciones: new FormControl(false)
    }, { validators: this.sonIguales( 'password', 'password2' ) } );

    /*this.forma.setValue({
      username: 'admin',
      first_name: 'tes',
      last_name: 'admin',
      image: 'logo.png',
      email: 'mercadocreativo@gmail.com',
      password: 'admin',
      password2: 'admin',
      condiciones: true
    });*/

  }


  /*registrarUsuario() {

    if (this.forma.invalid) {
      return;
    }

    if ( !this.forma.value.condiciones) {
      // swal('Importante', 'Debe aceptar las condiciones!', 'warning');
      
      return;
    }

    let user = new User(
      
    );

    this.userService.createUser(user)
      .subscribe( resp => this.router.navigate(['/login']));

  }*/


  registrarUsuario () {
    const formData = new FormData();
    formData.append('username', this.forma.get('username').value);
    formData.append('first_name', this.forma.get('first_name').value);
    formData.append('last_name', this.forma.get('last_name').value);
    formData.append('email', this.forma.get('email').value);
    formData.append('password', this.forma.get('password').value);
    formData.append('is_active', this.forma.get('is_active').value);
    formData.append('user_role', this.forma.get('user_role').value);

    const id = this.forma.get('id').value;

    if (id) {
      this.userService.updateUser(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/login']);
          }
        },
        error => this.error = error
      );
    } else {
      this.userService.createUser(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/login']);
          }
        },
        error => this.error = error
      );
    }
  }

}
