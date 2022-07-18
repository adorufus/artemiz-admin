import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-create-edit-dialog',
  templateUrl: './create-edit-dialog.component.html',
  styleUrls: ['./create-edit-dialog.component.scss'],
})
export class CreateEditDialogComponent implements OnInit {
  @ViewChild('fileInput') fileInput?: ElementRef;

  fileAttr = 'Choose File';
  dialogName = '';
  isCompleted = false;
  newsTitle = '';
  primaryButtonText = '';

  constructor(
    public spinnerService: SpinnerService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      dialogNameData: string;
      idData: string;
      currentTitle: string;
    }
  ) {}

  uploadFile() {}

  proccess() {}

  ngOnInit(): void {
    this.spinnerService.hide();
    this.dialogName = this.data.dialogNameData;
    this.newsTitle = this.data.currentTitle ?? '';

    if (this.dialogName === 'Edit') {
      this.primaryButtonText = 'Update';
    } else {
      this.primaryButtonText = 'Create';
    }
  }
}
