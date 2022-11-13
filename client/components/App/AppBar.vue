<template>
  <v-app-bar flat class="rounded-lg elevation-1" :height="56">
    <v-app-bar-nav-icon
      v-if="$vuetify.breakpoint.smAndDown"
      @click.stop="$emit('clickNavIcon')"
    >
    </v-app-bar-nav-icon>
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
              :content="pendingOrders"
              :value="pendingOrders"
            >
              <v-icon>mdi-inbox</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-sheet class="pa-2 pb-0 text-subtitle-2" width="100%">
          <span class="px-2">Pending Orders</span>
          <v-divider class="mt-1"></v-divider>
        </v-sheet>
        <v-list dense :width="300" class="pa-0" elevation="0">
          <v-list-item v-for="n in 2" :key="n" @click="() => {}">
            <v-list-item-content>
              <v-list-item-title>Order #{{ n }}</v-list-item-title>
              <v-list-item-subtitle
                >Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Aliquid, eveniet aliquam? A distinctio illum aperiam quibusdam
                porro, reprehenderit repellendus. Repellat, ea id! Provident
                alias dolor, perferendis quibusdam eum consequatur
                temporibus!</v-list-item-subtitle
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
              >
                <v-icon size="20">mdi-tray-arrow-down</v-icon>
              </v-btn>
            </v-list-item-action>
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
            <v-img
              src="https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png"
              max-height="100"
              max-width="100"
              class="mx-auto"
            ></v-img>
            <span class="heading mx-auto mt-2 font-weight-medium"
              >Full Name</span
            >
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
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'

@Component({})
export default class AppBar extends Vue {
  showSearch = false
  routeName: any = ''
  pendingOrders = 3

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
  ]

  signOut() {
    this.$auth.signOut()
  }

  mounted() {
    this.routeName = this.links.find(
      (link: NotWellDefinedObject) => link.to == this.$route.name
    )?.title
  }

  @Watch('$route')
  onRouteChange() {
    this.routeName = this.links.find(
      (link: NotWellDefinedObject) => link.to == this.$route.name
    )?.title
  }
}
</script>
