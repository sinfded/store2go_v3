import { Plugin, Context } from '@nuxt/types'
import { Account, AuthPluginImp, AuthRedirectUris } from '~/types/plugins/auth'
import { NotifierPlugin } from '~/types/plugins/notifier'
import { db } from '~/config/acebase'

export class AuthPlugin implements AuthPluginImp {
  authRedirectUris: AuthRedirectUris = {
    login: '/',
    logout: '/',
    auth: '/dashboard',
  }

  redirect: any = {}
  $notifier: NotifierPlugin

  constructor(context: Context) {
    this.redirect = context.redirect
    this.$notifier = context.$notifier
  }

  get currentUser() {
    let user = null
    if (db.auth.user) {
      user = db.auth.user
    }
    return user
  }

  async signIn(username: string, password: string): Promise<void> {
    try {
      const res = await db.auth.signIn(username, password)
      if (res.user) {
        const { primaryColor, theme } = res.user
          .settings as NotWellDefinedObject
        localStorage.setItem('accessToken', res.accessToken)
        localStorage.setItem('primaryColor', primaryColor || '#673AB7')
        localStorage.setItem('theme', theme || 'light')
        this.redirect(this.authRedirectUris.auth)
        this.$notifier.notifierState = {
          iconName: 'mdi-check',
          color: 'success',
          message: `Login Successfully!`,
        }
      }
    } catch (error: any) {
      console.log(error.message)
      this.$notifier.notifierState = {
        iconName: 'mdi-check',
        color: 'error',
        message: error.message,
      }
    }
  }

  async signUp(userData: Account): Promise<NotWellDefinedObject | void> {
    const res = await db.auth.signUp(userData)
    if (res.user) {
      this.redirect(this.authRedirectUris.login)
      this.$notifier.notifierState = {
        iconName: 'mdi-check',
        color: 'success',
        message: `Successfully signed up as ${res.user.username}`,
      }
    }
    return res
  }

  signOut(): void {
    try {
      db.auth
        .signOut()
        .then((res) => {
          localStorage.clear()
          this.redirect(this.authRedirectUris.login)
        })
        .catch((err) => {
          this.redirect(this.authRedirectUris.login)
        })
    } catch (error) {
      console.error(error)
    }
  }
}

const authPlugin: Plugin = function (context, inject) {
  inject('auth', new AuthPlugin(context))
}

export default authPlugin
