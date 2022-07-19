import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BannerService } from 'src/app/services/banner.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-create-banner-dialog',
  templateUrl: './create-banner-dialog.component.html',
  styleUrls: ['./create-banner-dialog.component.scss']
})
export class CreateBannerDialogComponent implements OnInit {
  @ViewChild('fileInput') fileInput?: ElementRef

  isCompleted: boolean = false;
  bannerName: string = "";
  navUrl: string = "";
  fileAttr: string = "Choose File"
  fileToUpload?: File

  constructor(public spinnerService: SpinnerService, private bannerService: BannerService) { }

  ngOnInit(): void {
    this.spinnerService.hide();
  }

  uploadFile(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.fileAttr += file.name + ' - ';
      });

      this.fileToUpload = imgFile.target.files[0];

      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;

        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      // Reset if duplicate image uploaded again
      this.fileInput!.nativeElement.value = '';
    } else {
      this.fileAttr = 'Choose File';
    }
  }

  createBanner() {
    if (this.fileToUpload) {
      this.bannerService.createBanner(this.bannerName, this.navUrl, this.fileToUpload).subscribe({
        next: (data) => {
          console.log(data);
          this.isCompleted = true;
        },
        error: (err) => {
          console.log(err)
        }
      })
    } else {
      console.log("Image not uploaded, please select an image")
    }
  }

}
