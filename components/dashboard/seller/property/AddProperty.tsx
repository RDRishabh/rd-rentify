"use client"
import React, {FormEvent, useRef} from 'react';
import {Button} from "@nextui-org/react";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/modal";
import {Input} from "@nextui-org/input";
import {API_Auth_Buyer_SignUp} from "../../../../helper/API/auth/buyer_signup";
import {toast} from "react-toastify";
import {toastCompactTheme} from "../../../../Default/toast";
import {API_Properties_Add} from "../../../../helper/API/seller/add_properties";

interface Props{
    isOpen: boolean, onOpen: () => void, onOpenChange: () => void
}

const AddProperty = (prop:Props) => {
    const form_ref = useRef<HTMLFormElement>(null);

    const HandleSubmit = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        if(!form_ref.current){
            return
        }

        const form = form_ref.current as HTMLFormElement;
        const data = new FormData(form_ref.current);

        const promise = new Promise(async (resolve, reject) => {
            const response = await API_Properties_Add({data:data});
            if (response.error && response.message) {
                reject(response.message);
            } else {
                resolve(1);
            }
        });

        toast
            .promise(
                promise,
                {
                    pending: "Adding ...",
                    success: "Added successfully",
                },
                toastCompactTheme,
            ).then(()=>{
                location.reload()
            })
            .catch((reason) => {
                toast.error(reason, toastCompactTheme)
            });
    }

    return (
        <>
            <Modal isOpen={prop.isOpen} onOpenChange={prop.onOpenChange} scrollBehavior={'inside'}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add Property</ModalHeader>
                            <ModalBody>
                                <form ref={form_ref} className={`flex flex-col gap-2`} onSubmit={HandleSubmit}>
                                    <Input variant={'flat'} size={'sm'} label={'Title'} name={'title'}
                                           labelPlacement={'outside'} isRequired placeholder={'type here'}/>
                                    <Input variant={'flat'} size={'sm'} label={'Description'} name={'description'}
                                           labelPlacement={'outside'} isRequired placeholder={'type here'}/>
                                    <Input variant={'flat'} size={'sm'} label={'Pincode'} name={'pincode'}
                                           labelPlacement={'outside'} isRequired placeholder={'type here'}/>
                                    <Input variant={'flat'} size={'sm'} label={'City'} name={'city'}
                                           labelPlacement={'outside'} isRequired placeholder={'type here'}/>
                                    <Input variant={'flat'} size={'sm'} label={'State'} name={'state'}
                                           labelPlacement={'outside'} isRequired placeholder={'type here'}/>
                                    <Input variant={'flat'} size={'sm'} label={'Country'} name={'country'}
                                           labelPlacement={'outside'} isRequired placeholder={'type here'}/>
                                    <Input variant={'flat'} size={'sm'} label={'Address'} name={'address'}
                                           labelPlacement={'outside'} isRequired placeholder={'type here'}/>
                                    <Input variant={'flat'} size={'sm'} label={'Bathrooms'} name={'bathrooms'}
                                           labelPlacement={'outside'} isRequired placeholder={'type here'}/>
                                    <Input variant={'flat'} size={'sm'} label={'Bedrooms'} name={'bedrooms'}
                                           labelPlacement={'outside'} isRequired placeholder={'type here'}/>
                                    <Input variant={'flat'} size={'sm'} label={'Distance From College ( KM )'}
                                           name={'distance_from_college'} labelPlacement={'outside'} isRequired
                                           placeholder={'type here'}/>
                                    <Input variant={'flat'} size={'sm'} label={'Distance From Hospital ( KM )'}
                                           name={'distance_from_hospital'} labelPlacement={'outside'} isRequired
                                           placeholder={'type here'}/>
                                    <Input variant={'flat'} size={'sm'} label={'Cost'} type={'text'} name={'cost'}
                                           labelPlacement={'outside'} isRequired placeholder={'type here'}/>
                                    <div className={`flex flex-col gap-1 text-xs`}>
                                        <span className={``}>Images</span>
                                        <input type={'file'} name={'images'} multiple/>
                                    </div>

                                    <div className={`flex justify-center`}>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button color="primary" type={'submit'}>
                                            Submit
                                        </Button>
                                    </div>
                                    
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddProperty;
