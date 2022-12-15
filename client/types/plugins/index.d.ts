import { NotifierPlugin } from '@/types/plugins/notifier'
import Vuetify from 'vuetify'
import { AuthPluginImp } from './auth'
import { FormatPlugin } from './format'
import { InventoryPluginImp } from './inventory'
import { OrderPluginImp } from './order'
import { SettingsPluginImp } from './settings'

declare module 'vue/types/vue' {
  interface Vue {
    $notifier: NotifierPlugin
    $auth: AuthPluginImp
    $format: FormatPlugin
    $inventory: InventoryPluginImp
    $order: OrderPluginImp
    $settings: SettingsPluginImp
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $notifier: NotifierPlugin
    $auth: AuthPluginImp
    $format: FormatPlugin
    $inventory: InventoryPluginImp
    $order: OrderPluginImp
    $settings: SettingsPluginImp
  }

  interface Context {
    $notifier: NotifierPlugin
    $auth: AuthPluginImp
    $format: FormatPlugin
    $inventory: InventoryPluginImp
    $order: OrderPluginImp
    $settings: SettingsPluginImp
    $vuetify: Vuetify
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $notifier: NotifierPlugin
    $auth: AuthPluginImp
    $format: FormatPlugin
    $inventory: InventoryPluginImp
    $order: OrderPluginImp
    $settings: SettingsPluginImp
  }
}
