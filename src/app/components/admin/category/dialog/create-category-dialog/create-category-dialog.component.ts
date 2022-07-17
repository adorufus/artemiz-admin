import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { CategoryService } from 'src/app/services/category.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-create-category-dialog',
  templateUrl: './create-category-dialog.component.html',
  styleUrls: ['./create-category-dialog.component.scss'],
})
export class CreateCategoryDialogComponent implements OnInit {
  @ViewChild('fileInput') fileInput?: ElementRef;

  fileAttr = 'Choose File';
  categoryName = '';
  dialogName = '';
  fileToUpload?: File;
  isCompleted: boolean = false;

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

  constructor(
    private categoryService: CategoryService,
    public spinnerService: SpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: { dialogNameData: string, idData: string, currentTitle: string }
  ) {
    // this.dialogName = this.data.dialogNameData;
  }

  ngOnInit(): void {
    this.spinnerService.hide();
    this.dialogName = this.data.dialogNameData;
    this.categoryName = this.data.currentTitle ?? "";
    console.log(this.data.dialogNameData)
  }

  proccess() {
    if(this.dialogName === "Edit") {
      this.editCategory();
    } else {
      this.createCategory();
    }
  }

  createCategory() {
    console.log('category name: ' + this.categoryName);

    this.spinnerService.show();

    this.categoryService
      .addCategory(this.categoryName, this.fileToUpload!)
      .subscribe({
        next: (data) => {
          this.spinnerService.hide();
          console.log(data);
        },
        complete: () => {
          this.isCompleted = true;
          console.log('Category created');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  editCategory() {
    console.log('category name: ' + this.categoryName);

    this.spinnerService.show();

    this.categoryService
      .updateCategory(this.data.idData, this.categoryName, this.fileToUpload!)
      .subscribe({
        next: (data) => {
          this.spinnerService.hide();
          console.log(data);
        },
        complete: () => {
          this.isCompleted = true;
          console.log('Category updated');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
