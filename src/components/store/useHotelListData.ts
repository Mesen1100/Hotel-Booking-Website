import {create} from "zustand";
export interface Theme {
    id: string;
    name: string;
}
interface Country {
    name: string;
    id: string | null;
}
interface City {
    name: string;
    id: string;
}
interface GiataInfo {
    hotelId: string;
    destinationId: string;
}
interface Traveller {
    type: number;
}
interface Room {
    roomId: string;
    roomName: string;
    roomGroups: string[] | null;
    accomId: string | null;
    accomName: string | null;
    allotment: number | null;
    stopSaleGuaranteed: number;
    stopSaleStandart: number;
    price: number | null;
    travellers: Traveller[];
}
interface Offer {
    night: number;
    isAvailable: boolean;
    rooms: Room[];
    isRefundable: boolean;
    offerId: string;
    checkIn: string;
    price: {
        amount: number;
        currency: string;
    };
    ownOffer: string | null;
}
export interface Hotel {
    geolocation: Geolocation;
    stars: string;
    themes: Theme[];
    country: Country;
    city: City;
    giataInfo: GiataInfo;
    offers: Offer[];
    provider: number;
    thumbnailFull: string | null;
    description: {
        text: string;
    };
    id: string;
    name: string;
}
interface Details {
    enablePaging: boolean;
    getOnlyBestOffers: boolean | null;
}
interface Message {
    id: number;
    code: string;
    messageType: number;
    message: string;
}
interface Header {
    requestId: string;
    success: boolean;
    messages: Message[];
}
export interface HotelSearchResponse {
    body: any;
    searchId: string;
    expiresOn: string;
    hotels: Hotel[];
    details: Details;
    header: Header;
}
type HotelSearchResponseState = {
    HotelList: HotelSearchResponse | null;
    setHotelList: (newHotelList: HotelSearchResponse) => void;
    deleteHotelList: () => void;
};

const useHotelSearchResponseStore = create<HotelSearchResponseState>((set) => ({
    HotelList: null,
    setHotelList: (newHotelList: HotelSearchResponse) => set({ HotelList: newHotelList }),
    deleteHotelList: () => set({ HotelList: null }),
}));

export default useHotelSearchResponseStore;
