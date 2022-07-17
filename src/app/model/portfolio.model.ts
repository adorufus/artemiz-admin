export class Category {
    data?: CategoryData[]
}

class CategoryData {
    _id?: string
    metaname?: string
    category_image_file?: string
    category_name?: string
    portfolio?: Portfolio
}

export class Portfolio {
    data?: PortfolioData
}

export class PortfolioData {
    _id?: string
    category_id?: string
    tier_list?: Tier[]
}

class Tier {
    _id?: string
    metanames?: string[]
    tier_portofolio_images?: string[]
    portfolio_id?: string
    tier_name?: string
    tier_description?: string
    youtube_url?: string
}
