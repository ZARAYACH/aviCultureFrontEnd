import React, {Fragment, useState} from "react";
import Medicine from "../health/Medicine";
import {useAxios} from "../../configuration/AxiosConfiguration";
import VaccinationTask, {VaccinationTaskType} from "./VaccinationTask";
import {useLocation, useNavigate} from "react-router-dom";
import Block from "../Breeding/Block/Block";
import Disease from "../health/Disease";
import tasksCalendar from "./TasksCalendar";

interface AddVaccinationTaskProps {
    medicines: Medicine[],
    blocks: Block[],
    diseases: Disease[]
}

const AddVaccinationTask = ({medicines, blocks, diseases}: AddVaccinationTaskProps) => {
    const {axiosInstance} = useAxios();
    const {state} = useLocation();
    const [vaccinationTask, setVaccinationTask] = useState<VaccinationTask>({
        id: undefined,
        type: VaccinationTaskType.PRINCIPAL,
        block: undefined,
        date: new Date(state.start),
        disease: undefined
    });
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target;

        setVaccinationTask((prevState) => {
            console.log(prevState)
                return {
                    ...prevState,
                    [name]: type === 'number' ? (value !== '' ? parseFloat(value) : null) : value,
                    [name]: name === 'block' ? blocks.find(block => block.id == parseInt(value)) :
                        name === 'date' ? new Date(value) : name === 'disease' ? diseases.find(disease => disease.id == parseInt(value)) : value,
                }
            }
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Make a POST request to your API using Axios
        axiosInstance
            .post(process.env.REACT_APP_API_PREFIX + '/vaccination-tasks/add', vaccinationTask)
            .then((response) => {
                navigate(-1);
            }).catch((error) => {
            console.error('Failed to add bulbReplacementTask', error);
        });
    };


    return <Fragment>
        <div className="mt-10  border-t-gray-600">
            <div className="w-full">
                <div className="grid gap-4 lg:gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                        <div>
                            <label
                                className="text-sm text-gray-700 font-medium dark:text-white">Type</label>
                            <select name="type"
                                    onChange={handleChange}
                                    className="customInput py-2 px-3 w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                                {Object
                                    .keys(VaccinationTaskType)
                                    .filter((v) => isNaN(Number(v)))
                                    .map((value, index) => <option key={index}
                                                                   value={value}> {value} </option>)
                                }
                            </select>
                        </div>
                        <div>
                            <label
                                className="text-sm text-gray-700 font-medium dark:text-white">block</label>
                            <select placeholder="Select Building"
                                    name="block"
                                    onChange={handleChange}
                                    className="customInput py-2 px-3 w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                                <option key={undefined} value={undefined}></option>
                                {blocks.map((value, index) => <option key={index}
                                                                      value={value.id}> {value.id} </option>)}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                        <div>
                            <label
                                className="text-sm text-gray-700 font-medium dark:text-white">Disease</label>
                            <select placeholder="Select Building"
                                    name="disease"
                                    onChange={handleChange}
                                    className="customInput py-2 px-3 w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                                <option key={undefined} value={undefined}></option>
                                {diseases.map((value, index) => <option key={index}
                                                                        value={value.id}> {value.name} </option>)}
                            </select>
                        </div>
                        <div>
                            <label
                                className="Medicine text-sm text-gray-700 font-medium dark:text-white">date</label>
                            <input placeholder="Select Date"
                                   name="date"
                                   value={vaccinationTask?.date ? new Date(vaccinationTask.date).toISOString().substring(0, 16) : ''}
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
export default AddVaccinationTask;