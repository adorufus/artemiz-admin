import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Banner } from 'src/app/models/banner.model';
import { BannerService } from 'src/app/services/banner.service';
import { CreateBannerDialogComponent } from './create-banner-dialog/create-banner-dialog.component';
import { DeleteBannerDialogComponent } from './delete-banner-dialog/delete-banner-dialog.component';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  banners?: Banner;

  constructor(private bannerSerice: BannerService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getBanner()
  }

  openEditDialog() {
    this.dialog.open(CreateBannerDialogComponent)
  }

  openDeleteDialog(id: string) {
    this.dialog.open(DeleteBannerDialogComponent, {
      data: {
        id: id
      }
    })
  }

  getBanner() {
    this.bannerSerice.getAllBanner().subscribe({
      next: (data) => {
        console.log(data);
        this.banners = data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
