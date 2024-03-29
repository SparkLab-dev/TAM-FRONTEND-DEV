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
// import MyCalendar from "Components/ApartmentCalendar/ApartmentCalendar.component";


const App: FC<{}> = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
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
              {verify ? (
                <>
                  <Route path="/" element={<Home />} /> 
                  <Route path="apartmentpage" element={<ApartmentPage />} />
                  <Route path="forgetpassword" element={<ForgetPassword />} />
                  <Route path="apartmentcard/:id" element={<ApartmentCard />} />
                  <Route path="modal" element={<Modal />} />
                  <Route path="calendar" element={<MonthTable />} />
                  <Route path="home" element={<Home />} />
                  <Route path="userprofile" element={<UserProfile />} />
                  <Route path="resetpassword" element={<ResetPassword/>} />
                  <Route path="chat" element={<ChatComponent/>} />
                  <Route path="chart" element={<Example data={[]}/>} />
                  <Route path="minstay" element={<YourComponent/>} />
                  <Route path="/add/:apartmentId" element={<AddOption />}  />
                  <Route
                    path="rentlist"
                    element={<RentList rentalData={[]} />}
                  />
                  <Route path="messagepage" element={<MessagePage />} />
                  <Route path="form" element={<GetSuggestedPrice/>} />
                  <Route
                    path="*"
                    element={<Navigate to="home" replace />}
                  />
                </>
              ) : (
                <>
                  <Route path="verify" element={<Verification />} />
                  <Route path="*" element={<Navigate to="verify" replace />} />
                </>
              )}
            </Route>
          ) : (
            <Route path="/" element={<AuthPage />}>
              <Route path="/" element={<Login />} index />
              <Route path="/login" element={<Login />} index />
              
              <Route path="/checkinpage" element={<CheckinPage />}/>
              <Route path="/rulesFaq" element={<RulesFAQ />}/>
              <Route path="/register" element={<Register />} />{" "}
              <Route path="tam/registration/:token" element={<SavePasword />} />
              <Route path="/kyc/:token/:token/:token" element={<GradientPage/>}/>
              <Route path="/apartmentAmenities" element={<ClientAmenities/>}/>
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
