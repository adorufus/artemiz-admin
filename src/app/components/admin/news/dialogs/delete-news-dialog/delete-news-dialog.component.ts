import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewsService } from 'src/app/services/news.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-delete-news-dialog',
  templateUrl: './delete-news-dialog.component.html',
  styleUrls: ['./delete-news-dialog.component.scss'],
})
export class DeleteNewsDialogComponent implements OnInit {
  isCompleted = false;

  constructor(
    public spinnerService: SpinnerService,
    private newsService: NewsService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {}

  ngOnInit(): void {
    this.spinnerService.hide();
  }

  deleteNews() {
    this.spinnerService.show();
    this.newsService.deleteNews(this.data.id).subscribe({
      next: (data) => {
        this.spinnerService.hide();
        this.isCompleted=true;
        console.log("news Deleted");
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
