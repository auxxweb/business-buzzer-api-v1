import { FilterQuery, PipelineStage } from "mongoose";
import CreateFreeList from "./freelist.interface.js";
import FreeList from "./freelist.model.js";
import { QueryOptions } from "aws-sdk/clients/cloudsearchdomain.js";
import { generateAPIError } from "../../errors/apiError.js";
import { errorMessages } from "../../constants/messages.js";
import { ObjectId } from "../../constants/type.js";

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
    } = userData;

    const freelist = await FreeList.create({
        name,
        brandName,
        logo,
        address,
        contactDetails,
        description,
        enconnectUrl,
        images
    });
    
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
    };
} catch (error) {
    console.error(error);
}
};

// Adjust the path based on your file structure


const getAllFreelistMain = async ({
    query,
  }: {
    query: { page: number; limit: number };
  }): Promise<any> => {
    try {
      const { page, limit } = query;
  
      // Calculate skip value for pagination
      const skip = (page - 1) * limit;
  
      // Fetch documents with pagination and filter out isDeleted items
      const data = await FreeList.find({ isDeleted: { $ne: true } })
        .skip(skip)
        .limit(limit)
        .lean();
  
      // Return the fetched data
      return data;
    } catch (error: any) {
      // Handle errors
      throw new Error(`Error fetching freelist: ${error.message}`);
    }
  };
  



const getAllFreelist = async (): Promise<any> => {
    try {
      // Fetch all documents from the 'FreeList' collection
      const data = await FreeList.find({ isDeleted: { $ne: true } }).lean();
      return data;
    } catch (error:any) {
      // Handle errors
      throw new Error(`Error fetching freelist: ${error.message}`);
    }
  };
  const getAllTrashFreelist = async (): Promise<any> => {
    try {
      // Fetch all documents from the 'FreeList' collection
      const data = await FreeList.find({ isDeleted: { $ne: false } }).lean();
      return data;
    } catch (error:any) {
      // Handle errors
      throw new Error(`Error fetching freelist: ${error.message}`);
    }
  };


  const deleteBusinessByAdmin = async (businessId: string): Promise<any> => {
    const business: any = await FreeList.findOne({
      _id: new ObjectId(businessId),
      isDeleted: false,
    })
    if (business == null) {
      return await generateAPIError(errorMessages.userNotFound, 404);
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
    );
  };


  
const unDeleteBusinessByAdmin = async (businessId: string): Promise<any> => {
    const business: any = await FreeList.findOne({
      _id: new ObjectId(businessId),
      isDeleted: true,
    })
  
    if (business == null) {
      return await generateAPIError(errorMessages.userNotFound, 404);
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
    );
  };



export const freeListService = {
   freeListSignup,
   getAllFreelist,
   deleteBusinessByAdmin,
   unDeleteBusinessByAdmin,
   getAllTrashFreelist,
   getAllFreelistMain
  };