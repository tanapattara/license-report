import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { License } from '../model/license';
import { LicenseDialogData } from '../model/LicenseDialogData';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-license-edit-dialog',
  templateUrl: './license-edit-dialog.component.html',
  styleUrls: ['./license-edit-dialog.component.css']
})
export class LicenseEditDialogComponent implements OnInit {

  angForm: FormGroup;
  currentData: License;
  _color: string[];
  _province: string[];

  constructor(public dialogRef: MatDialogRef<LicenseEditDialogComponent>,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: LicenseDialogData) {
    this.currentData = data.license;
    this._color = data.color.slice(1);
    this._province = data.province.slice(1);

    this.angForm = this.formBuilder.group({
      licno: ["", Validators.required],
      speed: [0, Validators.required],
      province: [],
      color: [],
    });
  }

  ngOnInit(): void {
    this.angForm.setValue({
      licno: this.currentData.LicNo,
      speed: this.currentData.Speed,
      province: this.currentData.Province,
      color: this.currentData.Color
    });
  }
  onSubmit() {
    if (!this.angForm.get('licno')?.valid ||
      !this.angForm.get('speed')?.valid)
      return

    let updateData = {
      ID: this.currentData.ID,
      LicNo: this.angForm.controls['licno'].value,
      Province: this.angForm.controls['province'].value,
      Speed: this.angForm.controls['speed'].value,
      Color: this.angForm.controls['color'].value
    };

    this.apiService.updateLicense(updateData).subscribe({
      next: (res) => {
        this.dialogRef.close();
      },
      error: (err) => { console.log(err); }
    });

  }
}
