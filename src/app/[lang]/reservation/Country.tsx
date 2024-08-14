"use client"
import { InputLabel, Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";
import countryicon from "../../assets/icons/nationality_icon.png";
import Image from "next/image";
import { useDictionary } from "../../../components/dictionary/Dictionary";
import useNationalityStore from "../../../components/store/useNationalityStore";



type CountryType = {
    abbr: string;
    code?: string;
    icon?: string;
    name: string;
    suggested?: boolean;
};
interface Props {
    selectedCountry: CountryType;
    setSelectedCountry: (country: CountryType) => void;
}

const Country: React.FC<Props> = ({ selectedCountry, setSelectedCountry }) => {
    const {HeaderPage}=useDictionary();
    const {ReservationPage}=useDictionary();
    const {nationalities}=useNationalityStore();
    const handleChange = (event: React.SyntheticEvent, newValue: CountryType | null) => {
        if (newValue) {
            setSelectedCountry(newValue);
        }
    };
    

    return (
        <>
            
            <Autocomplete
                id="country-autocomplete"
                options={nationalities}
                getOptionLabel={(option) => option.name}
                value={selectedCountry}
                onChange={handleChange}
                fullWidth
                size='small'
                sx={{ borderRadius: "10px",}}
                renderInput={(params) => (
                    <TextField
                   
                        {...params}
                        label={ReservationPage.country}
                        variant="outlined"
                        fullWidth
                        sx={{ borderRadius: "10px" }}
                    />
                )}
            />
        </>
    );
};

export default Country;