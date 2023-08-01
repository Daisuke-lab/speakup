import { SessionProvider, useSession } from 'next-auth/react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider, useDispatch } from 'react-redux'
import store from '../store/store'
import { useState } from 'react'
import { useRouter } from 'next/router'

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
  dispatch(updateSession(session))
  const isUser = !!session?.accessToken && session != null
  const [noAuth, setNoAuth] = useState<boolean>(false)
  const router = useRouter()
  useEffect(() => {
    const isNoAuth = isNoAuthPage(window.location.pathname)
    setNoAuth(isNoAuth)
    if (status === "loading") return // Do nothing while loading
    if (!isUser &&!isNoAuth) {window.location.replace(window.location.origin)} // If not authenticated, force log in
    if (noAuth && isUser) {router.push('/rooms')}
  }, [isUser, status])

  const isNoAuthPage = (pathname:string) => {
    const noAuthPages = ["/", "api/auth/signout"]
    if (noAuthPages.includes(pathname)) {
      return true
    }
    return false 
  }
  
}


