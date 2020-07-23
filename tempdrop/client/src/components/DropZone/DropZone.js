import axios from 'axios'
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useState, useRef, useEffect } from 'react'
import Typography from '@material-ui/core/Typography';

import './DropZone.css'

import Button from '../Button/Button'
import { showRef, hideRef, convertSize } from '../../utils'

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
  const MAX_FILE_SIZE = (2**20) * 50
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadFile, setUploadFile] = useState(null)
  const [resultMessage, setResultMessage] = useState('')
  const [shareLink, setShareLink] = useState('')
  const fileInputField = useRef(null)
  const uploadScreen = useRef(null)
  const confirmScreen = useRef(null)
  const shareLinkField = useRef(null)
  const shareLinkInput = useRef(null)
  const progressBar = useRef(null)
  const dragOver = (event) => event.preventDefault()
  const dragEnter = (event) => event.preventDefault()
  const dragLeave = (event) => event.preventDefault()

  const isValidFile = file => {
    if (file.size > MAX_FILE_SIZE) {
      setResultMessage('File is too big!')
      return false
    }
    return true
  }

  const handleFileDrop = (event) => {
    event.preventDefault()
    handleFileUpload(event.dataTransfer.files[0])
  }

  const handleFileBrowse = (event) => {
    event.preventDefault()
    handleFileUpload(event.target.files[0])
  }

  const handleFileUpload = file => {
    if (!isValidFile(file)) {
      return
    }
    hideRef(uploadScreen)
    showRef(confirmScreen)
    setUploadFile(file)
    const formData = new FormData()
    formData.append('uploaded_file', file)
    axios.post('/api/file/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (p) => setUploadProgress((p.loaded / p.total) * 100)
    }).then(response => {
      setShareLink(`https://${window.location.host}/share/${response.data.share_id}`)
      showRef(shareLinkField)
      hideRef(progressBar)
      setUploadProgress(0)
    })
  }

  return (
    <div
      className='drop-container'
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={handleFileDrop}>
      <div className='upload-screen' ref={uploadScreen}>
        <div className='drop-message' id='drop-message'>
          <span>Drop your file here</span>
          <span>OR</span>
        </div>
        <div className='upload-input-container' id='upload-input-container'>
          <Button text='Browse' onClick={() => fileInputField.current.click()} />
          <input
            id='upload-input'
            type='file'
            onChange={handleFileBrowse}
            ref={fileInputField}
            hidden />
        </div>
        <div className='result-text' id='result_text'>
          {resultMessage ? <h3>{resultMessage}</h3> : null}
        </div>
      </div>
      <div className='confirm-screen' ref={confirmScreen} hidden>
        <div>File Name: {uploadFile ? uploadFile.name : null}</div>
        <div>File Size: {uploadFile ? convertSize(uploadFile.size) + ' mb' : null}</div>
        <div className='progress' ref={progressBar}>
          <CircularProgressWithLabel
            value={uploadProgress}
            size='5em'
            thickness={5} />
        </div>
        <div className='share-link-field' ref={shareLinkField} hidden>
          <button className='copy-button' onClick={() => {
            shareLinkInput.current.select()
            document.execCommand('copy')
          }}>Copy</button>
          <input
            className='share-link-input'
            type='text'
            value={shareLink}
            ref={shareLinkInput}
            readOnly />
          <div>
            <Button text='Upload another' onClick={() => {
              showRef(uploadScreen)
              hideRef(confirmScreen)
              showRef(progressBar)
            }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DropZone
