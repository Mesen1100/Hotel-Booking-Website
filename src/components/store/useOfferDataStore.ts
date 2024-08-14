import { OfferData } from "@/app/[lang]/details/page";
import { create } from "zustand";

type OfferState = {
    roomOffer: OfferData;
    roomPhoto: string;
    setRoomOffer: (newOffer: OfferData) => void;
    setRoomPhoto: (newPhoto: string) => void;
    transactionId:string;
    setTransactionId:(newTransactionId:string)=>void;
}
const useOfferStore = create<OfferState>((set) => ({
    roomOffer: {
        checkIn: "",
        night: 0,
        price: {
            amount: 0,
            currency: ""
        },
        rooms: [
            {
                roomId: "0",
                roomName: "Deneme"
            }
        ],
        offerId:""
    },
    roomPhoto: "",
    setRoomOffer: (newOffer: OfferData) => set({ roomOffer: newOffer }),
    setRoomPhoto: (newPhoto: string) => set({ roomPhoto: newPhoto }),
    transactionId:"",
    setTransactionId:(newTransactionId:string)=>set({transactionId:newTransactionId})
}))
export default useOfferStore;