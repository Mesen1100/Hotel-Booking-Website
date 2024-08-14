const GetOfferRequest = async (GetOfferData: any) => {
    const response = await fetch('http://localhost:5088/api/GetOffer/GetOffers', {
        method: 'POST',
        headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(GetOfferData),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
};

export { GetOfferRequest };