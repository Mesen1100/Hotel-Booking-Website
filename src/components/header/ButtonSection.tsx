import { Box, Button, Dialog, DialogContent, DialogActions, Divider, SelectChangeEvent } from "@mui/material";
import React, { useState, useTransition } from "react";
import ReactCountryFlag from "react-country-flag";
import CountrySelect from "./CountrySelect";
import CurrenySelect from "./CurrencySelect";
import { useRouter } from "next/navigation";
import useNationalityStore from "../store/useNationalityStore";
import { useDictionary } from "../dictionary/Dictionary";
import useCurrencyStore from "../store/useCurrencyStore";
import LocaleSwithcer from "../localeswitcher/LocaleSwithcer";



type CountryType = {
    abbr: string;
    code?: string;
    icon?: string;
    name: string;
    suggested?: boolean;
};

const ButtonSection: React.FC = () => {
    const {HeaderPage}=useDictionary();
    const {nationalities,selectedNationality,setSelectedNationality}=useNationalityStore();
    const [open, setOpen] = useState(false);
    const [lang,setLang]=useState("en");
    const router=useRouter();
    const [isPending, startTransition] = useTransition();
    const { currencies, selectedCurrency, setSelectedCurrency } = useCurrencyStore();

    

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        startTransition(() => {
            router.replace(`/${lang}`);
        })
        router.refresh();
    };

    const handleLangChange = (event: SelectChangeEvent<string>) => {
        setLang(event.target.value);
    };

    return (
        <>
            <Box
                sx={{ display: "flex", flexDirection: "row", border: 2, borderRadius: 2, alignItems: "center", height: 35, borderColor: "#516D87",marginRight:'30px'}} >
                <Box sx={{ p: 1, display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Button onClick={handleClickOpen} sx={{ color: "#516D87" }}>
                        <span>{lang.toUpperCase()}</span>
                    </Button>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box sx={{ p: 1, display: "flex", flexDirection: "row", alignItems: "center" }} >
                    <Button onClick={handleClickOpen} sx={{ color: "#516D87" }}>
                        {selectedNationality && <ReactCountryFlag countryCode={selectedNationality.abbr} svg style={{ marginRight: '0.5em' }} />}
                        {selectedNationality && <p>{selectedNationality.name}</p>}
                    </Button>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box sx={{ p: 1 }}>
                    <Button onClick={handleClickOpen} sx={{ color: "#516D87" }}>
                        <span>{selectedCurrency}</span>
                    </Button>
                </Box>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form"
                    aria-describedby="form"
                    sx={{
                        "& .MuiDialog-container": {
                            "& .MuiPaper-root": {
                                width: "100%",
                                maxWidth: "500px",  // Set your width here
                            },
                        },
                    }}
                >
                    <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "start", "& > *:not(:last-child)": { mb: 2 } }}>
                        <LocaleSwithcer onChange={handleLangChange}/>
                        <CountrySelect/>
                        <CurrenySelect/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} style={{ backgroundColor: "#516D87", color: "#ffffff", borderRadius: "10px" }}>{HeaderPage.apply}</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );
}

export default ButtonSection;

