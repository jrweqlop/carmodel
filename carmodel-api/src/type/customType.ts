export interface CustomView {
    brand: string;
    model: {
        [modelCode: string]: {
            name: string;
            path: string;
        }[];
    }[];
}
