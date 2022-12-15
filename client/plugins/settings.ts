import { Plugin, Context } from '@nuxt/types'
import { SettingsPluginImp } from '~/types/plugins/settings'
import { db } from '~/config/acebase'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

const usersRef = db.ref('users')

export class SettingsPlugin implements SettingsPluginImp {
  $axios: NuxtAxiosInstance
  constructor(private context: Context) {
    this.$axios = context.$axios
  }

  setAccentColor(color: string): void {
    db.auth.updateUserSettings({ primaryColor: color })
    localStorage.setItem('primaryColor', color)
  }

  setTheme(theme: string): void {
    db.auth.updateUserSettings({ theme: theme })
    localStorage.setItem('theme', theme)
  }

  async setCurrentOrderId(
    orderId: string
  ): Promise<NotWellDefinedObject | null> {
    db.auth.updateUserSettings({ currentOrderId: orderId })
    localStorage.setItem('currentOrderId', orderId)
    return db.auth.user
  }

  getUserSettings(): NotWellDefinedObject | undefined {
    return db.auth.user?.settings
  }

  async uploadProfilePic(
    image: File,
    uid: string
  ): Promise<NotWellDefinedObject> {
    const formData = new FormData()
    formData.append('image', image)
    formData.append('uid', uid)
    const res = await this.$axios.post('http://localhost:8000/upload', formData)
    const { success, url } = res.data
    if (success) {
      db.auth.updateUserSettings({ profilePic: url })
    }
    return { imageUrl: `http://localhost:8000/${url}` }
  }
}

const settingsPlugin: Plugin = function (context, inject) {
  inject('settings', new SettingsPlugin(context))
}

export default settingsPlugin
