import React, {useEffect, useState} from 'react';
import {useAxios} from "../../../configuration/AxiosConfiguration";
import {Vehicle} from "./interfaces";

interface AddVehiclesProps {
    toggleModal: () => void,
    setVehicle: React.Dispatch<React.SetStateAction<Vehicle[]>>
}

function AddVehicles({toggleModal, setVehicle}: AddVehiclesProps) {
    const {axiosInstance} = useAxios();
    const [vehicle, setNewVehicle] = useState<Vehicle>({
        id: undefined,
        type: undefined,
        marque: undefined,
        module: undefined,
        licencePlate: undefined,
        firstRollingDate: undefined,
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target;

        setNewVehicle((prevVehicle) => ({
            ...prevVehicle,
            [name]: type === 'number' ? (value !== '' ? parseFloat(value) : null) : value,
            [name]: name === 'vehicleId' ? parseInt(value) : value, // Parse the value as an integer for 'vehicleId'

        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Make a POST request to your API using Axios
        axiosInstance
            .post(process.env.REACT_APP_API_PREFIX + '/vehicles/add', vehicle)
            .then((response) => {
                setVehicle(prevState => [...prevState, response.data as Vehicle])
                toggleModal()
            }).catch((error) => {
            console.error('Failed to add vehicle', error);
        });
    };


    return (
        <div className="absolute inset-0 flex items-start justify-center z-[1039]  ">
            <div className="fixed inset-0 flex items-start justify-center z-[1039] backdrop-blur-sm"
                 onClick={toggleModal}></div>
            <div
                className="modal-container bg-white w-11/12 md:max-w-2xl mx-auto rounded shadow-lg shadow-black overflow-y-auto mt-5 align-items-lg-start">
                <div className="modal-content py-4 text-left px-6 border-0 z-[1040]">
                    <div className=" mx-auto ">
                        <div className="text-center mb-3">
                            <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
                                Add new Vehicle
                            </h1>
                        </div>
                        <div className="mt-10  border-t-gray-600">
                            <div className="w-full">
                                <div className="grid gap-4 lg:gap-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                        <div>
                                            <label className="block text-sm text-gray-700 font-medium dark:text-white">vehicle type</label>
                                            <input placeholder="Enter vehicle type"
                                                   name="type"
                                                   value={vehicle.type !== null ? vehicle.type : ''}
                                                   onChange={handleChange}
                                                   type="text"
                                                   className="customInput py-2 px-3 block w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                        </div>
                                        <div>
                                            <label
                                                className="block text-sm text-gray-700 font-medium dark:text-white">vehicle marque</label>
                                            <input placeholder="Enter vehicle marque"
                                                   name="marque"
                                                   value={vehicle.marque !== null ? vehicle.marque : ''}
                                                   onChange={handleChange}
                                                   type="text"
                                                   className="customInput py-2 px-3 block w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                        <div>
                                            <label className="block text-sm text-gray-700 font-medium dark:text-white">vehicle module</label>
                                            <input placeholder="Enter vehicle module"
                                                   name="module"
                                                   value={vehicle.module !== null ? vehicle.module : ''}
                                                   onChange={handleChange}
                                                   type="text"
                                                   className="customInput py-2 px-3 block w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-700 font-medium dark:text-white">vehicle licence Plate</label>
                                            <input placeholder="Enter vehicle licence Plate"
                                                   name="licencePlate"
                                                   value={vehicle.licencePlate !== null ? vehicle.licencePlate : ''}
                                                   onChange={handleChange}
                                                   type="text"
                                                   className="customInput py-2 px-3 block w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                        <div>
                                            <label className="block text-sm text-gray-700 font-medium dark:text-white">vehicle first Rolling Date</label>
                                            <input placeholder="Enter vehicle first Rolling Date"
                                                   name="firstRollingDate"
                                                   value={vehicle.firstRollingDate !== null ? vehicle.firstRollingDate : ''}
                                                   onChange={handleChange}
                                                   type="date"
                                                   className="customInput py-2 px-3 block w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
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
        </div>);
}

export default AddVehicles;