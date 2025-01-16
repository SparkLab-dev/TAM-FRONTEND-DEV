import React, { useState } from "react";
import axios from "axios";

interface Room {
  picture: string | null;
  amenities: string[];
}

interface Apartment {
  apartmentName: string;
  avgRatingLabel: string | null;
  avgRatingLocalized: string | null;
  price: string;
  priceDescription: string;
  pricePerNight: string;
  numberOfNights: string;
  latitude: number;
  longitude: number;
  rooms: Room;
}

interface ApiResponse {
  minPrice: string;
  maxPrice: string;
  avgPrice: string;
  apartments: Apartment[];
}

const ApartmentSearch: React.FC = () => {
  const [checkin, setCheckin] = useState<string>("");
  const [checkout, setCheckout] = useState<string>("");
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);
  const [lat1, setLat1] = useState<number>(0);
  const [lat2, setLat2] = useState<number>(0);
  const [long1, setLong1] = useState<number>(0);
  const [long2, setLong2] = useState<number>(0);
  const [data, setData] = useState<ApiResponse | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get<ApiResponse>("https://393e-95-107-162-162.ngrok-free.app/Study/apartment", {
        params: {
          checkin,
          checkout,
          adults,
          children,
          infants,
          lat1,
          lat2,
          long1,
          long2,
          // cursor:
          //   "yJzZWN0aW9uX29mZnNldCI6MCwiaXRlbXNfb2Zmc2V0IjowLCJ2ZXJzaW9uIjoxfQ%3D%3D",
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const thStyles = {
    border: "1px solid black",
    padding: "8px",
    backgroundColor: "#4f734c",
    color: "white",
  };

  const tdStyles = {
    border: "1px solid black",

    padding: "8px",
  };
  const containerStyles = {
    width: "800px",
    height: "100vh",
    marginTop: "100px",
    overflowY: "scroll" as "scroll",
  };

  const formStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    marginBottom: "20px",
    backgroundColor: "#4f734c",
    padding: "20px",
    borderRadius: "20px",
    color: "white",
    fontSize: "15px",
    fontFamily: "poppins",
    fontWeight: 400,
  };

  const buttonContainerStyles = {
    gridColumn: "span 3",
    display: "flex",
    justifyContent: "center",
    padding: "5px",
  };

  const inputStyles = {
    height: "20px",
    borderRadius: "4px",
    display: "flex",
  };

  const buttonStyles = {
    width: "120px",
    height: "31px",
    fontSize: "17px",
    borderRadius: "10px",
    backgroundColor: "white",
    fontFamily: "poppins",
    fontWeight: 400,
    border: "none",
    cursor: "pointer",
  };

  return (
    <div style={{ width: "800px", height: "100vh", marginTop: "150px" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchData();
        }}
        style={formStyles}
      >
        <label>
          Checkin:
          <input type="date" value={checkin} style={inputStyles} onChange={(e) => setCheckin(e.target.value)} />
        </label>
        <label>
          Checkout:
          <input type="date" value={checkout} style={inputStyles} onChange={(e) => setCheckout(e.target.value)} />
        </label>
        <label>
          Adults:
          <input type="number" value={adults} style={inputStyles} onChange={(e) => setAdults(Number(e.target.value))} />
        </label>
        <label>
          Children:
          <input
            type="number"
            value={children}
            style={inputStyles}
            onChange={(e) => setChildren(Number(e.target.value))}
          />
        </label>
        <label>
          Infants:
          <input
            type="number"
            value={infants}
            style={inputStyles}
            onChange={(e) => setInfants(Number(e.target.value))}
          />
        </label>
        <label>
          Latitude 1:
          <input type="number" value={lat1} style={inputStyles} onChange={(e) => setLat1(Number(e.target.value))} />
        </label>
        <label>
          Latitude 2:
          <input type="number" value={lat2} style={inputStyles} onChange={(e) => setLat2(Number(e.target.value))} />
        </label>
        <label>
          Longitude 1:
          <input type="number" value={long1} style={inputStyles} onChange={(e) => setLong1(Number(e.target.value))} />
        </label>
        <label>
          Longitude 2:
          <input type="number" value={long2} style={inputStyles} onChange={(e) => setLong2(Number(e.target.value))} />
        </label>
        <div style={buttonContainerStyles}>
          <button style={buttonStyles} type="submit">
            Search
          </button>
        </div>
      </form>

      {data && (
        <table>
          <thead>
            <tr>
              <th style={thStyles}>Name of the Room</th>
              <th style={thStyles}>Airbnb Rating</th>
              <th style={thStyles}>Coordinates</th>
              <th style={thStyles}>Price per Night</th>
              <th style={thStyles}>Total Price</th>
              {/* <th>Amenities</th> */}
            </tr>
          </thead>
          <tbody>
            {data.apartments.map((apartment, index) => (
              <tr key={index}>
                <td style={tdStyles}>{apartment.apartmentName}</td>
                <td style={tdStyles}>{apartment.avgRatingLocalized ?? "No rating"}</td>
                <td style={tdStyles}>{`Lat: ${apartment.latitude}, Long: ${apartment.longitude}`}</td>
                <td style={tdStyles}>{apartment.pricePerNight}</td>
                <td style={tdStyles}>{apartment.price}</td>
                {/* <td>
                  <ul>
                    {apartment.rooms.amenities.map((amenity, i) => (
                      <li key={i}>{amenity}</li>
                    ))}
                  </ul>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApartmentSearch;
