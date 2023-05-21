// import { response } from "express";
import { axiosInstance } from "./axiosInstance";
import { message } from "antd";

//add new product

export const AddProduct = async (payload) => {
    try {
        const response = await axiosInstance.post(
            "/api/products/add-product",
            payload            
        );
        return response.data
    } catch (error) {
        return error.message
    }
};


// get all products

export const GetProducts = async (filters) => {
    try {
        const response = await axiosInstance.post(
            "/api/products/get-products", filters);
        console.log("response", response)
            return response.data
    } catch (error) {
        return error.message
    }
}


// edit a product

export const EditProduct = async (id, payload) => {
    try {
        const response = await axiosInstance.put(
            `/api/products/edit-product/${id}`,
            payload
        );
        return response.data
    } catch (error) {
        return error.message
    }
}

// delete product

export const DeleteProduct = async (id) => {
    try {
        const response = await axiosInstance.delete(
            `/api/products/delete-product/${id}`
        )
        return response.data
    } catch (error) {
        return error.message
    }
}


// upload product image

export const UploadProductImage = async (payload) => {
    try {
        const response = await axiosInstance.post(
            "/api/products/upload-image-to-product",
            payload
        )
        // console.log("response", response.data)
        return response.data
    } catch (error) {
        // console.log("response", error.message)
        return error.message
    }
}


//update product status

export const UpdateProductStatus = async (id, status) => {
    try {
        const response = await axiosInstance.put(
            `/api/products/update-product-status/${id}`, { status }
        )
        return response.data
    } catch (error) {
        return error.message
    }
}

//get product by id
export const GetProductById = async (id) => {
    try {
        const response = await axiosInstance.get(
            `/api/products/get-product-by-id/${id}`
        )
        return response.data
    } catch (error) {
        return error.message
    }
}


//place a new bid

export const PlaceNewBid = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/bids/place-new-bid", payload)
        return response.data
    } catch (error) {
        return error.message
    }
}

//get all bid

export const getAllBids = async (filters) => {
    try {
        const response = await axiosInstance.post("/api/bids/get-all-bids", filters);
        return response.data
    } catch (error) {
        return error.message
    }
}










