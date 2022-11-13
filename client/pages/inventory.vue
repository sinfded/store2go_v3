<template>
  <v-container fluid class="pa-0 ma-0 fill-height">
    <v-sheet width="100%" height="100%" class="d-flex" color="transparent">
      <v-sheet
        height="100%"
        class="d-flex flex-grow-1 flex-column justify-start"
        color="transparent"
      >
        <div class="d-flex mb-4 align-center">
          <v-sheet
            height="48"
            elevation="0"
            rounded="lg"
            class="flex-grow-1 d-flex align-center text-subtitle-2 font-weight-regular"
            color="accent"
          >
            <v-sheet
              class="d-flex justify-center align-center rounded-l-lg"
              :class="[$vuetify.breakpoint.smAndUp ? 'px-3' : 'px-2']"
              color="transparent"
              height="100%"
              elevation="2"
            >
              <v-sheet
                v-if="$vuetify.breakpoint.smAndUp"
                class="mr-2 text-subtitle-2 grey--text text--darken-1"
                color="transparent"
                >Filter</v-sheet
              >

              <v-menu
                v-model="filter.show"
                :close-on-content-click="false"
                :nudge-bottom="20"
                :nudge-left="60"
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    class="rounded"
                    elevation="0"
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-tune-vertical</v-icon>
                  </v-btn>
                </template>

                <v-card rounded="lg" width="250">
                  <v-sheet
                    class="pa-2 pb-0 text-subtitle-2 grey--text text--darken-2"
                    width="100%"
                  >
                    <span class="px-1">Filter By</span>
                    <v-divider class="mt-1"></v-divider>
                  </v-sheet>
                  <v-sheet
                    class="pa-2 pb-0 text-subtitle-2 grey--text text--darken-2"
                    width="100%"
                  >
                    <span class="px-1">Brand</span>
                    <v-combobox
                      v-model="filter.brand"
                      :items="brands"
                      placeholder="Select a brand"
                      outlined
                      hide-details
                      dense
                      class="rounded-lg text-subtitle-2 font-weight-regular mt-1 mx-1"
                    ></v-combobox>

                    <v-divider class="mt-3"></v-divider>
                  </v-sheet>
                  <v-sheet
                    class="pa-2 pb-0 text-subtitle-2 grey--text text--darken-2"
                    width="100%"
                  >
                    <span class="px-1">Category</span>
                    <v-combobox
                      v-model="filter.category"
                      :items="categories"
                      placeholder="Select a category"
                      outlined
                      hide-details
                      dense
                      class="rounded-lg text-subtitle-2 font-weight-regular mt-1 mx-1"
                    ></v-combobox>

                    <v-divider class="mt-3"></v-divider>
                  </v-sheet>
                  <v-sheet
                    class="pa-2 pb-0 text-subtitle-2 grey--text text--darken-2"
                    width="100%"
                  >
                    <span class="px-1">Supplier</span>
                    <v-combobox
                      v-model="filter.supplier"
                      :items="supplier"
                      placeholder="Select a supplier"
                      outlined
                      hide-details
                      dense
                      class="rounded-lg text-subtitle-2 font-weight-regular mt-1 mx-1"
                    ></v-combobox>

                    <v-divider class="mt-3"></v-divider>
                  </v-sheet>
                  <v-sheet
                    class="pa-3 text-subtitle-2 d-flex justify-end"
                    width="100%"
                  >
                    <v-btn
                      @click="filterProducts"
                      class="rounded-lg text-capitalize mr-2"
                      color="primary"
                    >
                      Apply
                    </v-btn>
                    <v-btn
                      @click="filterReset"
                      class="rounded-lg text-capitalize"
                      depressed
                    >
                      Reset
                    </v-btn>
                  </v-sheet>
                </v-card>
              </v-menu>
            </v-sheet>
            <v-divider vertical></v-divider>
            <ProductSearchBar />
          </v-sheet>
          <v-btn
            height="48"
            :width="!$vuetify.breakpoint.smAndUp ? '48' : ''"
            class="ml-4 rounded-lg text-capitalize text-subtitle-2"
            elevation="2"
            color="primary"
            :fab="!$vuetify.breakpoint.smAndUp"
            @click="showProductModal('Add Product')"
          >
            <v-icon :class="[$vuetify.breakpoint.smAndUp ? 'mr-2 ml-n2' : '']"
              >mdi-package-variant-closed-plus</v-icon
            >
            <span v-if="$vuetify.breakpoint.smAndUp">Add Product</span>
          </v-btn>
        </div>

        <v-sheet
          class="flex-grow-1 d-flex flex-column overflow-hidden"
          width="100%"
          height="100%"
          color="accent"
          elevation="2"
          rounded="lg"
          style="position: relative"
        >
          <v-sheet
            class="px-5 py-3 text-sm-subtitle-2 text-caption font-weight-bold rounded-t-lg d-flex align-center justify-center"
            color="primary"
            dark
          >
            <v-checkbox
              hide-details
              :value="selectedProducts.length > 0"
              :indeterminate="selectedProducts.length > 0"
              :disabled="selectedProducts.length < 1"
              @change="emptySelected"
              class="ma-0 mt-n1 mr-2"
            ></v-checkbox>
            <v-row no-gutters align="center">
              <v-col v-if="$vuetify.breakpoint.lgAndUp" cols="1">SKU</v-col>
              <v-col cols="5">Description</v-col>
              <v-col cols="1" class="text-center">Category</v-col>
              <v-col cols="2" class="text-center">Supplier</v-col>
              <v-col cols="1" class="text-center">Stock</v-col>
              <v-col cols="3" lg="2" class="text-center">Price</v-col>
            </v-row>
          </v-sheet>
          <v-sheet
            class="flex-grow-1 overflow-y-auto px-2 pt-2"
            color="transparent"
            width="100%"
          >
            <v-sheet
              v-for="(product, index) in products"
              :key="index"
              height="56"
              elevation="1"
              rounded="lg"
              class="mb-2 px-3 d-flex align-center text-sm-subtitle-2 text-caption font-weight-medium grey--text text--darken-2"
            >
              <v-checkbox
                hide-details
                :value="checkSelected(product.id)"
                class="ma-0 mt-n1 mr-2"
                @change="selectProduct(product.id)"
              ></v-checkbox>
              <v-row no-gutters align="center">
                <v-col v-if="$vuetify.breakpoint.lgAndUp" cols="1">{{
                  product.sku
                }}</v-col>
                <v-col
                  cols="5"
                  class="d-flex flex-column justify-center align-start"
                >
                  <div class="d-flex align-center">
                    <span class="mr-1">{{ product.brand }}</span>
                    <span>
                      {{ product.description }}
                    </span>

                    <v-sheet
                      height="24"
                      class="px-2 rounded-lg ml-2 text-caption font-weight-bold green--text text--darken-1 d-flex align-center"
                      color="green lighten-5"
                    >
                      {{ product.variant }}
                    </v-sheet>
                  </div>
                  <span
                    v-if="$vuetify.breakpoint.mdAndDown"
                    class="grey--text mt-n1 text-caption font-weight-medium"
                    >{{ product.sku }}</span
                  >
                </v-col>
                <v-col cols="1" class="text-center">{{
                  product.category
                }}</v-col>
                <v-col cols="2" class="text-center">{{
                  product.supplier
                }}</v-col>
                <v-col cols="1" class="text-center">
                  <span>{{ $format.numberFormat(product.stock, 1) }}</span>
                </v-col>
                <!-- <v-col cols="3" lg="2" class="text-center"
                  >W: {{ $format.currencyFormat(product.price.wholesale) }} / R:
                  {{ $format.currencyFormat(product.price.retail) }}</v-col
                > -->
                <v-col
                  cols="3"
                  lg="2"
                  class="d-flex align-center justify-center"
                >
                  <v-sheet
                    class="d-flex flex-column px-2 py-1 blue--text text--darken-1 rounded-lg mx-1"
                    color="blue lighten-5"
                    height="auto"
                    width="80"
                  >
                    <span style="font-size: x-small; line-height: 1"
                      >Wholesale</span
                    >
                    <span
                      class="text-caption mt-1 font-weight-medium text-center"
                      style="line-height: 1"
                      >{{
                        $format.currencyFormat(product.price.wholesale)
                      }}</span
                    >
                  </v-sheet>
                  <v-sheet
                    class="d-flex flex-column px-2 py-1 red--text text--darken-1 rounded-lg mx-1"
                    color="red lighten-5"
                    height="auto"
                    width="80"
                  >
                    <span style="font-size: x-small; line-height: 1"
                      >Retail</span
                    >
                    <span
                      class="text-caption mt-1 font-weight-medium text-center"
                      style="line-height: 1"
                      >{{ $format.currencyFormat(product.price.retail) }}</span
                    >
                  </v-sheet>
                </v-col>
              </v-row>
            </v-sheet>
          </v-sheet>
          <v-speed-dial
            v-show="selectedProducts.length > 0 && !$vuetify.breakpoint.mdAndUp"
            v-model="optionBtn"
            absolute
            right
            bottom
            direction="top"
            transition="slide-y-reverse"
            class="mr-n2 mb-n2"
          >
            <template v-slot:activator>
              <v-badge
                :content="selectedProducts.length"
                :value="selectedProducts.length"
                color="grey"
                overlap
              >
                <v-btn
                  v-model="optionBtn"
                  color="primary"
                  dark
                  fab
                  height="40"
                  width="40"
                >
                  <v-icon v-if="optionBtn" @click="emptySelected">
                    mdi-close
                  </v-icon>
                  <v-icon v-else> mdi-menu-up </v-icon>
                </v-btn>
              </v-badge>
            </template>
            <v-btn
              :disabled="selectedProducts.length > 1"
              fab
              small
              :dark="selectedProducts.length == 1"
              color="blue lighten-1"
            >
              <v-icon size="22">mdi-content-copy</v-icon>
            </v-btn>
            <v-btn
              :disabled="selectedProducts.length > 1"
              fab
              small
              :dark="selectedProducts.length == 1"
              color="green lighten-1"
            >
              <v-icon size="22">mdi-pencil-outline</v-icon>
            </v-btn>
            <v-btn
              fab
              small
              color="red lighten-1"
              :dark="selectedProducts.length > 0"
            >
              <v-icon size="22">mdi-trash-can-outline</v-icon>
            </v-btn>
          </v-speed-dial>
        </v-sheet>
        <v-sheet
          width="100%"
          class="mt-4 d-flex align-center justify-end"
          color="transparent"
        >
          <v-sheet
            v-if="selectedProducts.length > 0 && $vuetify.breakpoint.mdAndUp"
            class="flex-grow-1 d-flex px-3 align-center justify-space-between"
            color="accent"
            rounded="lg"
            height="56"
            elevation="2"
          >
            <div class="ml-n2 d-flex align-center">
              <v-btn
                plain
                fab
                height="36"
                width="36"
                class="mr-1"
                @click="emptySelected"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-sheet
                height="24"
                dark
                class="py-2 px-4 d-flex justify-center align-center rounded-pill text-subtitle-2 font-weight-bold"
                color="grey"
              >
                {{ selectedProducts.length }}
              </v-sheet>
              <span class="text-subtitle-2 ml-2"
                >{{
                  selectedProducts.length > 1 ? 'items' : 'item'
                }}
                selected</span
              >
            </div>
            <div>
              <v-btn
                class="rounded-lg text-capitalize white--text text-subtitle-2"
                color="blue lighten-1"
                :disabled="selectedProducts.length > 1"
                @click="cloneProduct('Clone a Product')"
              >
                <v-icon class="ml-n2 mr-2">mdi-content-copy</v-icon> Clone
              </v-btn>
              <v-btn
                class="rounded-lg text-capitalize ml-2 white--text text-subtitle-2"
                color="green lighten-1"
                :disabled="selectedProducts.length > 1"
                @click="updateProduct('Update a Product')"
              >
                <v-icon class="ml-n2 mr-2">mdi-pencil-outline</v-icon> Edit
              </v-btn>
              <v-btn
                dark
                class="rounded-lg text-capitalize ml-2 text-subtitle-2"
                color="red lighten-1"
                @click="productDeleteModal = true"
              >
                <v-icon class="ml-n2 mr-2">mdi-trash-can-outline</v-icon> Delete
              </v-btn>
            </div>
          </v-sheet>
          <v-sheet
            rounded="lg"
            elevation="2"
            color="accent"
            height="56"
            :width="!$vuetify.breakpoint.smAndUp ? '100%' : 'auto'"
            class="d-flex justify-center align-center px-1"
            :class="[$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ma-0']"
          >
            <v-pagination
              v-model="page"
              :length="10"
              :total-visible="5"
            ></v-pagination>
          </v-sheet>
        </v-sheet>
      </v-sheet>
      <v-sheet
        v-if="$vuetify.breakpoint.lgAndUp"
        width="30%"
        min-width="350"
        Cracker
        class="rounded-lg ml-4"
        color="accent"
        elevation="1"
      ></v-sheet>
    </v-sheet>
    <ProductModal
      v-if="productModal.modal"
      :productModal="productModal.modal"
      :cardtitle="productModal.title"
      :method="productModal.method"
      :product="productModal.product"
      v-on:closeModal="closeProductModal"
      v-on:refreshTable="refreshTable"
    />
    <ProductDeleteModal
      :deleteModal="productDeleteModal"
      :products="selectedProducts"
      v-on:closeModal="productDeleteModal = false"
      v-on:confirmDelete="refreshTable"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import ProductModal from '~/components/Modals/ProductModal.vue'
import ProductDeleteModal from '~/components/Modals/ProductDeleteModal.vue'
import ProductSearchBar from '~/components/Inventory/ProductSearchBar.vue'

@Component({
  layout: 'main',
  components: {
    ProductModal,
    ProductDeleteModal,
    ProductSearchBar,
  },
})
export default class Inventory extends Vue {
  searchBG = 'accent'
  btnGroup = undefined
  selectedProducts: string[] = []
  page = 1
  productModal: NotWellDefinedObject = {
    modal: false,
    title: '',
    product: null,
    method: '',
  }
  productDeleteModal = false
  optionBtn = false

  filter: NotWellDefinedObject = {
    show: false,
    brand: '',
    category: '',
    supplier: '',
  }

  brands: string[] = []
  categories: string[] = []
  supplier: string[] = []

  products: NotWellDefinedObject[] = []

  selectProduct(id: string) {
    const selected = this.selectedProducts.find((item: string) => item == id)
    if (selected) {
      this.selectedProducts = this.selectedProducts.filter(
        (item: string) => item != id
      )
    } else {
      this.selectedProducts.push(id)
    }
  }

  emptySelected() {
    this.selectedProducts = []
  }

  checkSelected(id: string) {
    const selected = this.selectedProducts.find((item: string) => item == id)
    if (selected) return true
    else return false
  }

  changeBG(color: string) {
    this.searchBG = color
  }

  showProductModal(cardTitle: string) {
    this.productModal = {
      modal: true,
      title: cardTitle,
    }
  }

  closeProductModal() {
    this.productModal = {
      modal: false,
      title: '',
      product: null,
      method: '',
    }
  }

  refreshTable() {
    this.closeProductModal()
    this.getProducts()
    this.selectedProducts = []
    this.productDeleteModal = false
  }

  updateProduct(cardTitle: string) {
    console.log(this.selectedProducts)
    this.productModal = {
      modal: true,
      title: cardTitle,
      product: this.products.find(
        (product: NotWellDefinedObject) =>
          product.id == this.selectedProducts[0]
      ),
      method: 'update',
    }
    console.log(this.productModal)
  }

  cloneProduct(cardTitle: string) {
    this.productModal = {
      modal: true,
      title: cardTitle,
      product: this.products.find(
        (product: NotWellDefinedObject) =>
          product.id == this.selectedProducts[0]
      ),
      method: 'clone',
    }
  }

  removeProducts() {
    this.productDeleteModal = true
  }

  filterReset() {
    this.filter = {
      show: true,
      brand: '',
      category: '',
      supplier: '',
    }
    this.getProducts()
  }

  filterProducts() {
    this.$inventory
      .filterProducts(this.filter)
      .then((data: NotWellDefinedObject[]) => {
        this.products = data
      })
      .catch((err) => console.error(err))
  }

  getProducts() {
    this.$inventory
      .getAllProducts()
      .then((data: NotWellDefinedObject[]) => {
        this.products = data
      })
      .catch((err) => console.error(err))
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
    this.getProducts()
    this.getBrands()
    this.getCategories()
  }
}
</script>
