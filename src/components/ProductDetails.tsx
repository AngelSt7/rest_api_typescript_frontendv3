import { useFetcher, useNavigate } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import AlertMessage from "./AlertMessage"

type ProductDetailsProps = {
    product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {

    const fetcher = useFetcher()
    const navigate = useNavigate()
    const isAvailable = product.availability

    return (
        <tr className="border-b text-center">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">

                <fetcher.Form method="POST">
                    <button 
                        type="submit"
                        name="id"
                        value={product.id}
                        className={`border-2 text-black rounded-lg w-full p-2 uppercase font-bold text-xs text-center transition-all 
                            ${product.availability 
                              ? 'border-customRed hover:bg-customRed hover:text-white' 
                              : 'border-blue-950 hover:bg-blue-950 hover:text-white'}`}>
                        {isAvailable ? 'Disponible' : 'No disponible'}
                    </button>
                </fetcher.Form>

            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className=" flex gap-2 items-center">
                    <button
                        onClick={() => navigate(`/productos/${product.id}/editar`)}
                        className=" border-2 border-blue-950 text-black rounded-lg w-full p-2 uppercase font-bold text-xs text-center hover:bg-blue-950 hover:text-white transition-all"
                    >Editar</button>

                    <AlertMessage id={+product.id} />

                </div>
            </td>
        </tr>
    )
}
