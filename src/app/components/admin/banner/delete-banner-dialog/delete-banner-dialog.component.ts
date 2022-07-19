import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BannerService } from 'src/app/services/banner.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-delete-banner-dialog',
  templateUrl: './delete-banner-dialog.component.html',
  styleUrls: ['./delete-banner-dialog.component.scss']
})
export class DeleteBannerDialogComponent implements OnInit {

  isCompleted: boolean = false;

  constructor(public spinnerService: SpinnerService, @Inject(MAT_DIALOG_DATA) public data: {
    id: string
  }, private bannerService: BannerService) { }

  ngOnInit(): void {
  }

  deleteBanner() {
    this.bannerService.deleteBanner(this.data.id).subscribe({
      next: (data) => {
        console.log(data);
        this.isCompleted = true;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
