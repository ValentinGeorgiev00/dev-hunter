import { Component, OnInit } from '@angular/core';
import { Technology } from '../models/technology.model';
import { TechnologiesService } from '../services/technologies.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TechnologiesEditComponent } from './technologies-edit/technologies-edit.component';
import { NotificationService } from '../services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css'],
})
export class TechnologiesComponent implements OnInit {
  technologies!: Technology[];
  technology!: Technology;
  displayedColumns: string[] = ['name', 'image'];
  id!: number | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private technologiesService: TechnologiesService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  openAddEditDialog(technologyInfo = new Technology()): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { technologyInfo };

    const ref = this.dialog.open(TechnologiesEditComponent, dialogConfig);
    ref
      .afterClosed()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          if (res.result) {
            this.getAll();
            this.notificationService.message(res.message);
          }
        },
      });
  }

  onDelete(technology: Technology): void {
    if (technology.developers?.length === 0) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '50%',
        data: {
          title: 'Are you sure you want to delete this technology?',
        },
      });
      dialogRef
        .afterClosed()
        .pipe(take(1))
        .subscribe((dialogResult) => {
          if (dialogResult) {
            this.technologiesService
              .deleteTechnology$(technology.id)
              .pipe(take(1))
              .subscribe({
                next: () => {
                  this.getAll();
                  this.notificationService.message('Technology deleted.');
                  this.router.navigate(['technologies']);
                },
              });
          }
        });
    } else {
      this.notificationService.message('A developer has this technology');
    }
  }

  private getAll(): void {
    this.technologiesService
      .getAll$()
      .pipe(take(1))
      .subscribe({
        next: (technologies: Technology[]) => {
          this.technologies = technologies;
        },
      });
  }
}
