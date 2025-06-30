import { CarModel } from "@prisma/client";

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