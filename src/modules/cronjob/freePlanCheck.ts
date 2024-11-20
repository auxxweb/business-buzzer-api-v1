import { getPaginationOptions } from "../../utils/pagination.utils.js";
import Business from "../../modules/business/business.model.js";
import { isValidityExpired } from "../../modules/business/business.utils.js";

const checkFreePlan = async (): Promise<void> => {
  const limit = 10; // Number of items per page
  let page = 1; // Start from the first page
  let hasMoreData = true; // Flag to indicate if there's more data to process

  while (hasMoreData) {
    // Get pagination options for the current page
    const paginationOptions = getPaginationOptions({
      limit,
      page,
    });

    // Fetch a single page of businesses
    const businesses: any[] = await Business.find(
      { isDeleted: false },
      null, // Select all fields
      { ...paginationOptions },
    );

    if (businesses.length === 0) {
      // If no more businesses are returned, exit the loop
      hasMoreData = false;
      break;
    }

    // Process the businesses for the current page
    const updates = businesses.map(async (business) => {
      if (await isValidityExpired(business?.createdAt)) {
        business.isInFreeTrail = false;
      } else {
        business.isInFreeTrail = true;
      }
      return business.save(); // Save the updated business
    });

    // Wait for all updates to complete for the current page
    await Promise.all(updates);

    // Move to the next page
    page++;
  }

  console.log("All businesses have been checked and updated.");
};

export { checkFreePlan };
