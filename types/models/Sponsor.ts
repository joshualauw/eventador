interface ISponsor {
    _id: string;
    name: string;
    logo?: string;
    description: string;
    event_id: string;
    createdAt: string;
    updatedAt: string;
}

namespace IGetAllSponsor {
    export type Data = ApiResponse<ISponsor[]>;
}

namespace IGetOneSponsor {
    export type Data = ApiResponse<ISponsor>;
}

namespace ICreateSponsor {
    export type Body = { name: string; description: string; logo: File | null };
    export type Data = ApiResponse<ISponsor>;
}

namespace IUpdateSponsor {
    export type Body = { name: string; description: string; logo: File | null };
    export type Data = ApiResponse<ISponsor>;
}

namespace IDeleteSponsor {
    export type Data = ApiResponse<ISponsor>;
}
