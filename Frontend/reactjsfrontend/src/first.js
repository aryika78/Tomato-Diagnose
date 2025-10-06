import { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Container from '@mui/material/Container';
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Paper, CardActionArea, CardMedia, Grid, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Button, CircularProgress } from "@mui/material";
import cblogo from "./cblogo.png";
import { useDropzone } from 'react-dropzone';
import { Box } from '@mui/material';
import { common } from '@mui/material/colors';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/material/styles';
import axios from "axios";
import bktomoto from "./bktomoto.jpg";



const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(common.white),
  backgroundColor: common.white,
  '&:hover': {
    backgroundColor: '#ffffff7a',
  },
}));



export const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  let confidence = 0;

  const sendFile = async () => {
    if (image) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      let res = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL,
        data: formData,
      });
      if (res.status === 200) {
        setData(res.data);
        // alert(JSON.stringify(res.data.predicted_class));
      }
      setIsloading(false);
    }
  }

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) return;
    setIsloading(true);
    sendFile();
  }, [preview]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => onSelectFile(acceptedFiles),
  });

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }

  return (
    
    <React.Fragment>
       <div 
        style={{ 
          backgroundImage: `url(${bktomoto})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          minHeight: '100vh' 
        }}
      >
      <AppBar
        position="static"
        sx={{ background: '#be6a77', boxShadow: 'none', color: 'white' }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Tomato Disease Classification with CNN
          </Typography>
          <Avatar src={cblogo} />
        </Toolbar>
      </AppBar>

      <Container maxWidth={false} disableGutters sx={{ py: 4 }}>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <Card
              sx={{
                margin: 'auto',
                maxWidth: 400,
                height: image ? 380 : 'auto',                
                backgroundColor: 'transparent',
                boxShadow: '0px 9px 70px 0px rgb(0 0 0 / 30%)',
                borderRadius: '15px',
              }}
            >
              {image && (
                <CardActionArea>
                  <CardMedia
                    image={preview}
                    component="img"
                    title="Tomato Leaf"
                    sx={{ height: '100%', objectFit: 'contain' }}
                  />
                </CardActionArea>
              )}

              {!image && (
                <CardContent>
                  <Box
                    {...getRootProps()}
                    sx={{
                      border: '2px dashed grey',
                      borderRadius: 2,
                      padding: 4,
                      textAlign: 'center',
                      cursor: 'pointer',
                      backgroundColor: '#fafafa',
                    }}
                  >
                    <input {...getInputProps()} />
                    <Typography variant="body1">
                      Drag and drop an image of a tomato plant leaf to process
                    </Typography>
                  </Box>
                </CardContent>
              )}

              {data && (
                <CardContent>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>Label:</strong></TableCell>
                          <TableCell align="right"><strong>Confidence:</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>{data.predicted_classes}</TableCell>
                          <TableCell align="right">{confidence}%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              )}

              {isLoading && (
                <CardContent sx={{ textAlign: 'center' }}>
                  <CircularProgress color="secondary" />
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Processing
                  </Typography>
                </CardContent>
              )}
            </Card>
          </Grid>

          {data && (
            <Grid item>
              <ColorButton
                variant="contained"
                color="primary"
                component="span"
                size="large"
                onClick={clearData}
                startIcon={<ClearIcon fontSize="large" />}
              >
                Clear
              </ColorButton>
            </Grid>
          )}
        </Grid>
      </Container>
      </div>
    </React.Fragment>
  );
};
