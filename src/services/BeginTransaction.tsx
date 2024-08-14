const BeginTransactionRequest = async (BeginData: any) => {
    const response = await fetch('http://localhost:5088/api/BeginTransaction/BeginTransactionWithOffer', {
        method: 'POST',
        headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(BeginData),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
};

export { BeginTransactionRequest };