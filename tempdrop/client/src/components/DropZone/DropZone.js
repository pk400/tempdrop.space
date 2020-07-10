import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import './DropZone.css'

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="static" {...props} color="primary" />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const DropZone = () => {
  const [uploadProgress, setUploadProgress] = useState(0)

  const dragOver = e => {
    e.preventDefault()
  }

  const dragEnter = e => {
    e.preventDefault()
  }

  const dragLeave = e => {
    e.preventDefault()
  }

  const fileDrop = e => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length === 0) {
      return
    }
    const file = files[0]
    if (file.size > (2**20) * 50) {
      alert('file too big')
      return
    }
    const dropMessage = document.getElementById('drop-message')
    const progressBar = document.getElementById('progress')
    dropMessage.style.display = 'none'
    progressBar.style.display = 'block'
    const formData = new FormData()
    formData.append('uploaded_file', file)
    axios.post('/api/file/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (p) => setUploadProgress((p.loaded / p.total) * 100)
    }).then(response => {
      const success_element = document.querySelector('#success_text')
      success_element.innerHTML = `<h2>Here is your share link: <a href='/share/${response.data.share_id}'>Share Link</a></h2>`
    })
  }

  return (
    <div
      className='drop-container'
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={fileDrop}>
      <div className='drop-message' id='drop-message'>
        Drop your file here
      </div>
      <div className='progress' id='progress'>
        <CircularProgressWithLabel value={uploadProgress} />
      </div>
      <div id='success_text'></div>
    </div>
  )
}

export default DropZone
