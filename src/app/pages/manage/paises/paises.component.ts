import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpBackend} from '@angular/common/http';
import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment';
import {Pais} from '../../../models/pais';
import { PaisService } from '../../../services/pais.service';


@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit {

  titlepage = 'Administrar Paises';
  paises: Pais;
  error: string;
  pais: string;

  ServerUrl = environment.baseUrl;
  private http: HttpClient;

  p: Number = 1;
  count: Number = 8;

  constructor(
    public paisService: PaisService,
    private location: Location,
    handler: HttpBackend) {
    this.http = new HttpClient(handler);
   }

  ngOnInit() {
    this.paisService.getPaises().subscribe(
      (data: Pais) => this.paises = data,
      error => this.error = error
    );
    window.scrollTo(0, 0);

    //console.log(this.paises);
  }

  onDelete(code: string) {
    if (confirm('Are you sure want to delete code = ' + code)) {
      this.paisService.deletePais(+code).subscribe(
        res => {
          console.log(res);
          this.ngOnInit();
        },
        error => this.error = error
      );
    }
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
