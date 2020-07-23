const showRef = (ref) => {
  ref.current.style.display = 'block'
  ref.current.style.visibility = 'visible'
}

const hideRef = (ref) => {
  ref.current.style.display = 'none'
  ref.current.style.visibility = 'hidden'
}

const convertSize = (totalBytes) => {
  return Number.parseFloat(totalBytes / (2 ** 20)).toFixed(2)
}

export { showRef, hideRef, convertSize }
