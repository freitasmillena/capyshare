import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { LoaderCircle } from 'lucide-react';

function FileInfo({file}) {
    const [fileType, setFileType] = useState();
    const [loading, setLoading] = useState(true);

    const handleLoadingComplete = () => {
      setLoading(false);
    };

    useEffect(() => {
        file&&setFileType(file?.fileType.split('/')[0]);
        console.log(fileType);
    }, [file]);

  return file&&(
    <div className='text-center border flex justify-center m-4 flex-col items-center p-2 rounded-md border-primary relative'>
    {/* Container da imagem com posição relativa */}
    <div className="relative w-[200px] h-[200px] flex items-center justify-center">
      {/* Ícone de loading sobreposto */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-md">
          <LoaderCircle className="w-8 h-8 text-primary animate-spin" />
        </div>
      )}
      
      {/* Imagem com visibilidade controlada */}
      <Image
        src={fileType === 'image' ? file?.fileUrl : '/file.png'}
        layout='fill'
        className={`rounded-md object-contain transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
        alt="File Preview"
        onLoadingComplete={handleLoadingComplete}
      />
    </div>

    <div className='mt-2'>
      <h2>{file.fileName}</h2>
      <h2 className='text-gray-500 text-[13px]'>{(file.fileSize / 1024 / 1024).toFixed(2)} MB</h2>
      <h2 className='text-gray-500 text-[13px]'>{file.fileType}</h2>
    </div>
  </div>
  )
}

export default FileInfo
