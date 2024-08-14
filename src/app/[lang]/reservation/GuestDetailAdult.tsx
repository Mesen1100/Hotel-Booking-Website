import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MuiPhoneNumber from 'mui-phone-number';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import babyIcon from '../../../assets/icons/image.png';
import { Card, Collapse, IconButton, Stack } from '@mui/material';
import Image from 'next/image';
import { ArrowDropDownIcon, DateField } from '@mui/x-date-pickers';
import Nationality from './Nationality';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Country from './Country';
import useRoomStore from '@/components/store/useRoomCriteriaStore';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useDictionary } from '@/components/dictionary/Dictionary';
import { GuestDetail } from './Reservation';



type CountryType = {
  abbr: string;
  code?: string;
  icon?: string;
  name: string;
  suggested?: boolean;
};
const defaultTheme = createTheme();

interface Props {
  key: string;
  isSubmitting: boolean;
  setSubmitting: (index: number) => void;
  index: number;
  updateGuest: (index: number, updatedGuest: Partial<GuestDetail>) => void;
}

const GuestDetailAdult: React.FC<Props> = ({ key, isSubmitting, setSubmitting, index, updateGuest }) => {

  const { ReservationPage } = useDictionary();
  const today = new Date();
  const schema = yup.object().shape({
    title: yup.string().required(ReservationPage.titleError),
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
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
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
      expireDate: '',
      issueDate: ''
    },
    mode: 'onBlur'
  });
  const [open, setOpen] = React.useState(true);

  const [title, setTitle] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [country, setCountry] = React.useState<CountryType>();
  const [country2, setCountry2] = React.useState<CountryType>();

  const handleTitleChange = (event: SelectChangeEvent) => {
    setTitle(event.target.value as string);
    const { name, value } = event.target;
    const id=index+1;
    updateGuest(index, { [name]: value });
    updateGuest(index,{["type"]:1});
    updateGuest(index,{["travellerId"]:id});
  };

  const handleGenderChange = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
    const { name, value } = event.target;
    updateGuest(index, { [name]: value });
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
      setOpen(true); // Do not collapse if there are validation errors
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" sx={{ width: '700px', borderWidth: '2px', color: 'transparent' }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            border: '2px solid #ccc', // Border color
            borderRadius: '8px', // Border radius
            padding: '16px', // Padding
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Background color
          }}
        >
          <Stack direction={'row'}>
            <Image src={babyIcon} alt="Guest Icon" width={30} height={30} />
            <Typography component="h1" variant="h5" sx={{ color: '#516D87' }}>
              {ReservationPage.adultDetails}:
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


              <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={1} sm={2}      >
                    <FormControl fullWidth >
                      <InputLabel id="title-select-label" >Title</InputLabel>
                      <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                          <Select
                            size='small'
                            labelId="title-select-label"
                            id="title-select"
                            {...field}
                            label={ReservationPage.title}
                            onChange={(e) => {
                              field.onChange(e);
                              handleTitleChange(e);
                            }}
                          >
                            <MenuItem value="Mr">{ReservationPage.mr}</MenuItem>
                            <MenuItem value="Ms">{ReservationPage.ms}</MenuItem>
                            <MenuItem value="Mrs">{ReservationPage.mrs}</MenuItem>
                            <MenuItem value="Miss">{ReservationPage.miss}</MenuItem>
                          </Select>
                        )}
                      />
                      {errors.title && <Typography color="error" sx={{ fontSize: 13 }}>{errors.title.message}</Typography>}
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
                      {errors.gender && <Typography color="error" sx={{ fontSize: 13 }}>{errors.gender.message}</Typography>}
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
                    {errors.nationality && <Typography color="error" sx={{ fontSize: 13 }}>{errors.nationality.message}</Typography>}
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
                          onChange={(event) => {
                            field.onChange(event);
                            handlePhoneChange(event);
                          }}
                          error={!!errors.phone}
                          helperText={errors.phone?.message}
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
                    {errors.country && <Typography color="error" sx={{ fontSize: 13 }}>{errors.country.message}</Typography>}
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
    </ThemeProvider>
  );
}


export default GuestDetailAdult;