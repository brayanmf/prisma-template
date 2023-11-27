import prisma from "../client";
import ApiError from "../utils/apiError";
import httpStatus from "http-status";

const obtenerAreaPorId = async (id: number): Promise<any> => {
    const area = prisma.area.findUnique({
        where: {Id: 3},
    });
    if (!area) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
    }
    return area;
};
export default {
    obtenerAreaPorId
};