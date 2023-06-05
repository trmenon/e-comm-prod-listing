import React from "react";
import { useNavigate } from "react-router-dom";

// Legacy Imports
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { deepPurple} from '@mui/material/colors';

// Models
import { ResponseItemProps } from "../../models/types";

export const CustomCard: React.FC<ResponseItemProps> = ({
    id,
    title,
    price,
    description,
    category,
    image,
    rating,
})=> {
    // Globals
    const navigate = useNavigate();
    
    // Event Handlers
    const navToDetailsRoute = ()=> navigate(`/product/${id}`);

    // Renderer
    return(
        <React.Fragment>
            <Card sx={{ width: '100%', borderRadius: '28px' }}>
                <CardHeader
                    avatar={<Avatar alt={'image'} src={image}/>}
                    title={title}
                    subheader={category}
                    titleTypographyProps={{
                        sx:{
                            textAlign: 'left', 
                            color: '#1c232c', 
                            fontWeight: 600, 
                            fontSize: '12px',
                            maxWidth: '160px',
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        } 
                    }}
                    subheaderTypographyProps={{
                        sx:{
                            textAlign: 'left', 
                            color: '#7e8a9b', 
                            fontWeight: 500, 
                            fontSize: '10px'
                        } 
                    }}
                />
                <CardMedia
                    component="img"
                    height="128"
                    image={image}
                    alt="Item Media"
                    sx={{display: {xs: 'none', md: 'flex'}}}
                />
                <CardContent>
                    <Stack 
                        spacing={'8px'} 
                        direction={'row'}
                        sx={{display: 'flex',alignItems: 'center',}}
                    >
                        <Chip
                            avatar={<Avatar sx={{ bgcolor: deepPurple[500] }}>$</Avatar>}
                            label={price}
                            color="primary"
                            variant="outlined"
                        />
                        <Rating 
                            size="small"
                            name="read-only" 
                            value={rating?.rate} 
                            readOnly 
                        />                                               
                    </Stack>
                </CardContent>
                <CardActions 
                    disableSpacing
                    sx={{
                        borderTop: '1px solid #CCC',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Chip
                        label={`${rating?.count} left in stock`}
                        color="primary"
                        variant="outlined"
                    /> 
                    <Button 
                        variant="text"
                        color={'secondary'}
                        onClick={navToDetailsRoute}
                    >
                        View
                    </Button>
                </CardActions>
            </Card>
        </React.Fragment>
    )
}