import { Component, Inject, OnInit } from '@angular/core'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ActivatedRoute } from '@angular/router'
import { Tier, TierData } from 'src/app/model/portfolio.model'
import { CategoryService } from 'src/app/services/category.service'
import { SpinnerService } from 'src/app/services/spinner.service'
import { CreateTierComponent } from './create-tier/create-tier/create-tier.component'
import { DeleteTierComponent } from './delete-tier/delete-tier/delete-tier.component'
import { EditTierComponent } from './edit-tier/edit-tier.component'

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  tier?: TierData
  isCompleted: boolean = false

  constructor(
    public spinnerService: SpinnerService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      categoryId: string
    },
  ) {
    this.spinnerService.hide()
  }

  ngOnInit(): void {
    this.getCategory()
  }

  openAddTier() {
    this.dialog.open(CreateTierComponent, {
      data: {
        categoryId: this.data.categoryId,
      },
    })
  }

  openEditTier(id?: string, tier_name?: string, tier_description?: string, youtube_url?: string) {
    this.dialog.open(EditTierComponent, {
      data: {
        tierId: id,
        tierName: tier_name,
        tierDescription: tier_description,
        youtubeUrl: youtube_url
      }
    })
  }

  openDeleteTier(id: string) {
    this.dialog.open(DeleteTierComponent, {
      data: {
        id: id
      }
    })
  }

  getCategory() {
    this.categoryService.getTierByCategory(this.data.categoryId).subscribe({
      next: (data) => {
        console.log(data)
        this.tier = data
      },
      complete: () => {
        console.log('category detail Success')
      },
      error: (err) => {
        console.log(err)
      },
    })
  }
}
