import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import GuestDetailChild from './GuestDetailChild';
import GuestDetailInfant from './GuestDetailInfant';
import useRoomStore from '@/components/store/useRoomCriteriaStore';
import { Stack, styled } from '@mui/material';
import Payment from './Payment';
import { CheckCircle } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import GuestDetailAdult from './GuestDetailAdult';
import { useCallback, useMemo, useState, useEffect } from 'react';

import useOfferStore from '@/components/store/useOfferDataStore';
import useCurrencyStore from '@/components/store/useCurrencyStore';
import { BeginTransactionRequest } from '@/services/BeginTransaction';
import { useDictionary } from '@/components/dictionary/Dictionary';
import RoomDetailShow from './RoomDetailshow';
export interface GuestDetail{
  index:number;
  title:string;
  firstName:string;
  lastName:string;
  gender:string;
  nationality:string;
  email:string;
  phone:string;
  address:string;
  zipCode:string;
  country:string;
  passportSerialNumber:string;
  passportNumber:string;
  expireDate:string;
  issueDate:string;
  type:number;
  travellerId:number;
}


const VerticalLinearStepper = () => {
  const {
    adult,
    childCount,
    childAges,
  } = useRoomStore(); 
  const sumofpeople = adult + childCount;
  const { roomOffer, transactionId, setTransactionId } = useOfferStore();
  const { selectedCurrency } = useCurrencyStore();
  const { ReservationPage } = useDictionary();
  const [activeStep, setActiveStep] = React.useState(0);
  const [errors, setErrors] = React.useState<string[]>([]);
  const router = useRouter();
  const createEmptyGuestDetail = (index: number): GuestDetail => ({
    index,
    title: '',
    firstName: '',
    lastName: '',
    gender: '',
    nationality: '',
    email: '',
    phone: '',
    address: '',
    zipCode: '',
    country: '',
    passportSerialNumber: '',
    passportNumber: '',
    expireDate: '',
    issueDate: '',
    type:0,
    travellerId:0,
  });
  const initialGuests = Array.from({ length: sumofpeople }, (_, index) =>
    createEmptyGuestDetail(index)
  );
  const [guests, setGuests] = useState<GuestDetail[]>(initialGuests);
  const updateGuest = useCallback((index: number, updatedGuest: Partial<GuestDetail>) => {
    setGuests((prevGuests) =>
      prevGuests.map((guest) =>
        guest.index === index ? { ...guest, ...updatedGuest } : guest
      )
    );
    console.log(guests)
    
  }, []);
  const [isSubmitting, setSubmitting] = useState<[number, boolean][]>(
    Array.from({ length: sumofpeople }, (_, index) => [index, false])
  );
  const beginRequestData =
  {
    offerIds: [
      roomOffer.offerId
    ],
    currency: selectedCurrency
  }
  function convertGuestDetailsToTravellers(guestDetails: GuestDetail[]): Traveller[] {
    return guestDetails.map((guest, index) => ({
      travellerId: `traveller-${index}`,
      type: 0, // Assuming a default value or customize as needed
      title: parseInt(guest.title), // Assuming title is a string representation of a number
      academicTitle: { id: 0 }, // Assuming a default value or customize as needed
      passengerType: 0, // Assuming a default value or customize as needed
      name: guest.firstName,
      surname: guest.lastName,
      isLeader: index === 0, // Assuming the first guest is the leader
      birthDate: new Date().toISOString(), // Placeholder value, replace as needed
      nationality: { twoLetterCode: guest.nationality },
      identityNumber: "", // Placeholder value, replace as needed
      passportInfo: {
        serial: guest.passportSerialNumber,
        number: guest.passportNumber,
        expireDate: guest.expireDate,
        issueDate: guest.issueDate,
        citizenshipCountryCode: guest.nationality,
        issueCountryCode: guest.country
      },
      address: {
        contactPhone: {
          countryCode: "", // Placeholder value, extract from phone as needed
          areaCode: "", // Placeholder value, extract from phone as needed
          phoneNumber: guest.phone
        },
        email: guest.email,
        address: guest.address,
        zipCode: guest.zipCode,
        city: {
          id: "", // Placeholder value, replace as needed
          name: "" // Placeholder value, replace as needed
        },
        country: {
          id: "", // Placeholder value, replace as needed
          name: guest.country
        },
        phone: guest.phone
      },
      destinationAddress: {}, // Placeholder value, replace as needed
      orderNumber: index,
      documents: [], // Placeholder value, replace as needed
      insertFields: [], // Placeholder value, replace as needed
      status: 0, // Placeholder value, replace as needed
      gender: parseInt(guest.gender), // Assuming gender is a string representation of a number
      uiAge: "" // Placeholder value, replace as needed
    }));
  }
  useEffect(() => {
    setSubmitting(prev => {
      if (prev.length !== sumofpeople) {
        return Array.from({ length: sumofpeople }, (_, index) => [index, false]);
      }
      return prev;
    });

    const fetchTransactionId = async () => {
      const data = await BeginTransactionRequest(beginRequestData);
      try {
        const id = data.body.transactionId;
        setTransactionId(id);
      }
      catch (error) {
        console.log(error);
      }
    };
    fetchTransactionId();
  }, [sumofpeople, setTransactionId]);

  const allTrue = useMemo(() => isSubmitting.every(([, submit]) => submit === true), [isSubmitting]);

  const addIndex = useCallback((index: number) => {
    setSubmitting(prev => {
      const newArray = [...prev];
      if (!newArray[index]) {
        newArray[index] = [index, false];
      }
      return newArray;
    });
  }, []);

  const toggleIndex = useCallback((index: number) => {
    setSubmitting(prev => {
      const newArray = [...prev];
      newArray[index] = [index, !newArray[index][1]];
      return newArray;
    });
  }, []);

  const adultComponents = Array.from({ length: adult }).map((_, i) => (
    <GuestDetailAdult
      key={`adult-${i}`}
      isSubmitting={isSubmitting[i][1]}
      setSubmitting={() => toggleIndex(i)}
      index={i}
      updateGuest={updateGuest}
    />
  ));

  const childAgeComponents = childAges.reduce<{ infants: JSX.Element[], children: JSX.Element[] }>(
    (acc, age, i) => {
      const index = adult + i; // to ensure unique index after adults
      if (age === 0) {
        acc.infants.push(
          <GuestDetailInfant
            key={`infant-${acc.infants.length}`}
            isSubmitting={isSubmitting[index][1]}
            setSubmitting={() => toggleIndex(index)}
            index={index}
            updateGuest={updateGuest}
          />
        );
      } else if (age > 0) {
        acc.children.push(
          <GuestDetailChild
            key={`child-${acc.children.length}`}
            childAge={age}
            isSubmitting={isSubmitting[index][1]}
            setSubmitting={() => toggleIndex(index)}
            index={index}
            updateGuest={updateGuest}
          />
        );
      }
      return acc;
    },
    { infants: [], children: [] }
  );
  const steps = [
    { label: ReservationPage.roomDetails },
    { label: ReservationPage.yourDeatils },
    { label: ReservationPage.payment },
  ];

  const validateStep = () => {
    let validationErrors: string[] = [];

    if (activeStep === 0) {
      // Validate Your details step
      if (adult <= 0) validationErrors.push("Please add at least one adult.");
      if (childCount > 0 && childAges.length === 0) validationErrors.push("Please enter ages for all children.");
    } else if (activeStep === 1) {
      // Validate Room details step
      // Add validation logic here if needed
    } else if (activeStep === 2) {
      // Validate Payment step
      // Add validation logic here if needed
    }

    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    router.push('/');

  };

  return (
    <Box sx={{ maxWidth: 800, marginTop: 9, marginLeft: 9 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption"></Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              {index === 0 ? (
                <div>
                  <Stack spacing={0.5} sx={{ mb: 0 }}>
                    {/* Yetişkinler için SignUp bileşenleri */}
                    {adultComponents}

                    {/* Çocuk yaşlarına göre bileşenler */}
                    {childAgeComponents.infants}
                    {childAgeComponents.children}
                  </Stack>
                </div>
              ) : index === 1 ? (
                <>
                  <RoomDetailShow/> 
                  <Typography variant="caption"></Typography>
                </>
              ) : index === 2 ? (
                <Payment /> // Payment bileşenini göster
              ) : null}
              {errors.length > 0 && (
                <Typography color="error" variant="body2">
                  {errors.join(', ')}
                </Typography>
              )}
              <Stack direction='row' sx={{ mb: 6, marginLeft: '560px' }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={allTrue}
                    sx={{ mt: 1, mr: 1, borderRadius: '15px', backgroundColor: '#516D87' }}
                  >
                    {index === steps.length - 1 ? ReservationPage.finish : ReservationPage.continue}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '15px' }}
                  >
                    {ReservationPage.back}
                  </Button>
                </div>
              </Stack>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{
          p: 3, width: 620,
          backgroundColor: 'rgba(255, 255, 255, 0.7)', ml: 8
        }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',

          }}>
            <CheckCircle sx={{ fontSize: 40, color: 'green', mr: 1 }} />
            <Typography variant="h6" component="div" sx={{ fontSize: 30, color: 'green' }}>
              {ReservationPage.bookinConfirmed}
            </Typography>
          </Box>
          <Button onClick={handleReset} sx={{ mt: 10, ml: 50, color: 'blue', borderRadius: '15px' }}>
            {ReservationPage.deleteReservation}
          </Button>
        </Paper>
      )}
    </Box>
  );
};
export default VerticalLinearStepper;