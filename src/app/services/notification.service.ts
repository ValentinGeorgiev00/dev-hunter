import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private _snackBar: MatSnackBar) {}

  message(message: string) {
    this._snackBar.open(message, '', { duration: 1000 });
  }
}
