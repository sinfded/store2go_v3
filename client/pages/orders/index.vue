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
            <!-- <v-sheet
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
            </v-sheet> -->
            <!-- <v-divider vertical></v-divider> -->
            <ProductSearchBar />
          </v-sheet>
          <v-btn
            height="48"
            :width="!$vuetify.breakpoint.smAndUp ? '48' : ''"
            class="ml-4 rounded-lg text-capitalize text-subtitle-2"
            elevation="2"
            color="primary"
            :fab="!$vuetify.breakpoint.smAndUp"
            @click="orderModal.modal = true"
          >
            <v-icon :class="[$vuetify.breakpoint.smAndUp ? 'mr-2 ' : '']"
              >mdi-clipboard-plus-outline</v-icon
            >
            <span v-if="$vuetify.breakpoint.smAndUp">New Order</span>
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
              :value="selectedOrders.length > 0"
              :indeterminate="selectedOrders.length > 0"
              :disabled="selectedOrders.length < 1"
              @change="emptySelected"
              class="ma-0 mt-n1 mr-2"
            ></v-checkbox>
            <v-row no-gutters align="center">
              <v-col cols="2" md="1">Order ID</v-col>
              <v-col cols="3">Date</v-col>
              <v-col cols="2">Customer</v-col>
              <v-col cols="2">Status</v-col>
              <v-col cols="1" class="text-center">Items</v-col>
              <v-col cols="2" md="3" class="text-center">Subtotal</v-col>
            </v-row>
          </v-sheet>
          <v-sheet
            ref="orderContainer"
            class="flex-grow-1 overflow-y-auto px-2 pt-2"
            color="transparent"
            width="100%"
          >
            <v-sheet
              v-for="(order, index) in orders"
              :key="index"
              height="56"
              elevation="1"
              rounded="lg"
              class="mb-2 px-3 d-flex align-center text-sm-subtitle-2 text-caption font-weight-medium grey--text text--darken-2"
            >
              <v-checkbox
                hide-details
                :value="checkSelected(order.id)"
                class="ma-0 mt-n1 mr-2"
                @change="selectOrder(order.id)"
              ></v-checkbox>
              <v-row no-gutters align="center">
                <v-col cols="2" md="1">
                  <nuxt-link
                    :to="`/orders/${order.id}`"
                    class="text-decoration-none"
                  >
                    #{{ $format.orderIdFormat(order.orderId) }}
                  </nuxt-link>
                </v-col>
                <v-col cols="3">{{
                  new Date(order.createdAt).toLocaleString()
                }}</v-col>
                <v-col cols="2">
                  {{ order.customer }}
                </v-col>
                <v-col
                  v-if="order.id != currentOrderId"
                  cols="2"
                  class="d-flex align-center justify-start"
                >
                  <v-sheet
                    v-if="order.status == 'pending'"
                    height="20"
                    class="pr-2 rounded-lg text-caption font-weight-bold amber--text text--darken-1 d-flex align-center text-capitalize"
                    color="amber lighten-5"
                  >
                    <v-icon color="amber" size="20">mdi-circle-medium</v-icon>
                    {{ order.status }}
                  </v-sheet>
                  <v-sheet
                    v-else-if="order.status == 'fulfilled'"
                    height="20"
                    class="pr-2 rounded-lg text-caption font-weight-bold green--text text--darken-1 d-flex align-center text-capitalize"
                    color="green lighten-5"
                  >
                    <v-icon color="green" size="20">mdi-circle-medium</v-icon>
                    {{ order.status }}
                  </v-sheet>
                  <v-sheet
                    v-else
                    height="20"
                    class="pr-2 rounded-lg text-caption font-weight-bold red--text text--darken-1 d-flex align-center text-capitalize"
                    color="red lighten-5"
                  >
                    <v-icon color="red" size="20">mdi-circle-medium</v-icon>
                    {{ order.status }}
                  </v-sheet>
                </v-col>
                <v-col
                  v-else
                  cols="2"
                  class="d-flex align-center justify-start"
                >
                  <v-sheet
                    height="20"
                    class="pr-2 rounded-lg text-caption font-weight-bold primary--text text--darken-1 d-flex align-center text-capitalize"
                    color="primary lighten-5"
                  >
                    <v-icon color="primary" size="20">mdi-circle-medium</v-icon>
                    Current
                  </v-sheet>
                </v-col>
                <v-col cols="1" class="text-center">
                  {{ order.items.length }}
                </v-col>
                <v-col
                  cols="2"
                  md="3"
                  class="d-flex align-center justify-center"
                >
                  {{ $format.currencyFormat(getSubtotal(order)) }}
                </v-col>
              </v-row>
            </v-sheet>
          </v-sheet>
          <v-speed-dial
            v-show="selectedOrders.length > 0 && !$vuetify.breakpoint.mdAndUp"
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
                :content="selectedOrders.length"
                :value="selectedOrders.length"
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
              :disabled="selectedOrders.length > 1"
              fab
              small
              :dark="selectedOrders.length == 1"
              color="blue lighten-1"
            >
              <v-icon size="22">mdi-content-copy</v-icon>
            </v-btn>
            <v-btn
              :disabled="selectedOrders.length > 1"
              fab
              small
              :dark="selectedOrders.length == 1"
              color="green lighten-1"
            >
              <v-icon size="22">mdi-pencil-outline</v-icon>
            </v-btn>
            <v-btn
              fab
              small
              color="red lighten-1"
              :dark="selectedOrders.length > 0"
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
            v-if="selectedOrders.length > 0 && $vuetify.breakpoint.mdAndUp"
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
                {{ selectedOrders.length }}
              </v-sheet>
              <span class="text-subtitle-2 ml-2"
                >{{
                  selectedOrders.length > 1 ? 'items' : 'item'
                }}
                selected</span
              >
            </div>
            <div>
              <v-btn
                class="rounded-lg text-capitalize white--text text-subtitle-2"
                color="blue lighten-1"
                :disabled="selectedOrders.length > 1"
              >
                <v-icon class="ml-n2 mr-2">mdi-content-copy</v-icon> Clone
              </v-btn>
              <v-btn
                class="rounded-lg text-capitalize ml-2 white--text text-subtitle-2"
                color="green lighten-1"
                :disabled="selectedOrders.length > 1"
              >
                <v-icon class="ml-n2 mr-2">mdi-pencil-outline</v-icon> Edit
              </v-btn>
              <v-btn
                dark
                class="rounded-lg text-capitalize ml-2 text-subtitle-2"
                color="red lighten-1"
                @click="$order.removeOrders(selectedOrders)"
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
              :length="numOfPages"
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
    <OrderModal :orderModal="orderModal.modal" v-on:closeModal="refreshTable" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import ProductSearchBar from '~/components/Inventory/ProductSearchBar.vue'
import OrderModal from '~/components/Modals/OrderModal.vue'

@Component({
  layout: 'main',
  components: {
    ProductSearchBar,
    OrderModal,
  },
})
export default class OrdersPage extends Vue {
  searchBG = 'accent'
  selectedOrders: string[] = []
  page = 1
  numOfItems = 10
  numOfPages = 10
  currentOrderId = localStorage.getItem('currentOrderId') || ''
  orderModal: NotWellDefinedObject = {
    modal: false,
    title: '',
    product: null,
    method: '',
  }
  optionBtn = false

  filter: NotWellDefinedObject = {
    show: false,
    brand: '',
    category: '',
    supplier: '',
  }

  orders: NotWellDefinedObject[] = []

  getSubtotal(order: NotWellDefinedObject) {
    return order.items.reduce((total: any, curr: NotWellDefinedObject) => {
      return total + curr.subtotal
    }, 0)
  }

  convertToLongDate(milliseconds: number) {
    const date = new Date(milliseconds)
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    const hour =
      date.getHours() > 12 ? date.getHours() - 11 : date.getHours() + 1
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const AMPM = date.getHours() > 12 ? 'PM' : 'AM'

    return `${month} ${day}, ${year} ${hour}:${minute} ${AMPM}`
  }

  selectOrder(id: string) {
    const selected = this.selectedOrders.find((item: string) => item == id)
    if (selected) {
      this.selectedOrders = this.selectedOrders.filter(
        (item: string) => item != id
      )
    } else {
      this.selectedOrders.push(id)
    }
  }

  emptySelected() {
    this.selectedOrders = []
  }

  checkSelected(id: string) {
    const selected = this.selectedOrders.find((item: string) => item == id)
    if (selected) return true
    else return false
  }

  filterReset() {
    this.filter = {
      show: true,
      brand: '',
      category: '',
      supplier: '',
    }
  }

  refreshTable() {
    this.emptySelected()
    this.getOrders()
    this.$order.getPendingOrders()
    this.selectedOrders = []
    this.orderModal.modal = false
  }

  async getOrders() {
    await this.$order
      .getAllOrders(this.page, this.numOfItems)
      .then((data: NotWellDefinedObject[]) => {
        this.orders = data
      })
      .catch((err) => console.error(err))
  }

  async mounted() {
    const orderContainer = (this.$refs['orderContainer'] as Vue)
      .$el as HTMLElement
    const ordersCount = await this.$order.getOrdersCount()
    if (orderContainer != undefined) {
      this.numOfItems = Math.floor((orderContainer.scrollHeight - 8) / 64)
      this.numOfPages = Math.ceil(ordersCount / this.numOfItems)
    }
    await this.getOrders()
  }

  @Watch('page')
  onPageChange() {
    this.getOrders()
  }
}
</script>
