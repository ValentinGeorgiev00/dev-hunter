import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { Developer } from 'src/app/models/developer.model';
import { Technology } from 'src/app/models/technology.model';
import { DevelopersService } from 'src/app/services/developers.service';
import { LocationsService } from 'src/app/services/locations.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TechnologiesService } from 'src/app/services/technologies.service';
import { Location } from 'src/app/models/location.model';

@Component({
  selector: 'app-developers-edit',
  templateUrl: './developers-edit.component.html',
  styleUrls: ['./developers-edit.component.css'],
})
export class DevelopersEditComponent implements OnInit {
  form!: FormGroup;
  allowCreateEdit: boolean = true;

  developer!: Developer;
  developers!: Developer[];

  locations!: Location[];
  languages = ['English', 'Bulgarian', 'Serbian'];

  technologies!: Technology[];
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DevelopersEditComponent>,
    private developersService: DevelopersService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private locationService: LocationsService,
    private technologyService: TechnologiesService
  ) {
    this.developer = this.data.developerInfo;
  }

  ngOnInit(): void {
    this.buildForm();
    this.getAllLocations$();
    this.getAllTechnologies$();
  }

  updateMessages(): void {
    if (this.form.invalid) {
      this.notificationService.message('Fill the required fields');
    } else if (!this.form.get('id')?.value) {
      this.developersService.addDeveloper$(this.form.value).pipe(take(1)).subscribe({
        next: () => {
          this.dialogRef.close({
            result: this.allowCreateEdit,
            message: 'New developer added!',
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
        this.developersService.updateDeveloper$(this.form.value).pipe(take(1)).subscribe({
          next: () => {
            this.dialogRef.close({
              result: this.allowCreateEdit,
              message: 'Developer edited!',
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
    this.getAllLocations$();
    this.getAllTechnologies$();
  }

  onClose(): void {
    this.dialogRef.close({ result: false });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      id: [this.developer.id],
      name: [this.developer.name, [Validators.required]],
      email: [this.developer.email, [Validators.required]],
      phoneNumber: [this.developer.phoneNumber, [Validators.required]],
      locationId: [this.developer.location, [Validators.required]],
      technologyId: [this.developer.technology, [Validators.required]],
      pricePerHour: [this.developer.pricePerHour, [Validators.required]],
      yearsOfExperience: [
        this.developer.yearsOfExperience,
        [Validators.required],
      ],

      nativeLanguage: [this.developer.nativeLanguage, [Validators.required]],
      profilePictureURL: [this.developer.profilePictureURL],
      description: [this.developer.description],
      linkedinProfileLink: [this.developer.linkedinProfileLink],
    });
  }

  private getAllLocations$(): void {
    this.locationService
      .getAll$()
      .pipe(take(1))
      .subscribe({
        next: (location: Location[]) => {
          this.locations = location;
        },
      });
  }

  private getAllTechnologies$(): void {
    this.technologyService
      .getAll$()
      .pipe(take(1))
      .subscribe({
        next: (technology: Technology[]) => {
          this.technologies = technology;
        },
      });
  }
}
