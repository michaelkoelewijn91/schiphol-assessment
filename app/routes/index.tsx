import { useCallback, useState, type ChangeEvent, type ChangeEventHandler } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { useFetcher } from "react-router";
import { useDebouncedCallback } from "use-debounce";
import Flights from "~/components/flights";
import { IconSearch } from "~/components/icons";
import RadioInput from "~/components/radioInput";
import SelectInput from "~/components/selectInput";
import TextInput from "~/components/textInput";
import type { SortingType } from "~/utils/utils";
import type { Route } from "./+types";

const MIN_INPUT_LENGTH = 3;

export function meta({}: Route.MetaArgs) {
    return [{ title: "React router Fetcher example" }, { name: "description", content: "Welcome to React Router!" }];
}

export default function WithRouteFetcher() {
    const fetcher = useFetcher();
    const [inputValue, setInputValue] = useState<string>("");
    const [sortingMethod, setSortingMethod] = useState<SortingType>("ascending");

    const debouncedSubmit = useDebouncedCallback((form: HTMLFormElement, value: string) => {
        if (value.length >= MIN_INPUT_LENGTH) {
            // Fetch data from api route
            fetcher.submit(form);
        } else {
            // Revert fetcher data back to an empty array
            fetcher.load(`/api/flights/byQuery`);
        }
    }, 500);

    const onChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const form = event.currentTarget.form;
            if (!form) return;

            const value = event.currentTarget.value;
            setInputValue(value);
            debouncedSubmit(form, value);
        },
        [debouncedSubmit]
    );

    const onSortingChange = useCallback<ChangeEventHandler<HTMLSelectElement>>((event) => {
        setSortingMethod(event.target.value as SortingType); // Handle the selected value
    }, []);

    return (
        <main className="pb-14">
            <section className="py-20 bg-afternoon-blue">
                <div className="container grid grid-cols-2 items-center">
                    <h1 className="text-7xl font-bold text-white">
                        Geniet van
                        <br />
                        je reis<span className="text-seebuyfly-yellow">.</span>
                    </h1>
                    <form method="GET" action="/api/flights/byQuery" className="p-6 bg-white rounded-xl w-full max-w-[500px]">
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
                            <SelectInput onChange={() => {}}>
                                <SelectInput.Option value="today">Vandaag</SelectInput.Option>
                            </SelectInput>
                            <TextInput onChange={onChange} icon={<IconSearch />} />
                        </div>
                    </form>
                </div>
            </section>

            {inputValue.length >= MIN_INPUT_LENGTH && (
                <section className="container pt-12">
                    <div className="flex justify-end items-center gap-4">
                        <span className="font-bold">Sorteer</span>
                        <SelectInput value={sortingMethod} onChange={onSortingChange} testId="sort">
                            <SelectInput.Option value="ascending">Vroege vluchten eerst</SelectInput.Option>
                            <SelectInput.Option value="descending">Late vluchten eerst</SelectInput.Option>
                        </SelectInput>
                    </div>

                    <Flights data={fetcher.data} sort={sortingMethod} loading={fetcher.state === "loading"} />
                </section>
            )}
        </main>
    );
}
