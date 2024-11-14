import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <>
        <header className=" bg-slate-800">
            <div className="w-11/12 max-w-[1200px] mx-auto py-10">
                <h1 className="text-4xl font-extrabold text-white text-center md:text-left">
                    Administrador de productos
                </h1>
            </div>
        </header>

        <main className="w-11/12 max-w-[1000px] mx-auto mt-10 p-4 md:p-10 custom-shadow">
            <Outlet />
        </main>

    </>
  )
}
