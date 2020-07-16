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

  const browseFile = e => {
    e.preventDefault()
    handleFileUpload(e.target.files[0])
  }

  const fileDrop = e => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length === 0) {
      return
    }
    handleFileUpload(files[0])
  }

  const handleFileUpload = file => {
    if (file.size > (2**20) * 50) {
      const success_element = document.querySelector('#result_text')
      success_element.innerHTML = `<h2>File is too big!</h2>`
      return
    }
    const dropMessage = document.getElementById('drop-message')
    const browseButton = document.getElementById('upload-input-container')
    const progressBar = document.getElementById('progress')
    dropMessage.style.display = 'none'
    browseButton.style.display = 'none'
    progressBar.style.display = 'block'
    const formData = new FormData()
    formData.append('uploaded_file', file)
    axios.post('/api/file/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (p) => setUploadProgress((p.loaded / p.total) * 100)
    }).then(response => {
      const shareLink = `${window.location.host}/share/${response.data.share_id}`
      const resultElement = document.querySelector('#result_text')
      const shareLinkInput = document.createElement('input')
      shareLinkInput.className = 'share-link-input'
      shareLinkInput.readOnly = true
      shareLinkInput.type = 'text'
      shareLinkInput.value = shareLink
      const copyButton = document.createElement('button')
      copyButton.className = 'copy-button'
      copyButton.innerHTML = 'Copy'
      copyButton.onclick = () => {
        shareLinkInput.select()
        document.execCommand('copy')
      }
      resultElement.appendChild(copyButton)
      resultElement.appendChild(shareLinkInput)
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
        <span>Drop your file here</span>
        <span>OR</span>
      </div>
      <div className='upload-input-container' id='upload-input-container'>
        <label for='upload-input' class='upload-input'>Browse</label>
        <input id='upload-input' type='file' onChange={browseFile} hidden />
      </div>
      <div className='progress' id='progress'>
        <CircularProgressWithLabel
          value={uploadProgress}
          size='5em'
          thickness={5} />
      </div>
      <div className='result-text' id='result_text'></div>
    </div>
  )
}

export default DropZone
