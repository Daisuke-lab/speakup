import React from 'react'
import ProfileType from '../../../types/ProfileType'
import styles from "../../../styles/Card.module.css"
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import { Button, IconButton, MobileStepper } from '@mui/material'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'

interface Props {
    profile: ProfileType
}
function CardImageStepper(props:Props) {
    const {profile} = props
    const [activeStep, setActiveStep] = React.useState(0);

    return (
        <div id='card_imagebox' style={{position:'relative'}}>
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
        {profile.images.map((image, index) => (
        <SwiperSlide key={`${profile.id}-image-${index}`}>
          <Image className={styles.profileImage} src={image} alt={profile.name}/>
        </SwiperSlide>
        ))}
          </Swiper>
          <div id='card_stepper'>
          <MobileStepper
          variant="dots"
          steps={profile.images.length}
          position="static"
          activeStep={activeStep}
          nextButton={
            <IconButton>
                <KeyboardArrowRight />
            </IconButton>
          }
          backButton={
            <IconButton>
                <KeyboardArrowLeft />
            </IconButton>
          }
          />
          </div>
    </div>
    )
}

export default CardImageStepper