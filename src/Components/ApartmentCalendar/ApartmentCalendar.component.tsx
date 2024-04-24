// import React, { useState, useEffect, FC } from "react";
// import { Calendar, Views, momentLocalizer } from "react-big-calendar";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import moment from "moment";
// import axios from "axios";

// const localizer = momentLocalizer(moment);

// interface MyCalendarProps {
//   userId: string;
//   apartamentId: string;
// }

// const MyCalendar: FC<MyCalendarProps> = ({ userId, apartamentId }) => {
//   const [reservations, setReservations] = useState([]);
//   const [visibleRange, setVisibleRange] = useState<{ start: Date; end: Date }>({
//     start: new Date(),
//     end: new Date(),
//   });

//   useEffect(() => {
//     const getReservations = async () => {
//       try {
//         if (!userId) return;

//         const response = await axios.get(
//           `http://192.168.10.210:8080/TAM/${userId}/reservations/calendar/${apartamentId}?fromDate=${moment(
//             visibleRange.start
//           ).format("YYYY-MM-DD")}&toDate=${moment(visibleRange.end).format(
//             "YYYY-MM-DD"
//           )}`
//         );
//         setReservations(response.data.reservations || []);
//       } catch (error) {
//         console.error("Error fetching reservations:", error);
//         setReservations([]);
//       }
//     };

//     getReservations();
//   }, [apartamentId, userId, visibleRange]);

//   const handleNavigate = (newDate: Date) => {
//     const startOfMonth = moment(newDate).startOf("month").toDate();
//     const endOfMonth = moment(newDate).endOf("month").toDate();
//     setVisibleRange({ start: startOfMonth, end: endOfMonth });
//   };

//   const events = reservations.map((reservation: any, index: number) => ({
//     id: index,
//     title: reservation.guestName || "Unknown",
//     start: new Date(reservation.arrival),
//     end: new Date(reservation.departure),
//     className: `reservation-${index}`,
//   }));

//   const eventStyleGetter = (event: any) => ({
//     className: event.className,
//     style: {
//       backgroundColor: "lightblue",
//     },
//   });

//   return (
//     <div style={{ height: "500px" }}>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         views={["month", "week", "day", "agenda"]}
//         eventPropGetter={eventStyleGetter}
//         selectable
//         onSelectSlot={(slotInfo: any) => console.log("Selected:", slotInfo)}
//         onSelectEvent={(event: any) => console.log("Event selected:", event)}
//         defaultView={Views.MONTH}
//         scrollToTime={new Date(1970, 1, 1, 6)}
//         onNavigate={(newDate: Date) => handleNavigate(newDate)}

//       />
//     </div>
//   );
// };

// export default MyCalendar;

import React, { useState, useEffect, FC } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import axios from "axios";
import styled from "styled-components";

const CalendarContainer = styled.div`
  height: 500px;

  @media (max-width: 768px) {
    width: calc(100% - 70px);
    max-width: 450px;
    margin-left: 55px;
  }
`;

const localizer = momentLocalizer(moment);

interface MyCalendarProps {
  userId: string;
  apartamentId: string;
}

const MyCalendar: FC<MyCalendarProps> = ({ userId, apartamentId }) => {
  const [reservations, setReservations] = useState([]);
  const today = new Date();
  const startOfCurrentMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );
  const endOfCurrentMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  );
  const [visibleRange, setVisibleRange] = useState<{ start: Date; end: Date }>({
    start: startOfCurrentMonth,
    end: endOfCurrentMonth,
  });

  useEffect(() => {
    const getReservations = async () => {
      try {
        if (!userId) return;

        const response = await axios.get(
          `http://192.168.10.210:8080/TAM/${userId}/reservations/calendar/${apartamentId}?fromDate=${moment(
            visibleRange.start
          ).format("YYYY-MM-DD")}&toDate=${moment(visibleRange.end).format(
            "YYYY-MM-DD"
          )}`
        );
        setReservations(response.data.reservations || []);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setReservations([]);
      }
    };

    getReservations();
  }, [apartamentId, userId, visibleRange]);

  const handleNavigate = (newDate: Date) => {
    const startOfMonth = moment(newDate).startOf("month").toDate();
    const endOfMonth = moment(newDate).endOf("month").toDate();
    setVisibleRange({ start: startOfMonth, end: endOfMonth });
  };

  const events = reservations.map((reservation: any, index: number) => ({
    id: index,
    title: reservation.guestName || "Unknown",
    start: new Date(reservation.arrival),
    end: new Date(reservation.departure),
    className: `reservation-${index}`,
  }));

  const eventStyleGetter = (event: any) => ({
    className: event.className,
    style: {
      backgroundColor: "lightblue",
    },
  });

  return (
    <CalendarContainer>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day", "agenda"]}
        eventPropGetter={eventStyleGetter}
        selectable
        onSelectSlot={(slotInfo) => console.log("Selected:", slotInfo)}
        onSelectEvent={(event) => console.log("Event selected:", event)}
        defaultView={Views.MONTH}
        scrollToTime={new Date(1970, 1, 1, 6)}
        onNavigate={(newDate) => handleNavigate(newDate)}
      />
    </CalendarContainer>
  );
};

export default MyCalendar;
