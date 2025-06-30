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