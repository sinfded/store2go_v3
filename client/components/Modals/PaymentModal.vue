<template>
  <v-dialog v-model="showModal" persistent max-width="400px">
    <v-card rounded="lg">
      <v-sheet class="px-3 py-2" dark color="primary">
        <v-row no-gutters align="center">
          <span class="text-subtitle-1 font-weight-medium">Payment Method</span>
          <v-spacer></v-spacer>
          <v-btn icon class="mr-n2" @click="$emit('closeModal')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
      </v-sheet>
      <slot></slot>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class PaymentModal extends Vue {
  @Prop() readonly showModal!: boolean
  @Prop() readonly toPay!: number

  selectedMethod = 'cash'
  amountPaid = 0

  methods: NotWellDefinedObject[] = [
    {
      text: 'Cash',
      value: 'cash',
      icon: 'mdi-cash',
      disable: false,
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
    {
      text: 'Cheque',
      value: 'cheque',
      icon: 'mdi-checkbook',
      disable: false,
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
    if (this.amountPaid < this.toPay) return 0
    else return this.amountPaid - this.toPay
  }

  get due() {
    if (this.amountPaid < this.toPay) return this.toPay - this.amountPaid
    else return 0
  }

  get paid() {
    if (this.amountPaid < this.toPay) return this.amountPaid
    else return this.toPay
  }

  currencyFormat(value: number) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(value)
  }

  savePrint() {
    this.$emit('closeModal')
  }
}
</script>
