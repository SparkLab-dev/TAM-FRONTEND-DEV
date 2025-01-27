import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
//style
import {
  ApartmentContentHolder,
  ApartmentImg,
  ApartmentNameContainer,
  ApartmentNameParagraph,
  Container,
  ErrorMessage,
  HeartIcon,
  Icon,
} from "./style/ApartmentPage.style";
// import { Button } from "App/style/App.style";
//fontawesome-icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import FavoriteIcon from "@mui/icons-material/Favorite";
//redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ApartmentProps, fetchApartmentIds } from "redux/Auth/ApartmentsPage/ApartmentsPageSlice";
import { AppDispatch } from "../../redux/store";
//mui
import { Button } from "@mui/material";
import ApartmentImage from "../../apartmentimage.png";
import { useTranslation } from "react-i18next";

const ApartmentPage: FC<{}> = () => {
  const navigate = useNavigate();
  const [apartmentName, setApartmentNames] = useState<ApartmentProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user);
  const userId = user?.id;
  const { t } = useTranslation();

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchApartmentIds())
        .then((result: any) => {
          console.log("result", result);
          if (fetchApartmentIds.fulfilled.match(result)) {
            setApartmentNames(result.payload);
          } else if (fetchApartmentIds.rejected.match(result)) {
            setError("Error fetching apartment names. Please try again later!");
          }
        })
        .catch((error: any) => {
          console.error("Error fetching apartment names:", error);
          setError("Error fetching apartment names. Please try again later!");
        });
    };

    fetchData();
  }, [dispatch, userId]);
  console.log("apartmentName", apartmentName);
  const handleApartmentClick = (apartment: ApartmentProps) => {
    console.log(apartment.ownerID);
    navigate(`/apartmentcard/${apartment.id.value}`);
  };

  const handleRules = () => {
    navigate(`/minstay`);
  };
  const handlePropertyCreate = () => {
    navigate(`/propertycreate`);
  };
  console.log("apartmentName", apartmentName);

  return (
    <>
      <div style={{ marginTop: "70px" }}>
        <Button onClick={handleRules}>{t("seetherules")}</Button>
        <Button onClick={handlePropertyCreate}>{t("createProperty")}</Button>
      </div>
      <Container>
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          (apartmentName || []).map((apartment: any) => (
            <ApartmentContentHolder key={apartment.id} onClick={() => handleApartmentClick(apartment)}>
              <Icon>
                <ApartmentImg src={ApartmentImage} alt="apartimage" />
              </Icon>
              <ApartmentNameContainer>
                <ApartmentNameParagraph>{apartment.propertyName}</ApartmentNameParagraph>
                <HeartIcon>
                  <FontAwesomeIcon icon={faHeart} style={{ fontSize: "25px" }} />
                </HeartIcon>
              </ApartmentNameContainer>
            </ApartmentContentHolder>
          ))
        )}
      </Container>
    </>
  );
};

export default ApartmentPage;
