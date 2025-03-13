"use client";
import Header from '@/app/_components/Header';
import React, { useEffect, useState } from 'react'
import { app } from '@/firebaseConfig';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import FileItem from './_components/fileItem';




function FileView({params}) {
    const db = getFirestore(app, "capysharedb");
    const [file, setFile] = useState();

    useEffect(() => {
        //console.log(params.fileId)
        params.fileId&&getFileInfo();
    },[])

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

  return (
    <div>
      <Header/>  
      <div className='bg-transparent w-full md:w-1/2 min-h-[600px] mx-auto flex flex-col justify-center items-center mt-10'>
        <FileItem file={file}/>
      </div>
    </div>
  )
}

export default FileView
