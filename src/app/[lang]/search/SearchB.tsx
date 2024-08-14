import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchRequest } from '@/services/SearchRequest';
import useCurrencyStore from '@/components/store/useCurrencyStore';
import { useDictionary } from '@/components/dictionary/Dictionary';
import useFilterRequestStore from '@/components/store/useFilterRequestData';
import Loading from '@/components/loading/Loading';
import Message from '@/components/message/Message'; // Import your Message component



interface Props {
  data: any;
  category: boolean;
}


const SearchB: React.FC<Props> = ({ data, category }) => {
  const [showMessage, setShowMessage] = useState(true); // State to control message visibility

  const { HomePage } = useDictionary();
  const router = useRouter();
  const { filterRequestData, setFilterRequestData } = useFilterRequestStore();
  const { selectedCurrency } = useCurrencyStore();
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (showMessage) {
      timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000); // 5 seconds
    }

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, [showMessage]);

 
  const buttonStyle = {
    width: '100px',
    height: '40px',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: '10px',
    backgroundColor: "#516D87",
    color: "#ffffff",
    borderRadius: "50px",
    transition: 'background-color 0.3s', // Smooth transition effect
  };

  const buttonHoverStyle = {
    backgroundColor: "#3e5a72", // Background color on hover
  };

  const buttonActiveStyle = {
    backgroundColor: "#2a3d4d", // Background color on active
  };

  const handleClick = async () => {
    setLoading(true);
    setHasError(false); // Reset error state before starting the request

    try {
      const res = await SearchRequest(data, category);
      console.log(res);

      if (res?.body?.hotels) {
        setFilterRequestData({ searchId: res?.body?.searchId, currency: selectedCurrency });
        router.push("/results");
      } else {
        setHasError(true); // Set error if hotelId is missing
      }
    } catch (error) {
      console.error("Error occurred during search request:", error);
      setHasError(true); // Set error on exception
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : hasError ? (
        showMessage && <Message />
      ) : (
       <></>
      )}
       <Button
          style={buttonStyle}
          onClick={handleClick}
          
        >
          {HomePage.searchButton}
        </Button>
    </>
  );
};

export default SearchB;
