import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
//declare function init_plugins();

declare var $: any;
declare var jQuery: any;



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: []
})


export class MenuComponent implements OnInit {

  @ViewChild('sidenav') sidenav;

  constructor() { }

  ngOnInit() {
    //init_plugins();
  }

  toggleNav(){
    this.sidenav.toggle();
  }

}
