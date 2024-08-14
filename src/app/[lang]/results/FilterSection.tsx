"use client";
import {
    Box,
    Slider,
    TextField,
    Typography,
    IconButton,
    Collapse,
    FormControl,
    Divider,
} from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarIcon from "@mui/icons-material/Star";
import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Image from "next/image";
import amusementImage from "/public/amusement.webp";
import { useDictionary } from "@/components/dictionary/Dictionary";
import { Filter } from "./page";

interface Props {
    star?: Filter;
    facilities?: Filter;
    board?: Filter;
    price?: Filter;
    themes?: Filter;
    filterRequestTypes: {
        type: number;
        values: string[];
        from: number;
        to: number;
      }[];
      updateFilterRequestTypes: (data: any) => void;
}

const FilterSection: React.FC<Props> = ({
    star,
    facilities,
    board,
    price,
    themes,
    filterRequestTypes,
    updateFilterRequestTypes
}) => {
    const { FilterPage } = useDictionary();

    const FilterOptions = [
        {
            id: "stars",
            title: FilterPage.stars,
            options: star,
            type: "checkbox",
        },
        {
            id: "boards",
            title: FilterPage.boards,
            options: board,
            type: "checkbox",
        },
        {
            id: "themes",
            title: FilterPage.themes,
            options: themes,
            type: "checkbox",
        },
        {
            id: "facilities",
            title: FilterPage.facilities,
            options: facilities,
            type: "checkbox",
        },
    ];

    const [expandedSections, setExpandedSections] = useState<Set<string>>(
        new Set()
    );
    const [priceValue, setPriceValue] = useState<number[]>([0, 0]);
    const [priceChange, setPriceChange] = useState<number[]>([0, 0]);
    const [selectedOptions, setSelectedOptions] = useState<{
        [key: string]: string[];
    }>({
        stars: [],
        boards: [],
        facilities: [],
        themes: [],
    });



    const toggleSection = (sectionId: string) => {
        const newExpandedSections = new Set(expandedSections);
        if (newExpandedSections.has(sectionId)) {
            newExpandedSections.delete(sectionId);
        } else {
            newExpandedSections.add(sectionId);
        }
        setExpandedSections(newExpandedSections);
    };

    const handleSelectAll = (filterId: string) => {
        const allOptions = FilterOptions.find((option) => option.id === filterId)?.options?.options.map((option) => option.id) || [];
    
        setSelectedOptions((prevSelectedOptions) => {
            const isAllSelected = allOptions.every(option => prevSelectedOptions[filterId]?.includes(option));
    
            return {
                ...prevSelectedOptions,
                [filterId]: isAllSelected ? [] : allOptions,
            };
        });
    };

    const filterTypeMap: { [key: string]: number } = {
        stars: 2,
        themes: 4,
        boards: 6,
        facilities: 7
      };
      
      // Function to handle option change
      const handleOptionChange = (filterId: string, optionId: string) => {
        setSelectedOptions((prevSelectedOptions) => {
          const newOptions = prevSelectedOptions[filterId].includes(optionId)
            ? prevSelectedOptions[filterId].filter((id) => id !== optionId)
            : [...prevSelectedOptions[filterId], optionId];
          
          const updatedSelectedOptions = {
            ...prevSelectedOptions,
            [filterId]: newOptions,
          };
      
          updateFilterRequestData(updatedSelectedOptions);
          
          return updatedSelectedOptions;
        });
      };
      const updateFilterRequestData = (selectedOptions: { [key: string]: string[] }) => {
        const updatedFilterRequestData = filterRequestTypes.map((filter) => {
          const filterKey = Object.keys(filterTypeMap).find(key => filterTypeMap[key] === filter.type);
          return filterKey
            ? { ...filter, values: selectedOptions[filterKey] }
            : filter;
        });
      
        updateFilterRequestTypes(updatedFilterRequestData);
      };
      

    const handlePriceChange = (event: Event, newValue: number | number[]) => {
        setPriceChange(newValue as number[]);
        updatePriceFilter(newValue as number[]);
    };
    const updatePriceFilter = (newPriceRange: number[]) => {
        const updatedFilterRequestData = filterRequestTypes.map((filter) => {
            if (filter.type === 8) {
                return { ...filter, from: newPriceRange[0], to: newPriceRange[1] };
            }
            return filter;
        });
    
        updateFilterRequestTypes(updatedFilterRequestData);
    };

    useEffect(() => {
        if (price) {
            setPriceValue([Number(price.from ?? 0), Number(price.to ?? 0)]);
            setPriceChange([Number(price.from ?? 0), Number(price.to ?? 0)]);
        }
        console.log(themes);
    }, [price]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "left",
                    width: 300,
                    position: "relative",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "left",
                        border: 1,
                        borderRadius: "20px",
                        borderColor: "#516D87",
                        height: "calc(100vh - 200px)",
                        width: "100%",
                        padding: 2,
                        overflowY: "auto",
                        scrollbarWidth: "inherit" /* For Firefox */,
                        "&::-webkit-scrollbar": { width: "8px" } /* For WebKit Browsers */,
                        "&::-webkit-scrollbar-track": {
                            background: "#f1f1f1",
                            borderRadius: "10px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            background: "#888",
                            borderRadius: "10px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": { background: "#555" },
                    }}
                >
                    <Typography variant="h5" color="#516D87" gutterBottom>
                        {FilterPage.filters}
                    </Typography>
                    <TextField
                        id="search-hotel"
                        label={FilterPage.searchHotel}
                        variant="outlined"
                        sx={{ mb: 2, borderRadius: "12px", border: 3, borderColor: "#516D87" }}
                    />
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="h6" color="#516D87" mb={1}>
                        <AttachMoneyIcon sx={{ fontSize: 20, mr: 1 }} />
                        {FilterPage.price}
                    </Typography>
                    <Slider
                        getAriaLabel={() => "Price"}
                        value={priceChange}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        min={priceValue[0]}
                        max={priceValue[1]} // You can set the max value according to your requirements
                        sx={{ color: "#516D87", mb: 2 }}
                    />
                    <Typography variant="body1" color="#516D87" mb={2}>
                        {`${priceValue[0]} - ${priceValue[1]}`}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    {FilterOptions.map((filterOption) => (
                        <Box key={filterOption.id} sx={{ mb: 2 }}>
                            <Box
                                sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                                onClick={() => toggleSection(filterOption.id)}
                            >
                                {filterOption.id === 'stars' && <StarIcon sx={{ fontSize: 20, mr: 1 }} />}
                                {filterOption.id === 'boards' && <LocalHotelIcon sx={{ fontSize: 20, mr: 1 }} />}
                                {filterOption.id === 'facilities' && <RoomServiceIcon sx={{ fontSize: 20, mr: 1 }} />}
                                {filterOption.id === 'themes' && (
                                    <img src={amusementImage.src} alt="Amusement Icon" width={20} height={20} style={{ marginRight: '8px' }} />
                                )}
                                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                    {filterOption.title}
                                </Typography>
                                <ExpandMoreIcon />
                            </Box>
                            <Collapse in={expandedSections.has(filterOption.id)}>
                                <FormControl component="fieldset" sx={{ ml: 2 }}>
                                    <Typography
                                        variant="subtitle1"
                                        component="div"
                                        onClick={() => handleSelectAll(filterOption.id)}
                                        sx={{
                                            cursor: 'pointer',
                                            color: '#516D87',
                                            position: 'inherit',
                                            bottom: 'top',
                                            right: -200,
                                        }}
                                    >
                                        {FilterPage.selectAll}
                                    </Typography>
                                    {filterOption.options &&
                                        filterOption.options.options?.map((option, index) => (
                                            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                                <input
                                                    type="checkbox"
                                                    id={`${filterOption.id}-${index}`}
                                                    name={filterOption.id}
                                                    value={option.id}
                                                    checked={selectedOptions[filterOption.id].includes(option.id)}
                                                    onChange={() => handleOptionChange(filterOption.id, option.id)}
                                                    style={{ marginRight: 8 }}
                                                />
                                                <label htmlFor={`${filterOption.id}-${index}`}>{option.name}</label>
                                            </div>
                                        ))}
                                </FormControl>
                            </Collapse>
                            <Divider sx={{ mt: 2 }} />
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box sx={{ position: "fixed", top: "10px", right: "10px", zIndex: 1000 }}>
            </Box>
        </Suspense>
    );
};
export default FilterSection;
