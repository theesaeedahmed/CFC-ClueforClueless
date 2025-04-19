import { IoClose } from "react-icons/io5";
interface DialogProps {
  logoutHandler: () => void;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
const Dialog = ({logoutHandler,setOpenDialog}:DialogProps) => {
  function YesHandler() {
    setOpenDialog(false)
    logoutHandler()
  }
  function NoHandler() {
    setOpenDialog(false)

  }
  return(
    <div className=" fixed inset-x-0 inset-y-[-20px]  flex justify-center items-center w-full h-full z-[51] ">
      <div className=" p-5 gap-5 flex flex-col justify-center items-start shadow-2xl bg-white border border-black rounded-xl z-[50] w-4/5 md:w-3/5 lg:w-2/5">
        <div className="w-full justify-between flex">
          <p className="font-semibold text-xl">Confirm the Action</p>
          <button onClick={NoHandler} className="hover:bg-slate-200 rounded-full p-2"><IoClose className="text-2xl"/></button>
        </div>
        <div className="w-full flex flex-col">
          <div>
            <p>Are you sure you want to logout?</p>
          </div>
            <div className="flex flex-row justify-end w-full gap-4 pt-5">
              <button className="shadow-sm shadow-slate-600 hover:bg-slate-200 text-black font-bold py-2 px-4 rounded mr-2" onClick={NoHandler}>Cancel</button>
              <button className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded shadow-sm shadow-slate-600" onClick={YesHandler}>Logout</button>
            </div>
        </div>

      </div>

    </div>
  )
}

export default Dialog;






