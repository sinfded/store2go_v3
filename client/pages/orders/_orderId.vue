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
            v-if="payment.paidAt != null"
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
        <v-sheet width="350"> </v-sheet>
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
            color="accent"
            class="flex-grow-1 mb-4 px-4 py-2"
            elevation="2"
            rounded="lg"
          >
            <span class="text-subtitle-1 font-weight-medium">Cart</span>
          </v-sheet>
          <v-sheet
            width="100%"
            color="accent"
            elevation="2"
            rounded="lg"
            class="px-4 py-2"
          >
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
          color="accent"
          height="100%"
          elevation="2"
          rounded="lg"
          class="px-4 py-2"
        >
          <v-sheet color="transparent">
            <span class="text-subtitle-1 font-weight-medium">Activity</span>
            <v-sheet class="pa-3 d-flex mt-2" elevation="1" rounded="lg">
              <div
                class="text-subtitle-2 d-flex flex-column mr-2"
                style="min-width: 82px"
              >
                <span>{{ getTimeline(order.createdAt).date }}</span>
                <span class="text-caption">{{
                  getTimeline(order.createdAt).time
                }}</span>
              </div>
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
              <div
                class="text-subtitle-2 d-flex flex-column mr-2"
                style="min-width: 82px"
              >
                <span>{{ getTimeline(payment.dateTime).date }}</span>
                <span class="text-caption">{{
                  getTimeline(payment.dateTime).time
                }}</span>
              </div>
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
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component({
  layout: 'main',
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

  getTimeline(dateTime: string | number) {
    const timestamp = new Date(dateTime)
    const date = timestamp.toDateString().substring(4, 16)
    const time = timestamp.toLocaleTimeString()

    return { date, time }
  }

  async created() {
    this.order = await this.$order.getOrder(this.$route.params.orderId)
    this.payment = this.order.payment || {}
  }
}
</script>
