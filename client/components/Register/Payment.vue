<template>
  <v-sheet
    width="100%"
    height="100%"
    class="d-flex flex-column overflow-y-auto pa-1 rounded-lg"
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
        <v-sheet class="px-2 text-subtitle-2 grey--text" color="transparent">
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
          <span class="text-h5 font-weight-bold grey--text text--darken-2">{{
            $format.currencyFormat(paid)
          }}</span>
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
          <span class="text-h5 font-weight-bold red--text text--lighten-1">{{
            $format.currencyFormat(due)
          }}</span>
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
          <span class="text-h5 font-weight-bold amber--text text--darken-2">{{
            $format.currencyFormat(change)
          }}</span>
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
            :disabled="amountPaid == 0 || numOfItems == 0"
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({})
export default class Payment extends Vue {
  @Prop() readonly cartSubtotal!: number
  @Prop() readonly vat!: number
  @Prop() readonly discount!: number
  @Prop() readonly cartTotal!: number
  @Prop() readonly customers!: string[]
  @Prop() readonly numOfItems!: number
  @Prop() readonly cartItems!: NotWellDefinedObject[]

  customer = 'Walk-in Customer'
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
        this.$emit('orderPaid', {
          paymentSuccessModal: true,
          transactionData: {
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
          },
        })
      }
    }
  }
}
</script>
