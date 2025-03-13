import React from 'react'
import Image from 'next/image'
import { IoMdCloseCircle } from "react-icons/io";

function FilePreview({file, removeFile}) {
  return (
    <div className='flex items-center w-full md:w-1/2 gap-2 justify-between mt-5 border rounded-md p-2 border-primary'>
    <div className='flex items-center p-2'>
      <Image src='/file.png' width={50} height={60} alt='file'/>
      <div className='text-left'>
        <h2>{file.name}</h2>
        <h2 className='text-[12px] text-gray-500'>{file?.type}</h2>
        <h2 className='text-[12px] text-gray-500'>{(file.size/1024/1024).toFixed(2)} MB</h2>
      </div>
      </div>
      <IoMdCloseCircle className='text-primary text-[24px] cursor-pointer' onClick={() => removeFile()}/>
    </div>
  )
}

export default FilePreview
