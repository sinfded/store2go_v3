<template>
  <v-list nav dense>
    <v-list-item-group>
      <v-list-item v-for="item in links" :key="item.title" link :to="item.to">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class SideBar extends Vue {
  links = [
    { title: 'Dashboard', icon: 'mdi-view-dashboard', to: 'dashboard' },
    { title: 'Register', icon: 'mdi-cash-register', to: 'register' },
    { title: 'Inventory', icon: 'mdi-garage', to: 'inventory' },
  ]
}
</script>

<style></style>
