import Lead from "./review.model.js";
const createLead = async (leadData) => {
    return await Lead.create(leadData);
};
const getAllLeads = async ({ query, options, }) => {
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
