<template>
  <v-sheet
    elevation="1"
    rounded="lg"
    :height="56"
    class="d-flex align-center"
    :class="[$vuetify.breakpoint.smAndDown ? 'pr-4' : 'px-4']"
  >
    <v-btn
      v-if="$vuetify.breakpoint.smAndDown"
      fab
      icon
      @click.stop="$emit('clickNavIcon')"
    >
      <v-icon> mdi-menu </v-icon>
    </v-btn>
    <v-sheet class="py-2 rounded" color="transparent">
      <span
        class="font-weight-bold"
        :class="[$vuetify.theme.dark ? '' : 'grey--text text--darken-2']"
        style="font-size: larger"
        >{{ routeName }}</span
      >
    </v-sheet>
    <v-spacer></v-spacer>
    <div class="mr-n2">
      <v-menu left bottom :nudge-bottom="52" :nudge-right="8" rounded="lg">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon :height="40" :width="40" v-bind="attrs" v-on="on">
            <v-badge
              dot
              color="red lighten-1"
              :content="$order.pendingOrders.count"
              :value="$order.pendingOrders.count"
            >
              <v-icon>mdi-inbox</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-sheet class="pa-2 pb-0 text-subtitle-2" width="100%">
          <span class="px-2">Fulfilled Orders</span>
          <v-divider class="mt-1"></v-divider>
        </v-sheet>
        <v-list
          v-if="fulfilledOrders.count > 0"
          dense
          :width="300"
          class="pa-0"
          elevation="0"
        >
          <v-list-item
            v-for="(order, index) in fulfilledOrders.orders"
            :key="index"
          >
            <v-list-item-content>
              <v-list-item-title>
                <v-sheet class="d-flex justify-space-between">
                  <span>Order #{{ $format.orderIdFormat(order.orderId) }}</span>
                </v-sheet>
              </v-list-item-title>
              <v-list-item-subtitle
                >{{ order.numOfItems }}
                {{
                  order.numOfItems > 1 ? 'items' : 'item'
                }}</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                fab
                tile
                height="30"
                width="30"
                class="rounded-lg"
                elevation="0"
                color="primary"
                dark
                @click="setCurrentOrder(order.id)"
              >
                <v-icon size="20">mdi-tray-arrow-down</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-list v-else dense :width="300" class="pa-0" elevation="0">
          <v-list-item>
            <v-list-item-content>
              <v-sheet
                class="d-flex justify-center text-caption font-italic grey--text"
              >
                <span>No fulfilled orders.</span>
              </v-sheet>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn icon :height="40" :width="40">
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <v-menu left bottom :nudge-bottom="52" :nudge-right="8" rounded="lg">
        <template v-slot:activator="{ on, attrs }">
          <!-- <v-btn icon  >
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn> -->
          <v-avatar v-bind="attrs" v-on="on" size="40">
            <v-icon> mdi-account-circle </v-icon>
          </v-avatar>
        </template>

        <v-sheet class="pt-4 pb-3" elevation="0">
          <div class="d-flex flex-column justify-center">
            <!-- <v-img
              src="https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png"
              max-height="100"
              max-width="100"
              class="mx-auto"
            ></v-img> -->
            <v-avatar color="grey" size="100" class="mx-auto">
              <v-img :src="profilePic" max-height="100" max-width="100"></v-img>
            </v-avatar>
            <span class="heading mx-auto mt-2 font-weight-medium">{{
              userData.displayName
            }}</span>
            <span class="text-caption mx-auto">Position</span>
          </div>
        </v-sheet>

        <v-list dense :width="200" class="pa-0" elevation="0">
          <v-list-item-group>
            <v-list-item
              v-for="n in 2"
              :key="n"
              @click="() => {}"
              class="text-right"
            >
              <v-list-item-content>
                <v-list-item-title>Option {{ n }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="signOut" class="text-right">
              <v-list-item-content>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </div>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'

@Component({})
export default class AppBar extends Vue {
  showSearch = false
  routeName: any = ''
  profilePic: string = ''
  userData: any = {}
  fulfilledOrders: NotWellDefinedObject = {}

  cart_items: NotWellDefinedObject[] = [
    {
      sku: '122301141',
      name: 'Item 1',
      price: 10,
      quantity: 2,
    },
    {
      sku: '122312334',
      name: 'Item 1',
      price: 10,
      quantity: 2,
    },
    {
      sku: '122301123',
      name: 'Item 1',
      price: 10,
      quantity: 2,
    },
    {
      sku: '122123343',
      name: 'Item 1',
      price: 10,
      quantity: 2,
    },
  ]

  links = [
    { title: 'Dashboard', icon: 'mdi-view-dashboard', to: 'dashboard' },
    { title: 'Register', icon: 'mdi-cash-register', to: 'register' },
    { title: 'Inventory', icon: 'mdi-garage', to: 'inventory' },
    { title: 'Orders', icon: 'mdi-garage', to: 'orders' },
    { title: 'Settings', icon: 'mdi-garage', to: 'settings' },
  ]

  signOut() {
    this.$auth.signOut()
  }

  async mounted() {
    this.routeName = this.links.find(
      (link: NotWellDefinedObject) => link.to == this.$route.name
    )?.title

    this.userData = this.$auth.currentUser
    this.profilePic = `http://localhost:8000/${
      this.$auth.currentUser?.settings.profilePic as string
    }`

    this.fulfilledOrders = await this.$order.getFulfilledOrders()
  }

  setCurrentOrder(orderId: string) {
    // console.log(this.$order.setCurrentOrder(orderId))
    // console.log(this.$order.change)
    this.$nuxt.$emit('setCurrentOrder', orderId)
  }

  @Watch('$route')
  async onRouteChange() {
    this.routeName = this.links.find(
      (link: NotWellDefinedObject) => link.to == this.$route.name
    )?.title

    this.fulfilledOrders = await this.$order.getFulfilledOrders()
  }
}
</script>
