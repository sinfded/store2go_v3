<template>
  <v-container fluid class="pa-0 ma-0 fill-height">
    <v-sheet
      width="100%"
      height="100%"
      class="d-flex flex-column"
      color="transparent"
    >
      <v-sheet
        width="100%"
        class="d-flex align-center mb-4"
        color="transparent"
      >
        <v-sheet
          class="flex-grow-1 d-flex align-center"
          style="line-height: 1"
          color="transparent"
        >
          <span class="text-h6 font-weight-bold mr-4">
            <span class="grey--text text--darken-2">Order</span>
            <span class="primary--text">
              #{{ $format.orderIdFormat(order.orderId) }}</span
            >
          </span>
          <v-sheet
            v-if="payment.dateTime != null"
            height="20"
            class="px-2 rounded-lg text-caption font-weight-bold blue--text text--darken-1 d-flex align-center text-capitalize mr-3"
            color="blue lighten-5"
          >
            Paid
          </v-sheet>
          <div class="mr-3">
            <v-sheet
              v-if="order.status == 'pending'"
              height="20"
              class="px-2 rounded-lg text-caption font-weight-bold amber--text text--darken-1 d-flex align-center text-capitalize"
              color="amber lighten-5"
            >
              {{ order.status }}
            </v-sheet>
            <v-sheet
              v-else-if="order.status == 'fulfilled'"
              height="20"
              class="px-2 rounded-lg text-caption font-weight-bold green--text text--darken-1 d-flex align-center text-capitalize"
              color="green lighten-5"
            >
              {{ order.status }}
            </v-sheet>
            <v-sheet
              v-else
              height="20"
              class="px-2 rounded-lg text-caption font-weight-bold red--text text--darken-1 d-flex align-center text-capitalize"
              color="red lighten-5"
            >
              {{ order.status }}
            </v-sheet>
          </div>
          <v-divider v-if="payment.dateTime" vertical></v-divider>
          <div v-if="payment.dateTime" class="ml-3 d-flex align-center">
            <v-icon color="grey darken-2" size="22">mdi-calendar</v-icon>
            <span class="text-subtitle-2 grey--text text--darken-2 ml-1">{{
              payment.dateTime
            }}</span>
          </div>
        </v-sheet>
        <v-sheet width="350" color="transparent" class="d-flex justify-end">
          <!-- <v-btn @click="showReceipt = true" color="primary" class="rounded-lg">
            <v-icon>mdi-receipt-text</v-icon> Receipt
          </v-btn> -->
          <v-btn
            v-if="payment.dateTime != null"
            height="48"
            :width="!$vuetify.breakpoint.smAndUp ? '48' : ''"
            class="ml-4 rounded-lg text-capitalize text-subtitle-2"
            elevation="2"
            dark
            color="grey darken-1"
            :fab="!$vuetify.breakpoint.smAndUp"
            @click="showReceipt = true"
          >
            <v-icon :class="[$vuetify.breakpoint.smAndUp ? 'mr-2 ' : '']"
              >mdi-receipt-text</v-icon
            >
            <span v-if="$vuetify.breakpoint.smAndUp">Receipt</span>
          </v-btn>
        </v-sheet>
      </v-sheet>
      <v-sheet
        width="100%"
        height="100%"
        class="flex-grow-1 d-flex"
        color="transparent"
      >
        <v-sheet
          height="100%"
          color="transparent"
          class="flex-grow-1 mr-4 d-flex flex-column"
        >
          <v-sheet
            width="100%"
            class="flex-grow-1 mb-4 pa-2"
            elevation="2"
            rounded="lg"
          >
            <span class="text-subtitle-1 font-weight-medium px-2">Cart</span>
            <v-sheet
              class="flex-grow-1 d-flex flex-column overflow-hidden"
              width="100%"
              color="transparent"
            >
              <v-sheet
                class="py-3 px-5 text-sm-subtitle-2 text-caption"
                color="transparent"
              >
                <v-row no-gutters align="center">
                  <v-col v-if="$vuetify.breakpoint.lgAndUp" cols="1">SKU</v-col>
                  <v-col cols="5" lg="4">Description</v-col>
                  <v-col cols="2" class="text-center">Price</v-col>
                  <v-col cols="3" lg="2" class="text-center">Qty.</v-col>
                  <v-col cols="2" class="text-right">Subtotal</v-col>
                </v-row>
              </v-sheet>
              <v-divider class="mx-2"></v-divider>
              <v-sheet
                class="flex-grow-1 overflow-y-auto pt-2 px-2"
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
                    <v-col v-if="$vuetify.breakpoint.lgAndUp" cols="1">{{
                      item.sku
                    }}</v-col>
                    <v-col
                      cols="5"
                      lg="4"
                      class="d-flex flex-column justify-start"
                    >
                      <div
                        class="d-flex flex-column justify-center align-start"
                      >
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
                          v-if="$vuetify.breakpoint.mdAndDown"
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
                        class="d-flex justify-center align-center mx-auto"
                      >
                        <span>{{ item.quantity }}</span>
                      </v-sheet>
                    </v-col>
                    <v-col cols="2" class="text-right">{{
                      $format.currencyFormat(item.subtotal)
                    }}</v-col>
                  </v-row>
                </v-sheet>
              </v-sheet>
            </v-sheet>
          </v-sheet>
          <v-sheet width="100%" elevation="2" rounded="lg" class="px-4 py-2">
            <span class="text-subtitle-1 font-weight-medium"
              >Payment Summary</span
            >
            <v-row no-gutters class="text-subtitle-2 mt-2">
              <v-col cols="8">
                <span>
                  <span class="grey--text text--darken-3"> Subtotal </span>
                  <span class="grey--text text--darkent-1">{{
                    numOfItems
                  }}</span>
                </span>
              </v-col>
              <v-col cols="4" class="text-right">{{
                $format.currencyFormat(subtotal)
              }}</v-col>
              <v-col cols="8">
                <span class="grey--text text--darken-3"> Discount </span>
              </v-col>
              <v-col cols="4" class="text-right">{{
                $format.numberFormat(payment.discount || 0, 2)
              }}</v-col>
              <v-col cols="8">
                <span class="grey--text text--darken-3"> Sales Tax </span>
              </v-col>
              <v-col cols="4" class="text-right">{{
                $format.numberFormat(payment.vat || 0, 2)
              }}</v-col>
            </v-row>
            <v-divider class="mt-2"></v-divider>
            <v-row no-gutters class="text-subtitle-2 pt-2">
              <v-col cols="8">
                <span class="grey--text text--darken-3">
                  Amount paid by customer
                </span>
              </v-col>
              <v-col cols="4" class="text-right">{{
                $format.currencyFormat(totalPaid)
              }}</v-col>
            </v-row>
          </v-sheet>
        </v-sheet>
        <v-sheet
          width="350"
          height="100%"
          elevation="2"
          rounded="lg"
          class="px-4 py-2"
        >
          <v-sheet color="transparent">
            <span class="text-subtitle-1 font-weight-medium">Activity</span>
            <v-sheet class="pa-3 d-flex mt-2" elevation="1" rounded="lg">
              <v-sheet
                class="text-subtitle-2 d-flex flex-column mr-2"
                min-width="83"
              >
                <span>{{ getTimeline(order.createdAt).date }}</span>
                <span class="text-caption">{{
                  getTimeline(order.createdAt).time
                }}</span>
              </v-sheet>
              <v-divider vertical></v-divider>
              <div class="ml-2 flex-grow-1 d-flex flex-column">
                <span class="text-subtitle-2 font-weight-medium primary--text"
                  >Order created.</span
                >
              </div>
            </v-sheet>
            <v-sheet
              v-if="payment.dateTime"
              class="pa-3 d-flex mt-2"
              elevation="1"
              rounded="lg"
            >
              <v-sheet
                class="text-subtitle-2 d-flex flex-column mr-2"
                min-width="83"
              >
                <span>{{ getTimeline(payment.dateTime).date }}</span>
                <span class="text-caption">{{
                  getTimeline(payment.dateTime).time
                }}</span>
              </v-sheet>
              <v-divider vertical></v-divider>
              <div class="ml-2 flex-grow-1 d-flex flex-column">
                <p
                  class="text-subtitle-2 font-weight-medium primary--text mb-0"
                >
                  Order had been fulfilled and paid.
                </p>
              </div>
            </v-sheet>
          </v-sheet>
        </v-sheet>
      </v-sheet>
    </v-sheet>
    <ReceiptModal
      v-if="payment.dateTime != null"
      :transactionData="receiptData"
      :showModal="showReceipt"
      v-on:closeModal="showReceipt = false"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ReceiptModal from '~/components/Modals/ReceiptModal.vue'

@Component({
  layout: 'main',
  middleware: 'authenticated',
  components: {
    ReceiptModal,
  },
})
export default class OrderPage extends Vue {
  order: NotWellDefinedObject = {
    createdAt: 0,
    customer: '',
    items: [],
    orderId: 0,
    payment: {},
    pricing: '',
    status: '',
  }
  payment: NotWellDefinedObject = {}
  receiptData: NotWellDefinedObject = {}

  showReceipt = false

  get numOfItems() {
    if (this.order.items == undefined) return 0
    else {
      if (this.order.items.length == 1)
        return `(${this.order.items.length} item)`
      else return `(${this.order.items.length} items)`
    }
  }

  get subtotal() {
    if (this.order.items == undefined) return 0
    else
      return this.order.items.reduce(
        (total: any, curr: NotWellDefinedObject) => {
          return total + curr.subtotal
        },
        0
      )
  }

  get totalPaid() {
    if (!this.order.payment) return 0
    else {
      const { discount, vat } = this.order.payment
      return this.subtotal - discount - vat
    }
  }

  get cartItems() {
    if (this.order.items == undefined) return []
    else
      return this.order.items.map((item: NotWellDefinedObject) => {
        return {
          id: item.id,
          sku: item.sku,
          brand: item.brand,
          variant: item.variant,
          description: item.description,
          price: item.price,
          quantity: item.quantity,
          subtotal: item.subtotal,
        }
      })
  }

  getTimeline(dateTime: string | number) {
    const timestamp = new Date(dateTime)
    const date = timestamp.toDateString().substring(4, 16)
    const time = timestamp.toLocaleTimeString()

    return { date, time }
  }

  async created() {
    this.order = await this.$order.getOrder(this.$route.params.orderId)
    this.payment = this.order.payment || {}
    this.receiptData = {
      store: {
        name: 'Lucky Savers Mini Store',
        address: 'P-5, Alawihao, Daet, Camarines Norte',
        tin: '916-931-669-0000',
      },
      cart: {
        items: this.order.items,
        subtotal: this.subtotal,
        total: this.totalPaid,
        numOfItems: this.order.items.length,
      },
      payment: this.payment,
    }
  }
}
</script>
