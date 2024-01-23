import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { useRouter } from 'next/router'

function SavePlaces({ pickup, id, dropoff, deleteLocationItem }) {
  const router = useRouter()

  const findLocation = () => {
    router.push({
      pathname: '/confirm',
      query: {
        pickup: pickup,
        dropoff: dropoff,
      },
    })
  }

  return (
    <div>
      <li className='group ml-[35px] flex w-full justify-between p-[5px] hover:bg-gray-100 active:bg-gray-200'>
        <button onClick={findLocation} className='flex-1 text-left'>
          <div>
            <span className='font-bold'>From:</span>
            <span className='mx-[5px] capitalize'>{pickup}</span>
            <span className='ml-[5px] font-bold'>To:</span>
            <span className='mx-[5px] capitalize'>{dropoff}</span>
          </div>
        </button>
        <button className='' onClick={() => deleteLocationItem(id)}>
          <DeleteIcon />
        </button>
      </li>
    </div>
  )
}

export default SavePlaces


