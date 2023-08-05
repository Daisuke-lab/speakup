import React from 'react'

interface Props {
    children: any
    label: string,

}
function ProfileCreateWrapper(props:Props) {
    const {children, label} = props
  return (
    <div>
        <h3>{label}</h3>
    </div>
  )
}

export default ProfileCreateWrapper