import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/model/news.model';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  news?: News;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.fetchNews()
  }

  fetchNews() {
    this.newsService.getNews().subscribe({
      next: (data) => {
        this.news = data;
        console.log(this.news.data);
      },
      complete: () => {
        console.log("news completed");
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
