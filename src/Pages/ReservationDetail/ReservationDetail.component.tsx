import { FC, useEffect, useState } from "react";
import axios from "axios";

//style
import {
  Details,
  DetailsDescription,
  DetailsValue,
  ReservationDetailContainer,
  ReservationDetailsParagpraph,
} from "./style/ReservationDetail.style";

//redux
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useParams } from "react-router-dom";

const ReservationDetail: FC<{}> = () => {
  const [reservationData, setReservationData] = useState<any>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id;

  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://192.168.10.153:8080/TAM/${userId}/reservations/byId/${id}`
      );
      setReservationData(response.data);
      console.log(reservationData);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching reservation details:", error);
    }
  };

  return (
    <ReservationDetailContainer>
      {reservationData && (
        <>
          <ReservationDetailsParagpraph>
            Reservation Details
          </ReservationDetailsParagpraph>
          <Details>
            <DetailsDescription>Arrival</DetailsDescription>
            <DetailsValue>{reservationData.arrival}</DetailsValue>
          </Details>
          <Details>
            <DetailsDescription>Departure</DetailsDescription>
            <DetailsValue>{reservationData.departure}</DetailsValue>
          </Details>
          <Details>
            <DetailsDescription>Apartment Name</DetailsDescription>
            <DetailsValue>{reservationData.apartmentName}</DetailsValue>
          </Details>
          <Details>
            <DetailsDescription>Guest Name</DetailsDescription>
            <DetailsValue>{reservationData.guestName}</DetailsValue>
          </Details>
          <Details>
            <DetailsDescription>Firstname</DetailsDescription>
            <DetailsValue>{reservationData.firstName}</DetailsValue>
          </Details>
          <Details>
            <DetailsDescription>Lastname</DetailsDescription>
            <DetailsValue>{reservationData.lastName}</DetailsValue>
          </Details>
          <Details>
            <DetailsDescription>Email</DetailsDescription>
            <DetailsValue>{reservationData.email}</DetailsValue>
          </Details>
          <Details>
            <DetailsDescription>Phone</DetailsDescription>
            <DetailsValue>{reservationData.phone}</DetailsValue>
          </Details>
          <Details>
            <DetailsDescription>Adults</DetailsDescription>
            <DetailsValue>{reservationData.adults}</DetailsValue>
          </Details>
          <Details>
            <DetailsDescription>Children</DetailsDescription>
            <DetailsValue>{reservationData.children}</DetailsValue>
          </Details>
          <Details>
            <DetailsDescription>CheckIn</DetailsDescription>
            <DetailsValue>{reservationData.checkIn}</DetailsValue>
          </Details>
          <Details>
            <DetailsDescription>CheckOut</DetailsDescription>
            <DetailsValue>{reservationData.checkOut}</DetailsValue>
          </Details>
          <Details>
            <DetailsDescription>Price</DetailsDescription>
            <DetailsValue>{reservationData.price}</DetailsValue>
          </Details>
          <Details>
            <DetailsDescription>Price Paid</DetailsDescription>
            <DetailsValue>{reservationData.pricePaid}</DetailsValue>
          </Details>
          <Details>
            <DetailsDescription>Check In Status</DetailsDescription>
            <DetailsValue>{reservationData.checkInStatus}</DetailsValue>
          </Details>
        </>
      )}
    </ReservationDetailContainer>
  );
};

export default ReservationDetail;
