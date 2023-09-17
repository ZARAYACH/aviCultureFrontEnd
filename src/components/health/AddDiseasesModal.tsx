import React, {useEffect, useState} from 'react';
import Disease from "./Disease";
import {useAxios} from "../../configuration/AxiosConfiguration";
import Medicine from "./Medicine";


interface AddDiseaseProps {
    toggleModal: () => void,
    setDiseases: React.Dispatch<React.SetStateAction<Disease[]>>
}

function AddDiseaseModal({toggleModal, setDiseases}: AddDiseaseProps) {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const {axiosInstance} = useAxios();
    const [disease, setNewDisease] = useState<Disease>({
        id: undefined,
        name: undefined,
        description: undefined,
        medicineIds: []
    });

    // Fetch Diseases data when the component mounts
    useEffect(() => {
        axiosInstance
            .get(process.env.REACT_APP_API_PREFIX + "/products/medicines")
            .then((response) => {
                setMedicines(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target;
        setNewDisease((prevDisease) => ({
            ...prevDisease,
            [name]: type === 'number' ? (value !== '' ? parseFloat(value) : null) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Make a POST request to your API using Axios
        axiosInstance
            .post(process.env.REACT_APP_API_PREFIX + '/diseases/add', disease)
            .then((response) => {
                setDiseases(prevState => [...prevState, response.data as Disease])
                toggleModal()
            }).catch((error) => {
            console.error('Failed to add Disease', error);
        });
    };

    return (
        <div className="absolute inset-0 flex items-start justify-center z-[1039]  ">
            <div className="fixed inset-0 flex items-start justify-center z-[1039] backdrop-blur-sm"
                 onClick={toggleModal}></div>
            <div>
                <div className="modal-container relative bg-white w-11/12 md:max-w-2xl mx-auto rounded shadow-lg shadow-black overflow-y-auto mt-5 align-items-lg-start"></div>
                <div className="modal-content py-4 text-left px-6 border-0 z-[1040]">
                    <div className=" mx-auto ">
                        <div className="text-center mb-3">
                            <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
                                Add new Disease
                            </h1>
                        </div>
                        <div className="mt-10  border-t-gray-600">
                            <div className="w-full">
                                <div className="grid gap-4 lg:gap-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                        <div>
                                            <label
                                                className="Disease text-sm text-gray-700 font-medium dark:text-white">Name</label>
                                            <input placeholder="Enter Disease name"
                                                   name="name"
                                                   onChange={handleChange}
                                                   type="text"
                                                   className="customInput py-2 px-3 w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                        </div>
                                        <div>
                                            <label
                                                className="Disease text-sm text-gray-700 font-medium dark:text-white">Description</label>
                                            <input placeholder="Enter Disease description"
                                                   name="description"
                                                   onChange={handleChange}
                                                   type="text"
                                                   className="customInput py-2 px-3 Disease w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
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

export default AddDiseaseModal;