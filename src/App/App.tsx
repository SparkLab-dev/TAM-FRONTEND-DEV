import { FC } from "react";

import {} from "./style/App.style";
import ResetPassword from "Pages/Reset Password/ResetPassword";
import Login from "Pages/Login/Login.component";
import AuthPage from "Pages/Auth/Auth";
import Verification from "Pages/SecondStepAuth/SecondStep.component";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ForgetPassword from "../Pages/ChangePassword/ForgetPassword.component";
import Register from "../Pages/Register/Register.component";
import SavePasword from "../Pages/savePassword/SavePassword.component";
import ApartmentPage from "Pages/ApartmentPage/ApartmentPage.component";
import ApartmentCard from "Pages/ApartmentCard/ApartmentCard.component";
import MonthTable from "Pages/CalendarReservations/calendar";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import Modal from "Components/Modal/Modal.component";
import RentList from "Components/RentList/RentList.component";
import MessagePage from "Components/MessagePage/MessagePage.component";
import Home from "Pages/Home/Home.component";
import Authenticated from "Pages/Authenticated/Authenticated.page";
import UserProfile from "Pages/Profile/Profile.component";
import ChatComponent from "Components/OpenAIAssistant/OpenAIAssistant.component";
import GradientPage from "Pages/CheckinPage/checkin.component";
import Example from "Components/Dashboard/Chart/Chart.component";
import GetSuggestedPrice from "Components/GetSuggestedPrice/GetSuggestedPrice.component";
import AddOption from "Components/AddOptions/AddOptions.component";
import YourComponent from "Components/MinStayLogic/ShowMinStay.component";

import RulesFAQ from "Components/RulesFAQ/FAQRules.component";
import ClientAmenities from "Components/AutoCheckin/AutoCheckin.cpomponent";
import CheckinPage from "Components/CheckinFolder/CheckinPage";
import HomepageTest from "Components/HomeComponents/links";
import LoginPage from "Pages/Login/LoginPage";
import MultiActionAreaCard from "Components/websiteCards/website.component";
import RegisterPage from "Pages/Register/RegisterPage";
import Template1 from "Components/websiteCards/template1";
import MediaCard from "Pages/Reservations/reservations";
// import ParentComponent from "Pages/CheckinApprove/parent";
import Card from "Pages/CheckinApprove/SingleCheckinPage";
import CheckInsTable from "Pages/CheckinApprove/parent";
import OnlineCheckin from "Pages/CheckinPage/checkinonline.component";
import CheckinPageOnline from "Components/CheckinFolder/CheckinPageOnline";
import ReservationDetail from "Pages/ReservationDetail/ReservationDetail.component";
import ApartmentSearch from "Pages/NewTest/newTest";
import ApartmentSearch1 from "Components/AddOptions/AddOptions.component";
import ReservationsTable from "Pages/ReservationsNFT/reservationsNFT";
import Alloggiati from "Components/AlloggiatiWeb/Alloggiati.component";
import GuestForm from "Components/CheckinFolder/SecondStepCheckin";
import FirstOnlineCheckinForm from "Components/CheckinFolder/FirstStepOnline";
import OnlineGuestForm from "Components/CheckinFolder/CheckinFormOnline.component";
import PropertCreate from "Pages/PropertyCreate";
import ReservationForm from "Pages/NewBooking/NewBooking";

// import MyCalendar from "Components/ApartmentCalendar/ApartmentCalendar.component";

const App: FC<{}> = () => {
  const isAuthenticated: boolean = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  // const isAuthenticated : boolean = true;
  const verify = useSelector(
    (state: RootState) => state.auth.user?.registredInSmoobu
  );
  console.log(verify);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {isAuthenticated ? (
            <Route path="/" element={<Authenticated />}>
              <>
                <Route path="/" element={<Home />} />
                <Route path="apartmentpage" element={<ApartmentPage />} />
                <Route path="forgetpassword" element={<ForgetPassword />} />
                <Route path="propertycreate" element={<PropertCreate />} />
                <Route path="new/:id" element={<ApartmentCard />} />
                <Route path="modal" element={<Modal />} />
                <Route path="alloggiati" element={<Alloggiati />} />
                <Route path="calendar" element={<MonthTable />} />
                <Route path="home" element={<HomepageTest />} />
                <Route path="hometest" element={<HomepageTest />} />
                <Route path="userprofile" element={<UserProfile />} />
                <Route path="resetpassword" element={<ResetPassword />} />
                <Route path="chat" element={<ChatComponent />} />
                <Route path="chart" element={<Example data={[]} />} />
                <Route path="minstay" element={<YourComponent />} />
                <Route path="/add/:apartmentId" element={<AddOption />} />
                <Route path="/websites" element={<MultiActionAreaCard />} />
                <Route path="/website/template1" element={<Template1 />} />
                <Route path="/reservation" element={<MediaCard />} />
                <Route
                  path="reservationDetail/:id"
                  element={<ReservationDetail />}
                />
                <Route path="/newreservation" element={<ReservationForm />} />

                <Route
                  path="reservationDetail/:id"
                  element={<ReservationDetail />}
                />
                <Route path="/singlecheckin/:id" element={<Card />} />
                <Route path="/allcheckins" element={<CheckInsTable />} />
                <Route path="/apartmentsearch" element={<ApartmentSearch />} />
                <Route
                  path="/apartmentsearchh"
                  element={<ApartmentSearch1 />}
                />
                <Route path="/nft" element={<ReservationsTable />} />
                <Route path="rentlist" element={<RentList rentalData={[]} />} />
                <Route path="messagepage" element={<MessagePage />} />
                <Route path="form" element={<GetSuggestedPrice />} />
                <Route path="*" element={<Navigate to="home" replace />} />
              </>
            </Route>
          ) : (
            <Route path="/" element={<AuthPage />}>
              <Route path="propertycreate" element={<PropertCreate />} />
              <Route path="/" element={<LoginPage />} index />
              <Route path="/login" element={<LoginPage />} index />
              <Route path="/loginpage" element={<LoginPage />} />
              <Route path="/checkinpage" element={<CheckinPage />} />
              <Route path="/steptwo" element={<GuestForm />} />
              <Route path="/onlinesteptwo" element={<OnlineGuestForm />} />
              <Route
                path="/onlinecheckinpage"
                element={<CheckinPageOnline />}
              />
              <Route path="/rulesFaq" element={<RulesFAQ />} />
              <Route path="/register" element={<RegisterPage />} />{" "}
              <Route path="tam/registration/:token" element={<SavePasword />} />
              <Route path="/kyc/:id" element={<GradientPage />} />
              <Route path="/kyc/:token/:token/" element={<OnlineCheckin />} />
              <Route path="/apartmentAmenities" element={<ClientAmenities />} />
              <Route path="/tttt" element={<FirstOnlineCheckinForm />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
