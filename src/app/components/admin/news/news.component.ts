import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { News } from 'src/app/model/news.model';
import { NewsService } from 'src/app/services/news.service';
import { CreateCategoryDialogComponent } from '../category/dialog/create-category-dialog/create-category-dialog.component';
import { CreateEditDialogComponent } from './dialogs/create-edit-dialog/create-edit-dialog.component';
import { DeleteNewsDialogComponent } from './dialogs/delete-news-dialog/delete-news-dialog.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  news?: News;

  constructor(private newsService: NewsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchNews();
  }

  openEditDialog(name: string, id?: string, currentTitle?: string, currentArticle?: string, currentImage?: string) {
    const dialogRef = this.dialog.open(CreateEditDialogComponent, {
      data: {
        dialogNameData: name,
        idData: id,
        currentTitle: currentTitle,
        currentArticle: currentArticle,
        currentImage: currentImage
      },
    });
  }

  openDeleteDialog(id: string) {
    const dialogRef = this.dialog.open(DeleteNewsDialogComponent, {
      data: {
        id: id
      }
    })
  }

  fetchNews() {
    this.newsService.getNews().subscribe({
      next: (data) => {
        this.news = data;
        console.log(this.news.data);
      },
      complete: () => {
        console.log('news completed');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
