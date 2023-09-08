import React, {Fragment, useEffect, useState} from 'react';
import {useAxios} from "../../../configuration/AxiosConfiguration";
import Center from "./center";


interface AddCenterModalProps {
    toggleModal: () => void,
    setCenters :  React.Dispatch<React.SetStateAction<Center[]>>
}

function AddCenterModal({toggleModal, setCenters}: AddCenterModalProps) {
    const {axiosInstance} = useAxios();
    const [center, setNewCenter] = useState<Center>({
        id: undefined,
        name: undefined,
        address: undefined,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target;

        setNewCenter((prevBlock) => ({
            ...prevBlock,
            [name]: type === 'number' ? (value !== '' ? parseFloat(value) : null) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        axiosInstance
            .post(process.env.REACT_APP_API_PREFIX + '/breeding-Centers/add', center)
            .then((response) => {
                setCenters((prevCenters) => [...prevCenters, response.data as Center]);
                toggleModal();
            }).then(value => toggleModal)
            .catch((error) => {
                console.error('Failed to add block', error);
            });
    };


    return (
        <Fragment>
            <div className="absolute inset-0 flex items-start justify-center z-[1039]  ">
                <div className="fixed inset-0 flex items-start justify-center z-[1039] backdrop-blur-sm"
                     onClick={toggleModal}></div>
                <div
                    className="modal-container bg-white w-11/12 md:max-w-2xl mx-auto rounded shadow-lg shadow-black overflow-y-auto mt-5 align-items-lg-start">
                    <div
                        className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-start  mt-4 mr-4 text-white text-sm z-50">
                        <span className="text-xl">×</span>
                    </div>

                    <div className="modal-content py-4 text-left px-6 border-0 z-[1040]">
                        <div className=" mx-auto ">
                            <div className="text-center mb-3">
                                <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
                                    Add new Center
                                </h1>
                            </div>
                            <div className="mt-10  border-t-gray-600">
                                <div className="w-full">
                                    <div className="grid gap-4 lg:gap-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                            <div>
                                                <label
                                                    className="block text-sm text-gray-700 font-medium dark:text-white">Name</label>
                                                <input placeholder="Enter Center name"
                                                       name="name"
                                                       value={center.name ? center.name : ''}
                                                       onChange={handleChange}
                                                       type="text"
                                                       className="customInput py-2 px-3 block w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                            </div>
                                            <div>
                                                <label
                                                    className="block text-sm text-gray-700 font-medium dark:text-white">Center
                                                    nature</label>
                                                <select placeholder="Enter Center nature"
                                                        name="nature"
                                                        value={center.address ? center.address : ''}
                                                        onChange={handleChange}
                                                        className="customInput py-2 px-3 block w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                                                    <option value="BREEDING">Breeding Center</option>
                                                    <option value="STORAGE">Storage Center</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 grid">
                                        <button onClick={handleSubmit} type="submit"
                                                className="inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-lg lg:text-base text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800">Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>);
}

export default AddCenterModal;