import React from 'react';

import './Button.css'

const Button = ({
  text = 'Button',
  onClick
}) => {
  return (
    <button
      className='td-button'
      onClick={onClick}>
      {text}
    </button>
  )
}

export default Button;
