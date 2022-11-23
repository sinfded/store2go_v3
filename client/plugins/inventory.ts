import { Plugin, Context } from '@nuxt/types'
import { NotifierPlugin } from '~/types/plugins/notifier'
import { db } from '~/config/acebase'
import { InventoryPluginImp, ProductData } from '~/types/plugins/inventory'
import { objectToArray } from '~/helper'

const productsRef = db.ref('inventory/products')
const brandsRef = db.ref('inventory/brands')
const categoriesRef = db.ref('inventory/categories')

export class InventoryPlugin implements InventoryPluginImp {
  products: NotWellDefinedObject[] = []
  constructor(context: Context) {}

  get sortedProducts(): ProductData[] {
    return this.products.map((product: NotWellDefinedObject) => {
      return {
        id: product.id,
        description: product.description,
        brand: product.brand,
        category: product.category,
        supplier: product.supplier,
        sku: product.sku,
        variant: product.variant,
        price: product.price,
        stock: product.stock,
      }
    })
  }

  async createProduct(productData: ProductData) {
    const data = {
      sku: productData.sku,
      description: productData.description,
      brand: productData.brand,
      category: productData.category,
      supplier: productData.supplier,
      variant: productData.variant,
      stock: productData.stock * 1,
      price: {
        retail: productData.price.retail * 1,
        wholesale: productData.price.wholesale * 1,
      },
    }
    await this.createBrand(productData.brand)
    await this.createCategory(productData.category)
    const newProduct = await productsRef.push(data)

    return newProduct
  }

  async updateProduct(productData: ProductData) {
    const data = {
      sku: productData.sku,
      description: productData.description,
      brand: productData.brand,
      category: productData.category,
      supplier: productData.supplier,
      variant: productData.variant,
      stock: productData.stock * 1,
      price: {
        retail: productData.price.retail * 1,
        wholesale: productData.price.wholesale * 1,
      },
    }
    const updatedProduct = await productsRef.child(productData.id).update(data)

    return updatedProduct
  }

  async getProduct(productId: string) {
    return await (await productsRef.child(productId).get()).val()
  }

  async getAllProducts(page: number, limit: number) {
    let result: NotWellDefinedObject[] = []

    const products = await db
      .query('inventory/products')
      .take(limit)
      .skip((page - 1) * limit)
      .sort('brand')
      .sort('description')
      .get()
    if (products) {
      products.forEach((product) => {
        const id = product.key
        const value = product.val()

        result.push({ id, ...value })
      })
    } else {
      result = []
    }

    return result
  }

  async removeProducts(productIds: string[]) {
    let result: string = ''
    productIds.forEach(async (id: string) => {
      const res = await productsRef.child(id).remove()
      result = res.key
    })

    return result
  }

  async createBrand(brandName: string) {
    const exist = await this.brandCheck(brandName)
    let newBrand = null
    if (exist == false) {
      newBrand = await brandsRef.push({ name: brandName })
    }

    return newBrand
  }

  async getAllBrands() {
    const brands = await db.query('inventory/brands').get()

    return brands.getValues()
  }

  async brandCheck(brandName: string) {
    const exist = await db
      .query('inventory/brands')
      .filter('name', '==', brandName)
      .exists()

    return exist
  }

  async createCategory(categoryName: string) {
    const exist = await this.categoryCheck(categoryName)
    let newCategory = null
    if (exist == false) {
      newCategory = await categoriesRef.push({ name: categoryName })
    }

    return newCategory
  }

  async getAllCategories() {
    const categories = await db.query('inventory/categories').get()

    return categories.getValues()
  }

  async categoryCheck(categoryName: string) {
    const exist = await db
      .query('inventory/categories')
      .filter('name', '==', categoryName)
      .exists()

    return exist
  }

  async searchProducts(text: string) {
    let result = []
    let queryResult = []

    queryResult = await db
      .query('inventory/products')
      .filter('sku', '==', text)
      .get()

    if (queryResult.getValues().length == 0) {
      let newResult = []
      newResult = await db
        .query('inventory/products')
        .filter('description', 'matches', new RegExp(`${text}`, 'i'))
        .get()

      result = this.convertResultToArray(newResult)
    } else {
      result = this.convertResultToArray(queryResult)
    }

    return result
  }

  async filterProducts(parameters: NotWellDefinedObject) {
    let result: NotWellDefinedObject[] = []
    const { brand, category, supplier } = parameters
    let filterByBrand: NotWellDefinedObject[] = []
    let filterByCategory: NotWellDefinedObject[] = []
    let filterBySupplier: NotWellDefinedObject[] = []

    const arr1 = await db
      .query('inventory/products')
      .filter('brand', '==', brand)
      .get()

    const arr2 = await db
      .query('inventory/products')
      .filter('category', '==', category)
      .get()

    const arr3 = await db
      .query('inventory/products')
      .filter('supplier', '==', supplier)
      .get()

    filterByBrand = this.convertResultToArray(arr1)
    filterByCategory = this.convertResultToArray(arr2)
    filterBySupplier = this.convertResultToArray(arr3)
    console.log(filterByBrand)
    console.log(filterByCategory)
    console.log(new Set([...filterByBrand, ...filterByCategory]))
    result = [...new Set([...filterByBrand, ...filterByCategory])]
    console.log(result)

    return result
  }

  async getProductByCode(productCode: string) {
    let product: NotWellDefinedObject | null = {}
    const query = db
      .query('inventory/products')
      .filter('sku', '==', productCode)

    if ((await query.count()) > 0) {
      product = this.convertResultToArray(await query.get())[0]
    } else {
      product = null
    }

    return product
  }

  async getProductsCount(): Promise<number> {
    return await db.query('inventory/products').count()
  }

  convertResultToArray(array: NotWellDefinedObject[]) {
    let result: NotWellDefinedObject[] = []
    array.forEach((item) => {
      const id = item.key
      const value = item.val()

      result.push({ id, ...value })
    })

    return result
  }
}

const inventoryPlugin: Plugin = function (context, inject) {
  inject('inventory', new InventoryPlugin(context))
}

export default inventoryPlugin
