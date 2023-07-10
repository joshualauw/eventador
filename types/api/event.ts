namespace IExploreEvent {
    export interface Query {
        keyword: string;
        location: string;
        category: string;
        start_price: number;
        end_price: number;
        start_date: Date | null;
        end_date: Date | null;
        wishlist: boolean;
    }

    export type Data = ApiResponse<
        Pick<IEvent, "_id" | "name" | "price" | "banner" | "category" | "location" | "capacity" | "start_date">[]
    >;
}

namespace IUserEvents {
    export type Data = ApiResponse<{
        managed: (Pick<IEvent, "_id" | "name" | "capacity"> & { publicity: string; total_participants: number })[];
        attended: (Pick<IEvent, "_id" | "name" | "capacity"> & { publicity: string; total_participants: number })[];
    }>;
}

namespace ICreateEvent {
    export interface Body {
        name: string;
        start_date: string;
        category: string;
    }

    export type Data = ApiResponse<IEvent>;
}
