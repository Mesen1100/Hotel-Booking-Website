
type FilterRequestResponse={
    body: any;
    searchId: string;
    expiresOn: string;
    hotels: FilterHotel[];
    header: Header;
}
type Header = {
    requestId: string;
    success: boolean;
}
type FilterHotel= {
    stars: number;
    offers: Offer[];
    hotelCategory: HotelCategory;
    id: string;
    name: string;
    facilities: Facility[];
    thumbnail: string;
    thumbnailFull: string;
    themes: Theme[];
  }
  
  type Offer = {
    night: number;
    rooms: FilterRoom[];
    offerId: string;
    checkIn: string;
    price: Price;
  }
  
  type FilterRoom= {
    roomId: string;
    roomName: string;
    price: null | Price;
  }
  
  type Price ={
    oldAmount: null | number;
    percent: null | number;
    amount: number;
    currency: string;
  }

  
  type HotelCategory= {
    name: string;
    id: string;
    code: string;
  }
  
  type Facility= {
    isPriced: boolean;
    id: string;
    name: string;
  }
  
  type Theme= {
    id: string;
    name: string;
  }

