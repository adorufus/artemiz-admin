import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss'],
})
export class GeneralSettingsComponent implements OnInit {
  @ViewChild('fileInput') fileInput?: ElementRef;
  fileAttr = 'Choose File';
  fileToUpload?: File;
  isCompleted: boolean = false;
  url: string = "";

  app_name = '';
  about_us = '';
  company_email = '';
  company_phone = '';
  jumbotron_image = '';
  about_us_mini = '';
  id = '';

  constructor(private generalService: GeneralService, public spinnerService: SpinnerService) {}

  ngOnInit(): void {
    this.getGeneralData();
  }

  getGeneralData() {
    this.generalService.getGeneralInfo().subscribe({
      next: (data) => {
        console.log(data);
        this.app_name = data![0].app_name ?? '';
        this.about_us = data![0].about_us ?? '';
        this.id = data![0]._id ?? '';
        this.company_email = data![0].company_email ?? '';
        this.company_phone = data![0].company_phone ?? '';
        this.about_us_mini = data![0].about_us_mini ?? '';
        this.jumbotron_image = data![0].jumbotron_image ?? '';
        this.url = this.jumbotron_image
      },
    });
  }

  updateGeneralData() {
    this.generalService.updateGeneralInfo(this.app_name, this.about_us, this.company_email, this.company_phone, this.fileToUpload!, this.about_us_mini, this.id).subscribe(
      {
        next: (data) => {
          console.log("success")
          this.isCompleted = true;
        },
        error: (err) => {
          console.log("error: " + err)
        }
      }
    )
  }

  getFileInput() {
    this.fileInput?.nativeElement.click();
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
}
