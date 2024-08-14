const SearchRequest =async(data:any,category:boolean) =>{
    if(category){
       try {
        // Send the POST request to the external API
        const response = await fetch('http://localhost:5088/api/PriceSearch/SearchPricesForHotel', {
          method: 'POST',
          headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
    
        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
    
        // Parse the response data
        const responseData = await response.json();
        return responseData;

      } catch (error) {
        console.log(error);
      } 
    }
    else{
        try {
            // Send the POST request to the external API
            const response = await fetch('http://localhost:5088/api/PriceSearch/SearchPricesForLocation', {
              method: 'POST',
              headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
        
            // Check if the response is successful
            if (!response.ok) {
              throw new Error(`Error: ${response.statusText}`);
            }
        
            // Parse the response data
            const responseData = await response.json();
            return responseData;

          } catch (error) {
            console.log(error);
          }
    }
    
}
export {SearchRequest};
const FilterRequest= async (data:any)=>{
  try {
    // Send the POST request to the external API
    const response = await fetch('http://localhost:5088/api/FilterForLocationSearch/FilterForLocationSearch', {
      method: 'POST',
      headers: {
        'accept': 'text/plain',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // Parse the response data
    const responseData = await response.json();

    return responseData;

  } catch (error) {
    console.log(error);
  } 
}
export {FilterRequest};