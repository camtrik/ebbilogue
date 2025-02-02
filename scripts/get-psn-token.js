// get-token.js
const { exchangeNpssoForCode, exchangeCodeForAccessToken } = require('psn-api')
require('dotenv').config({ path: '.env.local' })
const npsso = process.env.NPSSO
console.log(npsso)

async function getToken() {
  try {
    console.log('Getting access code...')
    const accessCode = await exchangeNpssoForCode(npsso)
    console.log('Access code obtained:', accessCode)

    console.log('\nGetting authorization tokens...')
    const authorization = await exchangeCodeForAccessToken(accessCode)
    console.log('\nAuthorization obtained:')
    console.log('Access Token:', authorization.accessToken)
    console.log('Refresh Token:', authorization.refreshToken)
    console.log('Expires in:', authorization.expiresIn)

    return authorization
  } catch (error) {
    console.error('Error:', error.message)
  }
}

getToken()
