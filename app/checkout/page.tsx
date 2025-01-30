"use client"
import { useState} from "react"
import PersonalInfo from "@/components/PersonalInfo"
import ShippingInfo from "@/components/ShippingInfo"
import OrderSummary from "@/components/OrderSummary"
import "./steper.css"
export default function Page() {
    const steps = ['Personal Info', 'Shipping Info', 'Order']
    const [currentStep, setCurrentStep] = useState(1)
    const [complete, setComplete] = useState(false)
   const handleStep =()=>{
    if(currentStep < steps.length){
        setCurrentStep(currentStep + 1)
   }else{
    setComplete(true)
   }    
}
const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };
    return (
        <section className="mt-20">
            <div className="flex justify-center">
                {
                    steps.map((step, index) => {
                        return (
                            <div key={index} className={`step-item ${currentStep === index + 1 && 'active'} ${(index + 1 < currentStep || complete) && 'complete'}`}>
                                <div className="step">{(index + 1 < currentStep || complete) ? <span className='text-white font-bold'>✓</span> : index + 1}</div>
                                <p>{step}</p>
                            </div>
                        )
                    })
                }
            </div>

            {
                currentStep === 1 && <PersonalInfo handleStep={handleStep} isStep={true}/>
            }
            {
                currentStep === 2 && <ShippingInfo  handleStep={handleStep} handlePrevious={handlePrevious}/>
            }
            {
                currentStep === 3 && <OrderSummary handleStep={handleStep} handlePrevious={handlePrevious}/>
            }

        </section>
    )
}