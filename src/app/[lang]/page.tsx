"use client";
import Head from "next/head";
import Image from "next/image";
import backg1 from "../../assets/images/backg2 (2).jpg";
import backg2 from "../../assets/images/backg4.jpg";
import backg4 from "../../assets/images/backg5.jpg";
import backg5 from "../../assets/images/backg6.jpg";
import backg6 from "../../assets/images/backg8.jpg";
import backg7 from "../../assets/images/back9.jpg";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Locale } from "@/lib/i18n/i18n.config";
import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import GuestInfo from "./search/GuestInfo";
import SearchB from "./search/SearchB";
import { DateRange, SingleInputDateRangeField } from "@mui/x-date-pickers-pro";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Grouped from "./search/Autocompletes";
import React, { useEffect, useState } from 'react';
import dayjs from "dayjs";
import useCurrencyStore from "../../components/store/useCurrencyStore";
import useNationalityStore from "../../components/store/useNationalityStore";
import useRoomStore from "../../components/store/useRoomCriteriaStore";
import { useDictionary } from "@/components/dictionary/Dictionary";

const images = [backg1.src, backg2.src, backg4.src, backg5.src, backg6.src,backg7.src];
type roomCriteria = {
  adult: number;
  childAges: number[];
}
type SearchRequest = {
  roomCriteria: roomCriteria;
  nationality: string;
  checkIn: string;
  night: number;
  currency: string;
}
export default function Home({
  params: { lang }
}: {
  params: { lang: Locale }
}) {

  const [backgroundImage, setBackgroundImage] = React.useState(images[0]);
  // const [dateRange, setDateRange] = useState([null, null]);
  const [dateRange, setDateRange] = useState<DateRange<dayjs.Dayjs>>([null, null]);
  const [hotelId, setHotelId] = useState("");
  const [category, setCategory] = useState<boolean>(false);
  const [nationality, setNationality] = useState("");
  const [formattedDateRange, setFormattedDateRange] = useState<{ start: string | null, end: string | null }>({ start: null, end: null });
  const [nights, setNights] = useState<number | null>(null);
  const { currencies, selectedCurrency, setSelectedCurrency } = useCurrencyStore();
  const {nationalities,selectedNationality,setSelectedNationality}=useNationalityStore();
  const {adult,childAges,setNight}=useRoomStore();
  const [data,setData]=useState<any>();
  useEffect(() => {
    if (hotelId && formattedDateRange.start && formattedDateRange.end && nights !== null && selectedCurrency && selectedNationality) {
      const requestData = category
        ? {
          //Hotel
          products: [hotelId],
          productPriceCategories: [{ product: hotelId, category: "" }],
          roomCriteria: [{ adult, childAges }],
          nationality: selectedNationality?.abbr,
          checkIn: formattedDateRange.start,
          night: nights,
          currency: selectedCurrency,
        }
        : {
          //Location
          arrivalLocations: [{ id: hotelId, type: 0 }],
          roomCriteria: [{ adult, childAges }],
          nationality: selectedNationality?.abbr,
          checkIn: formattedDateRange.start,
          night: nights,
          currency: selectedCurrency,
        };

      setData(requestData);
    }
  }, [hotelId, category, formattedDateRange, nights, selectedCurrency, selectedNationality, adult, childAges]);

  const handleSelectionChange = (id: string, category: boolean) => {
    setHotelId(id);
    setCategory(category);
    // Handle the selected id and category as needed
  };
  //For time
  const handleDateRangeChange = (newValue: DateRange<dayjs.Dayjs>) => {
    if (newValue && newValue[0] && newValue[1]) {
      // Convert Dayjs objects to ISO strings
      const start = newValue[0].toISOString();
      const end = newValue[1].toISOString();
      setFormattedDateRange({ start, end });
      const startDate = dayjs(newValue[0]).startOf('day');
      const endDate = dayjs(newValue[1]).startOf('day');
      const diffInDays = endDate.diff(startDate, 'day'); // Difference in days
      setNights(diffInDays);
      setNight(diffInDays);

    } else {
      setFormattedDateRange({ start: null, end: null });
      setNights(null);
    }
    setDateRange(newValue);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundImage(prevImage => {
        const currentIndex = images.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });

    }, 5000); // 3 saniye

    return () => clearInterval(interval); // Temizleme işlemi
  }, []);

  const { HomePage } = useDictionary();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Jomhuria&display=swap" rel="stylesheet" />
      </Head>
      <div className="h-screen">
        <div className="absolute -z-10">
          <Image
            src={backgroundImage}
            alt="background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
      </div>
      <main>
        <Header />
        <div
          style={{
            borderRadius: '70px',
            width: '80%',
            textAlign: 'center',
            position: 'absolute',
            top: '40%', // Burada top değeri artırıldı
            left: '50%',
            transform: 'translate(-75%, -50%)',
            zIndex: 0,
          }}
        >
          <h2 style={{ fontSize: '48px', color: '#ffffff', textShadow: '0px 4px 8px rgba(0, 0, 0, 1.0)' }}>{HomePage.background}</h2>
        </div>

        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            padding: '20px',
            borderRadius: '70px',
            width: '1103px',
            height: '80px',
            margin: '0 auto',
            textAlign: 'center',
            position: 'absolute',
            top: '60%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              width: '1100px',
              marginLeft: '50px',
              marginRight: '50',
              marginTop: '10px',
              marginBottom: 'auto',
              textAlign: 'left',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <Grouped id={hotelId} category={category} onSelectionChange={handleSelectionChange} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateRangePicker
                minDate={dayjs().add(1, 'day')}
                value={dateRange}
                onChange={handleDateRangeChange}
                localeText={{ start: '', end: '' }}
                slots={{
                  field: SingleInputDateRangeField,
                }}
                slotProps={{
                  textField: {
                    size: 'small',
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarTodayIcon />
                        </InputAdornment>
                      ),
                    },
                  },
                }}
                sx={{
                  marginBottom: '30px',
                  height: '40px',
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255,255,255,0.8)', // Set background to white
                    height: '38px',
                    width:"300px",
                    '& fieldset': {
                      height: '40px',
                      borderColor: '#516D87',
                      borderWidth: '2px',
                      borderRadius: '0px',
                    },
                    '&:hover fieldset': {
                      borderColor: 'blue',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'blue',
                    },
                    '& .MuiInputBase-input': {
                      textAlign: 'center', // Center the text inside the input
                    },
                  },
                  '& .MuiInputAdornment-root': {
                    marginRight: '8px', // Adjust spacing between icon and input
                  },
                }}
              />
            </LocalizationProvider>

            <GuestInfo />
            <SearchB data={data} category={category} />
          </Stack>
        </div>

        <Footer />
      </main>
    </>
  );
}

