import { SessionProvider, useSession } from 'next-auth/react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider, useDispatch } from 'react-redux'
import store from '../store/store'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { CircularProgress } from '@mui/material'
import getAxios from '../src/utils/getAxios'
import { setMyProfile } from '../store/reducers/commonReducer'


export default function MyApp({ Component, 
  pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <>
    <Provider  store={store}>
    <SessionProvider session={session}>
  <Component {...pageProps} />
  </SessionProvider>
  </Provider>
  </>)
}



function Redirector({ children }:any) {
  const { data: session, status } = useSession()
  const dispatch = useDispatch()
  const axios = getAxios(session)
  const isUser = !!session?.accessToken && session != null
  const [noAuth, setNoAuth] = useState<boolean>(false)
  const router = useRouter()
  useEffect(() => {
    const isNoAuth = isNoAuthPage(window.location.pathname)
    setNoAuth(isNoAuth)
    hasProfile()
    if (status === "loading") return // Do nothing while loading
    if (!isUser &&!isNoAuth) {window.location.replace(window.location.origin)} // If not authenticated, force log in
    if (noAuth && isUser) {router.push('/swipes')}
  }, [isUser, status])

  

  const isNoAuthPage = (pathname:string) => {
    const noAuthPages = ["/", "api/auth/signout"]
    if (noAuthPages.includes(pathname)) {
      return true
    }
    return false 
  }

  const hasProfile = async () => {
    try {
      const res = await axios.get(`profiles?user_id=${session?.id}`)
      if (res.data.length == 0) {
        router.push(`profile/create`)
        return true
      } else {
        dispatch(setMyProfile(res.data[0]))
        return true
      }
    } catch(err) {
      console.log(err)
    }
    
  }

  if (isUser || noAuth) {
    return children
  }

  return <>
        <div style={{textAlign: "center", marginTop: "100px"}}>
          <CircularProgress style={{width: "70px", height: "70px"}}/>
          </div>
        </>
  
}


