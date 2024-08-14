import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { CreditCard } from '@mui/icons-material';
import { useDictionary } from '@/components/dictionary/Dictionary';

const PaymentPage = () => {
  const { ReservationPage } = useDictionary();
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // İşlem verilerini işleme kodu buraya eklenecek
    console.log({ cardNumber, cardName, expiryDate, cvv });
  };

  return (
    <Box sx={{
        marginTop: 8,
        width:'620px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        border: '2px solid #ccc', // Border color
        borderRadius: '8px', // Border radius
        padding: '16px', // Padding
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Background color
      }}>
      <Card sx={{ maxWidth: 500, width: '100%' }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ mb: 3 ,color:'#516D78'}}>
            {ReservationPage.paymentInfo}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                size='small'
                  fullWidth
                  label={ReservationPage.cardNumber}
                  variant="outlined"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                 size='small'
                  fullWidth
                  label={ReservationPage.cardholderName}
                  variant="outlined"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                 size='small'
                  fullWidth
                  label={ReservationPage.expirydate}
                  variant="outlined"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                 size='small'
                  fullWidth
                  label="CVV"
                  variant="outlined"
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  required
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ 
                mt: 3, 
                backgroundColor: '#516D78', 
                color: 'white', // Buton üzerindeki metin rengini beyaz yapmak
                '&:hover': {
                  backgroundColor: '#40516A',
             // Hover durumunda buton rengini biraz daha koyu yapmak
                }
              }}              
            >
              <CreditCard sx={{ mr: 1 }} />
              {ReservationPage.payNow}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PaymentPage;
