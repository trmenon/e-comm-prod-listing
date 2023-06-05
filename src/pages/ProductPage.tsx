import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { getProductByIdServices } from "../services/services";

// legacy Imports
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import { deepPurple} from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Skeleton from '@mui/material/Skeleton';

// Models
import { ResponseItemProps } from "../models/types";
interface ParamsProps {id: string}

// Defaults
const default_data: ResponseItemProps = {
    id: -1,
    title: '',
    price: -1,
    description: '',
    category: '',
    image: '',
    rating: {rate: -1,count: -1}
}

export const ProductPage: React.FC = ()=> {
    // Globals
    const params: any = useParams();

    // States
    const [data, setData] = useState<ResponseItemProps>(default_data);
    const [loaded, setLoaded] = useState(false); 
    const [open, setOpen] = useState(false);
    

    // Effects
    useEffect(()=> {fetchProductDetails()},[]);
    useEffect(()=> {
        if(data?.id > 0 && data?.id.toString() === params?.id) {
            setLoaded(true);
        }
    }, [data]);

    // API Calls
    const fetchProductDetails = ()=> {
        try{
            getProductByIdServices(params?.id)
            .subscribe({
                next: (response: ResponseItemProps)=> {
                    if(response) {
                        console.log(response);
                        setData(response);
                    }
                },
                error: (error: any)=> {
                    console.log('[ERROR] Fetchin product details by product-id');
                    console.log(error);
                },
            })
        }catch(err) {
            console.log('[ERROR] Fetching product specific details');
            console.log(err);
        }
    }

    // Event Handlers
    const showModal = ()=> setOpen(true);
    const closeModal = ()=> setOpen(false);

    // Renderer
    return(
        <React.Fragment>
            <Dialog
                open={open}
                onClose={closeModal}
                sx={{display: {xs: 'block', md: 'none'}}}
            >
                <DialogTitle id="responsive-dialog-title">
                    {data?.title}
                </DialogTitle>
                <DialogContent
                    sx={{
                        overflow: 'scroll', 
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': {display: 'none'},
                    }}
                >
                    <img src={data?.image} alt={'image'} height={'100%'} width= {'100%'}/>
                </DialogContent>
            </Dialog>
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
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="primary" href="/">
                            All Products
                        </Link>
                        {
                            loaded=== false || data?.title.length === 0?
                                <Skeleton 
                                    animation="wave"
                                    width={260} 
                                    height={40}
                                />
                                :
                                <Chip
                                    label={data?.title}
                                    variant="filled"
                                    color={'primary'}
                                    sx={{
                                        maxWidth: '360px',
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
                                    }}
                                /> 
                        }                        
                    </Breadcrumbs>
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
                            height: `calc(100vh - 172px)`,
                            overflow: 'scroll', 
                            scrollbarWidth: 'none',
                            '&::-webkit-scrollbar': {display: 'none'},
                            backgroundColor: '#FFFFFF'
                        }}
                    >
                        <Grid container spacing={0} sx={{width: '100%', padding: '24px', height: '100%'}}>
                            <Grid 
                                key={`image`}
                                item 
                                xs={0}
                                md={4}
                                sx={{
                                    display: {xs: 'none', md: 'flex'}, 
                                    height: '100%', 
                                    alignItems: 'flex-start'
                                }}
                            >
                                {
                                    loaded === false || data?.image.length === 0?
                                        <Skeleton 
                                            animation="wave"
                                            width={'100%'} 
                                            height={'100%'}
                                        />
                                        :
                                        <img 
                                            src={data?.image} 
                                            alt={'image'} 
                                            height={'100%'} 
                                            width= {'100%'}
                                        />
                                }                                
                            </Grid>
                            <Grid 
                                key={`details`}
                                item 
                                xs={12}
                                md={8}
                                sx={{height: '100%', px: '8px'}}
                            >
                                <Paper
                                    elevation={0}
                                    sx={{
                                        borderRadius: '28px',
                                        height: `100%`,
                                        overflow: 'scroll', 
                                        scrollbarWidth: 'none',
                                        '&::-webkit-scrollbar': {display: 'none'},
                                        backgroundColor: '#f3f3f3'
                                    }}
                                >
                                    <Stack spacing={'8px'} divider={<Divider/>} sx={{p: '16px'}}>
                                        <Stack 
                                            direction={'row'} 
                                            spacing={'12px'} 
                                            sx={{display: 'flex', alignItems: 'flex-start'}}
                                        >
                                            {
                                                loaded === false || data?.image.length === 0?
                                                    <Skeleton 
                                                        animation="wave"
                                                        width={56} 
                                                        height={56}
                                                    />
                                                    :
                                                    <IconButton
                                                        sx={{'&: hover': {cursor: 'pointer'}}}
                                                        onClick={showModal}
                                                    >
                                                        <Avatar
                                                            alt="resp-image-avatar"
                                                            src={data?.image}
                                                            sx={{ 
                                                                width: 56, 
                                                                height: 56, 
                                                                display: {xs: 'flex', md: 'none'} 
                                                            }}
                                                        />
                                                    </IconButton>
                                            }   
                                            
                                            <Stack spacing={'8px'}>
                                                {
                                                    loaded=== false || data?.title.length === 0?
                                                        <Skeleton 
                                                            animation="wave"
                                                            width={260} 
                                                            height={40}
                                                        />
                                                        :
                                                        <Typography
                                                            sx={{
                                                                fontWeight: 600,
                                                                fontSize: '20px',
                                                                color: '#1c2128',
                                                                textAlign: 'left'
                                                            }}
                                                        >
                                                            {data?.title}
                                                        </Typography>
                                                }    
                                                {
                                                    loaded=== false || data?.category.length === 0?
                                                        <Skeleton 
                                                            animation="wave"
                                                            width={160} 
                                                            height={32}
                                                        />
                                                        :
                                                        <Typography
                                                            sx={{
                                                                fontSize: '12px',
                                                                color: '#1c2128',
                                                                textAlign: 'left'
                                                            }}
                                                        >
                                                            {data?.category}
                                                        </Typography>
                                                } 
                                            </Stack>
                                        </Stack>
                                        <Stack 
                                            direction={'row'} 
                                            spacing={'12px'}
                                            sx={{display: 'flex', alignItems: 'center'}}
                                        >
                                            {
                                                loaded=== false || data?.rating?.rate < 0?
                                                    <Skeleton 
                                                        animation="wave"
                                                        width={80} 
                                                        height={32}
                                                    />
                                                    :
                                                    <Rating 
                                                        size="small"
                                                        name="read-only" 
                                                        value={data?.rating?.rate} 
                                                        readOnly 
                                                    />
                                            } 
                                            {
                                                loaded=== false || data?.price < 0?
                                                    <Skeleton 
                                                        animation="wave"
                                                        width={52} 
                                                        height={32}
                                                    />
                                                    :
                                                    <Chip
                                                        avatar={<Avatar sx={{ bgcolor: deepPurple[500] }}>$</Avatar>}
                                                        label={data?.price}
                                                        color="primary"
                                                        variant="outlined"
                                                    />
                                            } 
                                            {
                                                loaded=== false || data?.rating?.count < 0?
                                                    <Skeleton 
                                                        animation="wave"
                                                        width={80} 
                                                        height={32}
                                                    />
                                                    :
                                                    <Chip
                                                        label={`${data?.rating?.count} left in stock`}
                                                        color="primary"
                                                        variant="outlined"
                                                    />
                                            } 
                                        </Stack>
                                    </Stack>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            borderRadius: '28px',
                                            height: `60%`,
                                            mx: '16px',
                                            mb: '16px',
                                            p: '16px',
                                            overflow: 'scroll', 
                                            scrollbarWidth: 'none',
                                            '&::-webkit-scrollbar': {display: 'none'},
                                            backgroundColor: '#55545e'
                                        }}
                                    >
                                        {
                                            loaded=== false || data?.description.length === 0?
                                                <Skeleton 
                                                    animation="wave"
                                                    width={'100%'} 
                                                    height={32}
                                                />
                                                :
                                                <Typography
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: '14px',
                                                        color: '#FFFFFF',
                                                        textAlign: 'left'
                                                    }}
                                                >
                                                    {data?.description}
                                                </Typography>
                                        } 
                                        
                                    </Paper>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Stack>
        </React.Fragment>
    )
}