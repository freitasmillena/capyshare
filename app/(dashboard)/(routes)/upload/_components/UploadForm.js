import React, { useState, useRef } from 'react';
import AlertMessage from './AlertMessage';
import FilePreview from './FilePreview';
import ProgressBar from './ProgressBar';

function UploadForm({uploadBtnClick,progress}) {
  const [file, setFile] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const inputRef = useRef(null);

  const onFileSelect = (file) => {
    console.log(file);
    if (file && file.size > 2 * 1024 * 1024) {
      console.log('File is too big!');
      setErrorMsg('Maximum File Upload Size is 2 MB!');
      return;
    }
    setErrorMsg(null);
    setFile(file);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    onFileSelect(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    // Resetar o input para permitir o upload do mesmo arquivo novamente
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className='text-center items-center'>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full md:w-1/2 h-64 border-2 border-primary border-dashed rounded-lg cursor-pointer bg-tertiary"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-primary"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-lg md:text-2xl text-primary font-semibold">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-primary">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            ref={inputRef}
            onChange={handleFileChange}
          />
        </label>
      </div>
      {errorMsg && (
        <div className="flex flex-col items-center">
          <AlertMessage msg={errorMsg} />
        </div>
      )}
      {file && (
        <div className="flex flex-col items-center">
            <FilePreview file={file} removeFile={removeFile} />
        </div>
      )}
      <div className="flex flex-col items-center">
        {progress>0? (<ProgressBar progress={progress}/>):(<button
        disabled={!file}
        className="p-2 bg-primary text-white w-[30%] rounded-full mt-5 hover:bg-white hover:text-primary disabled:bg-gray-400"
      onClick={() => uploadBtnClick(file)}>
        Upload
      </button>)}
      </div>
    </div>
  );
}

export default UploadForm;
