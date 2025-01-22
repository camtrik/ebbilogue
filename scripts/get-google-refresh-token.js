const { google } = require('googleapis')
const express = require('express')
const app = express()

const client_id = '1016450232846-u0bntpumfh100ns276b9m2g9hg4omqku.apps.googleusercontent.com'
const client_secret = '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'

const oauth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  'http://localhost:3000/oauth2callback'
)

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: [
    'https://www.googleapis.com/auth/photoslibrary.readonly',
    'https://www.googleapis.com/auth/photoslibrary',
  ],
  prompt: 'consent',
})

app.get('/', (req, res) => {
  console.log('Redirecting to auth URL...')
  res.redirect(authUrl)
})

app.get('/oauth2callback', async (req, res) => {
  const { code } = req.query
  console.log('Received code:', code)

  try {
    const { tokens } = await oauth2Client.getToken(code)
    console.log('Received tokens:', tokens)
    res.send(`
      <h1>Your tokens:</h1>
      <p>Refresh Token: ${tokens.refresh_token}</p>
      <p>Access Token: ${tokens.access_token}</p>
    `)
  } catch (error) {
    console.error('Error getting tokens:', error)
    res.send('Error: ' + error.message)
  }
})

app.listen(3000, () => {
  console.log('Visit http://localhost:3000 to start the auth flow')
})
