import { FilterQuery, QueryOptions } from "mongoose";
import Lead from "./review.model.js";

const createLead = async (leadData: {
  name: string;
  rating: number;
  review: string;
}): Promise<any> => {
  return await Lead.create(leadData);
};

const getAllLeads = async ({
  query,
  options,
}: {
  query: FilterQuery<typeof Lead>;
  options: QueryOptions;
}): Promise<any> => {
  const [data, totalCount] = await Promise.all([
    Lead.find(query, {}, options),
    Lead.countDocuments(query),
  ]);

  return { data, totalCount };
};

export const leadService = {
  createLead,
  getAllLeads,
};
