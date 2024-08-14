import { create } from "zustand";

type HotelDetailRequestType={
    hotelId:string;
    searchId:string;
    offerId:string;
}
type HotelDetailRequestState={
    hotelRequest:HotelDetailRequestType;
    setHotelRequest:(newHotelRequest:HotelDetailRequestType)=>void;
};
const useHotelDetailRequestStore=create<HotelDetailRequestState>((set)=>({
    hotelRequest:{
        hotelId:"",
        searchId:"",
        offerId:""
    },
    setHotelRequest:(newHotelRequest)=> set({hotelRequest:newHotelRequest}),
}));
export default useHotelDetailRequestStore;