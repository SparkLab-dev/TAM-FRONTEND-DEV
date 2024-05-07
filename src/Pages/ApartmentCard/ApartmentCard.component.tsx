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


const ApartmentCard: FC<{}> = () => {
  const [apartmentCardDetails, setApartmentCardDetails] = useState<any>();
  const dispatch: AppDispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const userID = userId ? String(userId) : '';
  


  const { id } = useParams();
  const apartmentId = id ? parseInt(id) : 0;
  const apartmentID = apartmentId ? String(apartmentId) : '';
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
        <MyCalendar userId={userID} apartamentId={apartmentID}/>
    <Holder>
    
      {apartmentCardDetails && (
        <CardContainer>
          <ApartmentName>{apartmentCardDetails.name}</ApartmentName>
          <ApartmentName><AddUrl/></ApartmentName>
          
          <DivsContentHolder>
            <Div>
              <Paragraphs>
                <Label>City: </Label> {apartmentCardDetails.location.city}
              </Paragraphs>
              <Paragraphs>
                <Label>Country: </Label>
                {apartmentCardDetails.location.country}
              </Paragraphs>
              <Paragraphs>
                <Label>Street: </Label>
                {apartmentCardDetails.location.street}
              </Paragraphs>
              <Paragraphs>
                <Label>Zip: </Label> {apartmentCardDetails.location.zip}
              </Paragraphs>
              <Paragraphs>
                <Label>Latitude: </Label>
                {apartmentCardDetails.location.latitude}
              </Paragraphs>
              <Paragraphs>
                <Label>Longitude: </Label>
                {apartmentCardDetails.location.longitude}
              </Paragraphs>
              <Paragraphs>
                <Label>Currency: </Label>"{apartmentCardDetails.currency}"
              </Paragraphs>
              <Paragraphs>
                <Label> Minimal price: </Label>"
                {apartmentCardDetails.price.minimal}"
              </Paragraphs>
              <Paragraphs>
                <Label>Maximal price: </Label>"
                {apartmentCardDetails.price.maximal}"
              </Paragraphs>
              <Paragraphs>
                <Label>Time Zone: </Label>
                {apartmentCardDetails.timeZone}
              </Paragraphs>
              <Paragraphs>
                <Label>Type: </Label> {apartmentCardDetails.type.name}
              </Paragraphs>
            </Div>
            <Div2>
              <Paragraphs>Rooms: </Paragraphs>
              {/* <UnorderedList> */}
                <Paragraphs>
                  <Label> Bathrooms: </Label>
                  {apartmentCardDetails.rooms.bathrooms}
                </Paragraphs>
                <Paragraphs>
                  <Label>Bedrooms: </Label>
                  {apartmentCardDetails.rooms.bedrooms}
                </Paragraphs>
                <Paragraphs>
                  <Label> Child Beds: </Label>
                  {apartmentCardDetails.rooms.childBeds}
                </Paragraphs>
                <Paragraphs>
                  <Label> Couches: </Label>
                  {apartmentCardDetails.rooms.couches}
                </Paragraphs>
                <Paragraphs>
                  <Label> Double Beds: </Label>
                  {apartmentCardDetails.rooms.doubleBeds}
                </Paragraphs>
                <Paragraphs>
                  <Label> King Size Beds: </Label>
                  {apartmentCardDetails.rooms.kingSizeBeds}
                </Paragraphs>
                <Paragraphs>
                  <Label> Max Occupancy: </Label>
                  {apartmentCardDetails.rooms.maxOccupancy}
                </Paragraphs>
                <Paragraphs>
                  <Label> Queen Size Beds: </Label>
                  {apartmentCardDetails.rooms.queenSizeBeds}
                </Paragraphs>
                <Paragraphs>
                  <Label>Single Beds: </Label>
                  {apartmentCardDetails.rooms.singleBeds}
                </Paragraphs>
                <Paragraphs>
                  <Label>Sofa Beds: </Label>
                  {apartmentCardDetails.rooms.sofaBeds}
                </Paragraphs>
              {/* </UnorderedList> */}
            </Div2>
          </DivsContentHolder>
          <IconContainer>
            <IconHold>
              <RentLink to="/rentlist">EDIT PRICE</RentLink>
            </IconHold>
            <IconHold>
              <RentLink to="/modal">ADD PRICE</RentLink>
            </IconHold>
            <IconHold>
              <RentLink to={`/add/${apartmentId}`}>SEE AMENITIES</RentLink>
            </IconHold>
            
          </IconContainer>
        </CardContainer>
      )}
    </Holder>
    <MyComponent id={0}/>
   
    </Page>
    
   </>
  );
};
export default ApartmentCard;
