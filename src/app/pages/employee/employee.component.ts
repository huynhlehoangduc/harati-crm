import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {EmployeeService} from "../../services/employee.service";
import {Employee} from "../../interfaces/employee";
import {MatTableModule} from "@angular/material/table";
import {ErrorStateMatcher} from "@angular/material/core";
import {ShowOnDirtyTouchedErrorStateMatcher} from "../../utils/ShowOnDirtyTouchedErrorStateMatcher";
import {MatPaginatorModule} from "@angular/material/paginator";

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule],
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
              <input matInput placeholder="900000"  formControlName="salary" type="number">
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
          <div class="flex-1 flex justify-end gap-4">
            <button mat-raised-button type="button" (click)="handleResetForm()">Reset</button>
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
        <td mat-cell *matCellDef="let employee"> {{employee.salary | currency:'VND'}} </td>
      </ng-container>

      <ng-container matColumnDef="card_id">
        <th mat-header-cell *matHeaderCellDef> CMND/CCCD </th>
        <td mat-cell *matCellDef="let employee"> {{employee.card_id}} </td>
      </ng-container>

      <ng-container matColumnDef="action">
        <th mat-header-cell *matHeaderCellDef> Hành động </th>
        <td mat-cell *matCellDef="let employee">
          <button mat-raised-button color="warn" (click)="handleDelete(employee)">Delete</button>
        </td>
      </ng-container>

      <ng-container matColumnDef="noRecord">
        <td mat-footer-cell *matFooterCellDef>No records found.</td>
      </ng-container>

      <tr class="mat-row" *matNoDataRow>
        <td class="mat-cell" [attr.colspan]="displayedColumns.length">
          Không có dữ liệu để hiển thị.
        </td>
      </tr>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `,
  styles: [
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyTouchedErrorStateMatcher}
  ]
})
export class EmployeeComponent implements OnInit {

  form!: FormGroup;

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
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.employeeService.create(this.form.value).subscribe(res => {
      this.form.reset();

      this.handleGetList();
    });
  }

  handleGetList() {
    this.employeeService.getList().subscribe(res => {
      this.employees = res;
    })
  }

  handleDelete(employee: Employee) {
    console.log(employee);
    let isConfirm = confirm('Xoá nhân viên: ' + employee.name);
    if (!isConfirm) return;
    this.employeeService.delete(employee.id as string).subscribe((res) => {
      this.handleGetList();
    })
  }

  handleResetForm() {
    this.form.reset()
  }
}
