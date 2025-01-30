'use server'
import { API_URL } from '@/components/config'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { jwtDecode, JwtPayload } from 'jwt-decode';
// Token interfaces
interface TokenPair {
  access_token: string
  refresh_token: string
}

export async function setAuthTokens(tokens: TokenPair) {
  (await cookies()).set('access_token', tokens.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    sameSite: 'lax',
    maxAge: 15 * 60 // 15 minutes
  });
  ;(await cookies()).set('refresh_token', tokens.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 // 7 days
  })
}

export async function getAuthTokens() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  const refreshToken = cookieStore.get('refresh_token')?.value

  return {
    access_token: accessToken,
    refresh_token: refreshToken
  }
}

export const logout = async () => {
  try{
      const {refresh_token} = await getAuthTokens()
      const response = await fetch(`${API_URL}/api/logout/`, {
          method: 'POST',
          body: JSON.stringify({ refresh_token:refresh_token }),
          headers: {
              'Content-Type': 'application/json',
          },
      }); 
      if(!refresh_token){
        return location.href='/login'
      } 
      if (response.ok) {
        (await cookies()).delete('access_token')
        ;(await cookies()).delete('refresh_token');
        if(typeof window !== 'undefined'){
        localStorage.removeItem("user");
        }
        redirect('/login')
        }else{
        redirect('/login')
        } 
  }catch (error) {
      console.log("Logout error:", error);
    }
}
export async function refreshAccessToken() {
  try {
    const {refresh_token} = await getAuthTokens()
    const response = await fetch(`${API_URL}/api/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refresh_token: refresh_token })
    })
    const data =  await response.json()
    if (response.ok){
    setAuthTokens(data.tokens)
    }else{
      console.log(data)
    }
   
  } catch (error) {
    console.log('Token refresh error:', error)
    await logout()
    return null
  }
}
export async function isTokenExpired(): Promise<void> {
  try {
    const { access_token, refresh_token } = await getAuthTokens();
    if (!access_token && !refresh_token) {
      console.error('No tokens available. Redirecting to login...');
      redirect('/login')
    }
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    if (access_token) {
      const decodedAccessToken = jwtDecode<JwtPayload>(access_token);
      // Check if access token is expired
      if (decodedAccessToken.exp && decodedAccessToken.exp < currentTime) {
        console.log('Access token expired. Refreshing...');
        await refreshAccessToken(); // Attempt to refresh access token
        return;
      }
    }else{
      await refreshAccessToken()
      return;
    }

    if (refresh_token) {
      const decodedRefreshToken = jwtDecode<JwtPayload>(refresh_token);

      // Check if refresh token is expired
      if (decodedRefreshToken.exp && decodedRefreshToken.exp < currentTime) {
        console.log('Refresh token expired. Redirecting to login...');
        redirect('/login') // Redirect to login if refresh token is expired
        return;
      }
    }
  } catch (error) {
    console.log('Error while checking token expiration:', error);
    redirect('/login')
  }
}