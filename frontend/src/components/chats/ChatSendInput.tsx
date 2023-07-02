import React from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { TextareaAutosize } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';


function ChatSendInput() {

  const onSubmit = (data:any) => {

  }
  return (
    <div>
            <form className='chatScreen_input' onSubmit={onSubmit}>
                <label style={{marginTop: 'auto'}}>
                    <AttachFileIcon/>
                </label>
                <input type='file' name='image' accept="audio/*, .pdf, .txt, .gif, .docx, .xlsx, .pptx, .pps" size="60"
                id="file-upload" onChange={file_handler}/>

                
                <label for="image-upload" class="custom-file-upload" style={{marginTop: 'auto'}}>
                    <ImageIcon/>
                </label>
                <div className='chatScreen_input_field' style={sendingImages.length>0?{border:'solid aqua'}:{}}>
                    {sendingFiles.length>0? sendingFiles.map(file =>
                        <div className='chatScreen_file_outer'>
                            <InsertDriveFileIcon className='chatScreen_file_icon'/>
                            <p1>{file.name}</p1>
                            
                </div>):<></>}
                    {sendingImages.length > 0? sendingImages.map(image => <img src={image.file}/>):<></>}
                    <input type='file' name='image' accept="image/*, video/*" size="60"
                    id="image-upload" onChange={image_handler}/>
                    <TextareaAutosize className='chatScreen_input_text' rowsMax={4} placeholder="Message" onChange={onChange}/>
                </div>
                <button className='chatScreen_submit' type='submit'>SEND</button>
            </form>
        </div>
  )
}

export default ChatSendInput