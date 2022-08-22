import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { NewsService } from 'src/app/services/news.service'
import { SpinnerService } from 'src/app/services/spinner.service'

@Component({
  selector: 'app-create-edit-dialog',
  templateUrl: './create-edit-dialog.component.html',
  styleUrls: ['./create-edit-dialog.component.scss'],
})
export class CreateEditDialogComponent implements OnInit {
  @ViewChild('fileInput') fileInput?: ElementRef

  fileAttr = 'Choose File'
  dialogName = ''
  isCompleted = false
  newsTitle = ''
  article = ''
  fileToUpload?: File
  primaryButtonText = ''
  imageUrl: string = ''

  constructor(
    public spinnerService: SpinnerService,
    private newsService: NewsService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      dialogNameData: string
      idData: string
      currentTitle: string
      currentArticle: string
      currentImage: string
    },
  ) {
    this.imageUrl = this.data.currentImage ?? ""
  }

  

  uploadFile(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = ''
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.fileAttr += file.name + ' - '
      })

      this.fileToUpload = imgFile.target.files[0]

      // HTML5 FileReader API
      let reader = new FileReader()
      reader.onload = (e: any) => {
        let image = new Image()
        image.src = e.target.result

        image.onload = (rs) => {
          let imgBase64Path = e.target.result
        }
      }
      reader.readAsDataURL(imgFile.target.files[0])
      // Reset if duplicate image uploaded again
      this.fileInput!.nativeElement.value = ''
    } else {
      this.fileAttr = 'Choose File'
    }
  }

  proccess() {
    if (this.dialogName == 'Edit') {
      this.updateNews();
    } else {
      this.createNews()
    }
  }

  createNews() {
    this.spinnerService.show()
    this.newsService
      .createNews(this.article, this.newsTitle, this.fileToUpload!)
      .subscribe({
        next: (data) => {
          console.log(data)
          this.spinnerService.hide()
        },
        complete: () => {
          this.spinnerService.hide()
          console.log('news created')
          this.isCompleted = true
        },
        error: (err) => {
          this.spinnerService.hide()
          console.log(err)
        },
      })
  }

  updateNews() {
    this.spinnerService.show()
    if(this.imageUrl !== "") {
      this.newsService.updateNews(this.article, this.newsTitle, this.imageUrl, this.data.idData).subscribe({
        next: (data) => {
          this.spinnerService.hide()
          this.isCompleted = true
        },
        error: (err) => {
          this.spinnerService.hide()
          console.log(err)
        }
      })
    }
  }

  ngOnInit(): void {
    this.spinnerService.hide()
    this.dialogName = this.data.dialogNameData
    this.newsTitle = this.data.currentTitle ?? ''
    this.article = this.data.currentArticle ?? ''

    if (this.dialogName === 'Edit') {
      this.primaryButtonText = 'Update'
    } else {
      this.primaryButtonText = 'Create'
    }
  }
}
