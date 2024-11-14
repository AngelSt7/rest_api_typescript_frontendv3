import { safeParse } from "valibot";
import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from "../types";
import axios from "axios";
import { toBoolean } from "../utils";

type ProductData = {
   [k: string]: FormDataEntryValue;
}

export async function addProduct(data : ProductData) {

    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })

        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products`

            let dataPost  = {
                name: result.output.name, 
                price: result.output.price
            }

            const response = await axios.post(url, dataPost)
            return response.status

        } else {
            throw new Error("Datos no válidos");
        }

    } catch (error) {
        console.log(error)
    }
}

export async function getProducts() {
    try {

        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data : {data} } = await axios(url)
        
        const result = safeParse(ProductsSchema, data)

        if(result.success){
            return result.output 
        } else {
            throw new Error("Hubo un error");
        }

    } catch (error) {
        console.log(error)
    }
}

export async function getProductsById(id : Product['id']) {
    try {

        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`

        const { data : {data} } = await axios(url)
        
        const result = safeParse(ProductSchema, data)

        if(result.success){
            return result.output 
        } else {
            throw new Error("Hubo un error");
        }

    } catch (error) {
        console.log(error)
    }
}

export async function updateProduct(data : ProductData, id : Product['id']) {
try {
    const editProduct = {
        id: id,
        name: data.name,
        price: +data.price,
        availability: toBoolean(data.availability.toString())
    }   

    const result = safeParse(ProductSchema, editProduct)

    if(result.success){
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.put(url, result.output)
    }

} catch (error) {
    console.log(error)
}
}


export async function deleteProduct(id : Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
}

export async function updateProductAvailability(id : Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }
}