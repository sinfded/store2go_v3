import '@nuxt/types'

export type ProductData = {
  id: string
  sku: string
  description: string
  brand: string
  category: string
  supplier: string
  variant: string
  stock: number
  price: ProductPrice
}

type ProductPrice = {
  retail: number
  wholesale: number
}

type Supplier = {
  name: string
  address: {
    street: string
    barangay: string
    municipality: string
  }
}

export interface InventoryPluginImp {
  products: NotWellDefinedObject[]
  sortedProducts: ProductData[]

  createProduct(productData: ProductData): Promise<NotWellDefinedObject>
  updateProduct(productData: ProductData): Promise<NotWellDefinedObject>
  getProduct(productId: string): Promise<NotWellDefinedObject>
  getAllProducts(page: number, limit: number): Promise<NotWellDefinedObject[]>
  filterProducts(
    parameters: NotWellDefinedObject
  ): Promise<NotWellDefinedObject[]>
  getAllBrands(): Promise<NotWellDefinedObject[]>
  getAllCategories(): Promise<NotWellDefinedObject[]>
  searchProducts(text: string): Promise<NotWellDefinedObject[]>
  removeProducts(productIds: string[]): Promise<string>
  getProductByCode(productCode: string): Promise<NotWellDefinedObject | null>
  getProductsCount(): Promise<number>
}
