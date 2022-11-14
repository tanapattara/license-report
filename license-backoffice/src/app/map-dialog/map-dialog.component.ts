import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.css'],
})
export class MapDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<MapDialogComponent>) {}

  ngOnInit(): void {}
}
