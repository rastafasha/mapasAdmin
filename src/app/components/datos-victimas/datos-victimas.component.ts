import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import * as ClassicEditor from 'ckeditor4-angular';

import {FormBuilder, Validators, FormArray, FormControl, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';


import { DatosvictimaService } from '../../services/datos.service';
import { PaisService } from '../../services/pais.service';

import { Datosvictima } from '../../models/datos';
import { Pais } from '../../models/pais';
import { Country } from '../../models/countries';


@Component({
  selector: 'app-datos-victimas',
  templateUrl: './datos-victimas.component.html',
  styleUrls: ['./datos-victimas.component.css']
})
export class DatosVictimasComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;
  datosvictimas: Datosvictima;
  pais: Pais;
  status: any;

  public countries: Country;
  public respais:Pais;

  datForm: FormGroup;
  public Editor = ClassicEditor;

  public editorData = `<p>This is a CKEditor 4 WYSIWYG editor instance created with Angular.</p>`;

  constructor(
    private fb: FormBuilder,
    private datosvictimaService: DatosvictimaService,
    private paisService: PaisService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getPaisesList();
    this.getDestallePais();

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Datos Victima';

      this.datosvictimaService.getDatosvictima(+id).subscribe(
        res => {
          this.datForm.patchValue({
            numDatosvictimas: res.numDatosvictimas,
            generoVictimasHombre: res.generoVictimasHombre,
            generoVictimasMujer: res.generoVictimasMujer,
            edadVictimaNino: res.edadVictimaNino,
            edadVictimaJoven: res.edadVictimaJoven,
            edadVictimaAdulto: res.edadVictimaAdulto,
            edadVictimaOld: res.edadVictimaOld,
            estatusMigratorioRegular: res.estatusMigratorioRegular,
            estatusMigratorioIrregular: res.estatusMigratorioIrregular,
            estatusConsulado: res.estatusConsulado,
            estadoIntegridad: res.estadoIntegridad,
            pais_code: res.pais_code,
            id: res.id
          });
        }
      );
    } else {
      this.pageTitle = 'Create Datos Victima';
    }

    this.datForm = this.fb.group({
      id: [''],
      numDatosvictimas: ['', Validators.required],
      generoVictimasHombre: ['', Validators.required],
      generoVictimasMujer: ['', Validators.required],
      edadVictimaNino: ['', Validators.required],
      edadVictimaJoven: ['', Validators.required],
      edadVictimaAdulto: ['', Validators.required],
      edadVictimaOld: ['', Validators.required],
      estatusMigratorioRegular: ['', Validators.required],
      estatusMigratorioIrregular: ['', Validators.required],
      estatusConsulado: ['', Validators.required],
      estadoIntegridad: ['', Validators.required],
      pais_code: ['', Validators.required],
    });


  }



  get numDatosvictimas() { return this.datForm.get('numDatosvictimas'); }
  get generoVictimasHombre() { return this.datForm.get('generoVictimasHombre'); }
  get generoVictimasMujer() { return this.datForm.get('generoVictimasMujer'); }
  get edadVictimaNino() { return this.datForm.get('edadVictimaNino'); }
  get edadVictimaJoven() { return this.datForm.get('edadVictimaJoven'); }
  get edadVictimaAdulto() { return this.datForm.get('edadVictimaAdulto'); }
  get edadVictimaOld() { return this.datForm.get('edadVictimaOld'); }
  get estatusMigratorioRegular() { return this.datForm.get('estatusMigratorioRegular'); }
  get estatusMigratorioIrregular() { return this.datForm.get('estatusMigratorioIrregular'); }
  get estatusConsulado() { return this.datForm.get('estatusConsulado'); }
  get estadoIntegridad() { return this.datForm.get('estadoIntegridad'); }
  get pais_code() { return this.datForm.get('pais_code'); }

  onSubmit (form) {
    const formData = new FormData();
    formData.append('numDatosvictimas', this.datForm.get('numDatosvictimas').value);
    formData.append('generoVictimasHombre', this.datForm.get('generoVictimasHombre').value);
    formData.append('generoVictimasMujer', this.datForm.get('generoVictimasMujer').value);
    formData.append('edadVictimaNino', this.datForm.get('edadVictimaNino').value);
    formData.append('edadVictimaJoven', this.datForm.get('edadVictimaJoven').value);
    formData.append('edadVictimaAdulto', this.datForm.get('edadVictimaAdulto').value);
    formData.append('edadVictimaOld', this.datForm.get('edadVictimaOld').value);
    formData.append('estatusMigratorioRegular', this.datForm.get('estatusMigratorioRegular').value);
    formData.append('estatusMigratorioIrregular', this.datForm.get('estatusMigratorioIrregular').value);
    formData.append('estatusConsulado', this.datForm.get('estatusConsulado').value);
    formData.append('estadoIntegridad', this.datForm.get('estadoIntegridad').value);
    formData.append('pais_code', this.datForm.get('pais_code').value);

    const id = this.datForm.get('id').value;

    if (id) {
      this.datosvictimaService.updateDatosvictima(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
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
              title: 'Se actualizó correctamente',
              text: ''
            });

          }
        },
        error => this.error = error
      );
    } else {
      this.datosvictimaService.createDatosvictima(formData).subscribe(
        res => {
          if (res.status === 'error') {
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

    //console.log(this.datForm);
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


  getPaisesList(){
    this.paisService.getCountries().subscribe(
      resp =>{
        this.countries = resp;
        //console.log(this.countries.title)

      }
    )
  }

  getDestallePais(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.paisService.getPais(+id).subscribe(
      respons => {
        this.respais = respons;

        });
      }


}
