import { Brand, CarModel, ModelGroup } from "@prisma/client";

export interface CustomView {
    brand: string;
    model: {
        [modelCode: string]: {
            name: string;
            path: string;
        }[];
    }[];
}


export interface CarmodelView extends CarModel {
    modelGroup: {
        code: string
    }
}

export interface CustomBrand extends Brand {
    ModelGroup: CustomModelGroup[]
}

export interface CustomModelGroup extends ModelGroup {
    CarModel: CarModel[]
}

export interface User {
    userId: number
    username: string,
    password: string
}