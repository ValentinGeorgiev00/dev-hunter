import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Developer } from '../models/developer.model';
import { DevelopersService } from '../services/developers.service';
import { NotificationService } from '../services/notification.service';
import { DevelopersEditComponent } from './developers-edit/developers-edit.component';
import { take } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { DeveloperDialogResponse } from '../models/developers-dialog-response.model';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css'],
})
export class DevelopersComponent implements OnInit {
  developer!: Developer;
  developers!: Developer[];

  constructor(
    private developersService: DevelopersService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  openAddEditDialog(developerInfo = new Developer()): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { developerInfo };

    const ref = this.dialog.open(DevelopersEditComponent, dialogConfig);
    ref
      .afterClosed()
      .pipe(take(1))
      .subscribe({
        next: (res: DeveloperDialogResponse) => {
          if (res.result) {
            this.getAll();
            this.notificationService.message(res.message);
          }
        },
      });
  }

  onDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '50%',
      data: {
        title: 'Are you sure you want to delete this location?',
      },
    });
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((dialogResult: boolean) => {
        if (dialogResult) {
          this.developersService.deleteDeveloper$(id).pipe(take(1)).subscribe({
            next: () => {
              this.getAll();
              this.notificationService.message('Developer deleted.');
              this.router.navigate(['developers']);
            },
          });
        }
      });
  }

  private getAll(): void {
    this.developersService
      .getAll$()
      .pipe(take(1))
      .subscribe({
        next: (developers: Developer[]) => {
          this.developers = developers;
        },
      });
  }
}
