import { BadRequestException } from "@nestjs/common"
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs"
import { unlink } from "fs/promises"

export const FileSetting = async (model: string, file: Express.Multer.File, currentPath: string): Promise<string> => {

    if (currentPath && currentPath !== '') {
        await unlinkSync(currentPath)
    }

    const { fieldname, originalname, mimetype, buffer, size } = file

    const path = `./public/car/${model}`
    const checkFile = existsSync(path)
    if (!checkFile) mkdirSync(path, { recursive: true })

    await writeFileSync(path + `/${originalname}`, buffer)

    // fieldname
    // originalname
    // encoding
    // mimetype
    // buffer
    // size
    const thisImagePath = `assets/images/car/${model}/${originalname}`

    return thisImagePath
}

export const DeleteFileImage = async (currentPath: string) => {
    if (currentPath && currentPath !== '') {
        // await unlinkSync(currentPath)
        const status = await unlink(currentPath).then(() => true).catch(() => false)
        return status
    }
    return false
}