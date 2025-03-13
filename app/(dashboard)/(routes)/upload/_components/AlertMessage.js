import React from 'react';

function AlertMessage({msg}) {
  return (
    <div className='p-4 bg-red-500 mt-5 w-full md:w-1/2 text-white rounded-md flex justify-center'>
      {msg}
    </div>
  )
}

export default AlertMessage
