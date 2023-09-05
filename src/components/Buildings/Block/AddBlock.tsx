import React, {Component, FormEvent, useEffect, useState} from 'react';
import Block from './Block';
import Building from './Building';
import {useAxios} from "../../../configuration/AxiosConfiguration";
import {useNavigate} from "react-router-dom";

const AddBlock: React.FC = () => {
    const [buildings, setBuildings] = useState<Building[]>([]);
    const {axiosInstance} = useAxios();
    const navigate = useNavigate();
    const [block, setNewBlock] = useState<Block>({
        id: 0,
        dailyMortality: 0,
        dailyGasCylinder: 0,
        weightFirstWeek: 0,
        weightEveryFeeding: 0,
        weightByTheEnd: 0,
        foodNature: '',
        foodQuantity: 0,
        buildingId: 0,
    });

    // Fetch blocks data when the component mounts
    useEffect(() => {
        axiosInstance
            .get(process.env.REACT_APP_API_PREFIX + "/breeding-buildings")
            .then((response) => {
                setBuildings(response.data);
                console.log(response.data);
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
                // Handle a successful response
                console.log('Block added successfully', response.data);
                // You can also reset the form or navigate to another page here
            }).then(value =>navigate("blocks") )
            .catch((error) => {
                console.error('µµµµµµµµµµµµ block :', block);
                // Handle errors
                console.error('Failed to add block', error);
            });
    };

    return (
        <div className=" content-wrapper">
            {/* Hire Us */}
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className=" mx-auto">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
                            Add new Block
                        </h1>
                    </div>
                    <div className="mt-12">
                        <div className="w-full">
                            <div className="grid gap-4 lg:gap-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                    <div>
                                        <label htmlFor="hs-firstname-hire-us-2"
                                               className="block text-sm text-gray-700 font-medium dark:text-white">Daily
                                            Mortality</label>
                                        <input placeholder="Enter daily Mortality"
                                               name="dailyMortality"
                                               value={block.dailyMortality !== null ? block.dailyMortality : ''}
                                               onChange={handleChange}
                                               type="number"
                                               id="hs-firstname-hire-us-2"
                                               className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                    </div>
                                    <div>
                                        <label htmlFor="hs-lastname-hire-us-2"
                                               className="block text-sm text-gray-700 font-medium dark:text-white">Daily
                                            Gas Cylinder</label>
                                        <input placeholder="Enter daily Gas Cylinder"
                                               name="dailyGasCylinder"
                                               value={block.dailyGasCylinder !== null ? block.dailyGasCylinder : ''}
                                               onChange={handleChange}
                                               type="number"
                                               id="hs-lastname-hire-us-2"
                                               className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                    </div>
                                </div>
                                {/* End Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                    <div>
                                        <label htmlFor="hs-firstname-hire-us-2"
                                               className="block text-sm text-gray-700 font-medium dark:text-white">Weight
                                            First Week</label>
                                        <input placeholder="Enter daily Mortality"
                                               name="weightFirstWeek"
                                               value={block.weightFirstWeek !== null ? block.weightFirstWeek : ''}
                                               onChange={handleChange}
                                               type="number"
                                               id="hs-firstname-hire-us-2"
                                               className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                    </div>
                                    <div>
                                        <label htmlFor="hs-lastname-hire-us-2"
                                               className="block text-sm text-gray-700 font-medium dark:text-white">Weight
                                            Every Feeding</label>
                                        <input placeholder="Enter daily Gas Cylinder"
                                               name="weightEveryFeeding"
                                               value={block.weightEveryFeeding !== null ? block.weightEveryFeeding : ''}
                                               onChange={handleChange}
                                               type="number"
                                               id="hs-lastname-hire-us-2"
                                               className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                    </div>
                                </div>
                                {/* Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                    <div>
                                        <label htmlFor="hs-firstname-hire-us-2"
                                               className="block text-sm text-gray-700 font-medium dark:text-white">Weight
                                            By The End</label>
                                        <input placeholder="Enter the Weight By The End"
                                               name="weightByTheEnd"
                                               value={block.weightByTheEnd !== null ? block.weightByTheEnd : ''}
                                               onChange={handleChange}
                                               type="number"
                                               id="hs-firstname-hire-us-2"
                                               className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                    </div>
                                    <div>
                                        <label htmlFor="hs-lastname-hire-us-2"
                                               className="block text-sm text-gray-700 font-medium dark:text-white">Food
                                            Nature</label>
                                        <input placeholder="Enter the food Nature"
                                               name="foodNature"
                                               value={block.foodNature}
                                               onChange={handleChange}
                                               type="text"
                                               id="hs-lastname-hire-us-2"
                                               className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                    </div>
                                </div>
                                {/* End Grid */}
                                {/* Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                    <div>
                                        <label htmlFor="hs-firstname-hire-us-2"
                                               className="block text-sm text-gray-700 font-medium dark:text-white">Food
                                            Quantity</label>
                                        <input placeholder="Enter the food Quantity"
                                               name="foodQuantity"
                                               value={block.foodQuantity}
                                               onChange={handleChange}
                                               type="number"
                                               id="hs-firstname-hire-us-2"
                                               className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                    </div>
                                    <div>
                                        <label htmlFor="hs-lastname-hire-us-2"
                                               className="block text-sm text-gray-700 font-medium dark:text-white">Buildings</label>
                                        <select
                                            name="buildingId"
                                            value={block.buildingId !== null ? block.buildingId : ''}
                                            onChange={handleChange}
                                            className="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                                            <option selected>Choose Building</option>
                                            {buildings.map((building) => (
                                                <option key={building.id} value={building.id}>{building.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                {/* End Grid */}
                            </div>
                            {/* End Grid */}
                            <div className="mt-6 grid">
                                <button onClick={handleSubmit} type="submit"
                                        className="inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-sm lg:text-base text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800">Add
                                </button>
                            </div>
                        </div>
                        {/* End Form */}
                    </div>
                </div>
            </div>
            {/* End Hire Us */}

        </div>
    );

}

export default AddBlock;
