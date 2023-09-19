import React, {Fragment, useEffect, useState} from "react";
import exp from "constants";
import Medicine from "../health/Medicine";
import {useAxios} from "../../configuration/AxiosConfiguration";
import Disease from "../health/Disease";
import Building from "../Breeding/buildings/Building";
import BulbsReplacementTask from "./BulbsReplacementTask";
import {useLocation, useNavigate} from "react-router-dom";

interface AddBulbReplacementTaskProps {
    buildings: Building[]
}

const AddBulbReplacementTask = ({buildings}: AddBulbReplacementTaskProps) => {
    const {axiosInstance} = useAxios();
    const {state} = useLocation();
    const [bulbReplacementTask, setBulbReplacementTask] = useState<BulbsReplacementTask>({
        id: undefined,
        building: undefined,
        replacedBulbCount: undefined,
        date: new Date(state.start)
    });
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target;
        setBulbReplacementTask((prevState) => ({
            ...prevState,
            [name]: type === 'number' ? (value !== '' ? parseFloat(value) : null) : value,
            [name]: name === 'building' ? buildings.find(building => building.id == parseInt(value)) : name === 'date' ? new Date(value) : value,

        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Make a POST request to your API using Axios
        axiosInstance
            .post(process.env.REACT_APP_API_PREFIX + '/bulbs-replacement-tasks/add', bulbReplacementTask)
            .then((response) => {
                console.log(response)
                navigate(-1);
            }).catch((error) => {
            console.error('Failed to add bulbReplacementTask', error);
        });
    };


    return <Fragment>
        <div className="mt-10  border-t-gray-600">
            <div className="w-full">
                <div className="grid gap-4 lg:gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 lg:gap-6">
                        <div>
                            <label
                                className="text-sm text-gray-700 font-medium dark:text-white">building</label>
                            <select placeholder="Select Building"
                                    name="building"
                                    onChange={handleChange}
                                    className="customInput py-2 px-3 w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                                <option key={undefined} value={undefined}></option>
                                {buildings.map((value, index) => <option key={index}
                                                                         value={value.id}> {value.name} </option>)}
                            </select>
                        </div>

                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                        <div>
                            <label
                                className=" text-sm text-gray-700 font-medium dark:text-white">how many need to be
                                replaced?</label>
                            <input placeholder="Enter number"
                                   name="replacedBulbCount"
                                   onChange={handleChange}
                                   type="number"
                                   className="customInput py-2 px-3  w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                        </div>
                        <div>
                            <label
                                className="Medicine text-sm text-gray-700 font-medium dark:text-white">date</label>
                            <input placeholder="Select Date"
                                   name="date"
                                   value={bulbReplacementTask?.date ? new Date(bulbReplacementTask.date).toISOString().substring(0, 16) : ''}
                                   onChange={handleChange}
                                   type="datetime-local"
                                   className="customInput py-2 px-3  w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
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
    </Fragment>;
}
export default AddBulbReplacementTask;