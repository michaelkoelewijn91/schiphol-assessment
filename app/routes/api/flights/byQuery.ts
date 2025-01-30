import { filterFlightsByQuery } from "~/utils/utils";
import flights from "../data";
import type { Route } from "./+types/byQuery";

export async function loader({ request }: Route.LoaderArgs) {
    let url = new URL(request.url);
    let query = url.searchParams.get("q") || "";

    // Force empty response if length is <= 2 just to make sure
    if (query.length <= 2) {
        return Response.json([]);
    }

    const result = filterFlightsByQuery(flights, query);

    // Mock a 1-second delay to simulate slow connections
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return only the first 5 results
    return Response.json(result.slice(0, 5));
}
