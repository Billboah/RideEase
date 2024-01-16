import React from 'react'
import FadeLoader from 'react-spinners/FadeLoader'
import ClipLoader from 'react-spinners/ClipLoader'

function FadeLoading({ height, width, margin }) {
  return (
    <FadeLoader color='#4464ab' height={height} width={width} margin={margin} />
  )
}

function ClipLoading({ size }) {
  return <ClipLoader color='#4464ab' size={size} />
}

export { ClipLoading, FadeLoading }
