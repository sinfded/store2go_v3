<template>
  <v-dialog v-model="showModal" persistent max-width="300px">
    <v-card rounded="lg" color="accent">
      <v-row no-gutters justify="end" class="px-2 pt-2">
        <v-btn icon @click="$emit('closeModal')">
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </v-row>
      <v-sheet
        width="100%"
        color="transparent"
        class="d-flex flex-column justify-center align-center pt-2 pb-4"
      >
        <v-icon size="72" color="green accent-3">
          mdi-check-circle-outline
        </v-icon>
        <span class="green--text text--accent-3 text-subtitle-1"
          >Payment successful!</span
        >
      </v-sheet>
      <v-sheet
        class="mx-auto pa-4 d-flex flex-column align-center overflow-y-auto overflow-x-hidden cambria-text black--text"
        width="270px"
        max-height="450px"
        color="white"
        rounded="0"
        elevation="2"
      >
        <span class="text-center line-height font14 font-weight-bold">{{
          store.name
        }}</span>
        <span class="text-center line-height font12" style="width: 170px">{{
          store.address
        }}</span>
        <span class="text-center line-height font12">{{ store.tin }}</span>
        <span class="text-center line-height font12">{{
          payment.dateTime
        }}</span>
        <v-sheet width="100%" color="transparent" class="black--text">
          <v-row
            no-gutters
            justify="space-between"
            class="mt-4 font12 border-bottom pb-1"
          >
            <v-col cols="3">Desc</v-col>
            <v-col cols="3" class="text-center">Qty</v-col>
            <v-col cols="3" class="text-center">Price</v-col>
            <v-col cols="3" class="text-right">Amount</v-col>
          </v-row>
          <v-row
            no-gutters
            justify="space-between"
            class="font12 py-1 line-height"
            :class="[index + 1 == cart.items.length ? 'border-bottom' : '']"
            v-for="(item, index) in cart.items"
            :key="index"
          >
            <v-col cols="12">{{ item.description }}</v-col>
            <v-col cols="3" class="text-center"></v-col>
            <v-col cols="3" class="text-center">{{ item.quantity }}</v-col>
            <v-col cols="3" class="text-center">{{
              $format.numberFormat(item.price, 2)
            }}</v-col>
            <v-col cols="3" class="text-right">{{
              $format.numberFormat(item.subtotal, 2)
            }}</v-col>
          </v-row>
          <div class="d-flex justify-center font12">
            <span style="width: 50%">Subtotal</span>
            <div class="flex-grow-1 d-flex justify-space-between">
              <span>:</span>
              <span class="ml-auto">{{
                $format.numberFormat(cart.subtotal, 2)
              }}</span>
            </div>
          </div>
          <div class="d-flex justify-center font12">
            <span style="width: 50%">Discount</span>
            <div class="flex-grow-1 d-flex justify-space-between">
              <span>:</span>
              <span class="ml-auto">{{
                $format.numberFormat(payment.discount, 2)
              }}</span>
            </div>
          </div>
          <div class="d-flex justify-center font12">
            <span style="width: 50%">Sales Tax</span>
            <div class="flex-grow-1 d-flex justify-space-between">
              <span>:</span>
              <span class="ml-auto">{{
                $format.numberFormat(payment.vat, 2)
              }}</span>
            </div>
          </div>
          <div class="d-flex justify-center font12">
            <span style="width: 50%">Amount Due</span>
            <div class="flex-grow-1 d-flex justify-space-between">
              <span>:</span>
              <span class="ml-auto">{{
                $format.numberFormat(cart.total, 2)
              }}</span>
            </div>
          </div>
          <div class="d-flex justify-center font12">
            <span style="width: 50%">Amount Paid</span>
            <div class="flex-grow-1 d-flex justify-space-between">
              <span>:</span>
              <span class="ml-auto">{{
                $format.numberFormat(payment.amountPaid, 2)
              }}</span>
            </div>
          </div>
          <div class="d-flex justify-center font14 font-weight-bold">
            <span style="width: 50%">Change</span>
            <div class="flex-grow-1 d-flex justify-space-between">
              <span>:</span>
              <span class="ml-auto">{{
                $format.numberFormat(payment.change, 2)
              }}</span>
            </div>
          </div>
        </v-sheet>
      </v-sheet>
      <v-sheet class="py-4 d-flex justify-center" color="transparent">
        <v-btn
          @click="printReceipt"
          width="270"
          large
          class="rounded-lg"
          color="primary"
          ><v-icon class="mr-2"> mdi-printer </v-icon> Print
        </v-btn>
      </v-sheet>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class PaymentSuccessModal extends Vue {
  @Prop() readonly showModal!: boolean
  @Prop() readonly transactionData!: NotWellDefinedObject

  store: NotWellDefinedObject = {}
  payment: NotWellDefinedObject = {}
  cart: NotWellDefinedObject = {}

  async printReceipt() {
    const printData = this.formatPrintData(this.store, this.cart.items)
    const printJob = await this.$order.print(printData)
    if (printJob.data.status == 'done') {
      this.$emit('closeModal')
    }
  }

  formatPrintData(
    storeData: NotWellDefinedObject,
    cartItem: NotWellDefinedObject[]
  ) {
    let printData: NotWellDefinedObject[] = [
      // {
      //   type: 'image',
      //   url: path(__dirname, "assets"), // file path
      //   position: 'center', // position of image: 'left' | 'center' | 'right'
      //   width: '160px', // width of image in px; default: auto
      //   height: '60px', // width of image in px; default: 50 or '50px'
      // },
      {
        type: 'text',
        value: storeData.name,
        style: {
          fontWeight: '700',
          textAlign: 'center',
          fontSize: '14px',
          fontFamily: 'Cambria',
        },
      },
      {
        type: 'text',
        value: storeData.address,
        style: {
          fontSize: '12px',
          textAlign: 'center',
          fontWeight: '500',
          fontFamily: 'Cambria',
          lineHeight: 1.1,
          width: '120px',
          margin: 'auto',
        },
      },
      {
        type: 'text',
        value: storeData.tin,
        style: {
          fontSize: '12px',
          textAlign: 'center',
          fontWeight: '500',
          fontFamily: 'Cambria',
          lineHeight: 1.1,
        },
      },
      {
        type: 'text',
        value: this.payment.dateTime,
        style: {
          fontSize: '12px',
          textAlign: 'center',
          fontWeight: '500',
          fontFamily: 'Cambria',
          marginBottom: '12px',
          lineHeight: 1,
        },
      },
      {
        type: 'table',
        style: {
          fontSize: '12px',
          fontWeight: '500',
          fontFamily: 'Cambria',
        },
        tableHeader: [
          {
            type: 'text',
            value: 'Desc',
            style: { textAlign: 'left', width: '50px' },
          },
          'Qty',
          'Price',
          {
            type: 'text',
            value: 'Amount',
            style: { textAlign: 'right' },
          },
        ],
        tableBody: [],
        tableFooter: [],
        tableHeaderStyle: {
          borderBottom: '2px solid #000',
        },
        tableBodyStyle: {
          borderBottom: '1px solid #fff',
        },
        tableFooterStyle: {},
      },
    ]

    cartItem.forEach((item: NotWellDefinedObject) => {
      const descArray = {
        type: 'text',
        value: item.description,
        style: {
          fontSize: '12px',
          textAlign: 'left',
          fontWeight: '500',
          fontFamily: 'Cambria',
          marginTop: '5px',
        },
      }
      const infoArray = {
        type: 'table',
        style: {
          fontSize: '12px',
          fontWeight: '500',
          fontFamily: 'Cambria',
          lineHeight: 1,
          border: 'none',
        },
        tableHeader: [],
        tableBody: [
          [
            {
              type: 'text',
              value: '',
              style: { textAlign: 'center', width: '55px' },
            },
            {
              type: 'text',
              value: item.quantity,
              style: { textAlign: 'center' },
            },
            {
              type: 'text',
              value: this.$format.numberFormat(item.price, 2),
              style: { textAlign: 'center' },
            },
            {
              type: 'text',
              value: this.$format.numberFormat(item.subtotal, 2),
              style: { textAlign: 'right' },
            },
          ],
        ],
        tableFooter: [],
        tableHeaderStyle: {},
        tableBodyStyle: {
          borderTop: 'none',
        },
        tableFooterStyle: {},
      }

      printData.push(descArray)
      printData.push(infoArray)
    })

    printData.push({
      type: 'table',
      style: {
        fontSize: '12px',
        fontWeight: '500',
        fontFamily: 'Cambria',
        borderTop: '2px solid #000',
      },
      tableHeader: [],
      tableBody: [
        [
          {
            type: 'text',
            value: 'Subtotal',
            style: { textAlign: 'left', width: '80px' },
          },
          ':',
          {
            type: 'text',
            value: this.$format.numberFormat(this.cart.subtotal, 2),
            style: { textAlign: 'right', width: '90px' },
          },
        ],
        [
          {
            type: 'text',
            value: 'Discount',
            style: { textAlign: 'left', width: '80px' },
          },
          ':',
          {
            type: 'text',
            value: this.$format.numberFormat(this.payment.discount, 2),
            style: { textAlign: 'right', width: '90px' },
          },
        ],
        [
          {
            type: 'text',
            value: 'Sales Tax',
            style: { textAlign: 'left', width: '80px' },
          },
          ':',
          {
            type: 'text',
            value: this.$format.numberFormat(this.payment.vat, 2),
            style: { textAlign: 'right', width: '90px' },
          },
        ],
        [
          {
            type: 'text',
            value: 'Amount Due',
            style: { textAlign: 'left', width: '80px' },
          },
          ':',
          {
            type: 'text',
            value: this.$format.numberFormat(this.cart.total, 2),
            style: { textAlign: 'right', width: '90px' },
          },
        ],
        [
          {
            type: 'text',
            value: 'Amount Paid',
            style: { textAlign: 'left', width: '80px' },
          },
          ':',
          {
            type: 'text',
            value: this.$format.numberFormat(this.payment.amountPaid, 2),
            style: { textAlign: 'right', width: '90px' },
          },
        ],
        [
          {
            type: 'text',
            value: 'Change',
            style: {
              textAlign: 'left',
              width: '80px',
              fontSize: '16px',
              fontWeight: '700',
            },
          },
          ':',
          {
            type: 'text',
            value: this.$format.currencyFormat(this.payment.change),
            style: {
              textAlign: 'right',
              width: '90px',
              fontSize: '16px',
              fontWeight: '700',
            },
          },
        ],
      ],
      tableFooter: [],
      tableHeaderStyle: {},
      tableBodyStyle: {
        borderBottom: 'none',
        lineHeight: 0.5,
      },
      tableFooterStyle: {},
    })
    return printData
  }

  created() {
    const { store, cart, payment } = this.transactionData
    this.cart = cart
    this.store = store
    this.payment = payment
  }
}
</script>

<style scoped>
.line-height {
  line-height: 1.2;
}

.font11 {
  font-size: 12px;
}

.font14 {
  font-size: 16px;
}

.font12 {
  font-size: 13px;
}

.border-bottom {
  border-bottom: 2px solid #000;
}

.cambria-text {
  font-family: Cambria, serif;
}
</style>
