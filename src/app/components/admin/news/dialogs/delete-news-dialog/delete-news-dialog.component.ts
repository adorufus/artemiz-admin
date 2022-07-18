import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-delete-news-dialog',
  templateUrl: './delete-news-dialog.component.html',
  styleUrls: ['./delete-news-dialog.component.scss']
})
export class DeleteNewsDialogComponent implements OnInit {

  isCompleted = false;

  constructor(public spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.hide();
  }

  deleteNews() {}

}
