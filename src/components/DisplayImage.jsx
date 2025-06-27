import React from 'react'
import { CgClose } from 'react-icons/cg'

const DisplayImage = ({
  imageUrl,
  onClose
}) => {
  return (
    <div className=' fixed bottom-0 top-0 left-0 right-0 flex justify-center items-center'>

      <div className=' bg-white shadow-lg rounded max-w-5xl mx-auto p-4'>
        <div className=' w-fit ml-auto'>
              <CgClose className='cursor-pointer mt-2 text-2xl hover:text-red-600' onClick={onClose} />
        </div>
        <div className=' flex justify-center p-4 max-w-[90vh] max-h-[90vh]'>
          <img src={imageUrl} alt={imageUrl} className=' w-full h-full'/>
        </div>
      </div>
    </div>
  )
}

export default DisplayImage
