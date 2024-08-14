interface ContactPhone {
    countryCode: string;
    areaCode: string;
    phoneNumber: string;
  }
  
  interface Address {
    contactPhone: ContactPhone;
    email: string;
    address: string;
    zipCode: string;
    city: {
      id: string;
      name: string;
    };
    country: {
      id: string;
      name: string;
    };
    phone: string;
  }
  
  interface PassportInfo {
    serial: string;
    number: string;
    expireDate: string;
    issueDate: string;
    citizenshipCountryCode: string;
    issueCountryCode: string;
  }
  
  interface Nationality {
    twoLetterCode: string;
  }
  
  interface AcademicTitle {
    id: number;
  }
  
  interface Traveller {
    travellerId: string;
    type: number;
    title: number;
    academicTitle: AcademicTitle;
    passengerType: number;
    name: string;
    surname: string;
    isLeader: boolean;
    birthDate: string;
    nationality: Nationality;
    identityNumber: string;
    passportInfo: PassportInfo;
    address: Address;
    destinationAddress: object; // You may want to define a more specific type if needed
    orderNumber: number;
    documents: string[];
    insertFields: string[];
    status: number;
    gender: number;
    uiAge: string;
  }
  
  interface TravellerList {
    travellers: Traveller[];
  }