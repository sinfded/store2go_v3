import { NotifierPlugin } from '@/types/plugins/notifier'
import { AuthPluginImp } from './auth'
import { FormatPlugin } from './format'
import { InventoryPluginImp } from './inventory'

declare module 'vue/types/vue' {
  interface Vue {
    $notifier: NotifierPlugin
    $auth: AuthPluginImp
    $format: FormatPlugin
    $inventory: InventoryPluginImp
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $notifier: NotifierPlugin
    $auth: AuthPluginImp
    $format: FormatPlugin
    $inventory: InventoryPluginImp
  }

  interface Context {
    $notifier: NotifierPlugin
    $auth: AuthPluginImp
    $format: FormatPlugin
    $inventory: InventoryPluginImp
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $notifier: NotifierPlugin
    $auth: AuthPluginImp
    $format: FormatPlugin
    $inventory: InventoryPluginImp
  }
}
