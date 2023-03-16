import { Plugin, Context } from '@nuxt/types'
import { SettingsPluginImp } from '~/types/plugins/settings'
import { db } from '~/config/acebase'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

const usersRef = db.ref('users')
const devicesRef = db.ref('devices')

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

  setPrinter(printerName: string): void {
    db.auth.updateUserSettings({ printer: printerName })
    localStorage.setItem('printer', printerName)
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
    const res = await this.$axios.post('/upload', formData)
    const { success, url } = res.data
    if (success) {
      db.auth.updateUserSettings({ profilePic: url })
    }
    return { imageUrl: `/${url}` }
  }

  async addPrinter(
    printerData: NotWellDefinedObject
  ): Promise<NotWellDefinedObject> {
    const printerCheck = await devicesRef
      .query()
      .filter('name', '==', printerData.name)
      .exists()
    if (printerCheck == false) {
      await devicesRef.push(printerData)
    }

    return {
      status: 'ok',
    }
  }

  async getAllPrinters() {
    let result: NotWellDefinedObject[] = []

    const printers = await devicesRef
      .query()
      .filter('type', '==', 'printer')
      .get()

    if (printers) {
      printers.forEach((printer) => {
        // this.removeOrder(printer.key)
        if (printer.key != 'null') {
          const id = printer.key
          const value = printer.val()

          result.push({ id, ...value })
        }
      })
    } else {
      result = []
    }

    return result
  }

  // removePrinter(printerName: string): void {
  //   const currentPrinter = localStorage.getItem('printer') || ''
  //   devicesRef.query().filter('name','==',printerName).remove()
  //   if (currentPrinter == printerName) {
  //     localStorage.removeItem('currentOrderId')
  //     db.auth.updateUserSettings({ currentOrderId: '' })
  //   }
  // }
}

const settingsPlugin: Plugin = function (context, inject) {
  inject('settings', new SettingsPlugin(context))
}

export default settingsPlugin
