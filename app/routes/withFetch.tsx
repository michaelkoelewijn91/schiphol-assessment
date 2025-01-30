import { useCallback, useEffect, useState, type ChangeEventHandler } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { useDebouncedCallback } from "use-debounce";
import Flights from "~/components/flights";
import { IconSearch } from "~/components/icons";
import RadioInput from "~/components/radioInput";
import SelectInput from "~/components/selectInput";
import TextInput from "~/components/textInput";
import type { SortingType } from "~/utils/utils";
import type { Route } from "./+types/withRouteFetcher";
import type { Flight } from "./api/data";

const MIN_INPUT_LENGTH = 3;

export function meta({}: Route.MetaArgs) {
    return [{ title: "Fetch example" }, { name: "description", content: "Welcome to React Router!" }];
}

export default function WithFetch() {
    const [value, setValue] = useState<string>("");
    const [flights, setFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [sortingMethod, setSortingMethod] = useState<SortingType>("ascending");

    const debounced = useDebouncedCallback((value) => {
        setValue(value);
    }, 500);

    const onSortingChange = useCallback<ChangeEventHandler<HTMLSelectElement>>((event) => {
        setSortingMethod(event.target.value as SortingType); // Handle the selected value
    }, []);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);

                const request = await fetch(`api/flights/byQuery?q=${value}`, { method: "GET" });
                const result = await request.json();
                setFlights(result);
            } catch {
                // Handle errors
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [value]);

    return (
        <main className="pb-14">
            <section className="py-20 bg-afternoon-blue">
                <div className="container grid grid-cols-2 items-center">
                    <h1 className="text-7xl font-bold text-white">
                        Geniet van
                        <br />
                        je reis<span className="text-seebuyfly-yellow">.</span>
                    </h1>
                    <form className="p-6 bg-white rounded-xl w-full max-w-[500px]">
                        <h2 className="font-bold text-4xl text-gradient-pink">Vind een vlucht</h2>
                        <div className="flex gap-8 mt-4 mb-4">
                            {[
                                { id: "departure", label: "Vertrek" },
                                { id: "arrival", label: "Aankomst" },
                            ].map((flightType) => (
                                <RadioInput key={`radio-${flightType.id}`} {...flightType} checked={flightType.id === "departure"} />
                            ))}
                        </div>

                        <div className="flex flex-col gap-2">
                            <SelectInput>
                                <SelectInput.Option value="today">Vandaag</SelectInput.Option>
                            </SelectInput>
                            <TextInput onChange={(e) => debounced(e.target.value)} icon={<IconSearch />} />
                        </div>
                    </form>
                </div>
            </section>

            {value.length >= MIN_INPUT_LENGTH && (
                <section className="container pt-12">
                    <div className="flex justify-end items-center gap-4">
                        <span className="font-bold">Sorteer</span>
                        <SelectInput value={sortingMethod} onChange={onSortingChange}>
                            <SelectInput.Option value="ascending">Vroege vluchten eerst</SelectInput.Option>
                            <SelectInput.Option value="descending">Late vluchten eerst</SelectInput.Option>
                        </SelectInput>
                    </div>

                    <Flights data={flights} sort={sortingMethod} loading={loading} />
                </section>
            )}
        </main>
    );
}
