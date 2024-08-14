"use client";
import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import EmailIcon from '@mui/icons-material/Email';
import { useDictionary } from '../dictionary/Dictionary';

const Footer = () => {
    const {FooterPage}=useDictionary();
    return (
        <div style={{
            position: "absolute",
            bottom: 0,
            width: "99%",
        }}>
            <div style={{
                width: "99%"
            }} >
                <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center", width: "99%"
                }}>
                    <div
                        style={{
                            color: "#ffffff",
                            marginLeft: 30
                        
                        }}
                    >
                        {FooterPage.footerTitle1}<br />
                        {FooterPage.footerTitle2}
                    </div>

                    <div
                        
                        className="mt-4 flex justify-center">

                        <a
                            href="https://www.instagram.com/inci_4liyeva/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2"
                        >
                            <InstagramIcon fontSize="medium" sx={{ color: 'white',marginRight:2 }} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/mustafa-esen-4738891b8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2"
                        >
                            <LinkedInIcon fontSize="medium" sx={{ color: 'white',marginRight:2 }} />
                        </a>
                        <a
                            href="https://x.com/mesen1100"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2"
                        >
                            <XIcon fontSize="medium" sx={{ color: 'white' ,marginRight:2}} />
                        </a>
                        <a
                            href="mailto:mervetugcegzr@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2"
                        >
                            <EmailIcon fontSize="medium" sx={{ color: 'white' }} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
