import { AceBaseClient } from 'acebase-client'

const db = new AceBaseClient({
  host: 'localhost',
  port: 5757,
  dbname: 'store2go',
  https: false,
})
const accessToken = localStorage.getItem('accessToken')

db.ready(() => console.log('AceBase Client connected successfully.'))

if (db.connected) {
  // We're connected, we can sign in manually
  if (accessToken != null) {
    db.auth.signInWithToken(accessToken).then((result) => {
      handleSignIn(result)
    })
  }
} else {
  // Not connected, set the access token and wait for the signin event
  if (accessToken != null) {
    db.auth.setAccessToken(accessToken)
    db.once('signin', handleSignIn)
  }
}

function handleSignIn(result: { user: any; accessToken: any }) {
  console.log(
    `Signed in as ${result.user.email}, got access token ${result.accessToken}`
  )
}

export { db }
