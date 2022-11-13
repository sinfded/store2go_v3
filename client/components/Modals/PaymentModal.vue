<template>
    <v-dialog v-model="showModal" persistent max-width="400px">
        <v-card rounded="lg">
            <v-sheet class="px-3 py-2" dark color="primary" >
                <v-row no-gutters align="center">
                    <span class="text-subtitle-1 font-weight-medium">Payment Method</span>
                    <v-spacer></v-spacer>
                    <v-btn icon class="mr-n2" @click="$emit('closeModal')">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-row>
            </v-sheet>
            <v-sheet width="100%" class="px-2 pt-3 pb-1 d-flex flex-wrap">
                <v-btn @click="selectedMethod = method.value" v-for="(method,index) in methods" :key="index"
                    :disabled="method.disable" color="teal" :outlined="selectedMethod != method.value"
                    class="mx-1 mb-2 white--text">
                    <v-icon class="mr-1" size="28">{{method.icon}}</v-icon>{{method.text}}
                </v-btn>
            </v-sheet>
            <v-sheet class="px-3">
                <span class="text-subtitle-1 font-weight-medium grey--text text--darken-2 pb-1">Details</span>
                <div v-if="selectedMethod == 'cash'">
                    <v-text-field v-model="amountPaid" outlined label="Amount" autofocus dense hide-details
                        prepend-inner-icon="mdi-currency-php">
                    </v-text-field>
                </div>
                <div v-if="selectedMethod == 'cheque'">
                    <v-row no-gutters>
                        <v-col cols="8" class="pr-1 mb-2">
                            <v-combobox :items="banks" label="Bank" autofocus outlined dense hide-details
                                prepend-inner-icon="mdi-bank">
                            </v-combobox>
                        </v-col>
                        <v-col cols="4" class="pl-1 mb-2">
                            <v-text-field label="Branch" outlined dense hide-details
                                prepend-inner-icon="mdi-map-marker"></v-text-field>
                        </v-col>
                        <v-col cols="12" class="mb-2">
                            <v-text-field label="Check #" outlined dense hide-details prepend-inner-icon="mdi-numeric">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="amountPaid" label="Amount" outlined dense hide-details
                                prepend-inner-icon="mdi-currency-php"></v-text-field>
                        </v-col>
                    </v-row>
                </div>
                <div class="py-2">
                    <v-row no-gutters>
                        <v-col cols="6" class="px-3 text-center font-weight-bold grey lighten-3 rounded-l-lg">
                            <v-sheet width="100%" color="transparent" class="text-left grey--text text--darken-1">PAID
                            </v-sheet>
                            <span class="text-h5 font-weight-bold grey--text text--darken-2">{{currencyFormat(paid)}}</span>
                        </v-col>
                        <v-col cols="6" class="px-3 text-center font-weight-bold red lighten-4 rounded-r-lg ">
                            <v-sheet width="100%" color="transparent" class="text-left grey--text text--darken-1">DUE
                            </v-sheet>
                            <span
                                class="text-h5 font-weight-bold red--text text--lighten-1">{{currencyFormat(due)}}</span>
                        </v-col>
                        <v-col cols="12" class="px-3 mt-2 text-center font-weight-bold amber lighten-4 rounded-lg"
                            v-if="selectedMethod == 'cash'">
                            <v-sheet width="100%" color="transparent" class="text-left grey--text text--darken-1">CHANGE
                            </v-sheet>
                            <span
                                class="text-h5 font-weight-bold amber--text text--darken-2">{{currencyFormat(change)}}</span>
                        </v-col>
                    </v-row>
                </div>
            </v-sheet>
            <v-sheet class="pa-3 pt-1">
                <v-btn block large color="primary" class="rounded-lg" :disabled="amountPaid < toPay" @click="savePrint">
                    Save & Print Receipt
                </v-btn>
            </v-sheet>
        </v-card>
    </v-dialog>
</template>
  
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'


@Component({})
export default class PaymentModal extends Vue {
    @Prop() readonly showModal!: boolean
    @Prop() readonly toPay!: number

    selectedMethod = "cash"
    amountPaid = 0

    methods: NotWellDefinedObject[] = [
        {
            text: "Cash",
            value: 'cash',
            icon: 'mdi-cash',
            disable: false
        },
        {
            text: "Credit Card",
            value: 'credit_card',
            icon: 'mdi-credit-card-outline',
            disable: true
        },
        {
            text: "Debit Card",
            value: 'debit_card',
            icon: 'mdi-credit-card-outline',
            disable: true
        },
        {
            text: "Cheque",
            value: 'cheque',
            icon: 'mdi-checkbook',
            disable: false
        },
    ].sort((a: any, b: any) => (a.disable === b.disable) ? 0 : a.disable ? 1 : -1)

    banks: string[] = [
        "BDO Unibank",
        "Bank of the Philippine Islands",
        "Land Bank of the Phlippines",
        "Unionbank",
        "Bank of Makati",
        "East West Bank",
        "Philippine National Bank",
        "Development Bank of the Philippines",
        "Metrobank",
        "China Bank"
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
  