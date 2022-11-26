import { Component, OnInit } from '@angular/core';
import { LocationsService } from '../services/locations.service';
import { Location } from '../models/location.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LocationsEditComponent } from './locations-edit/locations-edit.component';
import { take } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
})
export class LocationsComponent implements OnInit {
  locations!: Location[];
  location!: Location;
  displayedColumns: string[] = ['name', 'googleMapLink', 'actions'];

  constructor(
    private locationsService: LocationsService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  openAddEditDialog(locationInfo = new Location()): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { locationInfo };

    const ref = this.dialog.open(LocationsEditComponent, dialogConfig);
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

  onDelete(location: Location): void {
    if (location.developers?.length === 0) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '50%',
        data: {
          title: 'Are you sure you want to delete this location?',
        },
      });
      dialogRef.afterClosed().pipe(take(1)).subscribe((dialogResult) => {
        if (dialogResult) {
          this.locationsService.deleteLocation$(location.id).pipe(take(1)).subscribe({
            next: () => {
              this.getAll();
              this.notificationService.message('Location deleted.');
              this.router.navigate(['locations']);
            },
          });
        }
      });
    } else {
      this.notificationService.message('A developer has this location');
    }
  }

  private getAll(): void {
    this.locationsService.getAll$().pipe(take(1)).subscribe({
      next: (locations: Location[]) => {
        this.locations = locations;
      },
    });
  }
}
