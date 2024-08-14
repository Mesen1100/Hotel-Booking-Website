"use client"
import { MenuItem, Select,InputLabel, SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react'
import langicon from "../../assets/icons/lang-icon.png"
import Image from "next/image";
import { useDictionary } from '../dictionary/Dictionary';
import Header from '../header/Header';


const LocaleSwithcer = ({ onChange }: { onChange: (event: SelectChangeEvent<string>) => void }) => {
  const {HeaderPage}=useDictionary()
  const [locale,setLocale]=useState("en");

  const onSelectChange = (e: SelectChangeEvent<string>) => {
    setLocale(e.target.value);
    onChange(e);
  }
  return (
    <>
      <InputLabel id="lang-select">
      <Image src={langicon} alt={"lang-icon"} width={20} height={20} style={{marginRight:10}}/>
      {HeaderPage.lang}</InputLabel>
      <Select
        labelId="lang-select"
        id="lang-select"
        value={locale}
        onChange={onSelectChange}
        label={HeaderPage.lang}
        fullWidth
        sx={{ borderRadius: "10px" }}
      >
        <MenuItem key="en" value="en">EN</MenuItem>
        <MenuItem key="tr" value="tr">TR</MenuItem>
        <MenuItem key="az" value="az">AZ</MenuItem>
        <MenuItem key="de" value="de">DE</MenuItem>
        <MenuItem key="ru" value="ru">RU</MenuItem>
        <MenuItem key="jp" value="jp">JP</MenuItem>

      </Select>
    </>
  )
}
export default LocaleSwithcer;
