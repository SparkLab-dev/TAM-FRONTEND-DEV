import { FC, useState, useEffect } from "react";
import {
  ActionTableCell,
  EditButton,
  H2,
  IconLink,
  Table,
  TableAndDatepickerHolder,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "./style/RentList.style";
import { Modal, openModal, openRentList } from "redux/Modal/ModalSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import Popup from "Components/Popup/Popup.component";
import TextField from "@mui/material/TextField";
import { Button } from "App/style/App.style";
import { AppDispatch, RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import axios from "axios";
import { useTranslation } from "react-i18next";

interface RentListProps {
  rentalData: Modal[];
}

const RentList: FC<RentListProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [rentList, setRentList] = useState<Modal[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [error, setError] = useState<string>("");
  console.log(error);
  const [result, setResult] = useState<any[]>([]);
  console.log(selectedItem, "selected/ITem");
  const { t } = useTranslation();
  //get userId &apartmentId from store
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const apartmentIdFromStore = useSelector(
    (state: RootState) => state.apartmentsCard.apartmentDetails?.id
  );
  console.log(apartmentIdFromStore);
  //startDate &endDate function
  function handleStartDateChange(event: any) {
    if (event) {
      const year = event.$y;
      const month = (event.$M + 1).toString().padStart(2, "0");
      const day = event.$D.toString().padStart(2, "0");
      setStartDate(`${year}-${month}-${day}`);
    }
  }

  function handleEndDateChange(event: any) {
    if (event) {
      const year = event.$y;
      const month = (event.$M + 1).toString().padStart(2, "0");
      const day = event.$D.toString().padStart(2, "0");
      setEndDate(`${year}-${month}-${day}`);
    }
  }

  // Calculate the start and end dates for the current month
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  const lastDayOfMonth = new Date(currentYear, currentMonth, 0);
  const startOfMonth = `${currentYear}-${currentMonth
    .toString()
    .padStart(2, "0")}-01`;
  const endOfMonth = `${currentYear}-${currentMonth
    .toString()
    .padStart(2, "0")}-${lastDayOfMonth.getDate()}`;

  const dispatch: AppDispatch = useDispatch();

  const handleSave = async () => {
    if (!userId || !selectedItem) {
      console.error("User is not authenticated or no item is selected");
      return;
    }

    const userCredentials = {
      apartments: [apartmentIdFromStore],
      operations: [
        {
          dates: [selectedItem?.date],
          daily_price: parseFloat(selectedItem.price),
          suggestedPrice: parseFloat(selectedItem.suggestedPrice),
          min_length_of_stay: parseInt(selectedItem.min_length_of_stay),
          suggestedMinimumStay: parseInt(selectedItem.suggestedMinimumStay),
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

  const handleEdit = (rental: any) => {
    console.log(rental);
    setIsModalOpen(true);
    setSelectedItem(rental);
  };

  //get request
  const rentListProperties = {
    start_date: startDate,
    end_date: endDate,
    apartments: apartmentIdFromStore,
  };

  const fetchData = () => {
    if (userId) {
      console.log(userId);
      dispatch(openRentList({ userId, rentListProperties }))
        .then((result: any) => {
          console.log("result", result);
          if (openRentList.fulfilled.match(result)) {
            setRentList([result.payload]);
            console.log("resu", result.payload);
          } else if (openRentList.rejected.match(result)) {
            setError("Error fetching rent list. Please try again later!");
          }
        })
        .catch((error: any) => {
          console.error("Error fetching rent list:", error);
          setError("Error fetching rent list. Please try again later!");
        });
    } else {
      setError("User ID not available.");
    }
  };
  useEffect(() => {
    if (startDate && endDate) {
      fetchData();
    }
  }, [dispatch, userId, endDate, startDate]);

  useEffect(() => {
    setStartDate(startOfMonth);
    setEndDate(endOfMonth);
  }, []);

  useEffect(() => {
    if (rentList && Array.isArray(rentList)) {
      const updatedResult: any[] = [];
      rentList.forEach((outerObject: any) => {
        for (const outerKey in outerObject) {
          if (Object.prototype.hasOwnProperty.call(outerObject, outerKey)) {
            const innerObject = outerObject[outerKey];

            for (const dateKey in innerObject) {
              if (Object.prototype.hasOwnProperty.call(innerObject, dateKey)) {
                const dateData = innerObject[dateKey];
                const price = dateData.price;
                const suggestedMinimumStay = dateData.suggestedMinimumStay;
                const min_length_of_stay = dateData.min_length_of_stay;
                const suggestedPrice = dateData.suggestedPrice;
                const data = {
                  date: dateKey,
                  price: price,
                  min_length_of_stay: min_length_of_stay,
                  suggestedPrice: suggestedPrice,
                  suggestedMinimumStay: suggestedMinimumStay,
                };

                updatedResult.push(data);
              }
            }
          }
        }
      });
      console.log("Result:", result);
      setResult(updatedResult);
    }
  }, [rentList]);

  const handleMatchPrice = async (rental: any) => {
    const userCredentialsss = {
      apartments: [2031869],
      operations: [
        {
          dates: [rental.date],
          daily_price: 50,
          suggestedPrice: 50,
          min_length_of_stay: 5,
          suggestedMinimumStay: 5,
        },
      ],
    };

    try {
      const response = await axios.post(
        `http://192.168.10.141:8080/TAM/${userId}/apartmentAvailability`,
        userCredentialsss
      );

      if (response.status === 200) {
        await fetchData();
        console.log("Update successful", response.data);
      } else {
        console.error("Update failed", response.statusText);
      }
    } catch (error) {
      console.error("Error in handleMatchPrice:", error);
    }
  };

  const handleMinStay = async (rental: any) => {
    const userCredentialss = {
      apartments: [2031872],
      operations: [
        {
          dates: [rental.date],
          daily_price: rental.price,
          suggestedPrice: rental.suggestedPrice,
          min_length_of_stay: rental.suggestedMinimumStay,
          suggestedMinimumStay: rental.suggestedMinimumStay,
        },
      ],
    };

    try {
      const response = await axios.post(
        `http://192.168.10.141:8080/TAM/${userId}/apartmentAvailability`,
        userCredentialss
      );

      if (response.status === 200) {
        await fetchData();
        console.log("Update successful", response.data);
      } else {
        console.error("Update failed", response.statusText);
      }
    } catch (error) {
      console.error("Error in handleMatchPrice:", error);
    }
  };

  return (
    <TableAndDatepickerHolder>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={["DatePicker"]}
          sx={{ justifyContent: "center" }}
        >
          <DatePicker
            label="Start date"
            onChange={handleStartDateChange}
            sx={{
              margin: "10px  !important",
              width: "200px",
              marginLeft: "50px !important",
            }}
          />
          <DatePicker
            label="End date"
            onChange={handleEndDateChange}
            sx={{
              margin: "10px  !important",
              width: "200px",
              marginLeft: "50px !important",
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <th>{t("date")}</th>
              <th>{t("pricee")}</th>
              <th>S. {t("pricee")}</th>
              <th>{t("minlengstay")}</th>
              <th>S.{t("minstay")}</th>
              <th>{t("actions")}</th>
            </TableRow>
          </TableHead>
          <tbody>
            {result.map((rental: any, index: any) => (
              <TableRow key={index}>
                <TableCell>{rental.date}</TableCell>
                <TableCell>${rental.price}</TableCell>
                <TableCell>
                  ${rental.suggestedPrice}{" "}
                  <EditButton onClick={() => handleMatchPrice(rental)}>
                    Match
                  </EditButton>
                </TableCell>
                <TableCell>{rental.min_length_of_stay} nights</TableCell>
                <TableCell>
                  {rental.suggestedMinimumStay}{" "}
                  <EditButton onClick={() => handleMinStay(rental)}>
                    Match
                  </EditButton>
                </TableCell>
                <ActionTableCell>
                  <EditButton onClick={() => handleEdit(rental)}>
                    {t("edit")}
                  </EditButton>

                  <IconLink to="">
                    <DeleteIcon sx={{ fontSize: "30px" }} />
                  </IconLink>
                </ActionTableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
      <Popup
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
        headerContent={<H2>Edit Item</H2>}
        bodyContent={
          <>
            {selectedItem && (
              <>
                <TextField
                  id="outlined-basic"
                  label="Date"
                  value={selectedItem?.date || ""}
                  variant="outlined"
                  fullWidth
                  sx={{ margin: "10px 0" }}
                />

                <TextField
                  id="outlined-basic"
                  label="Price"
                  type="number"
                  value={selectedItem?.price || ""}
                  onChange={(e: any) => {
                    setSelectedItem({
                      ...selectedItem,
                      price: parseFloat(e.target.value),
                    });
                  }}
                  variant="outlined"
                  fullWidth
                  sx={{ margin: "10px 0" }}
                />
                <TextField
                  id="outlined-basic"
                  label="Minimum length of stay"
                  type="number"
                  value={selectedItem?.min_length_of_stay || ""}
                  onChange={(e: any) => {
                    setSelectedItem({
                      ...selectedItem,
                      min_length_of_stay: parseInt(e.target.value),
                    });
                  }}
                  variant="outlined"
                  fullWidth
                  sx={{ margin: "10px 0" }}
                />
              </>
            )}
          </>
        }
        footerContent={<Button onClick={handleSave}>Save</Button>}
      />
    </TableAndDatepickerHolder>
  );
};

export default RentList;
