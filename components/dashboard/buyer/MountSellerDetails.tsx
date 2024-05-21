"use client"
import React, {FormEvent, useRef} from 'react';
import {Button} from "@nextui-org/react";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/modal";
import {toast} from "react-toastify";
import {toastCompactTheme} from "../../../Default/toast";

interface Props{
    isOpen: boolean, onOpen: () => void, onOpenChange: () => void,
    sellerDetails: any
}

const MountSellerDetails = (prop:Props) => {
    const form_ref = useRef<HTMLFormElement>(null);

    return (
        <>
            <Modal isOpen={prop.isOpen} onOpenChange={prop.onOpenChange} scrollBehavior={'inside'}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Seller Details</ModalHeader>
                            <ModalBody>
                                <div className={`flex flex-col gap-1`}>
                                    <div className={`flex`}>
                                        <span className={`font-semibold min-w-[100px]`}>Name : </span>
                                        <span>{prop.sellerDetails.Name}</span>
                                    </div>
                                    <div className={`flex`}>
                                        <span className={`font-semibold min-w-[100px]`}>Email : </span>
                                        <span>{prop.sellerDetails.Email}</span>
                                    </div>
                                    <div className={`flex`}>
                                        <span className={`font-semibold min-w-[100px]`}>Phone : </span>
                                        <span>{prop.sellerDetails.Phone}</span>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default MountSellerDetails;
