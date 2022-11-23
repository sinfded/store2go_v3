<template>
  <v-dialog v-model="productModal" persistent max-width="700px">
    <v-card rounded="lg">
      <v-sheet class="px-3 py-2" dark color="primary">
        <v-row no-gutters align="center">
          <span class="text-subtitle-1 font-weight-medium">{{
            cardtitle
          }}</span>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
          <v-btn icon class="mr-n1" @click="$emit('closeModal')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
      </v-sheet>
      <v-sheet width="100%" class="px-2 pt-1">
        <v-row no-gutters>
          <v-col cols="12" class="mb-3">
            <div
              class="text-subtitle-1 font-weight-medium grey--text text--darken-2 my-1 pl-1"
            >
              General
            </div>
            <v-divider></v-divider>
          </v-col>
          <v-col cols="12" class="d-flex px-1">
            <v-text-field
              v-model="productData.sku"
              outlined
              label="SKU or barcode"
              autofocus
              dense
              hide-details
              prepend-icon="mdi-barcode"
              class="rounded-lg text-subtitle-2 font-weight-regular"
            >
            </v-text-field>
            <v-btn
              dark
              class="rounded-lg text-capitalize ml-3 text-subtitle-2"
              color="primary"
              height="40"
              :width="!$vuetify.breakpoint.smAndUp ? '40' : ''"
              :fab="!$vuetify.breakpoint.smAndUp"
            >
              <v-icon>mdi-barcode-scan</v-icon>
              <span v-if="$vuetify.breakpoint.smAndUp" class="ml-2">Scan</span>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="5" class="px-1 pt-3">
            <v-combobox
              v-model="productData.brand"
              :items="brands"
              outlined
              label="Brand"
              dense
              hide-details
              prepend-icon="mdi-tag"
              class="rounded-lg text-subtitle-2 font-weight-regular"
            >
            </v-combobox>
          </v-col>
          <v-col cols="12" sm="7" class="px-1 pt-3">
            <v-text-field
              v-model="productData.description"
              outlined
              label="Description"
              dense
              hide-details
              prepend-icon="mdi-package-variant-closed"
              class="rounded-lg text-subtitle-2 font-weight-regular"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" class="px-1 pt-3">
            <v-combobox
              v-model="productData.category"
              :items="categories"
              outlined
              label="Category"
              dense
              hide-details
              prepend-icon="mdi-shape"
              class="rounded-lg text-subtitle-2 font-weight-regular"
            >
            </v-combobox>
          </v-col>
          <v-col cols="12" sm="6" class="px-1 pt-3">
            <v-combobox
              v-model="productData.supplier"
              outlined
              label="Supplier"
              dense
              hide-details
              prepend-icon="mdi-human-dolly"
              class="rounded-lg text-subtitle-2 font-weight-regular"
            >
            </v-combobox>
          </v-col>
          <v-col cols="12" sm="8" class="px-1 pt-3">
            <v-text-field
              v-model="productData.variant"
              outlined
              label="Variant or Size"
              dense
              hide-details
              prepend-icon="mdi-plus-box-multiple"
              class="rounded-lg text-subtitle-2 font-weight-regular"
            >
            </v-text-field
          ></v-col>
          <v-col cols="12" sm="4" class="px-1 pt-3">
            <v-text-field
              v-model="productData.stock"
              outlined
              label="Stock"
              dense
              hide-details
              type="number"
              prepend-icon="mdi-plus-minus-box"
              class="rounded-lg text-subtitle-2 font-weight-regular"
            >
            </v-text-field
          ></v-col>
          <v-col cols="12">
            <div
              class="text-subtitle-1 font-weight-medium grey--text text--darken-2 my-1 pl-1"
            >
              Pricing
            </div>
            <v-divider></v-divider>
          </v-col>
          <v-col cols="12" class="px-1">
            <v-row no-gutters class="pt-3">
              <v-col
                cols="12"
                sm="6"
                :class="[$vuetify.breakpoint.smAndUp ? 'pr-1' : '']"
              >
                <v-text-field
                  v-model="productData.price.retail"
                  outlined
                  label="Retail"
                  dense
                  hide-details
                  type="number"
                  prepend-icon="mdi-currency-php"
                  class="rounded-lg text-subtitle-2 font-weight-regular mb-2"
                >
                </v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                :class="[$vuetify.breakpoint.smAndUp ? 'pl-1' : '']"
              >
                <v-text-field
                  v-model="productData.price.wholesale"
                  outlined
                  label="Wholesale"
                  dense
                  hide-details
                  type="number"
                  prepend-icon="mdi-currency-php"
                  class="rounded-lg text-subtitle-2 font-weight-regular"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-sheet>
      <v-sheet width="100%" class="pa-3">
        <v-row no-gutters justify="end">
          <v-btn
            v-if="method == 'update'"
            color="primary"
            class="text-capitalize mr-2 rounded-lg"
            width="100"
            @click="updateProduct"
          >
            Update
          </v-btn>
          <v-btn
            v-else
            color="primary"
            class="text-capitalize mr-2 rounded-lg"
            width="100"
            @click="saveProduct"
          >
            Save
          </v-btn>
          <v-btn
            depressed
            class="text-capitalize rounded-lg"
            width="100"
            @click="cancel"
          >
            Cancel
          </v-btn>
        </v-row>
      </v-sheet>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { ProductData } from '~/types/plugins/inventory'

@Component({})
export default class ProductModal extends Vue {
  @Prop() readonly productModal!: boolean
  @Prop() readonly cardtitle!: string
  @Prop() readonly method!: string
  @Prop() readonly product!: ProductData

  productData: ProductData = {
    id: '',
    sku: '',
    description: '',
    brand: '',
    category: '',
    supplier: '',
    variant: '',
    stock: 1,
    price: {
      retail: 0,
      wholesale: 0,
    },
  }

  brands: string[] = []
  categories: string[] = []

  priceModes: NotWellDefinedObject[] = [
    {
      text: 'Retail',
      value: 'retail',
    },
    {
      text: 'Wholesale',
      value: 'wholesale',
    },
  ]

  async saveProduct() {
    const res = await this.$inventory.createProduct(this.productData)
    if (res) this.$emit('refreshTable')
  }

  async updateProduct() {
    const res = await this.$inventory.updateProduct(this.productData)
    if (res) this.$emit('refreshTable')
  }

  cancel() {
    this.productData = {
      id: '',
      sku: '',
      description: '',
      brand: '',
      category: '',
      supplier: '',
      variant: '',
      stock: 1,
      price: {
        retail: 0,
        wholesale: 0,
      },
    }
    this.$emit('closeModal')
  }

  getBrands() {
    this.$inventory
      .getAllBrands()
      .then((data: NotWellDefinedObject[]) => {
        this.brands = data.map((brand: NotWellDefinedObject) => {
          return brand.name
        })
      })
      .catch((err) => console.error(err))
  }

  getCategories() {
    this.$inventory
      .getAllCategories()
      .then((data: NotWellDefinedObject[]) => {
        this.categories = data.map((category: NotWellDefinedObject) => {
          return category.name
        })
      })
      .catch((err) => console.error(err))
  }

  created() {
    this.getBrands()
    this.getCategories()
    if (this.method == 'update') {
      this.productData = this.product
    } else if (this.method == 'clone') {
      const { description, sku, brand, category, supplier } = this.product
      this.productData = {
        id: '',
        sku: sku,
        description: description,
        brand: brand,
        category: category,
        supplier: supplier,
        variant: '',
        stock: 1,
        price: {
          retail: 0,
          wholesale: 0,
        },
      }
    }
  }
}
</script>
