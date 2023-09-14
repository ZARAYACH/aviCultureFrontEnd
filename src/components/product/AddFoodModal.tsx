import React, {Fragment, useEffect, useState} from 'react';
import {useAxios} from "../../configuration/AxiosConfiguration";
import ProductFood from "./modal/ProductFood";
import Building from "../Breeding/buildings/Building";
import Blocks from "../Breeding/Block/Blocks";
import Block from "../Breeding/Block/Block";
import FoodCategory from "./modal/FoodCategory";
import AddBulbModal from "./AddBulbsModal";

interface AddFoodProps {
    toggleModal: () => void,
    setFoods: React.Dispatch<React.SetStateAction<ProductFood[]>>
}

function AddFoodModal({toggleModal, setFoods}: AddFoodProps) {

    const {axiosInstance} = useAxios();
    const [food, setNewFood] = useState<ProductFood>({
        id: undefined,
        name: undefined,
        description: undefined,
        quantity: undefined,
        unitaryPrice: undefined,
        storageBuilding: undefined,
        remarks : undefined,
        foodCategory : undefined
    });
    const [buildings, setBuildings] = useState<Building[]>([]);
    const [categories, setCategories] = useState<FoodCategory[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target;
        setNewFood((prevFood) => ({
            ...prevFood,
            [name]: type === 'number' ? (value !== '' ? parseFloat(value) : null) : value,
            [name]: name === 'storageBuilding' ? buildings.find(building => building.id == parseInt(value)) :
                name == "foodCategorie" ? categories.find(category => category.id == parseInt(value)) : value,

        }));
    };

    useEffect(() => {
        axiosInstance
            .get(process.env.REACT_APP_API_PREFIX + "/breeding-buildings", {params: {nature: "STORAGE"}})
            .then((response) => {
                setBuildings(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);


    useEffect(() => {
        axiosInstance
            .get(process.env.REACT_APP_API_PREFIX + "/products/food-categories")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Make a POST request to your API using Axios
        axiosInstance
            .post(process.env.REACT_APP_API_PREFIX + '/products/foods/add', food)
            .then((response) => {
                setFoods(prevState => [...prevState, response.data as ProductFood])
                toggleModal()
            }).catch((error) => {
            console.error('Failed to add Food', error);
        });
    };

    return (
        <Fragment>
            <div className="absolute inset-0 flex items-start justify-center z-[1039]  ">
                <div className="fixed inset-0 flex items-start justify-center z-[1039] backdrop-blur-sm"
                     onClick={toggleModal}></div>
                <div>
                    <div
                        className="modal-container relative bg-white w-11/12 md:max-w-2xl mx-auto rounded shadow-lg shadow-black overflow-y-auto mt-5 align-items-lg-start"></div>
                    <div className="modal-content py-4 text-left px-6 border-0 z-[1040]">
                        <div className=" mx-auto ">
                            <div className="text-center mb-3">
                                <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
                                    Add new Food Product
                                </h1>
                            </div>
                            <div className="mt-10  border-t-gray-600">
                                <div className="w-full">
                                    <div className="grid gap-4 lg:gap-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                            <div>
                                                <label
                                                    className="text-sm text-gray-700 font-medium dark:text-white">Name</label>
                                                <input placeholder="Enter Food name"
                                                       name="name"
                                                       onChange={handleChange}
                                                       type="text"
                                                       className="customInput py-2 px-3 w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                            </div>
                                            <div>
                                                <label
                                                    className="text-sm text-gray-700 font-medium dark:text-white">Description</label>
                                                <input placeholder="Enter Food description"
                                                       name="description"
                                                       onChange={handleChange}
                                                       type="text"
                                                       className="customInput py-2 px-3  w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                            <div>
                                                <label
                                                    className=" text-sm text-gray-700 font-medium dark:text-white">Unitary
                                                    Price</label>
                                                <input placeholder="Enter unitaryPrice"
                                                       name="unitaryPrice"
                                                       onChange={handleChange}
                                                       type="number"
                                                       className="customInput py-2 px-3  w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                            </div>
                                            <div>
                                                <label
                                                    className="Medicine text-sm text-gray-700 font-medium dark:text-white">Quantity</label>
                                                <input placeholder="Enter quantity"
                                                       name="quantity"
                                                       onChange={handleChange}
                                                       type="number"
                                                       className="customInput py-2 px-3  w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                            <div>
                                                <label
                                                    className=" text-sm text-gray-700 font-medium dark:text-white">Marque</label>
                                                <input placeholder="Enter Marque Name"
                                                       name="marque"
                                                       onChange={handleChange}
                                                       type="text"
                                                       className="customInput py-2 px-3  w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>

                                            </div>
                                            <div>
                                                <label
                                                    className=" text-sm text-gray-700 font-medium dark:text-white">Power
                                                    in watt</label>
                                                <input placeholder="Enter Power in Watt"
                                                       type={"number"}
                                                       name="powerInWatt"
                                                       onChange={handleChange}
                                                       className="customInput py-2 px-3  w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                            <div>
                                                <label
                                                    className=" text-sm text-gray-700 font-medium dark:text-white">Storage
                                                    Building</label>
                                                <select placeholder="Shoose Storage Bulding"
                                                        name="storageBuilding"
                                                        onChange={handleChange}
                                                        className="customInput py-2 px-3  w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                                                    <option key={0}></option>
                                                    {buildings.map(value => {
                                                        return <option key={value.id}
                                                                       value={value.id}>({value.id}) {value.name}</option>
                                                    })}
                                                </select>
                                            </div>
                                            <div>
                                                <label
                                                    className=" text-sm text-gray-700 font-medium dark:text-white">Category</label>
                                                <select placeholder="Shoose Storage Bulding"
                                                        name="foodCategorie"
                                                        onChange={handleChange}
                                                        className="customInput py-2 px-3  w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                                                    <option key={0}></option>
                                                    {categories.map(value => {
                                                        return <option key={value.id}
                                                                       value={value.id}>({value.id}) {value.name}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                        <div>
                                            <label
                                                className=" text-sm text-gray-700 font-medium dark:text-white">Storage
                                                Building</label>
                                            <input placeholder="Do you have remarks ?"
                                                   type={"text"}
                                                    name="remarks"
                                                    onChange={handleChange}
                                                    className="customInput py-2 px-3  w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                                            </input>
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

export default AddFoodModal;