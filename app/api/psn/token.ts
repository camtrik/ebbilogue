import { exchangeRefreshTokenForAuthTokens, AuthorizationPayload } from 'psn-api'

let tokenData = {
  accessToken: '',
  refreshToken: process.env.PSN_REFRESH_TOKEN || '',
  expiresAt: '',
}

export async function getValidToken(): Promise<string> {
  const auth = await getValidAuthorization()
  return auth.accessToken
}

export async function getValidAuthorization(): Promise<AuthorizationPayload> {
  const now = new Date()
  const isExpired =
    !tokenData.accessToken || !tokenData.expiresAt || new Date(tokenData.expiresAt) < now

  if (isExpired) {
    try {
      const newAuth = await exchangeRefreshTokenForAuthTokens(tokenData.refreshToken)
      tokenData = {
        accessToken: newAuth.accessToken,
        refreshToken: newAuth.refreshToken,
        expiresAt: new Date(new Date().getTime() + newAuth.expiresIn * 1000).toISOString(),
      }
      console.log('PSN token refreshed successfully')
      return newAuth
    } catch (error) {
      console.error('Failed to refresh PSN token', error)
      throw error
    }
  }

  return {
    accessToken: tokenData.accessToken,
  }
}
