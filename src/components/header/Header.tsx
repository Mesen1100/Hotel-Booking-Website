"use client";
import React, { Suspense } from 'react';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import Image from 'next/image';
import logo from "../../assets/images/logo.png"
import ButtonSection from "@/components/header/ButtonSection"
import { useRouter } from 'next/navigation';
const Header = () => {
    const router = useRouter();

    const handleReset = () => {
        router.push('/');

    };


    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <AppBar
                    position="fixed"
                    sx={{
                        bgcolor: "fffff",
                        color: "#7f1f1f",

                        maxHeight: '50px',

                    }}
                >
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: "#FFFFFF" }}>
                        <Button onClick={handleReset}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 0,
                                minWidth: 0,
                                borderRadius: '8px',
                                boxShadow: 'none',
                                backgroundColor: 'transparent',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                            }}

                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, ml: -1.5 }}>
                                <Image
                                    src={logo}
                                    alt="Roomify Logo"
                                    width={220}
                                    height={220}
                                    quality={100}
                                    layout="intrinsic"
                                />
                            </Box>
                        </Button>
                        <ButtonSection />
                    </Toolbar>
                </AppBar>
            </Suspense>
        </>
    );

}

export default Header;

