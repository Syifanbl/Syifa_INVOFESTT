import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="grid grid-cols-2 item-center min-h-screen">
           
            <div className="bg-white h-screen flex flex-col items-center justify-center">
            <img 
              src="https://www.invofest-harkatnegeri.com/assets/Maskot-Hero.png" 
                alt="" 
                className="w-96" 
                        /> 
                <h2  className="text-2xl mb-6 text-center text-red-900"
                >Informatika Vocational Festival</h2>
            </div>

        
            <div className="p-6">
                <Outlet/>

            </div>


        </div>
    )
}





