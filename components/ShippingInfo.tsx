"use client"
import { FC } from "react"
interface ShippingInfoProps {
    handleStep: () => void
    handlePrevious: () => void
}
import { useSelector,useDispatch } from "react-redux";
import { RootState,AppDispatch } from "@/app/redux/store/strore";
import { Shipping,addShippingAddress} from '@/app/redux/slices/shippingSlice'
const ShippingInfo: FC<ShippingInfoProps> = ({ handleStep, handlePrevious })=> {
  const dispatch = useDispatch<AppDispatch>();
  const shippingAddress = useSelector((state:RootState)=>state.shipping.items)
async function handleForm(formData: FormData) {
  const shippingData: Shipping = {
    country: formData.get('country') as string || shippingAddress.country,
    state: formData.get('state') as string || shippingAddress.state,     
    city: formData.get('city') as string || shippingAddress.city,       
    postalCode: formData.get('postalCode') as string || shippingAddress.postalCode, 
  };
    dispatch(addShippingAddress(shippingData))
    handleStep()
}
  return (
    <section className="px-2 md:px-32 flex flex-col items-center mt-2 justify-center bg-gray-50">
      <div className="w-full max-w-4xl border rounded-2xl px-6 py-8 bg-white shadow-lg">
        <h1 className="font-extrabold text-4xl text-center mb-6"> Shipping Address</h1>
        <form className="space-y-6" action={handleForm}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
              <label htmlFor="country" className="form-ship-label">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                placeholder="Enter your country"
                defaultValue={shippingAddress.country || ''}
                className="form-shipping"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="state" className="form-ship-label">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                placeholder="Enter your state"
                defaultValue={shippingAddress.state || ''}
                className="form-shipping"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
              <label htmlFor="city" className="form-ship-label">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter your city"
                defaultValue={shippingAddress.city || ''}
                className="form-shipping"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Postal Code" className="form-ship-label">
              Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                placeholder="Enter your Postal code"
                defaultValue={shippingAddress.postalCode || ''}
                className="form-shipping"
                required
              />
            </div>
          </div>
          <div className="flex justify-between">
                  <button
                    className="btn-next"
                    onClick={() => handlePrevious()}
                  >
                    <svg
                      className="w-7 h-7 text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h14M5 12l4-4m-4 4 4 4"
                      />
                    </svg>
                    Previous
                  </button>
                  <button
                    className="btn-next"
                    type="submit"
                  >
                    Continue
                    <svg
                      className="w-7 h-7 text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>
                  </button>
                </div>
        </form>
      </div>
    </section>
  );
}
export default ShippingInfo