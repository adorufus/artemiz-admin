import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Tier } from 'src/app/model/portfolio.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  tier?: Tier;
  categoryId?: string;

  constructor(private activatedRoute: ActivatedRoute, private categoryService: CategoryService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => this.categoryId = params.get('id')!)

    this.getCategory();
  }

  getCategory() {
    this.categoryService.getTierByCategory(this.categoryId!).subscribe({
      next: (data) => {
        this.tier = data;
      },
      complete: () => {
        console.log("Success");
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
