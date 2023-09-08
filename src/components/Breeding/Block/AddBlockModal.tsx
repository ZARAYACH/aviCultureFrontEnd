import React, {useEffect, useState} from 'react';
import {useAxios} from "../../../configuration/AxiosConfiguration";
import {useNavigate} from "react-router-dom";
import Block from "./Block";
import Building from "../buildings/Building";

interface AddBlockModalProps {
    toggleModal: () => void,
    setBlocks: React.Dispatch<React.SetStateAction<Block[]>>
}

function AddBlockModal({toggleModal, setBlocks}: AddBlockModalProps) {
    const [buildings, setBuildings] = useState<Building[]>([]);
    const {axiosInstance} = useAxios();
    const [block, setNewBlock] = useState<Block>({
        id: undefined,
        dailyMortality: undefined,
        dailyGasCylinder: undefined,
        weightFirstWeek: undefined,
        weightEveryFeeding: undefined,
        weightByTheEnd: undefined,
        foodNature: undefined,
        foodQuantity: undefined,
        buildingId: undefined,
    });

    // Fetch blocks data when the component mounts
    useEffect(() => {
        axiosInstance
            .get(process.env.REACT_APP_API_PREFIX + "/breeding-buildings")
            .then((response) => {
                setBuildings(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target;

        setNewBlock((prevBlock) => ({
            ...prevBlock,
            [name]: type === 'number' ? (value !== '' ? parseFloat(value) : null) : value,
            [name]: name === 'buildingId' ? parseInt(value) : value, // Parse the value as an integer for 'buildingId'

        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Make a POST request to your API using Axios
        axiosInstance
            .post(process.env.REACT_APP_API_PREFIX + '/breeding-blocks/add', block)
            .then((response) => {
                setBlocks(prevState => [...prevState, response.data as Block])
                toggleModal()
            }).catch((error) => {
            console.error('Failed to add block', error);
        });
    };


    return (
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
                                Add new Block
                            </h1>
                        </div>
                        <div className="mt-10  border-t-gray-600">
                            <div className="w-full">
                                <div className="grid gap-4 lg:gap-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                        <div>
                                            <label className="block text-sm text-gray-700 font-medium dark:text-white">Daily
                                                Mortality</label>
                                            <input placeholder="Enter daily Mortality"
                                                   name="dailyMortality"
                                                   value={block.dailyMortality !== null ? block.dailyMortality : ''}
                                                   onChange={handleChange}
                                                   type="number"
                                                   className="customInput py-2 px-3 block w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                        </div>
                                        <div>
                                            <label
                                                className="block text-sm text-gray-700 font-medium dark:text-white">Daily
                                                Gas Cylinder</label>
                                            <input placeholder="Enter daily Gas Cylinder"
                                                   name="dailyGasCylinder"
                                                   value={block.dailyGasCylinder !== null ? block.dailyGasCylinder : ''}
                                                   onChange={handleChange}
                                                   type="number"
                                                   className="customInput py-2 px-3 block w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                        <div>
                                            <label className="block text-sm text-gray-700 font-medium dark:text-white">Weight
                                                First Week</label>
                                            <input placeholder="Enter daily Mortality"
                                                   name="weightFirstWeek"
                                                   value={block.weightFirstWeek !== null ? block.weightFirstWeek : ''}
                                                   onChange={handleChange}
                                                   type="number"
                                                   className="customInput py-2 px-3 block w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-700 font-medium dark:text-white">Weight
                                                Every Feeding</label>
                                            <input placeholder="Enter daily Gas Cylinder"
                                                   name="weightEveryFeeding"
                                                   value={block.weightEveryFeeding !== null ? block.weightEveryFeeding : ''}
                                                   onChange={handleChange}
                                                   type="number"
                                                   className="customInput py-2 px-3 block w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                        <div>
                                            <label className="block text-sm text-gray-700 font-medium dark:text-white">Weight
                                                By The End</label>
                                            <input placeholder="Enter the Weight By The End"
                                                   name="weightByTheEnd"
                                                   value={block.weightByTheEnd !== null ? block.weightByTheEnd : ''}
                                                   onChange={handleChange}
                                                   type="number"
                                                   className="customInput py-2 px-3 block w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-700 font-medium dark:text-white">Food
                                                Nature</label>
                                            <input placeholder="Enter the food Nature"
                                                   name="foodNature"
                                                   value={block.foodNature}
                                                   onChange={handleChange}
                                                   type="text"
                                                   className="customInput py-2 px-3 block w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                        <div>
                                            <label className="block text-sm text-gray-700 font-medium dark:text-white">Food
                                                Quantity</label>
                                            <input placeholder="Enter the food Quantity"
                                                   name="foodQuantity"
                                                   value={block.foodQuantity}
                                                   onChange={handleChange}
                                                   type="number"
                                                   className="customInput py-2 px-3 block w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                        </div>
                                        <div>
                                            <label
                                                className="block text-sm text-gray-700 font-medium dark:text-white">Buildings</label>
                                            <select
                                                name="buildingId"
                                                value={block.buildingId !== null ? block.buildingId : ''}
                                                onChange={handleChange}
                                                className="customInput py-2 px-3 pr-9 block w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                                                {buildings.map((building) => (
                                                    <option key={building.id}
                                                            value={building.id}>({building.id}) {building.name}</option>
                                                ))}
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
        </div>);
}

export default AddBlockModal;