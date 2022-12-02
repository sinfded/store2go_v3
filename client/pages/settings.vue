<template>
  <v-container fluid class="pa-0 ma-0 fill-height">
    <v-sheet
      width="100%"
      height="100%"
      rounded="lg"
      elevation="2"
      color="accent"
    >
      <v-row no-gutters class="fill-height">
        <v-col cols="3" xl="2" class="pa-3 pr-2">
          <v-list nav dense class="pa-0" color="transparent">
            <v-list-item-group mandatory v-model="currentTab">
              <v-list-item
                v-for="item in tabs"
                :key="item.title"
                class="rounded-lg"
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col cols="9" xl="10" class="pa-4 pl-1 d-flex overflow-y-auto">
          <v-divider vertical class="mr-3"></v-divider>
          <v-tabs-items
            v-model="currentTab"
            vertical
            class="flex-grow-1 transparent"
          >
            <v-tab-item v-for="item in tabs" :key="item.title">
              <AccountTab v-if="item.tab == 'account'" />
              <AppearanceTab v-if="item.tab == 'appearance'" />
              <DevicesTab v-if="item.tab == 'devices'" />
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import AccountTab from '~/components/Settings/Tabs/Account.vue'
import AppearanceTab from '~/components/Settings/Tabs/Appearance.vue'
import DevicesTab from '~/components/Settings/Tabs/Devices.vue'

@Component({
  layout: 'main',
  components: {
    AccountTab,
    AppearanceTab,
    DevicesTab,
  },
})
export default class Settings extends Vue {
  tabs = [
    { title: 'Account', icon: 'mdi-account', tab: 'account' },
    { title: 'Appearance', icon: 'mdi-palette', tab: 'appearance' },
    { title: 'Devices', icon: 'mdi-devices', tab: 'devices' },
  ]
  currentTab = 'general'
}
</script>
