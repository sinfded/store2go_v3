import { Middleware } from '@nuxt/types'
import { db } from '~/config/acebase'

const guestMiddleware: Middleware = function (context) {
  const { redirect, route } = context

  if (!db.auth.user) {
    const accessToken = localStorage.getItem('accessToken')
    console.log(route)
    if (accessToken != null) {
      db.auth
        .signInWithToken(accessToken)
        .then((result) => {
          console.log(
            `Signed in as ${result.user.email}, got access token ${result.accessToken}`
          )
        })
        .catch((err) => {
          console.error(err)
          redirect('/')
        })
    } else {
      redirect('/')
    }
  }
}

export default Object.freeze(guestMiddleware)
