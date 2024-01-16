import React from 'react'
import { useEffect, useState } from 'react'
import { setCarType, setCarDuration } from '../state/features/locationSlice'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectCarType } from '../state/features/locationSlice'

const CarType = ({ car, pickupCoordinates, dropoffCoordinates }) => {
  const selectedCar = useSelector(selectCarType)
  const [rideDuration, setRideDuration] = useState(0)
  const [confirmCar, setConfirmCar] = useState('')
  const router = useRouter()
  const dispatch = useDispatch()

  const SelectACar = async () => {
    dispatch(setCarType(car.service))
    dispatch(setCarDuration(rideDuration))
  }

  const ref = React.useRef()

  //Get ride duration from mapbox api
  useEffect(
    () => {
      async function getride() {
        const res = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?access_token=pk.eyJ1IjoiYmlsbGJvYWgiLCJhIjoiY2wybmoyeGFtMTdsajNvcGs3Mnc3am90NCJ9.FT5UVt4lOypQQfet1kc58A`,
        )
        if (!res.ok) {
          router.push('/search')
        }
        const data = await res.json()
        let duration = data.routes[0].duration
        setRideDuration(duration / 100)
        setConfirmCar(ref.current?.innerText)
      }
      getride()
    },
    [pickupCoordinates, dropoffCoordinates],
    confirmCar,
  )

  return (
    <>
      <button
        className={`flex w-full items-center p-4 hover:bg-gray-100 active:bg-white ${
          selectedCar === car.service ? 'bg-gray-100' : 'bg-white'
        }`}
        onClick={SelectACar}
      >
        <img
          className='mr-4 h-14'
          src={car.imgUrl}
          alt={`${car.service} image`}
        />
        <div className='flex flex-1 flex-col items-start'>
          <div className='font-medium' ref={ref}>
            {car.service}
          </div>
          <div className='text-xs text-blue-500'>5 min away</div>
        </div>
        <div className='text-sm'>
          {'$' + (rideDuration * car.multiplier).toFixed(2)}
        </div>
      </button>
    </>
  )
}

export default CarType
