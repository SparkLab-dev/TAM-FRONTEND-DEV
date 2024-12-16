import { FC, useEffect, useState } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { AppDispatch } from "../../redux/store";
import { fetchApartmentCardDetails } from "redux/Auth/ApartmentCard/ApartmentCardSlice";

//react-router-dom
import { useParams } from "react-router-dom";

//styled-components
import {
  ApartmentName,
  CardContainer,
  Div,
  Div2,
  DivsContentHolder,
  Holder,
  IconContainer,
  IconHold,
  Label,
  ListItem,
  Page,
  Paragraphs,
  RentLink,
  UnorderedList,
} from "./style/ApartmentCard.style";
import MyCalendar from "Components/ApartmentCalendar/ApartmentCalendar.component";
import MyComponent from "Components/IOTsection/IOT.component";
import AddUrl from "Components/AddOptions/AddUrl.component";
import { useTranslation } from "react-i18next";

const ApartmentCard: FC<{}> = () => {
  const [apartmentCardDetails, setApartmentCardDetails] = useState<any>();
  const dispatch: AppDispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const userID = userId ? String(userId) : "";

  const { id } = useParams();
  const apartmentId = id ? parseInt(id) : 0;
  const apartmentID = apartmentId ? String(apartmentId) : "";
  const { t } = useTranslation();

  useEffect(() => {
    if (userId && apartmentId) {
      dispatch(fetchApartmentCardDetails({ userId, id: apartmentId }))
        .then((result: any) => {
          if (fetchApartmentCardDetails.fulfilled.match(result)) {
            setApartmentCardDetails(result.payload);
          } else {
            console.error("Apartment details not found.");
          }
        })
        .catch((error: any) => {
          console.error("Error fetching apartment details:", error);
        });
    }
  }, [dispatch, userId, apartmentId]);

  console.log("apartmentCard", apartmentCardDetails);

  return (
    <>
      <Page>
        <MyCalendar userId={userID} apartamentId={apartmentID} />
        <Holder>
          {apartmentCardDetails && (
            <CardContainer>
              <ApartmentName>{apartmentCardDetails.name}</ApartmentName>
              <ApartmentName>
                <AddUrl />
              </ApartmentName>

              <DivsContentHolder>
                <Div>
                  <Paragraphs>
                    <Label>{t("city")}</Label>{" "}
                    {apartmentCardDetails.location.city}
                  </Paragraphs>
                  <Paragraphs>
                    <Label>{t("country")} </Label>
                    {apartmentCardDetails.location.country}
                  </Paragraphs>
                  <Paragraphs>
                    <Label>{t("street")} </Label>
                    {apartmentCardDetails.location.street}
                  </Paragraphs>
                  <Paragraphs>
                    <Label>{t("zip")} </Label>{" "}
                    {apartmentCardDetails.location.zip}
                  </Paragraphs>
                  <Paragraphs>
                    <Label>{t("latitude")} </Label>
                    {apartmentCardDetails.location.latitude}
                  </Paragraphs>
                  <Paragraphs>
                    <Label>{t("longtitude")} </Label>
                    {apartmentCardDetails.location.longitude}
                  </Paragraphs>
                  <Paragraphs>
                    <Label>{t("currency")} </Label>"
                    {apartmentCardDetails.currency}"
                  </Paragraphs>
                  <Paragraphs>
                    <Label> {t("minimalprice")} </Label>"
                    {apartmentCardDetails.price.minimal}"
                  </Paragraphs>
                  <Paragraphs>
                    <Label>{t("maximalprice")} </Label>"
                    {apartmentCardDetails.price.maximal}"
                  </Paragraphs>
                  <Paragraphs>
                    <Label>{t("timezone")} </Label>
                    {apartmentCardDetails.timeZone}
                  </Paragraphs>
                  <Paragraphs>
                    <Label>{t("type")} </Label> {apartmentCardDetails.type.name}
                  </Paragraphs>
                </Div>
                <Div2>
                  <Paragraphs>{t("rooms")}</Paragraphs>
                  {/* <UnorderedList> */}
                  <Paragraphs>
                    <Label>{t("bathrooms")} </Label>
                    {apartmentCardDetails.rooms.bathrooms}
                  </Paragraphs>
                  <Paragraphs>
                    <Label>{t("bedrooms")} </Label>
                    {apartmentCardDetails.rooms.bedrooms}
                  </Paragraphs>
                  <Paragraphs>
                    <Label>{t("childbeds")} </Label>
                    {apartmentCardDetails.rooms.childBeds}
                  </Paragraphs>
                  <Paragraphs>
                    <Label>{t("couches")} </Label>
                    {apartmentCardDetails.rooms.couches}
                  </Paragraphs>
                  <Paragraphs>
                    <Label>{t("doublebeds")} </Label>
                    {apartmentCardDetails.rooms.doubleBeds}
                  </Paragraphs>
                  <Paragraphs>
                    <Label>{t("kingsizebeds")}</Label>
                    {apartmentCardDetails.rooms.kingSizeBeds}
                  </Paragraphs>
                  <Paragraphs>
                    <Label>{t("maxoccupancy")}</Label>
                    {apartmentCardDetails.rooms.maxOccupancy}
                  </Paragraphs>
                  <Paragraphs>
                    <Label>{t("queensizebeds")} </Label>
                    {apartmentCardDetails.rooms.queenSizeBeds}
                  </Paragraphs>
                  <Paragraphs>
                    <Label>{t("singlebeds")}</Label>
                    {apartmentCardDetails.rooms.singleBeds}
                  </Paragraphs>
                  <Paragraphs>
                    <Label>{t("sofabeds")}</Label>
                    {apartmentCardDetails.rooms.sofaBeds}
                  </Paragraphs>
                  {/* </UnorderedList> */}
                </Div2>
              </DivsContentHolder>
              <IconContainer>
                <IconHold>
                  <RentLink to="/rentlist">{t("editprice")}</RentLink>
                </IconHold>
                <IconHold>
                  <RentLink to="/modal">{t("addprice")}</RentLink>
                </IconHold>
                <IconHold>
                  <RentLink to={`/add/${apartmentId}`}>
                    {t("seeamenities")}
                  </RentLink>
                </IconHold>
              </IconContainer>
            </CardContainer>
          )}
        </Holder>
        <MyComponent id={0} />
      </Page>
    </>
  );
};
export default ApartmentCard;
