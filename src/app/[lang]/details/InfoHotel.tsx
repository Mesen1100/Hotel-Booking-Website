"use client";
import { Button, Rating, Stack } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import HotelImages from "./HotelImages";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { sendPostRequest } from "@/services/ProductInfo";
import LanguageIcon from '@mui/icons-material/Language';
interface Props{
    hotelRoomPhotos: string[],
    HotelData?:HotelTry
}

const InfoHotel:React.FC<Props> = ({ hotelRoomPhotos, HotelData }) => {
    
    const hotelLocation = "Belek Mah. İskele Cad. Maxx Royal Blok No: 21/14 İç Kapı No:, 07505 Serik/Antalya";
    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${hotelLocation}`;
    

    
    //Google Map Api implementation
    return (
        <><Suspense>
            {hotelRoomPhotos && <HotelImages hotelRoomPhotos={hotelRoomPhotos} />}
            <div id="hotel-info" style={{ width: "90%", margin: "auto" }}>
                {HotelData && (
                    <>
                        <Stack direction={"row"} sx={{ alignItems: "center" }}>
                            <h2 style={{ marginRight: '10px' }}>{HotelData?.hotel?.name}</h2>
                            <Rating
                                name="text-feedback"
                                value={HotelData.hotel?.hotelCategory?.code}
                                readOnly
                                precision={0.5}
                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                            />
                        </Stack>
                        <Stack direction={"row"} sx={{ alignItems: "center" }} spacing={1}>
                            <LocationOnOutlinedIcon />
                            <Link href={googleMapsLink} target="_blank">TODO:Google APi ile adres yazılacak</Link>
                            
                            {HotelData?.hotel?.homePage && (
                                <>
                                <LanguageIcon />
                                <Link href={HotelData.hotel.homePage} target="_blank">Web Site</Link>
                                </>
                            )}
                            
                        </Stack>
                    </>
                )}
            </div>
        </Suspense>
        </>
    );
};

export default InfoHotel;
