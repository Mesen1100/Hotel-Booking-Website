"use client"
import { sendPostRequest } from "@/services/ProductInfo";
import { useState, useEffect, Suspense } from "react";
import InfoHotel from "./InfoHotel";
import TabPage from "./TabPage";
import Header from "../../../components/header/Header";
import { GetOfferRequest } from "@/services/GetOffer";
import { useSearchParams } from "next/navigation";
import useCurrencyStore from "@/components/store/useCurrencyStore";
import useHotelDetailRequestStore from "@/components/store/useHotelDetailRequestStore";


export interface Price {
    amount: number;
    currency: string;
}

export interface Room {
    roomId: string;
    roomName: string;
    // Add other room properties as needed
}

export interface OfferData {
    night: number;
    checkIn: string;
    price: Price;
    rooms: Room[];
    offerId:string;
    // Add other offer properties as needed
}

export interface HotelLocation{
    latitude: number;
    longitude: number;
}

const HotelDetailPage = () => {
    const [HotelData, setHotelData] = useState<HotelTry>();
    const [hotelRoomPhotos, setHotelRoomPhotos] = useState<string[]>([]); // ilgili fotolar
    const [roomOfferPhotos, setRoomOfferPhotos] = useState<string[]>([]); // ilgili fotolar
    const [hotelFacilites, setHotelFacilites] = useState<Facilites[]>();
    const [HotelOverview, setHotelOverview] = useState<TextCategory[]>();
    const [hotelOffersData, setHotelOffers] = useState<OfferData[]>();
    const {selectedCurrency}=useCurrencyStore();
    const {hotelRequest}=useHotelDetailRequestStore();
    const [ mapApiData, setMapApiData]= useState<HotelLocation>();

    const postData = {
        ownerProvider: 2,
        product: hotelRequest.hotelId
    };
    const postGetOfferData = {
        searchId: hotelRequest.searchId,
        offerId: hotelRequest.offerId,
        productId: hotelRequest.hotelId,
        currency: selectedCurrency
    };


    //325886
    useEffect(() => {
        //Buraya çekilecek kod
        const fetchHotelData = async () => {
            const data = await sendPostRequest(postData);
            setHotelData(data.body);
            try {
                const urls = data.body.hotel.seasons[0].mediaFiles.map((file: { urlFull: any; }) => file.urlFull);
                setHotelRoomPhotos(urls);
            } catch (error) {
            }
            try {
                const facilites = data.body.hotel.seasons[0].facilityCategories[0].facilities;
                setHotelFacilites(facilites);
            } catch (error) {
                console.log(error);
            }
            try {
                const textCategory = data.body.hotel.seasons[0].textCategories;
                setHotelOverview(textCategory);
            }
            catch (error) {
                console.log(error);
            }
            try {
                const data = await GetOfferRequest(postGetOfferData);
                if (data && data.body && data.body.offers) {
                    setHotelOffers(data.body.offers);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }

            try{
                const mapApi=data.body.hotel.geolocation;
                setMapApiData(mapApi);
            } catch(error){
                console.error(error)
            }

        };
        fetchHotelData();
    }, []);
    //Tab Page tüm offer istekleri gidecek
    return (
        <>
        <Suspense>
            <Header/>
            <InfoHotel HotelData={HotelData} hotelRoomPhotos={hotelRoomPhotos}/>
            <TabPage facilities={hotelFacilites} overview={HotelOverview} roomsOffers={hotelOffersData} roomPhotos={hotelRoomPhotos} mapApi={mapApiData}  />
        </Suspense>
            
        </>
    )
}


export default HotelDetailPage;

