import { Request, Response } from "express";
import { Dean } from "../../model/official.deans";

export const getDeans = async (req: Request, res: Response) => {
  try {
    const deans = await Dean.find().select("-DeanId -dob");
    res.status(200).jsonp({
      status: "success",
      deans,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err || "An error occurred during fetching Deans.",
    });
  }
};
