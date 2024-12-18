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
  // const user = useSelector((state: RootState) => state.auth.user);
  // const userId = user?.id;

  const { id } = useParams();
  const reservationId = id ? parseInt(id) : 0;
  const reservationID = reservationId ? String(reservationId) : "";
  console.log(reservationID, "reservationID");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://192.168.10.210:8081/TAM/reservation/getReservation/${reservationID}`
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
            <DetailsDescription>Created date</DetailsDescription>
            <DetailsValue>{reservationData.createdDate}</DetailsValue>
          </Details>
          <Details>
            <DetailsDescription>Creator</DetailsDescription>
            <DetailsValue>{reservationData.creator}</DetailsValue>
          </Details>
          <Details>
            <DetailsDescription>Reservation id</DetailsDescription>
            <DetailsValue>{reservationData.reservationID}</DetailsValue>
          </Details>
          <Details>
            <DetailsDescription>Guest Name</DetailsDescription>
            <DetailsValue>{reservationData.guestName}</DetailsValue>
          </Details>
        </>
      )}
    </ReservationDetailContainer>
  );
};

export default ReservationDetail;
