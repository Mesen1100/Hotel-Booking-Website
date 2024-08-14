"use client"
import React from 'react';
import notFoundImage from '../../../../assets/images/notfound.jpg'; // Adjust the path as needed
import Image from 'next/image';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';


const Page = () => {
     const router=useRouter();

    const handleClick = () => {
        router.push('/tr'); // Router ile yönlendirme yapın
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '30px', textAlign: 'center' }}>
            <div>Something went wrong!</div>
            <Image src={notFoundImage} alt="Not Found" style={{ marginTop: '20px', width: '500px', height: 'auto' }} />
            <Button variant="contained" onClick={handleClick}>Home Page</Button>
        </div>
    );
}

export default Page;
