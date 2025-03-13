"use client";
import React, { useEffect, useState } from 'react'
import UploadForm from './_components/UploadForm'
import { app } from '@/firebaseConfig';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { generateRandomString } from '@/app/_utils/GenerateRandomString';
import { useRouter } from 'next/navigation';

function Upload() {

 const {user} = useUser();

  const [progress, setProgress] = useState();
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const router = useRouter();
  const storage = getStorage(app);
  const db = getFirestore(app, "capysharedb");
  const [fileDocId, setFileDocId] = useState();

  const uploadFile = (file) => {
    const metadata = {
      contentType: file.type
    };
    const storageRef = ref(storage, 'capyshare/' + file?.name);
    const uploadTask = uploadBytesResumable(storageRef, file, file.type);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setProgress(progress);
      },
      (error) => {
        // Lida com erros no upload
        console.error('Upload error:', error);
      },
      () => {
        // Callback de conclusão, garante que o upload foi finalizado
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log('File available at', downloadURL);
            saveInfo(file, downloadURL);
          })
          .catch((error) => {
            console.error('Erro ao obter URL:', error);
          });
      }
    );
    
  }

  const saveInfo=async (file, fileUrl)=>{
    const docId=generateRandomString();
    console.log('saveInfo', docId);
    // const docData = {
    //   fileName: file?.name,
    //   fileSize: file?.size,
    //   fileType: file?.type,
    //   fileUrl: fileUrl,
    //   userEmail: user?.primaryEmailAddress.emailAddress,
    //   userName: user?.fullName,
    //   password: '',
    //   shortUrl: process.env.NEXT_PUBLIC_BASE_URL + generateRandomString()
    // };
    // console.log('Dados do documento:', docData);
    try {
      const resp = await setDoc(doc(db, "capyShareFiles", docId), {
        fileName: file?.name,
        fileSize: file?.size,
        fileType: file?.type,
        fileUrl: fileUrl,
        userEmail: user?.primaryEmailAddress.emailAddress,
        userName: user?.fullName,
        password: '',
        shortUrl: process.env.NEXT_PUBLIC_BASE_URL + '/f/' + docId
      });
      setFileDocId(docId);
    } catch (error) {
      console.error('Erro ao salvar informações:', error);
    }
  }

  useEffect(() => {
    console.log("Trigger");
    progress==100&& setTimeout(() => {
      setUploadCompleted(true);
    }, 2000);
  },[progress==100])

  useEffect(() => {
    uploadCompleted&&setTimeout(() => {
      router.push('/file-preview/'+fileDocId);
    }, 2000);
  }, [uploadCompleted==true, fileDocId]);

  return (
    <div className='p-5 px-8 md:px-28'>
      <h2 className='text-[20px] text-center m-5 text-white'><strong className='text-primary'>Upload</strong> and <strong className='text-primary'>Share</strong> your Files!</h2>
      {!uploadCompleted ? (
        <UploadForm uploadBtnClick={uploadFile} progress={progress} />
      ) : (
        <div className="flex flex-col items-center justify-center h-64">
          <svg
            className="w-12 h-12 mb-4 text-primary animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <p className="text-lg md:text-2xl text-primary font-semibold">
            Upload Completed! Redirecting...
          </p>
        </div>
      )}
    </div>
  )
}

export default Upload
