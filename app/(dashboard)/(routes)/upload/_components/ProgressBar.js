import React from 'react'

function ProgressBar({progress=20}) {
  return (
    <div className="flex items-center w-full md:w-1/2 mt-3">
        <div className="bg-white flex-1 rounded-full">
          <div className="p-1 bg-primary rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="ml-2 font-semibold">{`${Number(progress).toFixed(0)}%`}</span>
    </div>

  )
}

export default ProgressBar
