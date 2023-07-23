'use client'
import { NextPage } from "next"
import dynamic from 'next/dynamic'
//import {default as CardController}  from 'react-tinder-card'
import Header from "../src/components/swipes/Header"
import Footer from "../src/components/swipes/Footer"
import Card from "../src/components/swipes/Card"
import { getSession, useSession } from "next-auth/react"
import getAxios from "../src/utils/getAxios"
import { CustomSessionType } from "../types/CustomSessionType"
import ProfileType from "../types/ProfileType"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setCurrentProfile } from "../store/reducers/swipeReducer"

interface Props {
    profiles: ProfileType[]    
}


const CardController = dynamic(() => import('react-tinder-card'), {ssr: false})

const Swipe: NextPage = (props) => {
    const {profiles} = props as Props
    const dispatch = useDispatch()
    useEffect(() => {
        profiles.length > 0 ? dispatch(setCurrentProfile(profiles[0])): null
    }, [])
    
    const { data: session } = useSession()
    const axios = getAxios(session as unknown as CustomSessionType | null)
    const [disabled, setDisabled] = useState<boolean>(false)



    const onSwipe = async (direction:string, profile:ProfileType) => {
        setDisabled(true)
        try {
            const data = {direction, profile_id: profile.id}
            const res = await axios.put(`/swipes/swipe`, data)
        } catch(err) {
            console.log(err)
        }
        const currentIndex = profiles.indexOf(profile)
        const nextProfile = currentIndex + 1 < profiles.length? profiles[currentIndex+1] : null
        dispatch(setCurrentProfile(nextProfile))
        setDisabled(false)
    }

    return (
        <>
        <Header/>
        {typeof window !== "undefined" && profiles.map((profile) => (
            <CardController
                className='swipe' 
                key={`card-controller-${profile.id}`}
                onSwipe={(direction:string) => onSwipe(direction, profile)}
                preventSwipe={disabled?["up", "down", "left", "right"]:['up', 'down']}>
                    <Card profile={profile} />
            </CardController>
        ))}
        <Footer onSwipe={onSwipe} disabled={disabled}/>
        </>
    )
}

export async function getServerSideProps(context:any) {
    const session = await getSession(context)
    const axios = getAxios(session as unknown as CustomSessionType | null)
    let profiles:ProfileType[] = [];

    try {
      const res = await axios.get(`/api/v1/accounts/profiles?swiped=False`)
      profiles = res.data
    } catch (err) {
      console.log(err)
    }
    
    return {
      props:{
        profiles
      }
    }
  
  }

  

export default Swipe

