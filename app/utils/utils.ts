import { DateTime } from "luxon";
import type { Flight } from "~/routes/api/data";

export type SortingType = "ascending" | "descending";

/**
 * Sorts an array of flights based on their scheduled date and expected time.
 *
 * This function parses flight date and time into a DateTime object (in the "Europe/Amsterdam" timezone),
 * then sorts the flights in either ascending or descending order.
 *
 * @param {Flight[]} data - An array of flight objects to be sorted.
 * @param {SortingType} sort - The sorting order ('ascending' or 'descending').
 * @returns {Flight[]} - A sorted array of flights.
 */

export const sortFlights = (data: Flight[], sort: SortingType) => {
    return data?.sort((a, b) => {
        const flightDateTimeA = DateTime.fromFormat(`${a.date} ${a.expectedTime}`, "yyyy-MM-dd HH:mm", {
            zone: "Europe/Amsterdam",
        });
        const flightDateTimeB = DateTime.fromFormat(`${b.date} ${b.expectedTime}`, "yyyy-MM-dd HH:mm", {
            zone: "Europe/Amsterdam",
        });

        const comparison = flightDateTimeA.toMillis() - flightDateTimeB.toMillis();

        // If sort is ascending, return as is; if descending, reverse the comparison
        return sort === "ascending" ? comparison : -comparison;
    });
};

/**
 * Groups flights by their scheduled date.
 *
 * This function organizes flights into groups based on their date,
 * creating an array of objects where each object represents a date
 * and contains an array of flights scheduled for that date.
 *
 * @param {Flight[]} data - An array of flight objects to be grouped.
 * @returns {{ date: string; flights: Flight[] }[]} - An array of grouped flights by date.
 */

export const groupFlights = (data: Flight[]) => {
    return data?.reduce((acc, flight) => {
        const flightDate = flight.date;

        // Check if the date already exists in the accumulator
        let dateGroup = acc.find((group) => group.date === flightDate);

        // If not, create a new group for that date
        if (!dateGroup) {
            dateGroup = { date: flightDate, flights: [] };
            acc.push(dateGroup);
        }

        // Add the flight to the corresponding date group
        dateGroup.flights.push(flight);

        return acc;
    }, [] as { date: string; flights: Flight[] }[]);
};

/**
 * Filters a list of flights based on a search query.
 *
 * This function searches for flights where either the airport name (case-insensitive)
 * or the flight number contains the provided query.
 *
 * @param {Array} flights - An array of flight objects.
 * @param {string} query - The search term to filter flights by.
 * @returns {Array} - An array of flights that match the search criteria.
 */

export const filterFlightsByQuery = (flights: Flight[], query: string) => {
    return flights.filter((flight) => {
        return flight.airport.toLowerCase().includes(query.toLowerCase()) || flight.flightNumber.includes(query);
    });
};
