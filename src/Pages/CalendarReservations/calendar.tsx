import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

//redux
import { AppDispatch, RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "redux/Modal/ModalSlice";

//style
import "./calendar.css";
import { Button } from "App/style/App.style";

//mui
import EditIcon from "@mui/icons-material/Edit";
import { TextfieldDiv } from "Components/Modal/style/Modal.style";
import TextField from "@mui/material/TextField";

//components
import Popup from "Components/Popup/Popup.component";

interface MonthOption {
  value: number;
  label: string;
}

function MonthTable() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState<number>(5);
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [daysOfMonth, setDaysOfMonth] = useState<number>(31);
  const [dayNames, setDayNames] = useState<string[]>([]);
  const [apartmentData, setApartmentData] = useState<any[]>([]);
  console.log(apartmentData);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [startDatePopup, setStartDatePopup] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [minLength, setMinLength] = useState<string>("");
  const [selectedReservation, setSelectedReservation] = useState<any>(null);

  //get userId
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://192.168.10.153:8080/TAM/${userId}/reservations/reservationCalendar?fromDate=${firstDate}&toDate=${lastDate}`
      );
      setApartmentData(response.data);
    } catch (error) {
      console.error("Error fetching reservation details:", error);
    }
  };

  const monthOptions: MonthOption[] = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const generateDayNames = useCallback(
    (selectedMonth: number, selectedYear: number) => {
      const firstDayOfMonth = new Date(selectedYear, selectedMonth - 1, 1);
      const dayNames = [];
      const dayNamesArray = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

      let currentDayIndex = firstDayOfMonth.getDay();
      for (let i = 1; i <= daysOfMonth; i++) {
        dayNames.push(dayNamesArray[currentDayIndex]);
        currentDayIndex = (currentDayIndex + 1) % 7;
      }

      return dayNames;
    },
    [daysOfMonth]
  );

  useEffect(() => {
    const daysInSelectedMonth = getDaysInMonth(selectedMonth, selectedYear);
    setDaysOfMonth(daysInSelectedMonth);

    const newDayNames = generateDayNames(selectedMonth, selectedYear);
    setDayNames(newDayNames);
  }, [generateDayNames, selectedMonth, selectedYear]);

  useEffect(() => {
    fetchData();
  }, [selectedMonth, selectedYear, daysOfMonth]);

  function startDate(selectedMonth: number, selectedYear: number) {
    const formattedMonth = selectedMonth.toString().padStart(2, "0");
    return `${selectedYear}-${formattedMonth}-01`;
  }

  function endDate(selectedMonth: number, selectedYear: number) {
    const formattedMonth = selectedMonth.toString().padStart(2, "0");
    return `${selectedYear}-${formattedMonth}-${daysOfMonth}`;
  }

  const firstDate = startDate(selectedMonth, selectedYear);
  const lastDate = endDate(selectedMonth, selectedYear);
  console.log(lastDate);
  const openPopup = () => {
    setIsModalOpen(true);
  };

  const handleGoToReservationDetailClick = (reservationId: string) => {
    navigate(`/reservationDetail/${reservationId}`);
  };
  const handleGoToEditDetailClick = (
    event: React.MouseEvent,
    apartment: any,
    dateClicked: string
  ) => {
    // Prevent event propagation
    event.stopPropagation();
    setStartDatePopup(dateClicked);
    console.log(dateClicked);
    setSelectedReservation(apartment);
    openPopup();
  };

  const dispatch: AppDispatch = useDispatch();
  const handleSave = async () => {
    if (!userId || !selectedReservation) {
      console.log(userId);

      console.error("User is not authenticated or no item is selected");
      return;
    }
    console.log(selectedReservation);
    console.log("PRICE", price);
    const userCredentials = {
      apartments: [selectedReservation.apartmentId],
      operations: [
        {
          dates: [startDatePopup],
          daily_price: parseFloat(price),

          min_length_of_stay: parseInt(minLength),
        },
      ],
    };

    try {
      const response = await dispatch(openModal({ userId, userCredentials }));
      if (openModal.fulfilled.match(response)) {
        await fetchData();
        console.log("Update successful", response.payload);
        setIsModalOpen(false); // Close the popup
      } else {
        console.error("Update failed", response.error);
      }
    } catch (error) {
      console.error("Error in handleSave:", error);
    }
  };
  return (
    <div className="page">
      <div className="content">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Calendar</h2>
          <div style={{ justifyContent: "space-between" }}>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              style={{
                color: "#333",
                fontSize: "16px",
                cursor: "pointer",
                backgroundColor: "#fff",
                outline: "none",
                borderRadius: "4px",
                padding: "8px",
                border: "1px solid #ccc",
              }}
            >
              {monthOptions.map((month: MonthOption) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              style={{
                color: "#333",
                fontSize: "16px",
                cursor: "pointer",
                backgroundColor: "#fff",
                outline: "none",
                borderRadius: "4px",
                padding: "8px",
                border: "1px solid #ccc",
                width: "100px",
              }}
            />
          </div>
        </div>
        <table className="table-container">
          <thead className="table-header">
            <tr>
              <td></td>
              {Array.from({ length: daysOfMonth }, (_, i) => (
                <th className="table-header" key={i}>
                  {i + 1}
                </th>
              ))}
            </tr>
            <tr>
              <td></td>
              {dayNames.map((dayName, index) => (
                <th
                  key={index}
                  style={{
                    color:
                      dayName === "Sa" || dayName === "Su" ? "red" : "inherit",
                  }}
                >
                  {dayName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="table-body">
            {apartmentData.map((apartment) => (
              <tr key={apartment.apartmentId}>
                <td>{apartment.apartmentName}</td>
                {Array.from({ length: daysOfMonth }, (_, i) => {
                  const day = new Date(selectedYear, selectedMonth - 1, i + 1); // Month is zero-based
                  const reservation =
                    apartment.specificApartmentReservationCalendarDTOList.find(
                      (reservation: any) =>
                        reservation.allDates.some((date: any) => {
                          const [year, month, dayOfMonth] = date
                            .split("-")
                            .map(Number);
                          const reservationDate = new Date(
                            year,
                            month - 1,
                            dayOfMonth
                          );
                          return reservationDate.getTime() === day.getTime();
                        })
                    );
                  let cellStyle: any = {
                    borderRight: "1px solid",
                    borderColor: "#C5C5C8",
                    padding: "10px",
                    background: "",
                    cursor: reservation ? "pointer" : "default",
                    position: "relative",
                  };
                  if (reservation) {
                    if (reservation.type === "Available") {
                      cellStyle.background = "#4CAF50"; // Green for available days
                    } else if (
                      reservation.type === "Reservation" &&
                      !reservation.blocked_booking
                    ) {
                      cellStyle.background = "red"; // Red for available reservations
                    } else if (
                      reservation.type === "Reservation" &&
                      reservation.blocked_booking
                    ) {
                      cellStyle.background = "#5D5D5D"; // Grey for blocked reservations
                    }
                  }

                  return (
                    <td
                      style={{
                        ...cellStyle,
                        cursor:
                          reservation &&
                          reservation.type === "Reservation" &&
                          !reservation.blocked_booking
                            ? "pointer"
                            : "default",
                      }}
                      key={i}
                      onClick={() => {
                        if (
                          reservation &&
                          reservation.type === "Reservation" &&
                          !reservation.blocked_booking
                        ) {
                          handleGoToReservationDetailClick(
                            reservation.smoobuId
                          );
                        }
                      }}
                    >
                      {reservation && !reservation.blocked_booking && (
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          {reservation.type === "Available" && (
                            <div
                              onClick={(e) => {
                                handleGoToEditDetailClick(
                                  e,
                                  apartment,
                                  reservation.allDates[0]
                                );
                              }}
                              style={{
                                marginLeft: "20px",
                                padding: "0",
                                marginTop: "0",
                                cursor: "pointer",
                              }}
                            >
                              <EditIcon style={{ fontSize: "15px" }} />
                            </div>
                          )}
                          <span
                            style={{
                              fontSize: "13px",
                              color: "black",
                              fontFamily: "Poppins",
                              fontWeight: "500",
                              flex: "1",
                            }}
                          >
                            €{reservation.pricePerNight}
                          </span>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Popup
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        headerContent={
          <p
            style={{ fontFamily: "Poppins", fontSize: "30px", color: "black" }}
          >
            Edit Price
          </p>
        }
        bodyContent={
          <>
            <TextField
              id="outlined-basic"
              label="Date"
              value={startDatePopup || ""}
              variant="outlined"
              fullWidth
              sx={{ margin: "10px 0" }}
            />

            <TextfieldDiv>
              <TextField
                id="outlined-basic"
                label="Price"
                value={price || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPrice(e.target.value)
                }
                type="number"
                variant="outlined"
              />
            </TextfieldDiv>
            <TextfieldDiv>
              <TextField
                id="outlined-basic"
                label="Minimum length of stay"
                value={minLength || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMinLength(e.target.value)
                }
                type="number"
                variant="outlined"
              />
            </TextfieldDiv>
          </>
        }
        footerContent={<Button onClick={handleSave}>Submit</Button>}
      />
    </div>
  );
}

export default MonthTable;
