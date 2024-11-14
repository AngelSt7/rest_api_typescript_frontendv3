import Swal from 'sweetalert2';
import { ActionFunctionArgs, redirect, useFetcher } from 'react-router-dom';
import { deleteProduct } from '../services/ProductService';

type AlertMessageProps = {
  id: number;
};

export async function action({ params }: ActionFunctionArgs) {
  const { id } = params
  id !== undefined ? await deleteProduct(+id as number) : redirect('/')
  return redirect('/'); 
}

export default function AlertMessage({ id }: AlertMessageProps) {
  const fetcher = useFetcher();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      fetcher.submit(null, {
        method: 'POST',
        action: `/productos/${id}/eliminar`,
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="border-2 border-customRed text-black rounded-lg w-full p-2 uppercase font-bold text-xs text-center hover:text-white hover:bg-customRed transition-all"
    >
      Eliminar
    </button>
  );
}
