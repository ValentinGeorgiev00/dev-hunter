import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocationsService } from 'src/app/services/locations.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Location } from 'src/app/models/location.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-locations-edit',
  templateUrl: './locations-edit.component.html',
  styleUrls: ['./locations-edit.component.css'],
})
export class LocationsEditComponent implements OnInit {
  form!: FormGroup;
  allowCreateEdit: boolean = true;

  location!: Location;
  locations!: Location[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<LocationsEditComponent>,
    private locationsService: LocationsService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.location = this.data.locationInfo;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  onClose(): void {
    this.dialogRef.close({ result: false });
  }

  updateMessages(): void {
    if (this.form.controls.name.errors?.required) {
      this.notificationService.message('Name is required.');
    } else if (!this.form.get('id')?.value) {
      this.locationsService.addLocation$(this.form.value).subscribe({
        next: () => {
          this.dialogRef.close({
            result: this.allowCreateEdit,
            message: 'New location added!',
          });
        },
        error: (res: HttpErrorResponse) => {
          this.notificationService.message(res.error);
        },
      });
    } else {
      if (this.form.pristine) {
        this.notificationService.message('No changes were detected.');
      } else {
        this.locationsService.updateLocation$(this.form.value).subscribe({
          next: () => {
            this.dialogRef.close({
              result: this.allowCreateEdit,
              message: 'Location edited!',
            });
          },
          error: (res: HttpErrorResponse) => {
            this.notificationService.message(res.error);
          },
        });
      }
    }
  }

  onApply(): void {
    this.updateMessages();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      id: [this.location.id],
      name: [this.location.name, [Validators.required]],
      googleMapLink: [this.location.googleMapLink],
    });
  }
}
