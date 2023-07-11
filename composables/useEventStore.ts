export default function useEventStore() {
    const exploreEventQuery = useState("exploreEventQuery", () => ({
        keyword: "",
        location: "",
        category: "",
        start_price: 0,
        end_price: 500000,
        start_date: null,
        end_date: null,
        wishlist: false,
    }));
    const eventDashboardId = useState<string>("eventDashboardId", () => "");

    async function getExploreEvents(query?: IExploreEvent.Query) {
        const res = await executeRequest<IExploreEvent.Data>("/event/explore", { method: "GET", query });
        return res.data;
    }

    async function getUserEvents() {
        const res = await executeRequest<IUserEvents.Data>("/event/user", { method: "GET" });
        return res.data;
    }

    async function createEvent(body: ICreateEvent.Body) {
        const res = await executeRequest<ICreateEvent.Data>("/event", { method: "POST", body });
        return res;
    }

    return { getExploreEvents, exploreEventQuery, eventDashboardId, getUserEvents, createEvent };
}
