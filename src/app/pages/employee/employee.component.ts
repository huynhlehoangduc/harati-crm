import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validator, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {EmployeeService} from "../../services/employee.service";
import {Employee} from "../../interfaces/employee";
import {MatTableModule} from "@angular/material/table";

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule],
  template: `
    <div class="block-wrapper bg-white">
      <h2>Thêm nhân viên</h2>
      <form [formGroup]="form" (ngSubmit)="handleSubmit()">
        <div class="flex items-start gap-4">
          <div class="flex-1">
            <mat-form-field class="w-full" appearance="outline">
              <mat-label>Tên</mat-label>
              <input matInput placeholder="Nguyen Van A" formControlName="name">
              <mat-error>
                Vui lòng nhập <strong>Tên</strong>
              </mat-error>
            </mat-form-field>
          </div>
          <div class="flex-1">
            <mat-form-field class="w-full" appearance="outline">
              <mat-label>Phòng ban</mat-label>
              <input matInput placeholder="Thiết kế, Chặt gót, ..." formControlName="apartment">
              <mat-error>
                Vui lòng nhập <strong>Phòng ban</strong>
              </mat-error>
            </mat-form-field>
          </div>
          <div class="flex-1">
            <mat-form-field class="w-full" appearance="outline">
              <mat-label>Lương</mat-label>
              <input matInput placeholder="900000" formControlName="salary" type="number">
              <mat-error>
                Vui lòng nhập <strong>Lương</strong>
              </mat-error>
            </mat-form-field>
          </div>
          <div class="flex-1">
            <mat-form-field class="w-full" appearance="outline">
              <mat-label>CMND/CCCD</mat-label>
              <input matInput placeholder="..." formControlName="card_id">
            </mat-form-field>
          </div>
          <div class="flex-1 flex justify-end">
            <button mat-raised-button color="primary" type="submit">Save</button>
          </div>
        </div>
      </form>
    </div>


    <table mat-table [dataSource]="employees" class="w-full mat-elevation-z1">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef> Tên </th>
        <td mat-cell *matCellDef="let employee"> {{employee.name}} </td>
      </ng-container>

      <ng-container matColumnDef="apartment">
        <th mat-header-cell *matHeaderCellDef> Phòng ban </th>
        <td mat-cell *matCellDef="let employee"> {{employee.apartment}} </td>
      </ng-container>

      <ng-container matColumnDef="salary">
        <th mat-header-cell *matHeaderCellDef> Lương </th>
        <td mat-cell *matCellDef="let employee"> {{employee.salary}} </td>
      </ng-container>

      <ng-container matColumnDef="card_id">
        <th mat-header-cell *matHeaderCellDef> CMND/CCCD </th>
        <td mat-cell *matCellDef="let employee"> {{employee.card_id}} </td>
      </ng-container>

      <ng-container matColumnDef="action">
        <th mat-header-cell *matHeaderCellDef> Hành động </th>
        <td mat-cell *matCellDef="let employee">
          <button mat-raised-button color="warn">Delete</button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `,
  styles: [
  ]
})
export class EmployeeComponent implements OnInit {

  form!: FormGroup

  employees: Employee[] = [];
  displayedColumns: string[] = ['name', 'apartment', 'salary', 'card_id', 'action'];

  constructor(private fb: FormBuilder,
              private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.initForm();
    this.handleGetList();
  }

  initForm() {
    this.form = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      apartment: this.fb.control('', [Validators.required]),
      salary: this.fb.control(null, [Validators.required]),
      card_id: this.fb.control(null),
    })
  }

  handleSubmit() {
    if (this.form.invalid) return;
    this.employeeService.create(this.form.value).subscribe(res => {

      /* @todo remove error after submit and reset form */
      this.form.reset();
      this.form.markAsPristine();
      this.form.markAsUntouched();
      this.form.updateValueAndValidity();

      this.handleGetList();
    });
  }

  handleGetList() {
    this.employeeService.getList().subscribe(res => {
      this.employees = res;
    })
  }
}
