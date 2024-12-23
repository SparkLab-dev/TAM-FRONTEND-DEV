import { FC, useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";

//style
import {
  CancelReservationButton,
  CancelReservationButtonHolder,
  Container,
  Label,
  List,
  ListItem,
  Section,
  Table,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from "./style/ReservationDetail.style";

//mui
import { TableCell } from "@mui/material";
const reservationsData = {
  status: {
    value: "Success",
    id: 0,
  },
  responseID: "0123456789ABCDEF0123456789ABCDEF",
  reservation: {
    reservationID: 123,
    statusID: 1,
    createdDate: "2022-02-25 09:43:22",
    lastMod: "2022-03-01 10:10:02",
    stayInfos: [
      {
        propertyID: 1,
        xmlApartmentID: "Ext. ID. 1",
        dateFrom: "2022-05-29",
        dateTo: "2022-05-31",
        arrivalTime: "2022-05-29 09:12:00",
        numberOfGuests: 4,
        costs: {
          ruPrice: 1120.06,
          clientPrice: 1120.06,
          alreadyPaid: 50.0,
        },
        resApaID: 1,
        mapping: {
          reservationID: 123,
          stayID: 123,
          hotelID: 123,
          roomID: 123,
          rateID: 123,
        },
        reservationBreakdown: {
          ruBreakdown: {
            dayPrices: [
              {
                date: "2022-05-29",
                rent: 244.99,
                price: 265.49,
                taxes: [
                  {
                    alreadyIncluded: false,
                    amount: 0.5,
                    name: "City tax",
                    feeTaxType: 5,
                  },
                  {
                    alreadyIncluded: false,
                    amount: 0.5,
                    name: "City tax",
                    feeTaxType: 5,
                  },
                ],
                fees: [
                  {
                    alreadyIncluded: false,
                    amount: 20.0,
                    name: "Pet fee",
                    feeTaxType: 29,
                  },
                ],
              },
              {
                date: "2022-05-30",
                rent: 244.99,
                price: 265.49,
                taxes: [
                  {
                    alreadyIncluded: false,
                    amount: 0.5,
                    name: "City tax",
                    feeTaxType: 5,
                  },
                ],
                fees: [
                  {
                    alreadyIncluded: false,
                    amount: 20.0,
                    name: "Pet fee",
                    feeTaxType: 29,
                  },
                ],
              },
              {
                date: "2022-05-31",
                rent: 244.99,
                price: 265.49,
                taxes: [
                  {
                    alreadyIncluded: false,
                    amount: 0.5,
                    name: "City tx",
                    feeTaxType: 5,
                  },
                ],
                fees: [
                  {
                    alreadyIncluded: false,
                    amount: 20.0,
                    name: "Pet ee",
                    feeTaxType: 29,
                  },
                ],
              },
            ],
            totalFeeTaxes: [
              {
                alreadyIncluded: false,
                amount: 3.5,
                name: "City tax",
                feeTaxType: 5,
              },
              {
                alreadyIncluded: false,
                amount: 140.0,
                name: "Pet fee",
                feeTaxType: 29,
              },
              {
                alreadyIncluded: false,
                amount: 241.59,
                name: "VAT",
                feeTaxType: 2,
              },
            ],
            total: 1120.06,
            rent: 734.97,
          },
          channelBreakdown: {
            dayPrices: [
              {
                date: "2022-05-29",
                rents: [
                  {
                    amount: 236.9,
                    currency: "USD",
                    name: "Room",
                  },
                ],
                taxes: [
                  {
                    amount: 15.2,
                    currency: "USD",
                    name: "Room",
                  },
                  {
                    amount: 12.08,
                    currency: "USD",
                    name: "Surcharge",
                  },
                ],
                fees: [
                  {
                    amount: 12.92,
                    currency: "USD",
                    name: "Surcharge",
                  },
                ],
                price: 277.1,
              },
              {
                date: "2022-05-30",
                rents: [
                  {
                    amount: 255.3,
                    currency: "USD",
                    name: "Room",
                  },
                ],
                taxes: [
                  {
                    amount: 11.64,
                    currency: "USD",
                    name: "Room",
                  },
                ],
                fees: [],
                price: 266.94,
              },
              {
                date: "2022-05-31",
                rents: [
                  {
                    amount: 236.9,
                    currency: "USD",
                    name: "Room",
                  },
                ],
                taxes: [
                  {
                    amount: 11.64,
                    currency: "USD",
                    name: "Room",
                  },
                ],
                fees: [],
                price: 248.54,
              },
            ],
            channelTotalFeeTax: [
              {
                includedInChannelTotal: true,
                amount: 50.7,
                currency: "USD",
                name: "Room",
                itemType: "Tax",
              },
              {
                includedInChannelTotal: true,
                amount: 12.08,
                currency: "USD",
                name: "Surcharge",
                itemType: "Tax",
              },
              {
                includedInChannelTotal: true,
                amount: 12.92,
                currency: "USD",
                name: "Surcharge",
                itemType: "Fee",
              },
            ],
            channelTotal: 804.08,
            channelRent: 729.1,
          },
          channelCommission: 210.0,
        },
      },
    ],
    cancellationPolicyInfo: {
      policyText:
        "Full refund until 11 days before arrival. 50% charge from 4 to 10 days before arrival. 100% charge from 0 to 3 days before arrival.",
      cancellationPolicies: [
        {
          validFrom: 0,
          validTo: 3,
          percentage: 100,
        },
        {
          validFrom: 4,
          validTo: 10,
          percentage: 50,
        },
      ],
    },
    customerInfo: {
      name: "Test",
      surName: "Test",
      email: "test.test@test.com",
      phone: "+11 111 111 111",
      skypeID: "test.test",
      address: "Street 1/2",
      zipCode: "00-000",
      countryID: 42,
      languageID: 2,
    },
    guestDetailsInfo: {
      numberOfAdults: 2,
      numberOfChildren: 2,
      numberOfInfants: 3,
      childrenAges: [12, 9, 2, 2, 1],
      numberOfPets: 1,
    },
    creator: "test@test.test",
    cancelTypeID: 1,
    archived: false,
  },
};
const ReservationDetail: FC<{}> = () => {
  const navigate = useNavigate();
  const [reservationData, setReservationData] = useState<any>(null);

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
        `https://109f-95-107-162-162.ngrok-free.app/TAM/reservation/getReservation/${reservationID}`
      );
      setReservationData(response.data);
      console.log(response.data);
      console.log(reservationData);
    } catch (error) {
      console.error("Error fetching reservation details:", error);
    }
  };

  const handleCancelReservation = async () => {
    try {
      await axios.put(
        "https://109f-95-107-162-162.ngrok-free.app/TAM/reservation/cancelReservation",
        {
          reservationID: reservationId,
          cancellationType: 1,
        }
      );
      alert("Reservation canceled successfully!");
      navigate("/reservation");
    } catch (error) {
      console.error("Failed to cancel reservation:", error);
      alert("Failed to cancel reservation. Please try again.");
    }
  };
  return (
    <Container>
      {reservationsData && (
        <>
          <CancelReservationButtonHolder>
            <CancelReservationButton onClick={handleCancelReservation}>
              Cancel
            </CancelReservationButton>
          </CancelReservationButtonHolder>
          <Section>
            <Title>Reservation Overview</Title>
            <List>
              <ListItem>
                <Label>Creator: </Label>
                {dayjs(reservationsData.reservation.createdDate).format(
                  "YYYY-MM-DD"
                )}
              </ListItem>
              <ListItem>
                <Label>Created Date: </Label>
                {reservationsData.reservation.creator}
              </ListItem>
              <ListItem>
                <Label>Last Modified: </Label>
                {dayjs(reservationsData.reservation.lastMod).format(
                  "YYYY-MM-DD"
                )}
              </ListItem>
            </List>
          </Section>
          <Section>
            {reservationsData && (
              <>
                <Title>Customer Information</Title>
                <List>
                  <ListItem>
                    <Label>Name: </Label>
                    {reservationsData.reservation.customerInfo.name}
                  </ListItem>
                  <ListItem>
                    <Label>Surname: </Label>
                    {reservationsData.reservation.customerInfo.surName}
                  </ListItem>
                  <ListItem>
                    <Label>Email: </Label>
                    {reservationsData.reservation.customerInfo.email}
                  </ListItem>
                  <ListItem>
                    <Label>Phone: </Label>
                    {reservationsData.reservation.customerInfo.name}
                  </ListItem>
                  <ListItem>
                    <Label>Address: </Label>
                    {reservationsData.reservation.customerInfo.address}
                  </ListItem>
                  <ListItem>
                    <Label>Zip Code: </Label>
                    {reservationsData.reservation.customerInfo.zipCode}
                  </ListItem>
                </List>
              </>
            )}
          </Section>
          <Section>
            {reservationsData && (
              <>
                <Title>Guest Information</Title>
                <List>
                  <ListItem>
                    <Label>Number of adults: </Label>
                    {
                      reservationsData.reservation.guestDetailsInfo
                        ?.numberOfAdults
                    }
                  </ListItem>
                  <ListItem>
                    <Label>Number of children: </Label>
                    {
                      reservationsData.reservation.guestDetailsInfo
                        ?.numberOfChildren
                    }
                  </ListItem>
                  <ListItem>
                    <Label>Number of infants: </Label>
                    {
                      reservationsData.reservation.guestDetailsInfo
                        ?.numberOfInfants
                    }
                  </ListItem>
                  <ListItem>
                    <Label>Children ages: </Label>
                    {reservationsData.reservation.guestDetailsInfo?.childrenAges.join(
                      ", "
                    )}
                  </ListItem>
                  <ListItem>
                    <Label>Number of pets: </Label>
                    {
                      reservationsData.reservation.guestDetailsInfo
                        ?.numberOfPets
                    }
                  </ListItem>
                </List>
              </>
            )}
          </Section>
          <Section>
            {reservationsData.reservation.stayInfos.map(
              (stay: any, index: any) => (
                <div key={index}>
                  <Title>Stay Information</Title>
                  <List>
                    <ListItem>
                      <Label>Date From: </Label>
                      {stay.dateFrom}
                    </ListItem>
                    <ListItem>
                      <Label>Date To: </Label>
                      {stay.dateTo}
                    </ListItem>
                    <ListItem>
                      <Label>Arrival Time: </Label> {stay.arrivalTime}
                    </ListItem>
                    <ListItem>
                      <Label>Number of guests: </Label> {stay.numberOfGuests}
                    </ListItem>
                  </List>
                  <Title>Costs</Title>
                  <List>
                    <ListItem>
                      <Label>RU Price: </Label>
                      {stay.costs.ruPrice}$
                    </ListItem>
                    <ListItem>
                      <Label>Client Price: </Label>
                      {stay.costs.clientPrice}$
                    </ListItem>
                    <ListItem>
                      <Label>Already Paid: </Label>
                      {stay.costs.alreadyPaid}$
                    </ListItem>
                    <ListItem>
                      <Label>Rent: </Label>
                      {stay.reservationBreakdown.ruBreakdown.rent}$
                    </ListItem>
                    <ListItem>
                      <Label>Total price: </Label>
                      {stay.reservationBreakdown.ruBreakdown.total}$
                    </ListItem>
                  </List>
                  <Title>Day Prices</Title>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Date</TableHeaderCell>
                        <TableHeaderCell>Rents</TableHeaderCell>
                        <TableHeaderCell>Price</TableHeaderCell>
                        <TableHeaderCell>Taxes</TableHeaderCell>
                        <TableHeaderCell>Fees</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <tbody>
                      {stay.reservationBreakdown.ruBreakdown.dayPrices.map(
                        (day: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell>{day.date}</TableCell>
                            <TableCell>${day.rent.toFixed(2)}</TableCell>
                            <TableCell>${day.price.toFixed(2)}</TableCell>
                            <TableCell>
                              {day.taxes.map((tax: any, taxIndex: number) => (
                                <div key={taxIndex}>
                                  {tax.name}: ${tax.amount.toFixed(2)}
                                </div>
                              ))}
                            </TableCell>
                            <TableCell>
                              {day.fees.map((fee: any, feeIndex: number) => (
                                <div key={feeIndex}>
                                  {fee.name}: ${fee.amount.toFixed(2)}
                                </div>
                              ))}
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </tbody>
                  </Table>
                  <Title>Total Fee Taxes</Title>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Amount</TableHeaderCell>
                        <TableHeaderCell>Type</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <tbody>
                      {stay.reservationBreakdown.ruBreakdown.totalFeeTaxes.map(
                        (feeTaxes: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell>{feeTaxes.name}</TableCell>
                            <TableCell>{feeTaxes.amount}$</TableCell>
                            <TableCell>{feeTaxes.feeTaxType}</TableCell>
                          </TableRow>
                        )
                      )}
                    </tbody>
                  </Table>
                  <Title>Channel Day Prices</Title>
                  <List>
                    <ListItem>
                      <Label>Total amount of channel: </Label>
                      {stay.reservationBreakdown.channelBreakdown.channelTotal}
                    </ListItem>
                    <ListItem>
                      <Label>Total rent of channel: </Label>
                      {stay.reservationBreakdown.channelBreakdown.channelRent}
                    </ListItem>
                    <ListItem>
                      <Label>Channel commission: </Label>
                      {stay.reservationBreakdown.channelCommission}
                    </ListItem>
                  </List>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Date</TableHeaderCell>
                        <TableHeaderCell>Rents</TableHeaderCell>
                        <TableHeaderCell>Taxes</TableHeaderCell>
                        <TableHeaderCell>Fees</TableHeaderCell>
                        <TableHeaderCell>Price</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <tbody>
                      {stay.reservationBreakdown.channelBreakdown.dayPrices.map(
                        (channelDay: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell>{channelDay.date}</TableCell>
                            <TableCell>
                              {channelDay.rents.map(
                                (rents: any, rentIndex: number) => (
                                  <div key={rentIndex}>
                                    {rents.name}: {rents.amount}{" "}
                                    {rents.currency}
                                  </div>
                                )
                              )}
                            </TableCell>
                            <TableCell>
                              {channelDay.taxes.map(
                                (tax: any, taxIndex: number) => (
                                  <div key={taxIndex}>
                                    <div>
                                      {tax.name}: {tax.amount} {tax.currency}
                                    </div>
                                  </div>
                                )
                              )}
                            </TableCell>
                            <TableCell>
                              {channelDay.fees.map(
                                (fees: any, feesIndex: number) => (
                                  <div key={feesIndex}>
                                    <div>
                                      {fees.name}: {fees.amount} {fees.currency}
                                    </div>
                                  </div>
                                )
                              )}
                            </TableCell>
                            <TableCell>
                              ${channelDay.price.toFixed(2)}
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </tbody>{" "}
                  </Table>
                  <Title>Chanel Total Fee Taxes</Title>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Amount</TableHeaderCell>
                        <TableHeaderCell>Currency</TableHeaderCell>
                        <TableHeaderCell>Type</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <tbody>
                      {stay.reservationBreakdown.channelBreakdown.channelTotalFeeTax.map(
                        (chanelFeeTaxes: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell>{chanelFeeTaxes.name}</TableCell>
                            <TableCell>{chanelFeeTaxes.amount}$</TableCell>
                            <TableCell>{chanelFeeTaxes.currency}</TableCell>
                            <TableCell>{chanelFeeTaxes.itemType}</TableCell>
                          </TableRow>
                        )
                      )}
                    </tbody>
                  </Table>
                </div>
              )
            )}
          </Section>
          <Section>
            {reservationsData && (
              <>
                <Title>Policy Information</Title>
                <List>
                  <ListItem>
                    <Label>Text: </Label>
                    {
                      reservationsData.reservation.cancellationPolicyInfo
                        ?.policyText
                    }
                  </ListItem>
                </List>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Valid From</TableHeaderCell>
                      <TableHeaderCell>Valid To</TableHeaderCell>
                      <TableHeaderCell>Percentage</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <tbody>
                    {reservationsData.reservation.cancellationPolicyInfo?.cancellationPolicies.map(
                      (policy: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{policy.validFrom}</TableCell>
                          <TableCell>{policy.validTo}</TableCell>
                          <TableCell>{policy.percentage}%</TableCell>
                        </TableRow>
                      )
                    )}
                  </tbody>
                </Table>
              </>
            )}
          </Section>
        </>
      )}
    </Container>
  );
};

export default ReservationDetail;
