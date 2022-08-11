import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { CategoryService } from 'src/app/services/category.service'
import { SpinnerService } from 'src/app/services/spinner.service'

@Component({
  selector: 'app-create-tier',
  templateUrl: './create-tier.component.html',
  styleUrls: ['./create-tier.component.scss'],
})
export class CreateTierComponent implements OnInit {
  urls: {url: string, type: any}[] = []
  isCompleted: boolean = false
  tierName: string = ''
  tierDescription: string = ''
  youtubeUrl: string = ''
  fileToUpload: File[] = []
  types: string[] = []

  constructor(
    public spinnerService: SpinnerService,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      categoryId: string
    },
  ) {
    this.spinnerService.hide()
    console.log(this.data.categoryId)
  }

  uploadFile(imgFile: any) {
    if (imgFile.target.files) {
      console.log(this.fileToUpload)
      for (let i = 0; i < imgFile.target.files.length; i++) {
        this.fileToUpload.push(imgFile.target.files[i])
        var type = imgFile.target.files[i].type.split('/')

        this.types.push(type[0])

        console.log('files' + this.fileToUpload.toString())

        var reader = new FileReader()
        reader.readAsDataURL(imgFile.target.files[i])

        reader.onload = (events: any) => {
          this.urls?.push({
            url: events.target.result as string,
            type: imgFile.target.files[i].type
          })
        }

        console.log(this.urls)
        console.log(this.types)
      }
    }
  }

  createTier() {
    this.spinnerService.show()
    this.categoryService
      .createTier(
        this.tierName,
        this.data.categoryId,
        this.fileToUpload,
        this.types,
        this.tierDescription,
        this.youtubeUrl,
      )
      .subscribe({
        next: (data) => {
          console.log(data)
          this.spinnerService.hide()
          this.isCompleted = true
        },
        error: (err) => {
          console.log(err)
          this.spinnerService.hide()
        },
      })
  }

  ngOnInit(): void {}
}
