import React, {useEffect, useState} from 'react';
import {useAxios} from "../../configuration/AxiosConfiguration";
import {MultiSelect, Option} from "react-multi-select-component";
import {CounterParty, CounterPartyType} from "./CounterParty";
import buildings from "../Breeding/buildings/Buildings";
import diseases from "../health/Diseases";
import {TransactionType} from "./Transaction";

interface AddCounterPartyProps {
    toggleModal: () => void,
    setCounterParties: React.Dispatch<React.SetStateAction<CounterParty[]>>
}

function AddCounterPartyModal({toggleModal, setCounterParties}: AddCounterPartyProps) {
    const {axiosInstance} = useAxios();
    const [selectedTypes, setSelectedTypes] = useState<Option[]>([]);
    const [newCounterParty, setNewCounterParty] = useState<CounterParty>({
        id: undefined,
        name: undefined,
        type: undefined,
        suppliesType: [],
        phoneNumber: undefined,
        emailAddress: undefined,
        address: undefined
    });

    useEffect(() => {
        setNewCounterParty(prevState => ({
            ...prevState,
            suppliesType: selectedTypes.map(option => option.value)
        }))
    }, [selectedTypes])


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Make a POST request to your API using Axios
        axiosInstance
            .post(process.env.REACT_APP_API_PREFIX + '/counter-parties/add', newCounterParty)
            .then((response) => {
                setCounterParties(prevState => [...prevState, response.data as CounterParty])
                toggleModal()
            }).catch((error) => {
            console.error('Failed to add CounterParty', error);
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target;
        setNewCounterParty((prevValue) => ({
            ...prevValue,
            [name]: type === 'number' ? (value !== '' ? parseFloat(value) : null) : value,
        }));
    };

    return (

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
                                Add new CounterParty
                            </h1>
                        </div>
                        <div className="mt-10  border-t-gray-600">
                            <div className="w-full">
                                <div className="grid gap-4 lg:gap-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                        <div>
                                            <label
                                                className="CounterParty text-sm text-gray-700 font-medium dark:text-white">Name</label>
                                            <input placeholder="Enter CounterParty name"
                                                   name="name"
                                                   onChange={handleChange}
                                                   type="text"
                                                   className="customInput py-2 px-3 w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                        </div>
                                        <div>
                                            <label
                                                className="CounterParty text-sm text-gray-700 font-medium dark:text-white">Email
                                                Address</label>
                                            <input placeholder="Enter emailAddress "
                                                   name="emailAddress"
                                                   onChange={handleChange}
                                                   type="text"
                                                   className="customInput py-2 px-3 CounterParty w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                        <div>
                                            <label
                                                className="CounterParty text-sm text-gray-700 font-medium dark:text-white">Address</label>
                                            <input placeholder="Enter address"
                                                   name="address"
                                                   onChange={handleChange}
                                                   type="text"
                                                   className="customInput py-2 px-3 CounterParty w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                        </div>
                                        <div>
                                            <label
                                                className="CounterParty text-sm text-gray-700 font-medium dark:text-white">Phone
                                                Number</label>
                                            <input placeholder="Enter quantity"
                                                   name="phoneNumber"
                                                   onChange={handleChange}
                                                   type="number"
                                                   className="customInput py-2 px-3 CounterParty w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                        <div>
                                            <label
                                                className="CounterParty text-sm text-gray-700 font-medium dark:text-white">Type</label>
                                            <select name="type"
                                                    onChange={handleChange}
                                                    className="customInput py-2 px-3 CounterParty w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                                                <option value={undefined}></option>
                                                {Object
                                                    .keys(CounterPartyType)
                                                    .filter((v) => isNaN(Number(v)))
                                                    .map((value, index) => <option key={index}
                                                                                   value={value}> {value} </option>)
                                                }
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                className="CounterParty text-sm text-gray-700 font-medium dark:text-white">Supply
                                                Types</label>
                                            <MultiSelect isCreatable={true}
                                                         labelledBy='supply types'
                                                         options={selectedTypes}
                                                         value={selectedTypes}
                                                         onChange={setSelectedTypes} />
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
        </div>

    );
}

export default AddCounterPartyModal;