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
  console.log(`Signed in`)
}

db.on('signin', (evt) => {
  console.log(`User ${evt.user.uid} signed in, source: ${evt.source}`)
  // evt.source can be one of these: 'signin', 'email_signin', 'token_signin', 'password_change', 'signup'
})

db.on('signout', (evt) => {
  console.log(`User ${evt.user.uid} signed out, source: ${evt.source}`)
  // evt.source can be 'signout', 'signup' or 'delete_account'
})

export { db }
