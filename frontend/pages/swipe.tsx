import { NextPage } from "next"
import TinderCard  from 'react-tinder-card'
import Header from "../src/components/swipes/Header"
import Footer from "../src/components/swipes/Footer"
import Card from "../src/components/swipes/Card"


const Swipe: NextPage = () => {
    const people:any[] = []
    const CardController = TinderCard

    const swipeLeft = () => {

    }

    const swipeRight = () => {

    }

    const onSwipe = (direction:string, person:any) => {
        switch(direction) {
            case "left":
                swipeLeft(person)
            case "right":
                swipeRight(person)
        }
    }

    return (
        <>
        <Header/>
        {people.map((person) => (
            <CardController
                className='swipe' 
                key={`card-controller-${person.id}`}
                onSwipe={(direction:string) => onSwipe(direction, person)}
                preventSwipe={['up', 'down']}>
                <Card person={person} />
            </CardController>
        ))}
        <Footer swipeLeft={swipeLeft} swipeRight={swipeRight}/>
        </>
    )
}


export default Swipe

