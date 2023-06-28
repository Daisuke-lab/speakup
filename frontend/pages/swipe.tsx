import { NextPage } from "next"
import TinderCard as CardController from 'react-tinder-card'
import Header from "../src/components/swipes/Header"
import Footer from "../src/components/swipes/Footer"


const Swipe: NextPage = () => {
    const people = []
    return (
        <>
        <Header/>
        {people.map((person) => (
            <CardController
            ref={childRefs[index]} className='swipe' 
          key={person.name} onSwipe={(dir) => swiped(dir, person)}
          onCardLeftScreen={() => outOfFrame(person.name)}
          preventSwipe={['up', 'down']}
            >
                <Card person={person} />
            </CardController>
        ))}
        <Footer/>
        </>
    )
}


export default Swipe

