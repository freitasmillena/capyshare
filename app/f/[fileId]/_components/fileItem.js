import Image from 'next/image'
import React, { useState } from 'react'
import { Download } from 'lucide-react'

function FileItem({file}) {
    const password = file?.password;
    const istherePassword = password!='';
    const [passwordInput, setPasswordInput] = useState();

  return (
    <div>
      <div className='p-5 rounded-md bg-white flex flex-col items-center'>
      <Image src='/capybaras.png' width={200} height={200} className='w-[150px] h-[150px] p-5'/>
        <h2 className='text-[20px] text-gray-600'>
          <strong className='text-primary'>{file?.userName} </strong>
          shared a capy file with you!
        </h2>

        <h2 className='text-gray-500 text-[15px]'><strong>File Name: </strong>{file?.fileName}</h2>
        <h2 className='text-gray-500 text-[15px]'><strong>File Size: </strong>{file?.fileSize} Bytes</h2>
        <h2 className='text-gray-500 text-[15px]'><strong>File Type: </strong>{file?.fileType}</h2>
      </div>

      {password&&<input type='password' className='p-2 border w-full rounded-md text-[14px] mt-5 text-center outline-primary'
        onChange={(e) => setPasswordInput(e.target.value)} placeholder='Enter password to acess the file'/>}
      <button href='' className='flex gap-2 p-2 bg-primary text-white rounded-full w-full items-center hover:bg-secondary text-[14px] mt-5 text-center justify-center disabled:bg-gray-300' 
        onClick={()=>window.open(file?.fileUrl)}
        disabled={password!==passwordInput && istherePassword}>
        <Download className='h-4 w-4'/> Download
      </button>   
    </div>
  )
}

export default FileItem
