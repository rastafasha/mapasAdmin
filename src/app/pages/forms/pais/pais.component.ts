import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as ClassicEditor from 'ckeditor4-angular';

import {FormBuilder, Validators, FormArray, FormControl, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';

import { PaisService } from '../../../services/pais.service';

import { Pais } from '../../../models/pais';
import { Country } from '../../../models/countries';


@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;
  id: any;

  public countries: Country;
  public respais:Pais;

  public status;

  paisForm: FormGroup;
  public Editor = ClassicEditor;

  public editorData = `<p>This is a CKEditor 4 WYSIWYG editor instance created with Angular.</p>`;
  public editorDatac = `<p>This is a CKEditor 4 WYSIWYG editor instance created with Angular.</p>`;

  constructor(
    private fb: FormBuilder,
    private paisService: PaisService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getPaisesList();

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Pais';
      this.paisService.getPais(+id).subscribe(
        res => {
          this.paisForm.patchValue({
            title: res.title,
            code: res.code,
            informacion: res.informacion,
            ciudades: res.ciudades,
            isActive: res.isActive,
            id: res.id
          });
        }
      );
    } else {
      this.pageTitle = 'Create Pais';
    }

    this.paisForm = this.fb.group({
      id: [''],
      title: [''],
      code: [''],
      informacion: [''],
      ciudades: [''],
      isActive: ['0'],
    });


  }


  get title() { return this.paisForm.get('title'); }
  get code() { return this.paisForm.get('code'); }
  get informacion() { return this.paisForm.get('informacion'); }
  get ciudades() { return this.paisForm.get('ciudades'); }
  get isActive() { return this.paisForm.get('isActive'); }

  onSubmit (form) {
    const formData = new FormData();
    formData.append('title', this.paisForm.get('title').value);
    formData.append('code', this.paisForm.get('code').value);
    formData.append('informacion', this.paisForm.get('informacion').value);
    formData.append('ciudades', this.paisForm.get('ciudades').value);
    formData.append('isActive', this.paisForm.get('isActive').value);

    const id = this.paisForm.get('id').value;

    if (id) {
      this.paisService.updatePais(formData, +id).subscribe(
        res => {
          if (res.status === 'error' && res.data ) {
            //this.uploadError = res.message;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ocurrión un error, vuelva a intentar!',
            });
          } else {
            //this.router.navigate(['/paises']);
            Swal.fire({
              icon: 'success',
              title: 'Se Actualizó correctamente',
              text: ''
            });
          }
        },
        error => this.error = error
      );
    } else {
      this.paisService.createPais(formData).subscribe(
        res => {
          if (res.status === 'error' ) {
            //this.uploadError = res.message;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ocurrión un error, vuelva a intentar!',
            });
          } else {
            //this.router.navigate(['/paises']);
            Swal.fire({
              icon: 'success',
              title: 'Se guardó correctamente',
              text: ''
            });

          }
        },
        error => this.error = error
      );
    }
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  getPaisesList(){
    this.paisService.getCountries().subscribe(
      resp =>{
        this.countries = resp;
        //console.log(this.countries)

      }
    )
  }


}
