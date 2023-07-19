namespace ISaveCertificate {
    export type Body = {
        template: string;
        images: ICertificateImage[];
        texts: ICertificateText[];
    };
    export type Data = ApiResponse<ICertificate>;
}

namespace IGetCertificate {
    export type Data = ApiResponse<ICertificate>;
}
