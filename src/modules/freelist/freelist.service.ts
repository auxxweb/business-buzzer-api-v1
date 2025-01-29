import bcrypt from 'bcryptjs'
import CreateFreeList from './freelist.interface.js'
import FreeList from './freelist.model.js'
import { generateAPIError } from '../../errors/apiError.js'
import { errorMessages } from '../../constants/messages.js'
import { ObjectId } from '../../constants/type.js'
import { hashValue } from '../../modules/business/business.utils.js'
import { generateToken } from 'utils/auth.utils.js'

const freeListSignup = async (userData: CreateFreeList): Promise<any> => {
  try {
    const {
      name,
      brandName,
      logo,
      address,
      contactDetails,
      description,
      enconnectUrl,
      images,
      password,
      category
    } = userData
    const hashedPassword = await hashValue(password ?? '', 10)

    const freelist = await FreeList.create({
      name,
      brandName,
      logo,
      address,
      contactDetails,
      description,
      enconnectUrl,
      images,
      category,
      password: hashedPassword,
    })

    return {
      _id: freelist?._id,
      name: freelist?.name,
      brandName: freelist?.brandName,
      logo: freelist?.logo,
      address: freelist?.address,
      contactDetails: freelist?.contactDetails,
      description: freelist?.description,
      enconnectUrl: freelist?.enconnectUrl,
      images: freelist?.images,
      catetory:freelist?.category
    }
  } catch (error) {
    console.error(error)
  }
}

const freelistLogin = async ({
  email = '',
  password = '',
}: {
  email: string
  password: string
}): Promise<any> => {
  const freeList = await FreeList.findOne({
    isDeleted: false,
    email: email?.trim(),
  })

  if (freeList == null) {
    return await generateAPIError(errorMessages.freeListNotFound, 400)
  }

  const comparePassword = await bcrypt.compare(
    password,
    freeList?.password ?? '',
  )

  if (!comparePassword) {
    return await generateAPIError(errorMessages.invalidCredentials, 400) // changed from 401 to 404 to fix frontend issue with redirect to login page
  }

  return {
    token: await generateToken({
      id: String(freeList?._id),
    }),
  }
}

const updateFreeList = async (
  freeListId: string,
  updateData: Partial<CreateFreeList>,
): Promise<any> => {
  const freeList = await FreeList.findOne({
    isDeleted: false,
    _id: new ObjectId(freeListId),
  })

  if (freeList == null) {
    return await generateAPIError(errorMessages.freeListNotFound, 400)
  }

  return await FreeList.findOneAndUpdate(
    {
      isDeleted: false,
      _id: new ObjectId(freeListId),
    },
    {
      ...(updateData?.name !== null && {
        name: updateData?.name,
      }),
      ...(updateData?.brandName !== null && {
        brandName: updateData?.brandName,
      }),
      ...(updateData?.logo !== null && {
        logo: updateData?.logo,
      }),
      ...(updateData?.address !== null && {
        address: updateData?.address,
      }),
      ...(updateData?.contactDetails !== null && {
        contactDetails: updateData?.contactDetails,
      }),
      ...(updateData?.description !== null && {
        description: updateData?.description,
      }),
      ...(updateData?.enconnectUrl !== null && {
        enconnectUrl: updateData?.enconnectUrl,
      }),
      ...(updateData?.images !== null && {
        images: updateData?.images,
      }),
      ...(updateData?.category !== null && {
        category: updateData?.category,
      }),
    },
  )
}

// Adjust the path based on your file structure

const getAllFreelistMain = async ({
  query,
}: {
  query: { page: number; limit: number }
}): Promise<any> => {
  try {
    const { page, limit } = query

    // Calculate skip value for pagination
    const skip = (page - 1) * limit

    // Fetch documents with pagination and filter out isDeleted items
    const data = await FreeList.find({ isDeleted: { $ne: true } })
      .skip(skip)
      .limit(limit)
      .lean()

    // Return the fetched data
    return data
  } catch (error) {
    // Handle errors
    throw new Error(`Error fetching freelist: ${error?.message}`)
  }
}

const getAllFreelist = async (): Promise<any> => {
  try {
    // Fetch all documents from the 'FreeList' collection
    const data = await FreeList.find({ isDeleted: { $ne: true } }).lean()
    return data
  } catch (error) {
    // Handle errors
    throw new Error(`Error fetching freelist: ${error.message}`)
  }
}
const getAllTrashFreelist = async (): Promise<any> => {
  try {
    // Fetch all documents from the 'FreeList' collection
    const data = await FreeList.find({ isDeleted: { $ne: false } }).lean()
    return data
  } catch (error) {
    // Handle errors
    throw new Error(`Error fetching freelist: ${error.message}`)
  }
}

const deleteBusinessByAdmin = async (businessId: string): Promise<any> => {
  const business: any = await FreeList.findOne({
    _id: new ObjectId(businessId),
    isDeleted: false,
  })
  if (business == null) {
    return await generateAPIError(errorMessages.userNotFound, 404)
  }

  return await FreeList.findOneAndUpdate(
    {
      _id: new ObjectId(businessId),
      isDeleted: false,
    },
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  )
}

const unDeleteBusinessByAdmin = async (businessId: string): Promise<any> => {
  const business: any = await FreeList.findOne({
    _id: new ObjectId(businessId),
    isDeleted: true,
  })

  if (business == null) {
    return await generateAPIError(errorMessages.userNotFound, 404)
  }

  return await FreeList.findOneAndUpdate(
    {
      _id: new ObjectId(businessId),
      isDeleted: true,
    },
    {
      isDeleted: false,
    },
    {
      new: true,
    },
  )
}

export const freeListService = {
  freeListSignup,
  getAllFreelist,
  deleteBusinessByAdmin,
  unDeleteBusinessByAdmin,
  getAllTrashFreelist,
  getAllFreelistMain,
  freelistLogin,
  updateFreeList,
}
