import { filterFlightsByQuery, groupFlights, sortFlights } from "./utils";

const flightData = [
    {
        flightIdentifier: "D20190401UA969",
        flightNumber: "UA 969",
        airport: "San Francisco",
        date: "2022-02-23",
        expectedTime: "14:50",
        originalTime: "14:50",
        url: "/en/departures/flight/D20190401UA969/",
        score: "70.55272",
    },
    {
        flightIdentifier: "D20190401UA989",
        flightNumber: "UA 989",
        airport: "San Francisco",
        date: "2022-02-24",
        expectedTime: "14:50",
        originalTime: "14:50",
        url: "/en/departures/flight/D20190401UA989/",
        score: "71.53476",
    },
    {
        flightIdentifier: "D20190401BA2761",
        flightNumber: "BA 2761",
        airport: "London Gatwick",
        date: "2022-02-23",
        expectedTime: "14:40",
        originalTime: "14:40",
        url: "/en/departures/flight/D20190401BA2761/",
        score: "155.64577",
    },
    {
        flightIdentifier: "D20190401VY8379",
        flightNumber: "VY 8379",
        airport: "Santiago Com",
        date: "2022-02-22",
        expectedTime: "15:55",
        originalTime: "15:55",
        url: "/en/departures/flight/D20190401VY8379/",
        score: "62.708916",
    },
];

it("Should sort flights early to late (asc) based on date and expectedTime", () => {
    const sortedFlights = sortFlights(flightData, "ascending");
    const sortedDateTime = sortedFlights.map((f) => `${f.date} ${f.expectedTime}`);
    expect(sortedDateTime).toEqual(["2022-02-22 15:55", "2022-02-23 14:40", "2022-02-23 14:50", "2022-02-24 14:50"]);
});
it("Should sort flights early to late (desc) based on date and expectedTime", () => {
    const sortedFlights = sortFlights(flightData, "descending");
    const sortedDateTime = sortedFlights.map((f) => `${f.date} ${f.expectedTime}`);
    expect(sortedDateTime).toEqual(["2022-02-24 14:50", "2022-02-23 14:50", "2022-02-23 14:40", "2022-02-22 15:55"]);
});

it("Should filter flights by query and return only flight VY 8379", () => {
    const filteredFlights = filterFlightsByQuery(flightData, "VY 8379");
    expect(filteredFlights).toEqual([
        {
            flightIdentifier: "D20190401VY8379",
            flightNumber: "VY 8379",
            airport: "Santiago Com",
            date: "2022-02-22",
            expectedTime: "15:55",
            originalTime: "15:55",
            url: "/en/departures/flight/D20190401VY8379/",
            score: "62.708916",
        },
    ]);
});

it("Should group flights by date", () => {
    const groupedFlights = groupFlights(flightData).map((group) => {
        return {
            ...group,
            flights: group.flights.map((flight) => `${flight.date} ${flight.expectedTime}`),
        };
    });
    expect(groupedFlights).toEqual([
        { date: "2022-02-24", flights: ["2022-02-24 14:50"] },
        {
            date: "2022-02-23",
            flights: ["2022-02-23 14:50", "2022-02-23 14:40"],
        },
        { date: "2022-02-22", flights: ["2022-02-22 15:55"] },
    ]);
});
