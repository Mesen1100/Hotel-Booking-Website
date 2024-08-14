import { useDictionary } from "@/components/dictionary/Dictionary";
import useOfferStore from "@/components/store/useOfferDataStore";
import { Box, Card, CardContent, CardMedia, Container, Divider, Typography } from "@mui/material";

const RoomDetailShow = () => {
    const { roomOffer, roomPhoto } = useOfferStore();
  const{RoomsPage} =useDictionary();

    function formatCurrency(amount: number, currency: string, locale: string = 'en-US'): string {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
        }).format(amount);
        }
    return (
        <>
            <Container component="main" sx={{ width: '700px', borderWidth: '2px', color: 'transparent' }}>
                <Box
                    sx={{
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                        border: '2px solid #ccc', // Border color
                        borderRadius: '8px', // Border radius
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Background color
                    }}
                >
                    <Card sx={{ maxWidth: "620px", padding: '16px' }}>
                        <CardContent>
                            <CardMedia
                                component="img"
                                height="140"
                                image={roomPhoto}
                            />
                            <Divider sx={{
                                marginTop: "20px",
                                '&::before, &::after': {
                                    borderColor: 'black', // Make the divider line bold by changing its color
                                    borderWidth: '2px' // Increase the width of the divider line
                                }
                            }}><Typography variant="h5">{roomOffer.rooms[0].roomName}</Typography> </Divider>

                            <Typography variant="subtitle2" color="text.secondary" margin={2} fontSize={18}>
                                {RoomsPage.night}:{roomOffer.night}
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary" margin={2} fontSize={18}>
                                {RoomsPage.checkin}:{new Date(roomOffer.checkIn).toLocaleDateString()}
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: "bold" }} margin={2} fontSize={18}>
                                {RoomsPage.price}:{formatCurrency(roomOffer.price.amount, roomOffer.price.currency)}&nbsp;{roomOffer.price.currency}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </>
    );
}
export default RoomDetailShow;