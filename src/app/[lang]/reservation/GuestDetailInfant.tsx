import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MuiPhoneNumber from 'mui-phone-number';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import useRoomStore from '@/components/store/useRoomCriteriaStore';
import { ArrowDropDownIcon, DateField } from '@mui/x-date-pickers';
import Image from 'next/image';
import realbabyIcon from '../../../assets/icons/baby.png';
import { Card, Collapse, IconButton, Stack } from '@mui/material';
import Nationality from './Nationality';
import Country from './Country';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useDictionary } from '@/components/dictionary/Dictionary';
import { GuestDetail } from './Reservation';


const today = new Date();


type CountryType = {
  abbr: string;
  code?: string;
  icon?: string;
  name: string;
  suggested?: boolean;
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme(); 
interface Props{
  key: string;
  isSubmitting: boolean;
  setSubmitting: (index: number) => void;
  index: number;
  updateGuest: (index: number, updatedGuest: Partial<GuestDetail>) => void;
}

const GuestDetailInfant:React.FC<Props>=({key,isSubmitting,setSubmitting,index,updateGuest})=> {
  const { ReservationPage } = useDictionary();
  const schema = yup.object().shape({
    firstName: yup.string().required(ReservationPage.nameError),
    lastName: yup.string().required(ReservationPage.lasterror),
    gender: yup.string().required(ReservationPage.genderError),
    nationality: yup.string().required(ReservationPage.natioError),
    email: yup.string().email(ReservationPage.emailErrorInvalid).required(ReservationPage.emailErrorRequire),
    phone: yup.string().required(ReservationPage.phoneNumError),
    address: yup.string().required(ReservationPage.addressError),
    zipCode: yup.string().required(ReservationPage.zipCodeerror),
    city: yup.string().required(ReservationPage.cityerror),
    country: yup.string().required(ReservationPage.countryError),
    passportSerialNumber: yup.string().required(ReservationPage.passportSerialError),
    passportNumber: yup.string().required(ReservationPage.passportNumbererror),
    expireDate: yup.string().required(ReservationPage.expireDateError2),
    issueDate: yup.string().required(ReservationPage.isuueDateerror2),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    setError
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {

      firstName: '',
      lastName: '',
      gender: '',
      nationality: '',
      email: '',
      phone: '',
      address: '',
      zipCode: '',
      city: '',
      country: '',
      passportSerialNumber: '',
      passportNumber: '',
      expireDate: undefined,
      issueDate: undefined
    }
  });
  const {
    childCount,
    incrementChild,
    decrementChild,
    updateChildAge,
    setChildAge,
  } = useRoomStore();
  const [open, setOpen] = React.useState(true);
  const [gender, setGender] = React.useState('');
  const [country, setCountry] = React.useState<CountryType>();
  const [country2, setCountry2] = React.useState<CountryType>();
  const [age, setAge] = React.useState('');
  const { adult, childAges } = useRoomStore();



  const handleGenderChange = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
    const { name, value } = event.target;
    updateGuest(index, { [name]: value });
    const id=index+1;
    updateGuest(index,{["type"]:3});
    updateGuest(index,{["travellerId"]:id});
  };
  const handleInputChange = (event: ChangeEvent<HTMLElement>) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    const { value, name } = target;
    if (name) {
      updateGuest(index, { [name]: value });
    }

  };
  const handlePhoneChange = (event: string | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const phone = typeof event === 'string' ? event : event.target.value;
    updateGuest(index, { ["phone"]:phone });
};
  const onSubmit = async (data: any) => {
    const result = await trigger(); // Trigger validation
    if (result) {
      console.log(data);
      setOpen(false); 
      setSubmitting(index);
    } else {
      console.log('Validation errors found.');
      setOpen(true); 
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" sx={{ width: '700px', borderWidth: '2px' }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            border: '2px solid #ccc', // Kenarlık rengi
            borderRadius: '8px', // Kenarlık köşe yuvarlaklığı
            padding: '16px', // İç boşluk
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Arka plan rengi
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Image src={realbabyIcon} alt="Guest Icon" width={30} height={30} />
            <Typography component="h1" variant="h5" sx={{ color: '#516D87' }}>
              {ReservationPage.infantdetails}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
          <Box sx={{ flexGrow: 1 }}>
            {/* Diğer içerik veya butonlar burada olabilir */}
          </Box>
          <IconButton
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Collapse' : 'Expand'}
          >
            {open ? <ArrowDropDownIcon /> : <ArrowDropDownIcon />}
          </IconButton>
        </Stack>
        <Collapse in={open} sx={{ width: '620px', mr: 1 }}>
          <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}>

            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={1} sm={1.8}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                      size="small"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={'0'}
                      label={ReservationPage.age}
                      disabled
                    >
                      <MenuItem value={0}>0</MenuItem>

                      {/* Diğer seçenekler */}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4.5}>
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          size='small'
                          autoComplete="given-name"
                          {...field}
                          required
                          id="firstName"
                          label={ReservationPage.firstName}
                          autoFocus
                          error={!!errors.firstName}
                          helperText={errors.firstName?.message}
                          onChange={(e) => {
                            field.onChange(e); // Update form state with React Hook Form
                            handleInputChange(e);
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4.9}>
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          size='small'
                          fullWidth
                          {...field}
                          required
                          id="lastName"
                          label={ReservationPage.lastName}
                          error={!!errors.lastName}
                          helperText={errors.lastName?.message}
                          onChange={(e) => {
                            field.onChange(e); // Update form state with React Hook Form
                            handleInputChange(e); // Your custom logic
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel id="gender-select-label">Gender</InputLabel>
                      <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                          <Select
                            size='small'
                            labelId="gender-select-label"
                            id="gender-select"
                            {...field}
                            label={ReservationPage.gender}
                            onChange={(e) => {
                              field.onChange(e);
                              handleGenderChange(e);
                            }}
                          >
                            <MenuItem value="Female">{ReservationPage.female}</MenuItem>
                            <MenuItem value="Male">{ReservationPage.male}</MenuItem>
                          </Select>
                        )}
                      />
                      {errors.gender && <Typography color="error" sx={{fontSize:13}}>{errors.gender.message}</Typography>}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  <Controller
                name="nationality"
                control={control}
                render={({ field }) => (
                  <Nationality
                  selectedCountry={country || { abbr: '', name: '' }}
                  setSelectedCountry={(newCountry) => {
                    setCountry(newCountry);
                    field.onChange(newCountry.abbr);
                  }}
                  {...field}
                />
              )}
              />
                    {errors.nationality && <Typography color="error"sx={{fontSize:13}}>{errors.nationality.message}</Typography>}
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        width: '100%',
                        textAlign: 'center',
                        marginY: '16px',
                      }}
                    >
                      <Box
                        sx={{
                          borderBottom: '1px solid #ccc', // Line color and thickness
                          width: '90%', // Line width
                          margin: 'auto', // Center alignment
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography component="h1" variant="h5" sx={{ color: '#516D87', marginLeft: '10px' }}>
                    {ReservationPage.contactInfo}:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          size='small'
                          required
                          fullWidth
                          id="email"
                          label={ReservationPage.emailAddress}
                          autoComplete="email"
                          {...field}
                          error={!!errors.email}
                          helperText={errors.email?.message}
                          onChange={(e) => {
                            field.onChange(e); // Update form state with React Hook Form
                            handleInputChange(e); // Your custom logic
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <MuiPhoneNumber
                          size='small'
                          sx={{ width: '300px' }}
                          defaultCountry="tr"
                          variant="outlined"
                          {...field}
                          error={!!errors.phone}
                          helperText={errors.phone?.message}
                          onChange={(event) => {
                            field.onChange(event);
                            handlePhoneChange(event);
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="address"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          size='small'
                          required
                          fullWidth
                          id="address"
                          label={ReservationPage.address}
                          autoComplete="address"
                          {...field}
                          error={!!errors.address}
                          helperText={errors.address?.message}
                          onChange={(e) => {
                            field.onChange(e); // Update form state with React Hook Form
                            handleInputChange(e); // Your custom logic
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="zipCode"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          size='small'
                          required
                          fullWidth
                          id="zipCode"
                          label={ReservationPage.zipcode}
                          autoComplete="zip-code"
                          {...field}
                          error={!!errors.zipCode}
                          helperText={errors.zipCode?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controller
                      name="city"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          size='small'
                          required
                          fullWidth
                          id="city"
                          label={ReservationPage.city}
                          autoComplete="city"
                          {...field}
                          error={!!errors.city}
                          helperText={errors.city?.message}
                          onChange={(e) => {
                            field.onChange(e); // Update form state with React Hook Form
                            handleInputChange(e); // Your custom logic
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  <Controller
                      name="country"
                      control={control}
                      render={({ field }) => (
                        <Country
                          selectedCountry={country2 || { abbr: '', name: '' }}
                          setSelectedCountry={(newCountry) => {
                            setCountry2(newCountry);
                            field.onChange(newCountry.abbr);
                          }}
                          {...field}
                        />
                      )}
                    />
                    {errors.country && <Typography color="error"sx={{fontSize:13}}>{errors.country.message}</Typography>}
                  </Grid>
                  <Grid item xs={12}>
                    <Typography component="h1" variant="h5" sx={{ color: '#516D87', marginLeft: '10px' }}>
                    {ReservationPage.passportInfo}:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="passportSerialNumber"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          size='small'
                          required
                          fullWidth
                          id="passportSerialNumber"
                          label={ReservationPage.passportSerialError}
                          autoComplete="passport-serial-number"
                          {...field}
                          error={!!errors.passportSerialNumber}
                          helperText={errors.passportSerialNumber?.message}
                          onChange={(e) => {
                            field.onChange(e); // Update form state with React Hook Form
                            handleInputChange(e); // Your custom logic
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="passportNumber"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          size='small'
                          required
                          fullWidth
                          id="passportNumber"
                          label={ReservationPage.passportNum}
                          autoComplete="passport-number"
                          {...field}
                          error={!!errors.passportNumber}
                          helperText={errors.passportNumber?.message}
                          onChange={(e) => {
                            field.onChange(e); // Update form state with React Hook Form
                            handleInputChange(e); // Your custom logic
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <Controller
                      name="expireDate"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          sx={{ width: '300px' }}
                          size="small"
                          {...field}
                          label={ReservationPage.expireDate}
                          error={!!errors.expireDate}
                          helperText={errors.expireDate?.message}
                          onChange={(e) => {
                            field.onChange(e); // Update form state with React Hook Form
                            handleInputChange(e); // Your custom logic
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <Controller
                      name="issueDate"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          sx={{ width: '300px' }}
                          size='small'
                          {...field}
                          label={ReservationPage.issueDate}
                          error={!!errors.issueDate}
                          helperText={errors.issueDate?.message}
                          onChange={(e) => {
                            field.onChange(e); // Update form state with React Hook Form
                            handleInputChange(e); // Your custom logic
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button

                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, width: '100px', ml: 65, borderRadius: '15px', backgroundColor: '#516D78' }}
                      disabled={isSubmitting}
                    >
                         {ReservationPage.next}
                    </Button>
                </Grid>
              </Grid>
            </Box>
            </Card>
    
    </Collapse>
    
      </Box>
    </Container>
    </ThemeProvider >
  );
}

function setFormVisible(arg0: boolean) {
  throw new Error('Function not implemented.');
}


export default GuestDetailInfant;