import React, { useCallback, useEffect, useState } from "react";
import {
    Box,
    Grid,
    Typography,
    FormControlLabel,
    Checkbox,
    TextField,
    InputAdornment,
} from "@mui/material";

const MoreOptions = () => {

    const allItems = [
        "Child-friendly",
        "Highchairs (for children)",
        "Wheelchair accessible",
        "Parking Available",
        "Pet-friendly",
        "Outdoor seating",
        "Wi-Fi available",
        "Vegetarian options"
    ];
    const Cuisine = [
        "Italian",
        "French",
        "German",
        "Chinese",
    ];

    // Others
    const [searchTermItems, setSearchTermItems] = useState(''); 
    // Cuisine Search
    const [searchTermCuisine, setSearchTermCuisine] = useState(''); 

    const [filteredItems, setFilteredItems] = useState(allItems);
    const [filteredCuisine, setFilteredCuisine] = useState(Cuisine);

    const [selectedItems, setSelectedItems] = useState([1]);
    const [selectedCuisine, setSelectedCuisine] = useState([1]);

    // All Items search filter
    useEffect(() => {
        const filtered = allItems.filter(item =>
            item.toLowerCase().includes(searchTermItems.toLowerCase())
        );
        setFilteredItems(filtered);
    }, [searchTermItems]);

    // Cuisine search filter
    useEffect(() => {
        const filtered = Cuisine.filter(item =>
            item.toLowerCase().includes(searchTermCuisine.toLowerCase())
        );
        setFilteredCuisine(filtered);
    }, [searchTermCuisine]);

    const handleSearchChangeItems = (event) => {
        setSearchTermItems(event.target.value);
    };

    const handleSearchChangeCuisine = (event) => {
        setSearchTermCuisine(event.target.value);
    };

    const handleCheckboxChangeItems = (event) => {
        const value = event.target.value;
        setSelectedItems(prev =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    const handleCheckboxChangeCuisine = (event) => {
        const value = event.target.value;
        setSelectedCuisine(prev =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    return (
        <Grid
            container
            spacing={2}
            direction="row"
            sx={{ flexWrap: "nowrap", borderTop: "1px solid #CCCCCC33", my: 2 }}
        >
            {/* Cuisine Type */}
            <Grid item xs={12} md={6}>
                <Box sx={{ borderLeft: "1px solid #CCCCCC33", px: 2, bgcolor: "#FFFFFF" }}>
                    <Typography variant="subtitle1" sx={{ mb: 2, color: "#000000", fontSize: "18px", fontWeight: 500 }}>
                        Cuisine Type
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Cuisine"
                        placeholder="Search"
                        value={searchTermCuisine}
                        onChange={handleSearchChangeCuisine}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <img src="/adornment-start.svg" alt="dropdown" style={{ width: "24px", height: "24px", marginRight: '0px' }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '4px',
                                height: '56px',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 12px',
                                borderColor: '#BFBFBF',
                                '& fieldset': {
                                    borderColor: '#BFBFBF',
                                    borderWidth: 2,
                                },
                                '&:hover fieldset': {
                                    borderColor: '#BFBFBF',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#BFBFBF',
                                },
                                '& input': {
                                    fontSize: '16px',
                                    fontFamily: 'Roboto, sans-serif',
                                    color: '#333',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '14px',
                            },
                            '& .MuiInputLabel-shrink': {
                                color: '#4D4D4D',
                                fontSize: "18px"
                            },
                        }}
                    />
                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr" }}>
                        {filteredCuisine.map((item) => (
                            <Box key={item} sx={{ display: "flex", flexDirection: "column" }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            size="medium"
                                            value={item}
                                            checked={selectedCuisine.includes(item)}
                                            onChange={handleCheckboxChangeCuisine}
                                            sx={{
                                                color: "#666666",
                                                "&.Mui-checked": { color: "#821101" },
                                                "& .MuiIconButton-root": { padding: 0, borderRadius: "50%", border: "2px solid #BFBFBF", width: "24px", height: "24px" },
                                                "&.Mui-checked .MuiIconButton-root": { borderColor: "#821101", backgroundColor: "#821101" },
                                                "& .MuiCheckbox-root": { width: "24px", height: "24px" },
                                            }}
                                        />
                                    }
                                    label={<Typography sx={{ fontSize: "16px", color: "#000000B2" }}>{item}</Typography>}
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Grid>

            {/* Others */}
            <Grid item xs={12} md={6}>
                <Box sx={{ borderLeft: "1px solid #CCCCCC33", px: 2, bgcolor: "#FFFFFF" }}>
                    <Typography variant="subtitle1" sx={{ mb: 2, color: "#000000", fontSize: "18px", fontWeight: 500 }}>
                        Others
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Others"
                        placeholder="Search"
                        value={searchTermItems}
                        onChange={handleSearchChangeItems}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <img src="/adornment-start.svg" alt="dropdown" style={{ width: "24px", height: "24px", marginRight: '0px' }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '4px',
                                height: '56px',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 12px',
                                borderColor: '#BFBFBF',
                                '& fieldset': {
                                    borderColor: '#BFBFBF',
                                    borderWidth: 2,
                                },
                                '&:hover fieldset': {
                                    borderColor: '#BFBFBF',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#BFBFBF',
                                },
                                '& input': {
                                    fontSize: '16px',
                                    fontFamily: 'Roboto, sans-serif',
                                    color: '#333',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '14px',
                            },
                            '& .MuiInputLabel-shrink': {
                                color: '#4D4D4D',
                                fontSize: "18px"
                            },
                        }}
                    />
                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                        {filteredItems.map((item) => (
                            <Box key={item} sx={{ display: "flex", flexDirection: "column" }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            size="medium"
                                            value={item}
                                            checked={selectedItems.includes(item)}
                                            onChange={handleCheckboxChangeItems}
                                            sx={{
                                                color: "#666666",
                                                "&.Mui-checked": { color: "#821101" },
                                                "& .MuiIconButton-root": { padding: 0, borderRadius: "50%", border: "2px solid #BFBFBF", width: "24px", height: "24px" },
                                                "&.Mui-checked .MuiIconButton-root": { borderColor: "#821101", backgroundColor: "#821101" },
                                                "& .MuiCheckbox-root": { width: "24px", height: "24px" },
                                            }}
                                        />
                                    }
                                    label={<Typography sx={{ fontSize: "16px", color: "#000000B2" }}>{item}</Typography>}
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default MoreOptions