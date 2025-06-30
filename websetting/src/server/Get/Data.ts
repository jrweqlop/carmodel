import { instance } from "../server"

export const GetCar = async () => {
    const result = await instance.get('public-api').then((res) => {
        return res.data
    }).catch(() => {
        return []
    })
    return result
}

export const GetCarDev = async () => {
    const result = await instance.get('public-api/dev').then((res) => {
        return res.data
    }).catch(() => {
        return []
    })
    return result
}

export const PostBrand = async (data: object) => {
    const result = await instance.post('', data).then((res) => true).catch((e) => false)
    // if (!result) throw new error
    // return result
}

export const PostCarModel = async () => {

}

export const UploadImgCarModel = async () => {

}