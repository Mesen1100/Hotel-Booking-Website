import { InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import currencyicon from "../../assets/icons/currency-icon.png";
import Image from "next/image";
import { SelectChangeEvent } from "@mui/material";
import { useDictionary } from "../dictionary/Dictionary";
import useCurrencyStore from "../store/useCurrencyStore";

type Currency = {
    code: string;
    label: string;
}

const CurrenySelect = () => {
    const { HeaderPage } = useDictionary();
    const { currencies, selectedCurrency, setSelectedCurrency } = useCurrencyStore();

    const handleCurrencyChange = (event: SelectChangeEvent<string>) => {
        setSelectedCurrency(event.target.value as string);
    };

    return (
        <>
            <InputLabel sx={{ alignItems: "center" }}>
                <Image src={currencyicon} alt="currency-icon" width={20} height={20} style={{ marginRight: 10 }} />
                {HeaderPage.currency}
            </InputLabel>
            <Select
                labelId="currency-select"
                id="currency-select"
                value={selectedCurrency}
                onChange={handleCurrencyChange}
                label={HeaderPage.currency}
                fullWidth
                sx={{ borderRadius: "10px" }}
            >
                {currencies.map((currency: Currency) => (
                    <MenuItem key={currency.code} value={currency.code}>
                        {currency.label} {/* Use label instead of code */}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
};

export default CurrenySelect;
