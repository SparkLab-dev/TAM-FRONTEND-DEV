import { FC, useEffect, useState } from "react";

// components
import UserInfoBox from "./UserInfoBox/UserInfoBox.component";
import MessagesBox from "./MessagesBox/MessagesBox.component";
import HistoricalDataBox from "./HistoricalDataBox/HistoricalDataBox.component";
// import BookingBox from "./BookingBox/BookingBox.component";
import ApartmentBox from "./ApartmentBox/ApartmentBox.component";
import Footer from "Components/Footer/Footer.component";
// style
import {
  Page,
  Content,
  TopBox,
  BottomBox,
  // NextBookingBox,
  //  HistoricalDataBox,
} from "./style/Home.style";
import Example from "Components/Dashboard/Chart/Chart.component";
import PieChartComponent from "Components/Dashboard/PieChart/Piechart.component";
import HalfCircleChart from "Components/Dashboard/HalfCircleChart/Circlechart.component";
import axios from "axios";
import styled from "styled-components";
import { RootState } from "redux/store";
import { useSelector } from "react-redux";

const Test = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 1050px) {
    width: 100%;
  }
`;

const Testim = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 1050px) {
    width: 300px;
  }
`;
const TestimHolder = styled.div`
  width: 95%;
  display: flex;

  align-items: center;
  @media (max-width: 1050px) {
    width: 100%;
    display: block;
  }
`;

const Dropdown = styled.select`
  margin-top: 10px;
  padding: 5px;
`;

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

const Home: FC<{}> = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const [selectedOption, setSelectedOption] =
    useState<string>("plusthreemonths");
  const userId = user?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `http://192.168.10.210:8080/TAM/dashboard/${userId}/${selectedOption}`
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
    <Page>
      <Content>
        <TopBox>
          <Test>
            <Dropdown value={selectedOption} onChange={handleDropdownChange}>
              <option value="thismonth">This Month</option>
              <option value="nextmonth">Next Month</option>
              <option value="plusthreemonths">Next three months</option>
            </Dropdown>
            <h2>Nights/Portal</h2>
            <PieChartComponent
              data={
                Object.entries(data?.nightsPortalReport || {}).map(
                  ([name, value]) => ({ name, value })
                ) || []
              }
            />
          </Test>
          <Test>
            <h2>Occupancy</h2>
            <HalfCircleChart percentage={data?.occupancyPercentage || 0} />
            <h3>{data?.occupancyPercentage || 0}%</h3>
          </Test>
          <Testim>
            <h2>Occupancy & Revenue</h2>
            <TestimHolder>
              <Example data={chartData} />
            </TestimHolder>
          </Testim>
        </TopBox>

        <BottomBox>
          <UserInfoBox />

          <ApartmentBox />

          <MessagesBox />
          <HistoricalDataBox />
        </BottomBox>
      </Content>
      <Footer />
    </Page>
  );
};

export default Home;
