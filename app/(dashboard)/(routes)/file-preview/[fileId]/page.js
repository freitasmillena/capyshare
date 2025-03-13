"use client";
import { app } from '@/firebaseConfig';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import FileInfo from './_components/FileInfo';
import FileShareForm from './_components/FileShareForm';

function FilePreview({params}) {
    const db = getFirestore(app, "capysharedb");
    const [file, setFile] = useState();
    useEffect(() => {
        console.log(params?.fileId);
        params?.fileId&&getFileInfo();
    },[]);

    const getFileInfo=async ()=>{
        const docRef = doc(db, "capyShareFiles", params?.fileId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setFile(docSnap.data());
        } 
        else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    const onPasswordSave=async (password)=>{
        const docRef = doc(db, "capyShareFiles", params?.fileId);
        await updateDoc(docRef, {
            password: password
        });
    }

  return (
    <div className='py-10 px-20'>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-5'>
        <FileInfo file={file}/>
        <FileShareForm file={file} onPasswordSave={(password)=>onPasswordSave(password)}/>
      </div>
    </div>
  )
}

export default FilePreview
