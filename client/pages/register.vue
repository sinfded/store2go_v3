<template>
  <v-container fluid class="pa-0 ma-0 fill-height">
    <v-sheet
      tabindex="0"
      width="100%"
      height="100%"
      class="d-flex"
      color="transparent"
      ref="registerPage"
    >
      <v-sheet
        height="100%"
        class="d-flex flex-grow-1 flex-column justify-start"
        color="transparent"
      >
        <div class="d-flex mb-4 align-center">
          <ProductSearchBar
            v-on:addToCart="addToCart"
            v-on:scanDone="productScan = false"
            :scanning="productScan"
          />

          <v-btn
            icon
            tile
            height="48"
            width="48"
            class="ml-4 rounded-l-lg"
            elevation="2"
            :class="[pricingOption == 'retail' ? 'primary' : '']"
            @click="updateOrderPricing('retail')"
          >
            <v-icon
              size="28"
              :color="pricingOption == 'retail' ? 'white' : 'grey darken-1'"
              >mdi-store</v-icon
            >
          </v-btn>
          <v-btn
            tile
            icon
            height="48"
            width="48"
            class="rounded-r-lg"
            elevation="2"
            :class="[pricingOption == 'wholesale' ? 'primary' : '']"
            @click="updateOrderPricing('wholesale')"
          >
            <v-icon
              size="28"
              :color="pricingOption == 'wholesale' ? 'white' : 'grey darken-1'"
              >mdi-dolly</v-icon
            >
          </v-btn>
          <v-btn
            @click="onProductScan"
            :loading="productScan"
            fab
            tile
            height="48"
            width="48"
            class="ml-4 rounded-lg"
            elevation="2"
            color="primary"
          >
            <v-icon>mdi-barcode-scan</v-icon>
          </v-btn>
        </div>
        <v-sheet
          class="flex-grow-1 d-flex flex-column overflow-hidden"
          width="100%"
          height="100%"
          elevation="2"
          rounded="lg"
        >
          <v-sheet
            class="px-5 py-3 text-sm-subtitle-2 text-caption font-weight-bold rounded-t-lg"
            color="primary"
            dark
          >
            <v-row no-gutters align="center">
              <v-col cols="5">Description</v-col>
              <v-col cols="2" class="text-center">Price</v-col>
              <v-col cols="3" lg="2" class="text-center">Qty.</v-col>
              <v-col cols="2" class="text-right">Subtotal</v-col>
            </v-row>
          </v-sheet>
          <v-sheet
            class="flex-grow-1 overflow-y-auto px-2 pt-2"
            color="transparent"
            width="100%"
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
                <v-col cols="5" class="d-flex flex-column justify-start">
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
                <v-col cols="2" class="text-center">{{
                  $format.currencyFormat(item.price)
                }}</v-col>
                <v-col cols="3" lg="2">
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
                      <v-icon v-if="item.quantity > 1" small>mdi-minus</v-icon>
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
                <v-col cols="2" class="text-right">{{
                  $format.currencyFormat(item.subtotal)
                }}</v-col>
              </v-row>
            </v-sheet>
          </v-sheet>
        </v-sheet>
        <v-sheet
          v-if="$vuetify.breakpoint.smAndDown"
          width="100%"
          elevation="2"
          class="mt-4"
          rounded="lg"
        >
          <v-row no-gutters class="fill-height">
            <v-col cols="12" md="5" class="px-2 pt-2">
              <div class="d-flex align-center">
                <v-combobox
                  v-model="customer"
                  :items="customers"
                  dense
                  outlined
                  class="rounded-lg text-subtitle-2 font-weight-regular"
                  :menu-props="{ bottom: true, offsetY: true }"
                  hide-details
                ></v-combobox>
                <v-btn
                  fab
                  tile
                  height="38"
                  width="38"
                  class="ml-2 rounded-lg"
                  elevation="2"
                  outlined
                >
                  <v-icon color="grey darken-1">mdi-account-plus</v-icon>
                </v-btn>
              </div>
            </v-col>
            <v-col cols="8" md="5" class="text-subtitle-2 pa-2">
              <v-row no-gutters>
                <span class="grey--text">Subtotal</span>
                <v-spacer></v-spacer>
                <span>{{ $format.currencyFormat(cartSubtotal) }}</span>
              </v-row>
              <v-row no-gutters>
                <span class="grey--text">Discount</span>
                <v-spacer></v-spacer>
                <span>{{ $format.numberFormat(discount, 2) }}</span>
              </v-row>
              <v-row no-gutters>
                <span class="grey--text">Sales Tax</span>
                <v-spacer></v-spacer>
                <span>{{ $format.numberFormat(vat, 2) }}</span>
              </v-row>
              <v-divider></v-divider>
              <v-row no-gutters class="text-h6 font-weight-bold primary--text">
                <span>Total</span>
                <v-spacer></v-spacer>
                <span>{{ $format.currencyFormat(cartTotal) }}</span>
              </v-row>
            </v-col>
            <v-col cols="4" md="2" class="pa-2">
              <v-card
                @click="paymentModal = !paymentModal"
                dark
                ripple
                width="100%"
                height="100%"
                color="primary"
                rounded="lg"
                elevation="3"
                class="d-flex flex-column justify-center align-center"
                style="cursor: pointer"
              >
                <v-sheet
                  width="56"
                  height="56"
                  color="primary lighten-1"
                  class="d-flex justify-center align-center rounded-circle"
                >
                  <v-icon size="40">mdi-credit-card-outline</v-icon>
                </v-sheet>
                <span class="text-subtitle-2">Payment</span>
              </v-card>
            </v-col>
          </v-row>
        </v-sheet>
      </v-sheet>
      <v-sheet
        v-if="$vuetify.breakpoint.mdAndUp"
        elevation="2"
        rounded="lg"
        width="350"
        height="100%"
        class="rounded-lg ml-4 d-flex flex-column overflow-y-auto pa-1"
      >
        <v-sheet color="transparent">
          <div class="d-flex align-center px-2 pt-2">
            <v-combobox
              v-model="customer"
              :items="customers"
              dense
              outlined
              class="rounded-lg text-subtitle-2 font-weight-regular"
              :menu-props="{ bottom: true, offsetY: true }"
              hide-details
            ></v-combobox>
            <v-btn
              fab
              tile
              height="38"
              width="38"
              class="ml-2 rounded-lg"
              outlined
              color="grey darken-1"
            >
              <v-icon color="grey darken-1">mdi-account-plus</v-icon>
            </v-btn>
          </div>
          <div class="text-subtitle-2 pa-2 pb-0">
            <v-row no-gutters>
              <span class="grey--text">Subtotal</span>
              <v-spacer></v-spacer>
              <span>{{ $format.currencyFormat(cartSubtotal) }}</span>
            </v-row>
            <v-row no-gutters>
              <span class="grey--text">Discount</span>
              <v-spacer></v-spacer>
              <span>{{ $format.numberFormat(discount, 2) }}</span>
            </v-row>
            <v-row no-gutters>
              <span class="grey--text">Sales Tax</span>
              <v-spacer></v-spacer>
              <span>{{ $format.numberFormat(vat, 2) }}</span>
            </v-row>
            <v-divider></v-divider>
            <v-row no-gutters align="center">
              <span
                class="text-subtitle-1 font-weight-medium red--text text--lighten-1"
                >TOTAL</span
              >
              <v-spacer></v-spacer>
              <span class="text-h6 font-weight-bold">{{
                $format.currencyFormat(cartTotal)
              }}</span>
            </v-row>
          </div>
        </v-sheet>
        <v-sheet color="transparent" height="100%" class="flex overflow-y-auto">
          <v-sheet color="transparent">
            <v-sheet
              class="px-2 text-subtitle-2 grey--text"
              color="transparent"
            >
              Add Payment
            </v-sheet>
            <v-sheet
              color="transparent"
              width="100%"
              class="px-1 pt-1 d-flex flex-wrap justify-space-between"
            >
              <v-sheet
                color="transparent"
                v-for="(method, index) in methods"
                :key="index"
                class="mx-1"
              >
                <v-btn
                  @click="selectedMethod = method.value"
                  :disabled="method.disable"
                  color="teal"
                  small
                  height="40"
                  :outlined="selectedMethod != method.value"
                  class="mb-2 white--text rounded-lg"
                >
                  <v-icon class="mr-1" size="28">{{ method.icon }}</v-icon
                  >{{ method.text }}
                </v-btn>
              </v-sheet>
            </v-sheet>
            <v-sheet color="transparent">
              <div v-if="selectedMethod == 'cash'" class="px-1">
                <v-text-field
                  v-model="amountPaid"
                  outlined
                  label="Amount"
                  dense
                  clearable
                  clear-icon="mdi-close-circle-outline"
                  hide-details
                  prepend-icon="mdi-currency-php"
                  class="rounded-lg mx-1"
                >
                </v-text-field>
                <v-sheet
                  color="transparent"
                  width="100%"
                  class="pt-2 d-flex flex-wrap justify-center"
                >
                  <v-sheet
                    color="transparent"
                    width="33.3333%"
                    v-for="(denomination, index) in denominations"
                    :key="index"
                    v-show="denomination > cartTotal"
                    class="px-1"
                  >
                    <v-btn
                      @click="setAmountPaid(denomination)"
                      color="teal"
                      small
                      height="40"
                      block
                      class="mb-2 white--text rounded-lg text-subtitle-2"
                    >
                      {{ $format.currencyFormat(denomination) }}
                    </v-btn>
                  </v-sheet>
                  <v-sheet width="100%" class="px-1" color="transparent">
                    <v-btn
                      @click="setAmountPaid(cartTotal)"
                      color="teal"
                      small
                      height="40"
                      block
                      class="mb-2 white--text rounded-lg text-subtitle-2"
                    >
                      Whole Amount
                    </v-btn>
                  </v-sheet>
                </v-sheet>
              </div>
              <div v-if="selectedMethod == 'cheque'" class="mb-2 px-2">
                <v-row no-gutters>
                  <v-col cols="12" class="mb-2">
                    <v-combobox
                      :items="banks"
                      label="Bank"
                      autofocus
                      outlined
                      dense
                      hide-details
                      prepend-icon="mdi-bank"
                      class="rounded-lg"
                    >
                    </v-combobox>
                  </v-col>
                  <v-col cols="12" class="mb-2">
                    <v-text-field
                      label="Branch"
                      outlined
                      dense
                      hide-details
                      prepend-icon="mdi-map-marker"
                      class="rounded-lg"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="mb-2">
                    <v-text-field
                      label="Check #"
                      outlined
                      dense
                      hide-details
                      prepend-icon="mdi-numeric"
                      class="rounded-lg"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="amountPaid"
                      label="Amount"
                      outlined
                      dense
                      hide-details
                      prepend-icon="mdi-currency-php"
                      class="rounded-lg"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>
            </v-sheet>
          </v-sheet>
        </v-sheet>
        <v-sheet color="transparent">
          <v-row no-gutters class="px-2">
            <v-col
              cols="6"
              class="px-3 text-center font-weight-bold grey lighten-3 rounded-l-lg"
            >
              <v-sheet
                width="100%"
                color="transparent"
                class="text-left grey--text text--darken-1"
                >PAID
              </v-sheet>
              <span
                class="text-h5 font-weight-bold grey--text text--darken-2"
                >{{ $format.currencyFormat(paid) }}</span
              >
            </v-col>
            <v-col
              cols="6"
              class="px-3 text-center font-weight-bold red lighten-4 rounded-r-lg"
            >
              <v-sheet
                width="100%"
                color="transparent"
                class="text-left grey--text text--darken-1"
                >DUE
              </v-sheet>
              <span
                class="text-h5 font-weight-bold red--text text--lighten-1"
                >{{ $format.currencyFormat(due) }}</span
              >
            </v-col>
            <v-col
              cols="12"
              class="px-3 mt-2 text-center font-weight-bold amber lighten-4 rounded-lg"
              v-if="selectedMethod == 'cash'"
            >
              <v-sheet
                width="100%"
                color="transparent"
                class="text-left grey--text text--darken-1"
                >CHANGE
              </v-sheet>
              <span
                class="text-h5 font-weight-bold amber--text text--darken-2"
                >{{ $format.currencyFormat(change) }}</span
              >
            </v-col>
            <v-col cols="12" class="py-2">
              <v-card
                @click="payOrder"
                dark
                ripple
                width="100%"
                height="100%"
                min-height="105"
                color="primary"
                rounded="lg"
                elevation="3"
                class="d-flex flex-column justify-center align-center"
                style="cursor: pointer"
                :disabled="amountPaid == 0 || cartItems.length == 0"
              >
                <v-sheet
                  width="56"
                  height="56"
                  color="primary lighten-1"
                  class="d-flex justify-center align-center rounded-circle"
                >
                  <v-icon size="40">mdi-credit-card-outline</v-icon>
                </v-sheet>
                <span class="text-subtitle-2">Pay</span>
              </v-card>
            </v-col>
          </v-row>
        </v-sheet>
      </v-sheet>
    </v-sheet>
    <PaymentModal
      v-if="paymentModal"
      :showModal="paymentModal"
      :toPay="cartTotal"
      v-on:closeModal="paymentModal = false"
    />
    <PaymentSuccessModal
      v-if="paymentSuccessModal"
      :showModal="paymentSuccessModal"
      :transactionData="transactionData"
      v-on:closeModal="onPrintDone"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import PaymentModal from 'Component/Modals/PaymentModal.vue'
import ProductScanModal from 'Component/Modals/ProductScanModal.vue'
import ProductSearchBar from '~/components/Inventory/ProductSearchBar.vue'
import PaymentSuccessModal from '~/components/Modals/PaymentSuccessModal.vue'

@Component({
  layout: 'main',
  middleware: 'authenticated',
  components: {
    PaymentModal,
    ProductSearchBar,
    ProductScanModal,
    PaymentSuccessModal,
  },
})
export default class Register extends Vue {
  view_format = 0
  searchBG = 'accent'
  discount = 0
  vat = 0
  customer = 'Walk-in Customer'
  pricingOption = 'wholesale'
  paymentModal = false
  paymentSuccessModal = false
  productScan = false
  transactionData: NotWellDefinedObject = {}

  items: NotWellDefinedObject[] = []

  customers: string[] = ['Walk-in Customer']
  selectedMethod = 'cash'
  amountPaid = 0

  denominations: number[] = [1, 5, 10, 20, 50, 100, 200, 500, 1000]

  methods: NotWellDefinedObject[] = [
    {
      text: 'Cash',
      value: 'cash',
      icon: 'mdi-cash',
      disable: false,
    },
    {
      text: 'Cheque',
      value: 'cheque',
      icon: 'mdi-checkbook',
      disable: true,
    },
    {
      text: 'Credit Card',
      value: 'credit_card',
      icon: 'mdi-credit-card-outline',
      disable: true,
    },
    {
      text: 'Debit Card',
      value: 'debit_card',
      icon: 'mdi-credit-card-outline',
      disable: true,
    },
  ].sort((a: any, b: any) => (a.disable === b.disable ? 0 : a.disable ? 1 : -1))

  banks: string[] = [
    'BDO Unibank',
    'Bank of the Philippine Islands',
    'Land Bank of the Phlippines',
    'Unionbank',
    'Bank of Makati',
    'East West Bank',
    'Philippine National Bank',
    'Development Bank of the Philippines',
    'Metrobank',
    'China Bank',
  ].sort()

  get cartItems() {
    return this.items.map((item: NotWellDefinedObject) => {
      return {
        id: item.id,
        sku: item.sku,
        brand: item.brand,
        variant: item.variant,
        description: item.description,
        price: item.price[this.pricingOption],
        quantity: item.quantity,
        subtotal: item.price[this.pricingOption] * item.quantity,
      }
    })
  }

  set cartItems(items: NotWellDefinedObject[]) {
    const productIds = items.map((item: NotWellDefinedObject) => item.id)
    productIds.forEach(async (id: string) => {
      let product = await this.$inventory.getProduct(id)

      let cartItem = {
        id: id,
        sku: product.sku,
        brand: product.brand,
        variant: product.variant,
        description: product.description,
        price: product.price,
        quantity: items.find((item) => item.id == id)?.quantity,
      }
      this.items.push(cartItem)
    })
  }

  get cartSubtotal() {
    return this.cartItems.reduce((total: any, curr: NotWellDefinedObject) => {
      return total + curr.subtotal
    }, 0)
  }

  get cartTotal() {
    return this.cartSubtotal - this.discount - this.vat
  }

  get change() {
    if (this.amountPaid < this.cartTotal) return 0
    else return this.amountPaid - this.cartTotal
  }

  get due() {
    if (this.amountPaid < this.cartTotal)
      return this.cartTotal - this.amountPaid
    else return 0
  }

  get paid() {
    if (this.amountPaid < this.cartTotal) return 0
    else return this.cartTotal
  }

  savePrint() {
    this.$emit('closeModal')
  }

  setAmountPaid(amount: number) {
    this.amountPaid = amount
  }

  async payOrder() {
    const currentOrderId = localStorage.getItem('currentOrderId') as string
    console.log(this.customer)
    if (currentOrderId) {
      const dateTime = `${new Date()
        .toDateString()
        .substring(4, 16)} ${new Date().toLocaleTimeString()}`
      const paidOrder = await this.$order.payOrder(currentOrderId, {
        status: 'paid',
        payment: {
          method: this.selectedMethod,
          vat: this.vat,
          customer: this.customer,
          discount: this.discount,
          amountPaid: this.amountPaid,
          change: this.change,
          dateTime: dateTime,
        },
      })
      console.log(paidOrder)
      if (paidOrder.status == 'paid') {
        this.paymentSuccessModal = true
        this.transactionData = {
          store: {
            name: 'Lucky Savers Mini Store',
            address: 'P-5, Alawihao, Daet, Camarines Norte',
            tin: '916-931-669-0000',
          },
          cart: {
            items: this.cartItems,
            subtotal: this.cartSubtotal,
            total: this.cartTotal,
            numOfItems: this.cartItems.length,
          },
          payment: {
            method: this.selectedMethod,
            customer: this.customer,
            vat: this.vat,
            discount: this.discount,
            amountPaid: this.amountPaid,
            change: this.change,
            dateTime: dateTime,
          },
        }
      }
    }
  }

  addToCart(product: NotWellDefinedObject) {
    let cartItem = this.items.find(
      (item: NotWellDefinedObject) => item.id == product.id
    )
    const currentOrderId = localStorage.getItem('currentOrderId')

    if (cartItem) {
      console.log('update')
      cartItem.quantity += 1
      if (currentOrderId != null) {
        this.$order.updateOrderProperty(
          `/orders/${currentOrderId}/items`,
          this.cartItems
        )
      }
    } else {
      this.items.push(product)
      if (currentOrderId != null) {
        console.log('update')
        this.$order.updateOrderProperty(
          `/orders/${currentOrderId}/items`,
          this.cartItems
        )
      } else {
        console.log('new')
        this.$order.createOrder(this.cartItems)
      }
    }
  }

  onProductScan() {
    if (!this.productScan) {
      this.productScan = true
    } else {
      this.productScan = false
    }
  }

  onPrintDone() {
    this.paymentSuccessModal = false
    localStorage.removeItem('currentOrderId')
    this.cartItems = []
    this.items = []
    this.selectedMethod = 'cash'
    this.customer = 'Walk-in Customer'
  }

  updateOrderItems() {
    const currentOrderId = localStorage.getItem('currentOrderId')
    if (currentOrderId) {
      this.$order.updateOrderProperty(
        `/orders/${currentOrderId}/items`,
        this.cartItems
      )
    }
  }

  updateOrderPricing(pricing: string) {
    this.pricingOption = pricing
    const currentOrderId = localStorage.getItem('currentOrderId')
    if (currentOrderId) {
      this.$order.updateOrderProperty(
        `/orders/${currentOrderId}/pricing`,
        pricing
      )
      this.updateOrderItems()
    }
  }

  increaseQty(item: NotWellDefinedObject) {
    this.items = this.items.map((i: NotWellDefinedObject) => {
      if (i.id == item.id) {
        i.quantity = item.quantity + 1
      }
      return i
    })
    this.updateOrderItems()
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

    this.updateOrderItems()
  }

  onKeyUp(event: any) {
    console.log(event)
  }

  changeBG(color: string) {
    this.searchBG = color
  }

  created() {
    this.$nuxt.$on('setCurrentOrder', async (data: any) => {
      const currentOrder = await this.$order.setCurrentOrder(data)
      this.items = currentOrder.items
      this.pricingOption = currentOrder.pricing
    })
  }

  async mounted() {
    const currentOrderId =
      this.$settings.getUserSettings()?.currentOrderId ||
      localStorage.getItem('currentOrderId')
    if (currentOrderId) {
      localStorage.setItem('currentOrderId', currentOrderId)
      const currentOrder = await this.$order.getOrder(currentOrderId)
      this.pricingOption = currentOrder.pricing
      this.cartItems = currentOrder.items
    }

    const registerPage = (this.$refs['registerPage'] as Vue).$el as HTMLElement
    registerPage.addEventListener('keyup', (e) => {
      if (e.key === 'w') this.pricingOption = 'wholesale'
      else if (e.key === 'r') this.pricingOption = 'retail'
    })

    const allCustomers = await this.$order.getAllCustomers()
    this.customers = allCustomers.map(
      (customer: NotWellDefinedObject) => customer.name
    )
    this.customers.push('Walk-in Customer')
  }
}
</script>
