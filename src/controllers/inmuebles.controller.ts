import catchAsync from "../utils/catchAsync";
import {inmuebleService} from "../services";

const consultarAreaPorId = catchAsync(async (req, res) => {
    const response = await inmuebleService.obtenerAreaPorId(req.body);
    res.send(response);
})

export default {
    consultarAreaPorId,
}