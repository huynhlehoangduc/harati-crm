import { Component, OnInit } from '@angular/core';
import {RouterModule} from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss'],
  imports: [RouterModule]
})
export class ErrorsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
