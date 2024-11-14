import { Form, useActionData, redirect, useNavigate, LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import { ActionFunctionArgs } from "react-router-dom"
import { getProductsById } from '../services/ProductService'
import { Product } from '../types'
import { updateProduct } from '../services/ProductService'
import ProductForm from '../components/ProductForm'

const availabilityOptions = [
  { name: 'Disponible', value: true },
  { name: 'No Disponible', value: false }
]

// Loader
export async function loader({ params }: LoaderFunctionArgs) {

  const { id } = params
  if (id !== undefined) {
    const product = await getProductsById(+id)
    if (!product) {
      redirect('/')
    }
    return product
  }
}

// Action
export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  if (Object.values(data).includes('')) {
    return 'Todos los campos son obligatorios';
  }

  const { id } = params
  
  id !== undefined ? await updateProduct(data, +id) : redirect('/')

  return redirect('/');
}

export default function EditProduct() {

  const navigate = useNavigate()
  const product = useLoaderData() as Product
  let error = useActionData() as string

  return (
    <>
      <div className="flex justify-between flex-col md:flex-row">
        <h2 className="text-4xl font-black text-slate-800 text-center md:text-left mb-4 md:mb-0 ">Editar Producto</h2>
        <button
          onClick={() => navigate('/')}
          className=" rounded-md text-center bg-customGreen p-3 text-sm font-bold text-white shadow-sm hover:bg-customGreenHover transition-colors"
        >
          Ir a Inicio
        </button>

      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form
        className="mt-10 w-full mx-auto"
        method="POST"
      >

        <ProductForm product={product} />

        <div className="mb-4">
          <label
            className="text-gray-800"
            htmlFor="availability"
          >Disponibilidad:</label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50 focus:outline-none"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map(option => (
              <option key={option.name} value={option.value.toString()}>{option.name}</option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          className="mt-5 w-full bg-blue-900 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Guardar Cambios"
        />
      </Form>
    </>
  )
}
