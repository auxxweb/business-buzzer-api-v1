import { FilterQuery, PipelineStage } from "mongoose";
import CreateFreeList from "./freelist.interface.js";
import FreeList from "./freelist.model.js";
import { QueryOptions } from "aws-sdk/clients/cloudsearchdomain.js";

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

const getAllFreelist = async (): Promise<any> => {
    try {
      // Fetch all documents from the 'FreeList' collection
      const data = await FreeList.find().lean(); // Using lean() for better performance if no Mongoose methods will be used on the result
      return data;
    } catch (error:any) {
      // Handle errors
      throw new Error(`Error fetching freelist: ${error.message}`);
    }
  };

export const freeListService = {
   freeListSignup,
   getAllFreelist
  };