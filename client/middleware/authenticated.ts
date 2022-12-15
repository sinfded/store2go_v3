import { Middleware } from '@nuxt/types'
import { db } from '~/config/acebase'

const authMiddleware: Middleware = function (context) {
  const { redirect } = context

  if (!db.auth.user) {
    const accessToken = localStorage.getItem('accessToken')
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

export default Object.freeze(authMiddleware)
