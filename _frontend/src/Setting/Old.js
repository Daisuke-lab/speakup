import React, { useRef, useState } from 'react'
import clamp from 'lodash-es/clamp'
import swap from 'lodash-move'
import { useGesture, useDrag} from 'react-use-gesture'
import { useSprings, interpolate, animated } from 'react-spring'
import { IconButton } from '@material-ui/core';
import Crop from './Crop'
import DeleteImageModal from "./DeleteImageModal";
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import * as profile_actions from '../store/actions/profile_action';
import { connect } from 'react-redux'
import '../assets/Setting/ImageBox.css'



// Returns fitting styles for dragged/idle images
const fn = (order, down, originalIndex, curIndex,x, y) => index =>
  down && index === originalIndex
  // immediate =>	Prevents animation if true.
  //immediate is related to zIndex?
    ? {x:(curIndex%3)*170 + x, y: (curIndex>2?1:0) * 220 + y, scale: 1.1,
       zIndex: '1', shadow: 15, immediate: n => n === 'y' || n === 'zIndex', index: index, }
    : {x:((order.indexOf(index))%3)*170, y: (order.indexOf(index)>2?1:0) * 220, scale: 1,
       zIndex: '0', shadow: 1, immediate: false, index: index, }



function ImagesBox(props) {
  const images = props.images
  const order = useRef(images.map((_, index) => index)) //=> the list of index [1,2,3,4, ...]
  // console.log(images)
  // console.log('ORDER::', order)
  const remaining_list = Array.from({length: 6 - images.length}, (v, k) => k);
  //ex) useSprings(number, index => ({opacity: 1})) therefore it should be shaped.
  // in the next code, there is no order, down, originalIndex, curIndex, y. so nothing occurs.
  const [newImage, setNewImage] = useState()
  const [url, setUrl] = useState()
  const [crop, setCrop] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deletingImage, setDeletingImage] = useState()
  const [springs, setSprings] = useSprings(images.length, fn(order.current)) // Create springs, each corresponds to an item, controlling its transform, scale, etc.


  const image_handler = (e) => {
    console.log(e.target.files[0])
    setUrl(URL.createObjectURL(e.target.files[0]))
    setNewImage(e.target.files[0])
    setCrop(true)
    
  }

  const click_handler = (i) => {
    setDeleteModal(true)
    setDeletingImage(images[i].image)
  }
  //if you just tap, down will be false
  // bind is for when you drag, cause some actions
  //originalIndex is a index of the block that you are dragging
  const bind = useDrag(({ args: [originalIndex], down, movement: [x,y], delta:[deltaX, deltaY] }) => {
    const curIndex = order.current.indexOf(originalIndex)
    // console.log('originalIndex::',originalIndex)
    // console.log('CURRENTINDEX::', curIndex)
    let row_num
    let col_num 
    if (images.length > 3) {
      row_num = 2
      col_num = 3
    } else if (images.length > 2) {
      row_num = 1
      col_num = 3
    } else if (images.length > 1) {
      row_num = 1
      col_num = 2
    } else {
      row_num = 1
      col_num = 1
    }
    const col_index = curIndex%col_num
    const row_index = curIndex>2?1:0
    const curCol = clamp(Math.round((col_index * 200 + x) / 200), 0, col_num-1)
    const curRow = clamp(Math.round((row_index * 100 + y) / 100), 0, row_num-1)
    let new_index
    if (curCol === 2 && curRow === 1) {
      new_index = 5
    } else if (curCol === 1 && curRow === 1) {
      new_index = 4
    } else if (curCol ===0 && curRow === 1) {
      new_index = 3
    } else if (curCol === 2 && curRow === 0) {
      new_index = 2
    } else if (curCol === 1 && curRow === 0) {
      new_index = 1
    } else {
      new_index = 0
    }
    // swap(array, a index, other index) => ex) swap([1,2,3,4], 1, 2) => [1,3,2,4]
    let newOrder = swap(order.current, curIndex, new_index)
    // newOrder = swap(newOrder, curIndex, curCol)
    setSprings(fn(newOrder, down, originalIndex, curIndex, x, y)) // Feed springs new style data, they'll animate the view without causing a single render
    if (!down) order.current = newOrder
  })
  
  console.log(springs)
  return (
      // <animated.div className='editor3'>
    <div className="images_box">
      {crop?<Crop open={crop} image={newImage} url={url} parent_popup={setCrop}/>:<></>}
      {deleteModal?<DeleteImageModal open={deleteModal} parent_popup={setDeleteModal} deleting_image={deletingImage}/>:<></>}
      {springs.map(({ zIndex, shadow, x, y, scale }, i) => (
        <animated.div
          key={i}
          {...bind(i)}
          style={{
            zIndex,
            boxShadow: shadow.interpolate(s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
            //transform: rotate(20), skew(20), scale(2), translate3d() etc...
            transform: interpolate([x, y, scale], (x, y, s) => `translate3d(${x}px,${y}px,0px) scale(${s})`),
            backgroundImage: `url(${images[i].image})`,
            backgroundSize:'cover'
          }}
        >
          <HighlightOffIcon onClick={() =>click_handler(i)} className='delete_image'/>
        </animated.div>
      ))}
      {/* top:10 => the first row top:230 => the second row right => 170, 0, -170 */}
      {remaining_list.map((i) => (
        <div className='new_image' style={{top:i<3?'230px':'10px', right:i%3===0?'-170px':(i -1)%3===0?'0px':'170px'}}> 
        <label for="file-upload" class="custom-file-upload">
        <AddCircleOutlineRoundedIcon className='add_image'/>
        </label>
        <input type='file' name='image' accept="image/png, image/jpeg" size="60" id="file-upload" onChange={image_handler}/>
        </div>
      ))}
    </div>
  )
}



export default ImagesBox