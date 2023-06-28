import React from 'react'
import { signIn } from "next-auth/react"
import Image from 'next/image'
import googleIcon from '../../public/google.png'
import facebookIcon from '../../public/facebook.png'
import appleIcon from '../../public/apple.png'
import githubIcon from '../../public/github.png'
import styles from '../../styles/LoginButton.module.css'


interface Props {
    provider: string,
}
function LoginButton(props:Props) {

    const prividerName:string = props.provider.charAt(0).toUpperCase() + props.provider.slice(1);

    const generateIcon = () => {
        switch(props.provider) {
            case "google":
                return <Image src={googleIcon} width={40}
                alt="google"
                height={40} className={styles.iconImage}/>
            case "facebook":
                return <Image src={facebookIcon} width={40}
                alt="facebook"
                height={40} className={styles.iconImage}/>
            case "apple":
                return <Image src={appleIcon} width={40}
                alt="apple"
                height={40} className={styles.iconImage}/>

            case "github":
                return <Image src={githubIcon} width={40}
                alt="github"
                height={40} className={styles.iconImage}/>
            default:
                return <></>
        }
    }
    return (
        <button className={styles.loginButton} onClick={() => signIn(props.provider)}>
            <span className={styles.loginIconContainer}>
            {generateIcon()}
            </span>
            <span className={styles.loginText}>Login With {prividerName}</span>
        </button>
    )
}

export default LoginButton