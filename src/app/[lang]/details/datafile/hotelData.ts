type HotelTry = {
    hotel: {
        homePage: string;
        hotelCategory: any;
        name: string;
    };
};
type Facilites = {
    name: string;
    isPriced: boolean;
};
type TextCategory = {
    name: string;
    presentations: {
        text: string;
    }[];
}
type Room = {
    facilities: Facilites[];
    mediaFiles: MediaFiles[];
    name: string;
}

type Presentation = {
    text: string;
}

type MediaFiles = {
    urlFull: string;
}
