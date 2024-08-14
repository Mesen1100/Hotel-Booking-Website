const sendPostRequest = async (postData:any) => {
    const response = await fetch('http://localhost:5088/api/ProductInfo/GetProductInfo', {
        method: 'POST',
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
};

export { sendPostRequest };