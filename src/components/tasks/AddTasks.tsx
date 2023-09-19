import React, {Fragment, useEffect, useState} from 'react';
import {useAxios} from "../../configuration/AxiosConfiguration";
import {useNavigate} from "react-router-dom";
import Building from "../Breeding/buildings/Building";
import Medicine from "../health/Medicine";
import Disease from "../health/Disease";
import AddBulbReplacementTask from "./AddBulbReplacementTask";
import AddVaccinationTask from "./AddVaccinationTask";
import Block from "../Breeding/Block/Block";
import NotFound from "../NotFound";
import AddMedicineModal from "../health/AddMedicineModal";
import AddMedicineTask from "./AddMedicineTask";

enum typeOfTasks {
    vaccination = "VaccinationTask", medicines = "MedicationTask", bulbsReplacement = "BulbsReplacement"
}

function AddTasks() {
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [buildings, setBuildings] = useState<Building[]>([]);
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [diseases, setDiseases] = useState<Disease[]>([]);
    const [selectedType, setSelectedType] = useState<typeOfTasks>(typeOfTasks.vaccination);

    useEffect(() => {
        axiosInstance
            .get(process.env.REACT_APP_API_PREFIX + "/breeding-blocks")
            .then((response) => {
                setBlocks(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data :", error);
            });
        axiosInstance
            .get(process.env.REACT_APP_API_PREFIX + "/breeding-buildings")
            .then((response) => {
                setBuildings(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data :", error);
            });
        axiosInstance
            .get(process.env.REACT_APP_API_PREFIX + "/diseases")
            .then((response) => {
                setDiseases(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data :", error);
            });
        axiosInstance
            .get(process.env.REACT_APP_API_PREFIX + "/products/medicines")
            .then((response) => {
                setMedicines(response.data);
            })
            .catch((error) => {
                console.error("Eirror fetching data :", error);
            });
    }, []);

    const {axiosInstance} = useAxios();
    const navigate = useNavigate();
    const [building, setNewBuilding] = useState<Building>({
        id: undefined,
        name: undefined,
        nature: "BREEDING",
        state: "FREE",
        surface: undefined,
        breedingCenterId: undefined,
        temperature: undefined,
        humidityRate: undefined
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target;

        setNewBuilding((prevBlock) => ({
            ...prevBlock,
            [name]: type === 'number' ? (value !== '' ? parseFloat(value) : null) : value,
            [name]: name === 'centerId' ? parseInt(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        axiosInstance
            .post(process.env.REACT_APP_API_PREFIX + '/breeding-buildings/add', building)
            .then((response) => {
                setBuildings((prevCenters) => [...prevCenters, response.data as Building]);
            }).then()
            .catch((error) => {
                console.error('Failed to add block', error);
            });
    };
    console.log(selectedType)

    return (
        <Fragment>
            <div className='content-wrapper bg-white'>
                <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
                    <div
                        className="mb-5 pb-5 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Add New Task</h2>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                        <div>
                            <div className="grid space-y-3">
                                <dl className="grid sm:flex gap-x-3 text-sm items-center">
                                    <dt className="min-w-[150px] max-w-[200px] text-gray-500">
                                        Task type:
                                    </dt>
                                    <dd className="text-gray-800 dark:text-gray-200 w-full">
                                        <select id="changingTaskType"
                                                value={selectedType}
                                                onChange={({target}) => {
                                                    setSelectedType(target.value as typeOfTasks);
                                                }}
                                                className="customInput py-2 px-3 Medicine w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                                            {Object
                                                .values(typeOfTasks)
                                                .filter((v) => isNaN(Number(v)))
                                                .map(value => <option key={value} value={value}> {value} </option>)
                                            }
                                        </select>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    {selectedType === typeOfTasks.bulbsReplacement ?
                        <AddBulbReplacementTask buildings={buildings}/> :
                        selectedType === typeOfTasks.vaccination ?
                            <AddVaccinationTask medicines={medicines} blocks={blocks} diseases={diseases}/> :
                            selectedType === typeOfTasks.medicines ?
                                <AddMedicineTask blocks={blocks} diseases={diseases}/> : <NotFound/>}
                </div>
            </div>
        </Fragment>);
}

export default AddTasks;