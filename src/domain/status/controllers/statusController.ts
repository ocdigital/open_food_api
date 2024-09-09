import { Request, Response } from "express";
import { getApiStatusService } from "../services/statusService";

export const getApiStatus = async (req: Request, res: Response) => {
    const status = await getApiStatusService();
    res.json(status);
}