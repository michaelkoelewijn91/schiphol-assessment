import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/index.tsx"),
    route("withfetch", "routes/withFetch.tsx"),
    ...prefix("api", [...prefix("flights", [route("byQuery", "routes/api/flights/byQuery.ts")])]),
] satisfies RouteConfig;
