import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserInfoBox from "Pages/Home/UserInfoBox/UserInfoBox.component";
import Example from "Components/Dashboard/Chart/Chart.component";
import HalfCircleChart from "Components/Dashboard/HalfCircleChart/Circlechart.component";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import axios from "axios";
import PieChartComponent from "Components/Dashboard/PieChart/Piechart.component";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  display: flex;
  margin-top: 50px;
  @media (max-width: 768px) {
    margin-top: 1550px;
    width: 500px;
    margin-left: -100px;
  }
  @media (max-width: 500px) {
    margin-top: 1550px;
    width: 500px;
    margin-left: -270px;
  }
`;

const Content = styled.div`
  display: flex;
  width: 100vw;
  flex-wrap: wrap;
  margin-left: 250px;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Box = styled.div<{ width: number; height: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;

  margin: 10px;

  border: 1px solid black;
  border-radius: 12px;
  border-color: #e6e6e6;
  @media (max-width: 768px) {
    width: 300px;
  }
`;
const Box2 = styled.div`
  width: 820px;
  height: 312px;

  margin: 10px;

  border: 1px solid black;
  border-radius: 12px;
  border-color: #e6e6e6;
  @media (max-width: 768px) {
    width: 300px;
    height: 800px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`;

const CardContainer = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 20px;
`;

const Text = styled.div`
  font-size: 18px;
  text-align: center;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  color: grey;
`;

const Button = styled.button`
  background-color: #4f734c;
  color: white;
  text-align: center;
  padding: 10px;
  border-radius: 4px;
  border: none;
  font-family: roboto;
  font-weight: 500;
  font-size: 14px;

  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    background-color: #50a164;
  }
  //  @media (max-width: 768px) {
  //   font-size: 10px;
  //   width:50px;
  // }
`;
const Dropdown = styled.select`
  margin-top: 10px;
  padding: 5px;
  height: 30px;
  margin-right: 10px;
`;
const DIV = styled.div`
  display: flex;
  justify-content: space-around;
  @media (max-width: 768px) {
    flex-direction: column;
    display: flex;
    align-items: center;
  }
`;
// Component for the homepage
interface NightsPortalReport {
  name: string;
  value: number;
}

interface OccupancyRevenueData {
  month: string;
  data: {
    revenue: number;
    occupancy: number;
  };
}

interface ApiResponse {
  nightsPortalReport: NightsPortalReport;
  occupancyPercentage: number;
  occupancyRevenueReport: OccupancyRevenueData[];
}
const HomepageTest: React.FC = () => {
  const navigate = useNavigate();
  const newMessagesHandler = () => navigate("/messagepage");
  const propertiesHandler = () => navigate("/apartmentpage");
  const calendarHandler = () => navigate("/calendar");
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const [selectedOption, setSelectedOption] = useState<string>("thismonth");
  const userId = user?.id;
  const { t } = useTranslation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `http://192.168.10.153:8080/TAM/dashboard/${userId}/${selectedOption}`
        );
        setData(response.data);
        console.log(data);
      } catch (error) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, selectedOption]);

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedOption(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const chartData =
    data?.occupancyRevenueReport.map((item) => ({
      name: item.month,
      revenue: item.data.revenue,
      occupancy: item.data.occupancy,
    })) || [];
  console.log("Chart Data:", chartData);
  
  return (
    <Container>
      <Content>
        {/* First row */}
        <Box width={277} height={312}>
          <h2 style={{ paddingLeft: "10px" }}>{t("nightsportal")}</h2>
          <PieChartComponent
            data={
              Object.entries(data?.nightsPortalReport || {}).map(
                ([name, value]) => ({ name, value })
              ) || []
            }
          />
        </Box>
        <Box width={277} height={312}>
          <h2 style={{ paddingLeft: "10px" }}>{t("occupancy")}</h2>
          <HalfCircleChart percentage={data?.occupancyPercentage || 0} />
        </Box>
        <Box width={522} height={312}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 style={{ paddingLeft: "10px" }}>{t("occupancyrevenue")}</h2>
            <Dropdown value={selectedOption} onChange={handleDropdownChange}>
              <option value="thismonth">{t("thismonth")}</option>
              <option value="nextmonth">{t("nextmonth")}</option>
              <option value="plusthreemonths">{t("next3months")}</option>
            </Dropdown>
          </div>
          <Example data={chartData} />
        </Box>
        {/* Second row */}
        <Box2>
          <h2 style={{ paddingLeft: "10px" }}>{t("nightsportal")}</h2>
          <DIV>
            <CardContainer>
              <Text>{t("properties")}</Text>
              <IconContainer>
                <ApartmentOutlinedIcon fontSize="large" />
              </IconContainer>
              <Button onClick={propertiesHandler}>{t("gotoproperties")}</Button>
            </CardContainer>
            <CardContainer>
              <Text>{t("messages")}</Text>
              <IconContainer>
                <EmailOutlinedIcon fontSize="large" />
              </IconContainer>
              <Button onClick={newMessagesHandler}>{t("gotomessages")}</Button>
            </CardContainer>
            <CardContainer>
              <Text>{t("historicaldata")}</Text>
              <IconContainer>
                <CalendarMonthOutlinedIcon fontSize="large" />
              </IconContainer>
              <Button onClick={calendarHandler}>{t("gotocalendar")}</Button>
            </CardContainer>
          </DIV>
        </Box2>
        <Box width={277} height={312}>
          <h2 style={{ marginLeft: "10px" }}>{t("profile")}</h2>
          <UserInfoBox />{" "}
        </Box>
      </Content>
    </Container>
  );
};

export default HomepageTest;
