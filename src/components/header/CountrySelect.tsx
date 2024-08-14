"use client"
import { InputLabel, Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";
import countryicon from "../../assets/icons/nationality_icon.png";
import Image from "next/image";
import { useDictionary } from "../dictionary/Dictionary";
import useNationalityStore from "../store/useNationalityStore";



type CountryType = {
    abbr: string;
    code?: string;
    icon?: string;
    name: string;
    suggested?: boolean;
};


const CountrySelect = () => {
    const {HeaderPage}=useDictionary();
    const {nationalities,selectedNationality,setSelectedNationality}=useNationalityStore();
    const handleChange = (event: React.SyntheticEvent, newValue: CountryType | null) => {
        if (newValue) {
            setSelectedNationality(newValue);
        }
    };
    

    return (
        <>
            <InputLabel>
                <Image
                    src={countryicon}
                    alt={"country-icon"}
                    width={20}
                    height={20}
                    style={{ marginRight: 10 }}
                />
                {HeaderPage.nationality}
            </InputLabel>
            <Autocomplete
                id="country-autocomplete"
                options={nationalities}
                getOptionLabel={(option) => option.name}
                value={selectedNationality}
                onChange={handleChange}
                fullWidth
                sx={{ borderRadius: "10px" }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={HeaderPage.nationality}
                        variant="outlined"
                        fullWidth
                        sx={{ borderRadius: "10px" }}
                    />
                )}
            />
        </>
    );
};

export default CountrySelect;