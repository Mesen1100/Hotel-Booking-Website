
import { Box, Button, CircularProgress, Divider, Grid, MenuItem, Pagination, Rating, Select, SelectChangeEvent, Stack, TablePagination, Typography } from "@mui/material";
import Image from "next/image";
import { ChangeEvent, ReactNode, use, useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import hotelicon from "../../../assets/icons/hotel-icon.png";
import Link from "next/link";
import React from "react";
import CountdownTimer from "@/components/timer/CountdownTimer";
import { Hotel, HotelSearchResponse } from "@/components/store/useHotelListData";
import { useDictionary } from "@/components/dictionary/Dictionary";
import useHotelDetailRequestStore from "@/components/store/useHotelDetailRequestStore";
import { useRouter } from "next/navigation";
import useOfferStore from "@/components/store/useOfferDataStore";
import { OfferData } from "../details/page";
import hotelNot from "../../../assets/images/hotelNotFound.jpg"
import loaderGif from "../../../assets/images/building_loader.gif"

interface Props {
    HotelListData: FilterRequestResponse | null;
    loading: boolean;
    error: unknown;
    currentPage: number;
    pageRowCount: number;
    handleChangePage: (event: ChangeEvent<unknown>, newPage: number) => void;
    handlePageRowCount: (event: SelectChangeEvent<number>, child: ReactNode) => void;

};

const HotelListPage: React.FC<Props> = ({ HotelListData, loading, error, currentPage, pageRowCount, handleChangePage, handlePageRowCount }) => {
    const { HotelListPage } = useDictionary();
    const { setRoomOffer, setRoomPhoto } = useOfferStore();

    function formatCurrency(amount: number, currency: string, locale: string = 'en-US'): string {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
        }).format(amount);
    }
    const { hotelRequest, setHotelRequest } = useHotelDetailRequestStore();
    const router = useRouter();
    const handleClick = (hotelId: string, searchId: string, offerId: string) => {
        setHotelRequest({ hotelId: hotelId, searchId: searchId, offerId: offerId });
        router.push("/details")
    };
    const handleReservationButtonClick = (newoffer: OfferData, newPhoto: string) => {
        setRoomOffer(newoffer);
        setRoomPhoto(newPhoto);
        router.push("/reservation");
    };

    const total = Math.ceil(HotelListData?.body.productCount / pageRowCount);


    return (
        <Box sx={{ width: "70%", borderColor: "black", border: "35px", alignItems: "center", justifyContent: "center" }}>
            {loading ? (
                <Typography variant="h3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <CircularProgress /> 
                  <Image src={loaderGif}
                     style={{ width: 'auto', height: '450px' }}
                     alt="k"
                    />
                    Loading...
                </Typography>
                
            ) : error ? (
                <Typography color="error">{HotelListPage.error}</Typography>
            ) : HotelListData?.header?.success && HotelListData?.body?.hotels?.length > 0 ? (
                <>
                    <CountdownTimer countdown={1200} />
                    <Box sx={{ width: "85%" }}>
                        {HotelListData.body.hotels.map((hotel: Hotel, index: number) => (
                            <Grid
                                key={index}
                                container
                                sx={{
                                    marginTop: "25px", borderRadius: "35px", height: "200px", overflow: "hidden",
                                    boxShadow: "6px 6px 6px 6px #8599ab"
                                }}
                            >
                                <Grid
                                    item xs={12}
                                    sx={{ height: "100%", width: "85%", position: "relative" }}
                                >
                                    <Stack direction="row" spacing={4}>
                                        <Box
                                            sx={{ height: "200px", width: "30%", position: "relative" }}
                                        >
                                            <Image
                                                src={hotel.thumbnailFull || hotelicon}
                                                alt={hotel.name}
                                                layout="fill"
                                                objectFit="cover"
                                                style={{ borderRadius: "10px" }}
                                            />

                                        </Box>
                                        <Box
                                            sx={{ height: "100%", width: "50%", position: "relative" }}
                                        >
                                            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#516d87", marginTop: "10px" }}>{hotel.name}</Typography>
                                            {/*<Typography variant="body1" sx={{ color: "#5c5c5c" }}>{hotel.city.name},{hotel.country.name}</Typography>*/}
                                            <Rating
                                                name="text-feedback"
                                                value={Number(hotel.stars)}
                                                readOnly
                                                precision={0.5}
                                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                            />
                                            <Box sx={{ marginTop: "5px" }}>
                                                <Box sx={{ maxHeight: '200px', overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                                                    {hotel.themes && hotel.themes.map((theme, index) => (
                                                        <Typography
                                                            key={index}
                                                            variant="caption"
                                                            sx={{border: '1px solid #ccc',boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',padding: '3px',borderRadius: '7px',fontSize: '0.75rem' 
                                                            }}
                                                        >
                                                            {theme.name}
                                                        </Typography>
                                                    ))}
                                                </Box>

                                                <Box sx={{ marginTop: '10px', textAlign: 'left' }}>
                                                    <Button
                                                        variant="contained"
                                                        onClick={() => {
                                                            handleClick(hotel.id, HotelListData.body.searchId, hotel.offers[0].offerId);
                                                        }}
                                                        sx={{
                                                            fontSize: '0.75rem',padding: '4px 8px', borderRadius: '10px', minWidth: '100px', 
                                                            backgroundColor: '#cfe1fc', color: '#516d87', boxShadow: '2px 2px 2px 2px ',
                                                            '&:hover': {backgroundColor: '#a2b9fc',color: '#405e75',boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.2)'
                                                            }
                                                        }}
                                                    >
                                                        {HotelListPage.moredetails}
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Divider orientation="vertical" flexItem sx={{ height: 'auto', backgroundColor: "#474747" }} />
                                        <Box
                                            sx={{
                                                height: "100%",width: "20%",display: "flex",flexDirection: "column",justifyContent: "center",alignItems: "center",}}
                                        >
                                            <Box sx={{margin: "0",position: "absolute",top: "30%",}}
                                            >
                                                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                                    {formatCurrency(hotel.offers[0].price.amount, hotel.offers[0].price.currency)}
                                                </Typography>
                                                <Typography sx={{ marginTop: "5px" }} variant="caption" display="block" gutterBottom>{hotel.offers[0].night} {HotelListPage.nights}</Typography>
                                                <Button sx={{
                                                    marginTop: "15px", backgroundColor: "#cfe1fc", color: "#516d87", borderRadius: "10px",
                                                    boxShadow: "2px 2px 2px 2px", '&:hover': {
                                                        backgroundColor: '#a2b9fc',
                                                        color: '#405e75',
                                                        boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.2)'
                                                    }
                                                }}
                                                    onClick={() => handleReservationButtonClick(hotel.offers[0], hotel.thumbnailFull || hotelicon.src)}
                                                >{HotelListPage.book}</Button>
                                            </Box>
                                        </Box>
                                    </Stack>
                                </Grid>
                            </Grid>


                        ))}
                    </Box>

                    <Stack direction="row" spacing={2} sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '10vh',
                        marginTop: "50px",

                    }}>


                        <Pagination
                            count={total + 1 || 0}
                            size="large"
                            page={currentPage}
                            onChange={handleChangePage}

                        />
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={pageRowCount}
                            label="Order"
                            onChange={handlePageRowCount}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                        </Select>


                    </Stack>


                </>
            ) : 
            HotelListData?.body?.hotels?.length === 0 ? (
                <Typography variant="h3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <Image src={hotelNot}
                        style={{ width: 'auto', height: '450px' }}
                        alt="k"
                    />

                    {HotelListPage.alertTitle}

                </Typography>
            ) : (
                <p></p>

            )


            
            
            }
        </Box>
    );
};

export default HotelListPage;
