export class Category {
    data?: CategoryData[]
}

class CategoryData {
    _id?: string
    metaname?: string
    category_image_file?: string
    category_name?: string
    tier_list?: Tier[]
}

export class TierData {
    data?: Tier[]
}

export class Tier {
    _id?: string
    tier_portofolio_files?: FilesData[]
    category_id?: string
    tier_name?: string
    tier_description?: string
    youtube_url?: string
}

export class FilesData {
    _id?: string
    url?: string
    type?: string

}
