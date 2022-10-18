import { Component, OnInit } from '@angular/core';
import {RouterModule} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatMenuModule} from "@angular/material/menu";

@Component({
  standalone: true,
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
    imports: [RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatMenuModule]
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
