import { dbClient } from '../../prisma/client'

/**
 * 
 * @param {object} user 
 * @returns 
 */
export const saveUser = async (user) => {
    return await dbClient.user.create({
        data: user,
    })
}
/**
 * 
 * @param {string} searchKey 
 * @param {string} searchValue 
 * @returns 
 */
export const getUser = async (searchKey, searchValue) => {
    return await dbClient.user.findUniqueOrThrow({
        where: {
            [searchKey]: searchValue
        }
    })
}

export const getAllUsers = async () => {
    return await dbClient.user.findMany()

}
