import { NavLink, Form, useActionData, redirect } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import { ActionFunctionArgs } from "react-router-dom"
import { addProduct } from '../services/ProductService'
import ProductForm from '../components/ProductForm';

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  if (Object.values(data).includes('')) {
    return 'Todos los campos son obligatorios';
  }
  await addProduct(data);

  return redirect('/');
}

export default function NewProduct() { 
  let error = useActionData() as string

  return (
    <>
      <div className="flex justify-between flex-col md:flex-row">
        <h2 className="text-4xl font-black text-slate-800 text-center md:text-left mb-4 md:mb-0 ">Registrar Producto</h2>
        <NavLink
          to={"/"}
          className=" rounded-md text-center bg-customGreen p-3 text-sm font-bold text-white shadow-sm hover:bg-customGreenHover transition-colors"
        >
          Registrar Producto
        </NavLink>

      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form
        className="mt-10 w-full mx-auto"
        method="POST"
      >
        
        <ProductForm />

        <input
          type="submit"
          className="mt-5 w-full bg-blue-900 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  )
}
