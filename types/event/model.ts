interface IEvent extends BaseModel {
    name: string;
    description: string;
    category: string;
    start_date: string;
    banner?: string;
    gallery: string[];
    price: number;
    capacity: number;
    overview: string;
    location?: IEventLocation;
    discussion: IDiscussion;
    certificate: ICertificate;
    reports: IReport[];
    user_id: string;
    is_published: boolean;
    is_deleted: boolean;
}

interface IEventLocation {
    name: string;
    venue: string;
    latitude: number;
    longitude: number;
}
