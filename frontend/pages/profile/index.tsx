import { NextPage } from "next"
import Header from "../../src/components/swipes/Header"
import { getSession } from "next-auth/react"
import getAxios from "../../src/utils/getAxios"
import { CustomSessionType } from "../../types/CustomSessionType"
import ProfileType from "../../types/ProfileType"
import Card from "../../src/components/swipes/Card"

interface Props {
    profile: ProfileType
}

const AccountPage: NextPage = (props) => {
    const {profile} = props as Props
    return (
        <div>
            <Header/>
            <div id='setting_content' style={{justifyContent: 'space-evenly'}}>
            <Card profile={profile} />
            </div>

            
        </div>
    )
}

export async function getServerSideProps(context:any) {
    const session = await getSession(context)
    const axios = getAxios(session as unknown as CustomSessionType | null)
    let profile:ProfileType | null = null;

    try {
      const res = await axios.get(`/api/v1/accounts/me`)
      profile = res.data
    } catch (err) {
      console.log(err)
    }
    
    return {
      props:{
        profile
      }
    }
}
  
  
    
export default AccountPage