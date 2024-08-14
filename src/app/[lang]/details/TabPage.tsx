"use client"
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Stack, Tab, Table, TableContainer, TableHead, Paper, TableCell, TableRow, TableBody, Accordion, AccordionDetails, AccordionSummary, Divider } from '@mui/material';
import { useState } from 'react';
import { useDictionary } from '../../../components/dictionary/Dictionary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Rooms from './Rooms';
import CheckIcon from '@mui/icons-material/Check';
import AttachMoneySharpIcon from '@mui/icons-material/AttachMoneySharp';
import { HotelLocation, OfferData } from './page';
import dynamic from 'next/dynamic';

// Dynamically import the MapComponent with SSR disabled
const MapComponent = dynamic(() => import('@/components/mapApi/MapComponent'), {
  ssr: false
});
interface Room {
    roomId: string;
    roomName: string;
    // Add other room properties as needed
}
interface Offer {
    night: number;
    checkIn: string;
    price: {
        amount: number;
        currency: string;
    };
    rooms: Room[];
}
interface Props {
    facilities?: Facilites[];
    overview?: TextCategory[];
    roomsOffers?: OfferData[];
    roomPhotos: string[];
    mapApi?:HotelLocation;

}
const TabPage: React.FC<Props> = ({ facilities, overview,roomPhotos,roomsOffers,mapApi }) => {
    const { HotelDetailPage } = useDictionary();
    const [value, setValue] = useState('1');

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    const clickButton = () => {
        setValue("2");
    };

    

    return (
        <>
        
            <div style={{ width: "90%", margin: "auto" }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <TabList aria-label="lab API tabs example"
                                onChange={handleChange}
                                TabIndicatorProps={{
                                    sx: {
                                        backgroundColor: '#516D87',
                                        height: 3,
                                    },
                                }}>
                                <Tab label={HotelDetailPage.overview} value="1" />
                                <Tab label={HotelDetailPage.rooms} value="2" />
                                <Tab label={HotelDetailPage.facilities} value="3" />
                                <Tab label={HotelDetailPage.map} value="4" />
                            </TabList>
                            <Button variant="contained" sx={{
                                backgroundColor: "#516D87",
                                '&:hover': {
                                    backgroundColor: "516D87"
                                },
                                '&:focus': {
                                    backgroundColor: "516D87"
                                },
                                borderRadius: 5
                            }}
                                onClick={clickButton}
                            >
                                {HotelDetailPage.reserveRoom}
                            </Button>
                        </Stack>
                    </Box>
                    <TabPanel value="1">
                        {overview?.map((overviewHotel: TextCategory, index: number) => (
                            <Accordion key={index} sx={{ marginTop: "10px", boxShadow: "1.5px 1.5px 1.5px 1.5px #516d87" }}>
                                <AccordionSummary sx={{ fontWeight: "bold" }} expandIcon={<ExpandMoreIcon />}>
                                    {overviewHotel.name}
                                </AccordionSummary>
                                <Divider sx={{ backgroundColor: "#516d87" }} />
                                <AccordionDetails>
                                    {overviewHotel.presentations[0].text}
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </TabPanel>
                    <TabPanel value="2">
                        {/* Pass structured offers data to Rooms */}
                        <Rooms roomOffer={roomsOffers} roomsPhoto={roomPhotos} />
                    </TabPanel>
                    <TabPanel value="3">
                        {facilities && (
                            <>
                                <TableContainer component={Paper}>
                                    <Table sx={{ width: "70%", alignItems: "center", margin: "auto" }}>
                                        <TableHead>
                                            <TableRow sx={{ borderBottom: "2px solid #516d87;" }}>
                                                <TableCell sx={{ fontWeight: "bold", color: "#516d87" }}>{HotelDetailPage.facilities}</TableCell>
                                                <TableCell sx={{ fontWeight: "bold", color: "#516d87", textAlign: "right" }}>{HotelDetailPage.isPriced}</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {facilities.map((facility: Facilites) => (
                                                <TableRow key={facility.name} sx={{ borderBottom: "2px solid #516d87;" }}>
                                                    <TableCell>{facility.name}</TableCell>
                                                    <TableCell sx={{ textAlign: "right" }}>
                                                        {facility.isPriced ? (
                                                            <>
                                                                <AttachMoneySharpIcon /> {HotelDetailPage.priced}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <CheckIcon /> {HotelDetailPage.free}
                                                            </>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>
                        )}
                    </TabPanel>
                    <TabPanel value="4">                 
                        <p>Google Map Api</p>
                        <MapComponent mapApi={mapApi}/>
                        
                    </TabPanel>
                </TabContext>
                
            </div>
        </>
    );
}
export default TabPage;
