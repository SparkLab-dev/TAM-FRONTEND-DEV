import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import "./calendar.css";

import { RootState } from "redux/store";
import { useSelector } from "react-redux";
interface MonthOption {
  value: number;
  label: string;
}

function MonthTable() {
  const [selectedMonth, setSelectedMonth] = useState<number>(4);
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [daysOfMonth, setDaysOfMonth] = useState<any>(31);
  const [dayNames, setDayNames] = useState<string[]>([]);
  const [apartmentData, setApartmentData] = useState<any[]>([]);

  //   const [apiResponse, setApiResponse] = useState<any>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id;
  const makeApiRequest = () => {
    const apiUrl = `http://192.168.10.153:8080/TAM/${userId}/reservations/calendar`;

    axios
      .get(apiUrl, {
        params: {
          fromDate: firstDate,
          toDate: lastDate,
        },
      })
      .then((response: { data: any }) => {
        setApartmentData(response.data);
        console.log(response);
        console.log(apartmentData);
      })
      .catch((error) => {
        console.error("API Request Error:", error);
      });
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

      const dayNamesArray = ["Su", "Mo", "Tu", "We", "Thu", "Fr", "Sa"];

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
    makeApiRequest();
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
  console.log("Selected Date:", firstDate);
  const lastDate = endDate(selectedMonth, selectedYear);
  console.log("Selected Date:", lastDate);

  const isStartDateOfReservation = (reservation: any, day: number) => {
    const startDate = new Date(reservation.allBookedDates[0]);
    return startDate.getDate() === day;
  };

  const isEndDateOfReservation = (reservation: any, day: number) => {
    const endDate = new Date(
      reservation.allBookedDates[reservation.allBookedDates.length - 1]
    );

    return endDate.getDate() === day;
  };

  return (
    <div className="page">
      <div className="content">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Calendar</h2>
          <div style={{ justifyContent: "space-between" }}>
            <select
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
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            >
              {monthOptions.map((month: MonthOption) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            <input
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
              type="number"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            />
          </div>
        </div>
        {/* <button onClick={makeApiRequest}>Update Table</button> */}
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
                  const reservation = apartment.reservations.find(
                    (reservation: { allBookedDates: string[] }) =>
                      reservation.allBookedDates.includes(
                        `${selectedYear}-${selectedMonth
                          .toString()
                          .padStart(2, "0")}-${i + 1}`
                      )
                  );
                  let cellStyle: any = {
                    borderRight: "1px solid",
                    borderColor: "#c5c5c8",
                    padding: "10px",
                    background: "",
                  };

                  if (reservation) {
                    if (isStartDateOfReservation(reservation, i + 1)) {
                      cellStyle.background =
                        "linear-gradient(to bottom right, transparent 50%, #4F734C 50%)";
                    } else if (isEndDateOfReservation(reservation, i + 1)) {
                      cellStyle.background =
                        "linear-gradient(to top left, transparent 50%, #4F734C0 50%)";
                    } else {
                      cellStyle.background = "#4F734C";
                    }

                    if (reservation.blocked_booking) {
                      if (isStartDateOfReservation(reservation, i + 1)) {
                        cellStyle.background =
                          "linear-gradient(to bottom right, transparent 50%, rgb(93 93 93) 50%)";
                      } else if (isEndDateOfReservation(reservation, i + 1)) {
                        cellStyle.background =
                          "linear-gradient(to top left, transparent 50%, rgb(93 93 93) 50%)";
                      } else {
                        cellStyle.background = "rgb(93 93 93)";
                      }
                    }
                  } else {
                    cellStyle.background = "white";
                  }

                  return (
                    <td style={cellStyle} key={i}>
                      {reservation?.blocked_booking ? (
                        <span style={{ color: "red" }}></span>
                      ) : null}
                      {reservation && !reservation?.blocked_booking && (
                        <span style={{ color: "green" }}></span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>{" "}
      </div>
    </div>
  );
}

export default MonthTable;
