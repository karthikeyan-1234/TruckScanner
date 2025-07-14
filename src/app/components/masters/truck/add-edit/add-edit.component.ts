import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { DialogState } from '../../../../enums/dialog-state';
import { Truck } from '../../../../models/truck';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-add-edit',
  imports: [CommonModule, MatIconModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.css'
})
export class AddEditComponent {
  truckForm: FormGroup;
  truck: Truck | null = null;
  mode: string = "add";

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddEditComponent>,
    private fb: FormBuilder
  ) {
    this.truck = data.truck || null;
    this.mode = this.truck ? "edit" : "add";

    this.truckForm = this.fb.group({
      registrationNo: [this.truck ? this.truck.registrationNo : '', Validators.required],
    });
  }

  onSubmit() {
    if (this.truckForm.valid) {
      const formValue = this.truckForm.value;
      const truck: Truck = {
        id: formValue.registrationNo,
        registrationNo: formValue.registrationNo,
        createdAt: this.truck ? this.truck.createdAt : new Date().toISOString()
      };
      this.dialogRef.close(truck);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
