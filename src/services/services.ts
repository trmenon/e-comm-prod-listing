import { fetchCall } from "../utilz";
import { constants } from "../constants/constants";

const getAllProductsService = ()=> 
    fetchCall(
        `/products`,
        constants?.request_methods?.GET,
        {},
    );

const getProductByIdServices = (id: string)=> 
    fetchCall(
        `/products/${id}`,
        constants?.request_methods?.GET,
        {},
    );

export {
    getAllProductsService,
    getProductByIdServices
}