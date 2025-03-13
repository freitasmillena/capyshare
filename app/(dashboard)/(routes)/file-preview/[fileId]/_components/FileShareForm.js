import React, {useState} from 'react'
import {Copy, CopyIcon} from 'lucide-react';
import GlobalApi from '@/app/_utils/GlobalApi';
import { useUser } from "@clerk/nextjs";

function FileShareForm({file, onPasswordSave}) {
    const [isPasswordEnable, setIsPasswordEnable] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(''); 
    const [savePassword, setSavePassword] = useState(false);
    const { user } = useUser();
    const [emailSent, setEmailSent] = useState(false);
    const [copied, setCopied] = useState(false);
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };
    
    const isEmailValid = /\S+@\S+\.\S+/.test(email);

    const sendEmail=()=>{
      const data = {
        email: email,
        userName: user?.fullName,
        fileName: file.fileName,
        fileSize: file.fileSize,
        fileType: file.fileType,
        shortUrl: file.shortUrl,
      }

      GlobalApi.SendEmail(data).then(response=>{
        console.log(response);
      })

      setEmailSent(true);
    }

    const onCopyClick = () => {
      navigator.clipboard.writeText(file.shortUrl);
      setCopied(true);

      // Depois de 2 segundos, a mensagem desaparecerá
      setTimeout(() => {
        setCopied(false);
      }, 2000);

    }

    return file&&(
    <div className='flex flex-col gap-2 mt-10'>
      <div>
        <label className='text-[14px] text-primary'>Short Url</label>
        <div className='flex gap-5 p-2 border rounded-md justify-between items-center'>
            <input type='text' value={file?.shortUrl} disabled className='disabled:text-gray-600 bg-transparent outline-none'/>
            <div className="relative">
          {/* Se a URL foi copiada, mostra a mensagem */}
          {copied && (
            <span className="absolute bottom-full mb-4 text-sm text-primary">Copied!</span>
          )}
          <Copy
            className='text-primary hover:text-gray-600 cursor-pointer'
            onClick={onCopyClick}
          />
        </div>
        </div>
      </div>

      <div className='gap-3 flex mt-5'>
        <input type='checkbox' onChange={(e)=>setIsPasswordEnable(e.target.checked)} className='cursor-pointer'/>
        <label className='text-[14px] text-primary'>Enable Password Protection</label>
      </div>

      {isPasswordEnable && (
        <>
          <div className='flex gap-3 items-center'>
            <div className='border rounded-md w-full p-2'>
              <input 
                type='password'
                className='disabled:text-gray-500 bg-transparent outline-none'
                onChange={(e) => {setPassword(e.target.value); setSavePassword(false)}}
              />
            </div>
            <button 
              className='p-2 bg-primary text-white rounded-md disabled:bg-gray-300 disabled:text-white hover:bg-white hover:text-primary'
              disabled={password?.length < 4}
              onClick={() => {onPasswordSave(password); setSavePassword(true)}}
            >
              Save
            </button>
          </div>

          {savePassword && <p className="text-primary text-sm mt-2">Password saved successfully!</p>}
        </>
        )}

        <div className="mt-5">
          <label className="text-[14px] text-primary">Send E-mail</label>
          <div className="flex gap-3 items-center">
            <div className="border rounded-md w-full p-2">
              <input
                type="email"
                className="disabled:text-gray-600 bg-transparent outline-none"
                placeholder="Enter e-mail"
                value={email}
                onChange={(e) => {handleEmailChange(e); setEmailSent(false)}}
              />
            </div>
            <button
              className="p-2 bg-primary text-white rounded-md disabled:bg-gray-300 disabled:text-white hover:bg-white hover:text-primary"
              disabled={!isEmailValid} // Desabilitar se o e-mail não for válido
              onClick={() => sendEmail()}
            >
              Send
            </button>
          </div>
          {emailSent && <p className="text-primary text-sm mt-2">E-mailt sent successfully!</p>}
          </div>
    </div>
  )
}

export default FileShareForm
