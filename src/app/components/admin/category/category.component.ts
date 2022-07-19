import { Component, Inject, Input, OnInit } from '@angular/core'
import { Category } from 'src/app/model/portfolio.model'
import { CategoryService } from 'src/app/services/category.service'
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog'
import { CreateCategoryDialogComponent } from './dialog/create-category-dialog/create-category-dialog.component'
import { SpinnerService } from 'src/app/services/spinner.service'
import { PortfolioComponent } from '../portfolio/portfolio.component'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  category?: Category

  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.fetchCategories()
  }

  openDeleteDialog(id: string) {
    const dialogRef = this.dialog.open(DialogCategoryDelete, {
      data: {
        id: id,
      },
    })
  }

  openEditDialog(name: string, id?: string, currentTitle?: string) {
    const dialogRef = this.dialog.open(CreateCategoryDialogComponent, {
      width: '30%',
      data: {
        dialogNameData: name,
        idData: id,
        currentTitle: currentTitle,
      },
    })
  }

  openDetailDialog(id: string) {
    const dialogRef = this.dialog.open(PortfolioComponent, {
      data: {
        categoryId: id,
      },
    })
  }

  fetchCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.category = data
      },
      complete: () => {
        console.log('categories fetched')
      },
      error: (err) => {
        console.log(err)
      },
    })
  }

  addCategory(categoryName: string, image_file: File) {
    this.categoryService.addCategory(categoryName, image_file).subscribe({
      next: (data) => {
        console.log(data)
      },
      complete: () => {
        console.log('category created!')
      },
      error: (err) => {
        console.log(err)
      },
    })
  }
}

@Component({
  selector: 'dialog-category',
  templateUrl: 'delete-category-dialog.html',
})
export class DialogCategoryDelete {
  isCompleted = false
  constructor(
    public dialogRef: MatDialogRef<DialogCategoryDelete>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private categoryService: CategoryService,
    public spinnerService: SpinnerService,
  ) {}

  ngOnInit(): void {
    this.spinnerService.hide()
  }

  deleteCategory() {
    console.log(this.data.id)
    this.spinnerService.show()
    this.categoryService.deleteCategory(this.data.id!).subscribe({
      next: (data) => {
        console.log(data)
        this.spinnerService.hide()
        this.isCompleted = true
      },
      complete: () => {
        console.log('delete completed')
        this.spinnerService.hide()
        this.isCompleted = true
      },
      error: (err) => {
        console.log(err)
        this.spinnerService.hide()
      },
    })
  }
}
