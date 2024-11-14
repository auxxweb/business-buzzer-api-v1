import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { bannerService } from "./banner.service.js";
const createBanner = errorWrapper(async (req, res, next) => {
  const data = await bannerService.createBanner({
    ...req.body,
  });
  return responseUtils.success(res, {
    data,
    status: 201,
  });
});
const deleteBanner = errorWrapper(async (req, res, next) => {
  const data = await bannerService.deleteBanner(req.params?.id);
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const updateBanner = errorWrapper(async (req, res, next) => {
  const data = await bannerService.updateBanner(req.params?.id, {
    ...req.body,
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const getAllBanners = errorWrapper(async (req, res, next) => {
  const query = {
    isDeleted: false,
  };
  const data = await bannerService.getAllBanners({
    query: {
      ...query,
    },
    options: {
      sort: { createdAt: -1 },
    },
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
export { createBanner, getAllBanners, deleteBanner, updateBanner };
