import React from 'react';
import Card from '@mui/material/Card';
import { red } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Avatar from '@mui/material/Avatar';
import CardActions from '@mui/material/CardActions';
import QRGenGif from '../assets/QRGen.gif'
import AtAnalisisGif from '../assets/At_analisis.gif'

const LecOption = ({id,title,Descrption,imageselection}) =>{

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    variants: [
      {
        props: ({ expand }) => !expand,
        style: {
          transform: 'rotate(0deg)',
        },
      },
      {
        props: ({ expand }) => !!expand,
        style: {
          transform: 'rotate(180deg)',
        },
      },
    ],
  }));

  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function moveQRGen (event) {
    //event.preventDefault();
    navigate(`/lecturer/lecturer_qrgen/${id}`);
  }
  const moveAtteAnalise = (event) =>{
    //event.preventDefault();
    navigate(`/lecturer/attendace_history/${id}`)
  }

  return (
    <div className='p-6' onClick={() => imageselection === 1 ? moveQRGen() : moveAtteAnalise()}>

   <Card
  sx={{
    width: { xs: 150, sm: 200, md: 200 },   // Card width changes responsively
    height: { xs: 150, sm: 200, md: 200 },  // Card height matches width
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: 3, // same as shadow-md
    borderRadius: 2,
    cursor: 'pointer',
    transition: '0.3s',
    '&:hover': {
      transform: 'scale(1.03)',
    },
  }}
>
  <CardMedia
    className='p-3'
    component="img"
    image={imageselection==1?QRGenGif:AtAnalisisGif}
    alt="QR Code Generator"
    sx={{
      width: '100%',
      height: { 
        xs: '112px', // 75 * 0.75 = 56px
        sm: '150px', // 100 * 0.75 = 75px
        md: '150px' // 150 * 0.75 = 112px
      },
      objectFit: 'cover',
    }}
  />
  
  <CardContent sx={{ padding: 1, flexGrow: 1 }}>
    <Typography 
      variant="subtitle2" 
      sx={{ 
        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
        textAlign: 'center',
        fontWeight: 'bold'
      }}
    >
      {title}
    </Typography>
  </CardContent>

  <CardActions disableSpacing sx={{ justifyContent: 'center', padding: 0 }}>
    {/* <ExpandMore
      expand={expanded}
      onClick={handleExpandClick}
      aria-expanded={expanded}
      aria-label="show more"
    >
      <ExpandMoreIcon />
    </ExpandMore> */}
  </CardActions>

  <Collapse in={expanded} timeout="auto" unmountOnExit>
    <CardContent sx={{ padding: 1 }}>
      {/* <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem' }, marginBottom: 1 }}>
        {Descrption}
      </Typography>    */}
    </CardContent>
  </Collapse>
</Card>

    </div>
  );
}
export default LecOption;