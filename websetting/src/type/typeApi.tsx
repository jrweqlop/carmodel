interface BrandDefault {
    id: number;
    updatedAt: Date;
    createdAt: Date;
    name: string;
}

interface ModelGroupDefault {
    id: number;
    code: string;
    brandId: number;
    updatedAt: Date;
    createdAt: Date;
}

interface Brand {
    id: number;
    updatedAt: Date;
    createdAt: Date;
    name: string;
    ModelGroup: ModelGroup[]
}

interface ModelGroup {
    id: number;
    code: string;
    brandId: number;
    updatedAt: Date;
    createdAt: Date;
    CarModel: CarModel[]
}

interface CarModel {
    id: number;
    updatedAt: Date;
    createdAt: Date;
    name: string;
    imagePath: string;
    modelGroupId: number;
}


interface JsonViewData {
    brand: string;
    model: {
        [modelCode: string]: {
            name: string;
            path: string;
        }[];
    }[];
}

interface FormData {
    username: string
    password: string
};
interface TokenApi {
    access_token: string
}