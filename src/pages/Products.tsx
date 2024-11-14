import { ActionFunctionArgs, NavLink, useLoaderData } from "react-router-dom";
import { getProducts, updateProductAvailability } from "../services/ProductService";
import ProductDetails from "../components/ProductDetails";
import { Product } from "../types";

export async function loader() {
    const products = await getProducts()
    return products
}

export async function action({request} : ActionFunctionArgs) {
    const { id } = Object.fromEntries(await request.formData())
    await updateProductAvailability(+id)
    return {}
}

export default function Products() {
    const products = useLoaderData() as Product[]

    return (
        <>
            <div className="flex justify-between flex-col md:flex-row">
                <h2 className="text-4xl font-black text-slate-500 text-center md:text-left mb-4 md:mb-0 ">Productos</h2>
                <NavLink
                    to={"productos/nuevo"}
                    className=" rounded-md text-center bg-customGreen p-3 text-sm font-bold text-white shadow-sm hover:bg-customGreenHover transition-colors"
                >
                    Agregar Producto
                </NavLink>
            </div>

            <div className="p-2">
                <table className="w-full mt-5 table-auto">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th className="p-2">Producto</th>
                            <th className="p-2">Precio</th>
                            <th className="p-2">Disponibilidad</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <ProductDetails 
                            key={product.id}
                            product = {product}/>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
