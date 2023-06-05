import React, {useState, useEffect} from "react";
import { getAllProductsService } from "../services/services";

// Legacy Imports
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';

// Icon Imports
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

// Hoc Imports
import { CustomCard } from "../components/custom-card/CustomCard";

// Model Imports
import { ResponseItemProps } from "../models/types";

export const ProductsListingPage = ()=> {
    // States
    const [data, setData] = useState<ResponseItemProps[] | []>([]);
    const [renderData, setRenderData] = useState<ResponseItemProps[] | []>([]);
    const [search, setSearch] = useState('');

    // Effects
    useEffect(()=> {getAllProducts()}, []);
    useEffect(()=>{setRenderData(data)}, [data]);
    useEffect(()=> {
        if(search.length === 0) {
            setRenderData(data)
        }else {
            const regEx_string = `^${search}`;
            const regexp = new RegExp(regEx_string);
            const filtered_render =  renderData.filter((data_item: ResponseItemProps)=> 
                regexp.test(data_item.title)
            );  
            setRenderData(filtered_render);          
        }
    }, [search]);

    // API Calls
    const getAllProducts = ()=> {
        try{
            getAllProductsService().subscribe({
                next: (response: ResponseItemProps)=> {
                    if(response && Array.isArray(response)) {
                        setData(response);
                    }
                },
                error: (error: any)=> {},
            })
        }catch(err) {
            console.log('[ERROR] Fetching all products');
            console.log(err);
        }
    }

    // State handlers
    const handleUpdateSearch = (event: any)=> setSearch(event.target.value);
    const resetSearch = ()=> setSearch('');

    // Event Handlers
    

    // Renderer
    return(
        <React.Fragment>
            <Stack 
                spacing={0}
                sx={{
                    mt: '64px',
                    width: '100vw',
                    height: `calc(100vh - 64px)`,                    
                }}
            >
                <Box 
                    sx={{
                        px: {xs: '8px', sm: '16px', md: '24px', lg: '32px', xl: '48px'},
                        height: '64px',
                        borderBottom: '1px solid #CCC',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Box sx={{flexGrow: 1, px: '12px'}}>
                        <TextField 
                            label=''
                            value={search}
                            variant={'outlined'}
                            color={'secondary'}
                            fullWidth
                            size="small"
                            placeholder="Search for items"
                            onChange={handleUpdateSearch}
                            sx={{fieldset :{borderRadius: '28px',}}}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton 
                                            color="secondary" 
                                            onClick={resetSearch}
                                        >
                                            <RestartAltIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Typography sx={{color: 'rgb(22 26 31)', fontSize: '14px'}}>
                        {`Displaying ${renderData.length} items`}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        px: {xs: '8px', sm: '16px', md: '24px', lg: '32px', xl: '48px'},
                        py: '24px',
                        height: `calc(100% - 64px)`,
                        backgroundColor: '#f3f3f3',
                    }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            borderRadius: '28px',
                            height: `calc(100vh - 180px)`,
                            overflow: 'scroll', 
                            scrollbarWidth: 'none',
                            '&::-webkit-scrollbar': {display: 'none'},
                            backgroundColor: '#e4e1e9'
                        }}
                    >
                        <Grid container spacing={2} sx={{width: '100%', padding: '24px',}}>
                            {
                                renderData.length === 0?
                                    <Grid 
                                        key={'empty-board-key'}
                                        item 
                                        xs={12}
                                        // sx={{p: 4}}
                                    >
                                        <Alert severity="info">No items to show</Alert>
                                    </Grid>
                                    :
                                    renderData.map((item: ResponseItemProps)=> {
                                        return(
                                            <Grid 
                                                key={`item-render-key-${item?.id}`}
                                                item 
                                                xs={12}
                                                sm={6}
                                                md={4}
                                                lg={3}
                                                // sx={{p: 4}}
                                            >
                                                <CustomCard
                                                    id = {item?.id}
                                                    title = {item?.title}
                                                    price = {item?.price}
                                                    description = {item?.description}
                                                    category = {item?.category}
                                                    image = {item?.image}
                                                    rating = {item?.rating}
                                                />
                                            </Grid>
                                        )
                                    })
                            }
                        </Grid>
                    </Paper>
                </Box>
            </Stack>
        </React.Fragment>
    )
}