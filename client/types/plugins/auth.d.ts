import '@nuxt/types'
import { AceBaseUser } from 'acebase-client'

export type AuthRedirectUris = {
  login: string
  logout: string
  auth: string
}

export type Account = {
  username: string
  email: string
  displayName: string
  password: string
}

export interface AuthPluginImp {
  authRedirectUris: AuthRedirectUris

  signIn(username: string, password: string): Promise<void>
  signUp(userData: Account): Promise<NotWellDefinedObject | void>
  signOut(): void
}
