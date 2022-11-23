<template>
  <v-dialog v-model="orderModal" persistent max-width="700px">
    <v-card rounded="lg">
      <v-sheet class="px-3 py-2" dark color="primary">
        <v-row no-gutters align="center">
          <span class="text-subtitle-1 font-weight-medium">New Order</span>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
          <v-btn icon class="mr-n1" @click="$emit('closeModal')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
      </v-sheet>
      <v-sheet width="100%" class="pa-3 pb-0">
        <v-sheet
          height="100%"
          class="d-flex flex-grow-1 flex-column justify-start"
          color="transparent"
        >
          <div class="d-flex mb-3 align-center">
            <ProductSearchBar
              v-on:addToCart="addToCart"
              v-on:scanDone="productScan = false"
              :scanning="productScan"
            />
            <v-btn
              fab
              tile
              height="48"
              width="48"
              class="ml-4 rounded-lg"
              elevation="2"
              color="primary"
              @click="onProductScan"
              :loading="productScan"
            >
              <v-icon>mdi-barcode-scan</v-icon>
            </v-btn>
          </div>
          <v-sheet
            class="flex-grow-1 d-flex flex-column overflow-hidden"
            width="100%"
            height="100%"
            color="accent"
            elevation="2"
            rounded="lg"
          >
            <v-sheet
              class="px-5 py-3 text-sm-subtitle-2 text-caption font-weight-bold rounded-t-lg"
              color="primary"
              dark
            >
              <v-row no-gutters align="center">
                <v-col cols="6">Description</v-col>
                <v-col cols="3" class="text-center">Qty.</v-col>
                <v-col cols="3" class="text-center">Price</v-col>
              </v-row>
            </v-sheet>
            <v-sheet
              class="flex-grow-1 overflow-y-auto px-2 pt-2"
              color="transparent"
              width="100%"
              height="300"
            >
              <v-sheet
                v-for="(item, index) in cartItems"
                :key="index"
                height="56"
                elevation="1"
                rounded="lg"
                class="mb-2 px-3 d-flex align-content-center text-sm-subtitle-2 text-caption font-weight-medium"
              >
                <v-row no-gutters align="center">
                  <v-col cols="6" class="d-flex flex-column justify-start">
                    <div class="d-flex flex-column justify-center align-start">
                      <div class="d-flex align-center">
                        <span>
                          {{ item.description }}
                        </span>
                        <v-sheet
                          height="20"
                          class="px-2 rounded-lg ml-2 text-caption font-weight-bold green--text text--darken-1 d-flex align-center"
                          color="green lighten-5"
                        >
                          {{ item.variant }}
                        </v-sheet>
                      </div>
                      <v-sheet
                        width="100%"
                        class="d-flex grey--text mt-n1"
                        style="font-size: x-small"
                        color="transparent"
                      >
                        <span>{{ item.sku }}</span>
                      </v-sheet>
                    </div>
                  </v-col>
                  <v-col cols="3">
                    <v-sheet
                      width="80"
                      max-width="100%"
                      class="d-flex justify-space-between align-center mx-auto"
                    >
                      <v-btn
                        tile
                        fab
                        :dark="item.quantity == 1"
                        elevation="1"
                        height="24"
                        width="24"
                        class="rounded"
                        :class="[item.quantity == 1 ? 'red lighten-1' : '']"
                        @click="decreaseQty(item)"
                      >
                        <v-icon v-if="item.quantity > 1" small
                          >mdi-minus</v-icon
                        >
                        <v-icon v-else small>mdi-trash-can-outline</v-icon>
                      </v-btn>
                      <span>{{ item.quantity }}</span>
                      <v-btn
                        tile
                        fab
                        elevation="1"
                        height="24"
                        width="24"
                        class="rounded"
                        @click="increaseQty(item)"
                      >
                        <v-icon small>mdi-plus</v-icon>
                      </v-btn>
                    </v-sheet>
                  </v-col>
                  <v-col cols="3">
                    <v-sheet class="d-flex align-center justify-center">
                      <v-card
                        class="d-flex flex-column px-2 py-1 blue--text text--darken-1 rounded-lg mx-1"
                        color="blue lighten-5"
                        height="auto"
                        width="80"
                        flat
                        disabled
                      >
                        <span style="font-size: x-small; line-height: 1"
                          >Wholesale</span
                        >
                        <span
                          class="text-caption mt-1 font-weight-medium text-center"
                          style="line-height: 1"
                          >{{
                            $format.currencyFormat(item.price.wholesale)
                          }}</span
                        >
                      </v-card>
                      <v-card
                        class="d-flex flex-column px-2 py-1 red--text text--darken-1 rounded-lg mx-1"
                        color="red lighten-5"
                        height="auto"
                        width="80"
                        flat
                        disabled
                      >
                        <span style="font-size: x-small; line-height: 1"
                          >Retail</span
                        >
                        <span
                          class="text-caption mt-1 font-weight-medium text-center"
                          style="line-height: 1"
                          >{{ $format.currencyFormat(item.price.retail) }}</span
                        >
                      </v-card>
                    </v-sheet></v-col
                  >
                </v-row>
              </v-sheet>
            </v-sheet>
          </v-sheet>
        </v-sheet>
      </v-sheet>
      <v-sheet width="100%" class="pa-3">
        <v-row no-gutters justify="end">
          <v-btn
            width="100"
            color="primary"
            class="text-capitalize mr-2 rounded-lg"
            @click="saveOrder"
          >
            Save
          </v-btn>
          <v-btn
            width="100"
            depressed
            class="text-capitalize rounded-lg"
            @click="cancelOrder"
          >
            Cancel
          </v-btn>
        </v-row>
      </v-sheet></v-card
    >
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import ProductSearchBar from '../Inventory/ProductSearchBar.vue'

@Component({
  components: {
    ProductSearchBar,
  },
})
export default class OrderModal extends Vue {
  @Prop() readonly orderModal!: boolean

  customer = 'Walk-in Customer'
  productScan = false
  items: NotWellDefinedObject[] = []

  get cartItems() {
    return this.items.map((item: NotWellDefinedObject) => {
      return {
        id: item.id,
        sku: item.sku,
        brand: item.brand,
        variant: item.variant,
        description: item.description,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price['wholesale'] * item.quantity,
      }
    })
  }

  addToCart(product: NotWellDefinedObject) {
    let cartItem = this.items.find(
      (item: NotWellDefinedObject) => item.id == product.id
    )
    if (cartItem) {
      cartItem.quantity += 1
    } else {
      this.items.push(product)
    }
  }

  increaseQty(item: NotWellDefinedObject) {
    this.items = this.items.map((i: NotWellDefinedObject) => {
      if (i.id == item.id) {
        i.quantity = item.quantity + 1
      }
      return i
    })
  }

  decreaseQty(item: NotWellDefinedObject) {
    if (item.quantity > 1) {
      this.items = this.items.map((i: NotWellDefinedObject) => {
        if (i.id == item.id) {
          i.quantity = item.quantity - 1
        }
        return i
      })
    } else {
      this.items = this.items.filter(
        (i: NotWellDefinedObject) => i.id != item.id
      )
    }
  }

  onProductScan() {
    if (!this.productScan) {
      this.productScan = true
    } else {
      this.productScan = false
    }
  }

  cancelOrder() {
    this.items = []
    this.productScan = false
    this.$emit('closeModal')
  }

  async saveOrder() {
    await this.$order.newOrder(this.cartItems)
    this.cancelOrder()
  }
}
</script>
