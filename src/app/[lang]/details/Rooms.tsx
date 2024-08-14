import { GetOfferRequest } from "@/services/GetOffer";
import { Button, Card, CardActions, CardContent, CardMedia, Typography, Divider, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { OfferData } from "./page";
import { useDictionary } from "@/components/dictionary/Dictionary";
import useOfferStore from "@/components/store/useOfferDataStore";
import { useRouter } from "next/navigation";

interface PhotoswithOffer{
  offer:Offer;
  photo?:string;
}


interface Props {
  roomOffer?: OfferData[]; 
  roomsPhoto: string[];
}

const Rooms: React.FC<Props> = ({ roomOffer, roomsPhoto }) => {
  const {setRoomOffer,setRoomPhoto}=useOfferStore();
  const router=useRouter();
  const updatedRoomOffers = roomOffer?.map((offer, index) => ({
    ...offer,
    photo: roomsPhoto[index] || "https://img.otelz.com/s3/size(1200,500,max,mc)/turkiye/istanbul/fatih/ebru-hotel_60dd9670.jpg",
  }));
  const{RoomsPage} =useDictionary();
  function formatCurrency(amount: number, currency: string, locale: string = 'en-US'): string {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(amount);
    }
  const handleReservationButtonClick=(newoffer:OfferData,newPhoto:string)=>{
    setRoomOffer(newoffer);
    setRoomPhoto(newPhoto);
    router.push("/reservation");

  };
  return (
    <>
      <Grid container spacing={2}>
      {updatedRoomOffers && updatedRoomOffers.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index} >
          <Card sx={{ maxWidth: 345, borderRadius: 5, boxShadow:"2px 2px 2px 2px #8599ab" }}>
            <CardMedia
              sx={{ height: 140 }}
              image={item.photo}
              title="offer"
            />
            <Divider sx={{color:"#000000",border:1,width:"100%"}}/>
            <CardContent>

              <Typography gutterBottom variant="h5" component="div">
                {item.rooms[0].roomName}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" margin={2} fontSize={18}>
                {RoomsPage.night}:{item.night}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary"  margin={2} fontSize={18}>
                {RoomsPage.checkin}:{new Date(item.checkIn).toLocaleDateString()}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" sx={{fontWeight:"bold"}}  margin={2} fontSize={18}>
                {RoomsPage.price}:{formatCurrency(item.price.amount,item.price.currency)}&nbsp;{item.price.currency}
              </Typography>
            </CardContent>
            <Divider sx={{color:"#000000",border:1,width:"100%"}}/>
            <CardActions sx={{alignItems:"center",justifyContent:"center"}}>
              <Button size="small" fullWidth onClick={() => handleReservationButtonClick(item, item.photo)}>{RoomsPage.reserve}</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>

    </>
  );
};

export default Rooms;
