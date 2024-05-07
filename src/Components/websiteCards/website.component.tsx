import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import photo from "../../background.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const DIV = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 80%;
  height: fit-content;
  @media (max-width: 1400px) {
    flex-direction: column;
    margin-left: 50px;
    padding-bottom: 2000px;
    margin-top: 2750px;
    gap: 50px;
    display: flex;
    align-items: center;
  }
`;

export default function MultiActionAreaCard() {
  const navigate = useNavigate();

  const goToHome = () => navigate("/website/template1");

  return (
    <DIV>
      <Card sx={{ maxWidth: 375 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image={photo}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Template 1
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button onClick={goToHome} size="small" color="primary">
            See preview
          </Button>
        </CardActions>
      </Card>
      <Card sx={{ maxWidth: 375 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image={photo}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Template 2
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            See preview
          </Button>
        </CardActions>
      </Card>
      <Card sx={{ maxWidth: 375 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image={photo}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Template 3
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            See preview
          </Button>
        </CardActions>
      </Card>
    </DIV>
  );
}
