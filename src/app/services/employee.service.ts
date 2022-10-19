import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import * as uuid from 'uuid';
import {Employee} from "../interfaces/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  readonly LC_KEY = 'employees';

  constructor() { }

  create(data: Employee): Observable<Employee> {
    let employeesLC = localStorage.getItem(this.LC_KEY) || '[]';
    let employees = [];
    try {
      employees = JSON.parse(employeesLC);
    } catch (e) {}
    let dataWithId = {...data, id: uuid.v4()}
    employees.push(dataWithId);
    localStorage.setItem(this.LC_KEY, JSON.stringify(employees));
    return of(dataWithId);
  }

  update(id: string, data: Employee) {

  }

  getList(): Observable<Employee[]> {
    let employeesLC = localStorage.getItem(this.LC_KEY) || '[]';
    let employees = [];
    try {
      employees = JSON.parse(employeesLC);
    } catch (e) {}
    return of(employees);
  }

  delete(id: string) {
    let employeesLC = localStorage.getItem(this.LC_KEY) || '[]';
    let employees = [];
    try {
      employees = JSON.parse(employeesLC);
    } catch (e) {}
    localStorage.setItem(this.LC_KEY, JSON.stringify(employees.filter((employee: Employee) => employee.id !== id)));
    return of('Delete Successfully');
  }
}
