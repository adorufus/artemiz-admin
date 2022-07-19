import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-delete-tier',
  templateUrl: './delete-tier.component.html',
  styleUrls: ['./delete-tier.component.scss']
})
export class DeleteTierComponent implements OnInit {

  isCompleted: boolean = false;

  constructor(public spinnerService: SpinnerService, private categoryService: CategoryService, @Inject(MAT_DIALOG_DATA) public data: {
    id: string
  }) { }

  ngOnInit(): void {
    this.spinnerService.hide();
  }

  deleteTier() {
    this.categoryService.deleteTier(this.data.id).subscribe({
      next: (data) => {
        console.log("data")
        this.isCompleted = true;
      },
      error: (err) => {
        console.log("error: " + err)
      }
    })
  }

}
