import React, { useState } from "react";
import { Button ,Input,Steps, message , Select} from "antd"; 
import { Controller, useForm } from "react-hook-form";
import { db } from "./Fire-base"
import { collection , addDoc } from "firebase/firestore"
import "./style.css"
const {Step}=Steps

export default function StepForm({onFormSubmit}){


    const [currentStep,setCurrentStep]=useState(0);
    const{
        control,
        handleSubmit,
        trigger,
        reset,
        formState:{errors}
    }=useForm()

   
     const onNext=async()=> {
        const valid=await trigger(["Name","Age","Relation"][currentStep])
        if(valid){
            setCurrentStep(currentStep+1)
        }
    }

    function onPrev(){
        setCurrentStep(currentStep-1)
    }

    const onSubmit =  (value) => {
          var time = new Date().getTime()
          var data={...value,"Time": time}
        //removed async await from here
              addDoc(collection(db, "FamilyRecords"), {
               Records:data
            });
            // This should show if successful
            reset(); // Reset form only on success
            setCurrentStep(0); // Set step back to 0
            onFormSubmit()
        
            console.log("Data from feild")
            console.log(data)
    };
    

    
    const steps =[
        {
            title:"",
            content:(
                <div key="1">
                    <label>Name:</label>
                    <Controller 
                      name="Name"
                      control={control}
                      rules={{required:'Name is required'}}
                      render={({field})=><Input {...field}  />}
                    />
                    {errors.Name && <p className="errorMsg">{errors.Name.message}</p>}

                </div>
            )
        },

        {
            title:"",
            content:(
                <div key="Step 2">
                    <label>Age:</label>
                    <Controller
                    name="Age"
                    control={control}
                    rules={{required:'Age is required',
                        validate:{
                            number:value=>(value>10&& value<90)||'Age must be between 10 - 90'
                        }
                    }}
                    render={({field})=><Input {...field}  />}
                    />
                    {errors.Age && <p className="errorMsg">{errors.Age.message}</p>}

                </div>
            )
        },
        {
            title:"",
            content:(
                <div key='step 2'>
                    <label>Relation:</label>
                    <Controller
                    name="Relation"
                    control={control}
                    rules={{required:"Relation is required"}}
                    render={({ field: { onChange, value, onBlur } })=>(<Select  value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder="Add Relation">
                        <Select.Option value="Brother">Brother</Select.Option>
                        <Select.Option value="Sister">Sister</Select.Option>
                        <Select.Option value="Mother">Mother</Select.Option>
                        <Select.Option value="Father">Father</Select.Option>
                        <Select.Option value="Uncle">Uncle</Select.Option>
                        <Select.Option value="Aunt">Aunt</Select.Option>
                        <Select.Option value="Cousin">Cousin</Select.Option>
                    </Select>)}
                    />
                    {errors.Relation &&<p className="errorMsg">{errors.Relation.message}</p>}
                </div>
            )
        },

       


    ]



   

    return(
        <>
        <div className="Steps" >
            <Steps current={currentStep}>
                {steps.map((item,index)=>(
                    <Step key={index} title={item.title}/>
                ))}
            </Steps>
            </div>
            <div className="content">{steps[currentStep].content}</div>

            <div className="modalButton">
                {currentStep<steps.length-1 && (<Button type="primary" onClick={onNext}>Next</Button>)}
                {currentStep>0 && (<Button text="default" onClick={onPrev}>Previous</Button>)}
                {currentStep===steps.length-1 && (<Button type="default" onClick={handleSubmit(onSubmit)}>Submit</Button>)}
            </div>

            </>
        
    )





}


