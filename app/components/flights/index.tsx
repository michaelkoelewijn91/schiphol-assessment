import { DateTime } from "luxon";
import { useMemo } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router";
import type { Flight } from "~/routes/api/data";
import { groupFlights, sortFlights, type SortingType } from "~/utils/utils";
import { ArrowRight } from "../icons";

export default function Flights({ data, sort, loading }: { data: Flight[]; sort: SortingType; loading: boolean }) {
    const sortedFlights = useMemo(() => sortFlights(data, sort), [data, sort]);
    const groupedFlights = useMemo(() => groupFlights(sortedFlights), [data, sort]);

    if (loading) {
        return (
            <div className="mt-24">
                <SkeletonTheme>
                    {[0, 1, 2, 3]?.map((row) => (
                        <div key={`skeleton-${row}`} className="flex flex-col gap-8 mb-22">
                            <Skeleton count={1} height={24} />
                            <Skeleton count={4} height={80} />
                        </div>
                    ))}
                </SkeletonTheme>
            </div>
        );
    }

    if (!data || data.length <= 0) return;

    return (
        <div className="flex flex-col gap-14 mt-10" data-testid="flight-results">
            {groupedFlights?.map((group) => {
                const flightDateFormatted = DateTime.fromFormat(group.date, "yyyy-MM-dd", { zone: "Europe/Amsterdam" });
                return (
                    <div key={`group-${group.date}`}>
                        <h3 className="mb-4 font-bold text-xl" data-testid="flightdate">
                            {flightDateFormatted.toLocaleString(DateTime.DATE_FULL)}
                        </h3>
                        <div className="flex gap-2 flex-col">
                            {group.flights?.map((flight) => {
                                return (
                                    <Link
                                        key={`flight-${flight.flightIdentifier}`}
                                        to="/"
                                        className="flex gap-4 bg-white p-4 rounded-md border border-grey-broken hover:bg-afternoon-blue group"
                                        data-testid="flight"
                                    >
                                        <span className="text-lg font-bold group-hover:text-white">{flight.expectedTime}</span>
                                        <div className="flex flex-col group-hover:text-white">
                                            <span className="text-lg font-bold text-morning-pink group-hover:text-white">
                                                {flight.airport}
                                            </span>
                                            <span className="font-light">{flight.flightNumber}</span>
                                        </div>
                                        <ArrowRight className="text-seebuyfly-yellow self-center ml-auto group-hover:text-white" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
