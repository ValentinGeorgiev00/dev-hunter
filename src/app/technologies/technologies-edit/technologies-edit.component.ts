import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Technology } from 'src/app/models/technology.model';
import { NotificationService } from 'src/app/services/notification.service';
import { TechnologiesService } from '../../services/technologies.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-technologies-edit',
  templateUrl: './technologies-edit.component.html',
  styleUrls: ['./technologies-edit.component.css'],
})
export class TechnologiesEditComponent implements OnInit {
  form!: FormGroup;

  allowCreateEdit: boolean = true;

  technology!: Technology;
  technologies!: Technology[];
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TechnologiesEditComponent>,
    private technologiesService: TechnologiesService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.technology = this.data.technologyInfo;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  getTechnologies$(): void {
    this.technologiesService.getAll$().pipe(take(1)).subscribe({
      next: (technologies: Technology[]) => {
        this.technologies = technologies;
      },
    });
  }

  onClose(): void {
    this.dialogRef.close({ result: false });
  }

  updateMessages(): void {
    if (this.form.controls.name.errors?.required) {
      this.notificationService.message('Name is required.');
    } else if (!this.form.get('id')?.value) {
      this.technologiesService.addTechnology$(this.form.value).pipe(take(1)).subscribe({
        next: () => {
          this.dialogRef.close({
            result: this.allowCreateEdit,
            message: 'New technology added!',
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
        this.technologiesService.updateTechnology$(this.form.value).pipe(take(1)).subscribe({
          next: () => {
            this.dialogRef.close({
              result: this.allowCreateEdit,
              message: 'Technology edited!',
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
      id: [this.technology.id],
      name: [this.technology.name, [Validators.required]],
      image: [this.technology.image],
    });
  }
}
