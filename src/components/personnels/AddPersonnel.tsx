import React, {Fragment, useEffect, useState} from "react";
import User, {Gender, Role} from "./User";
import {useAxios} from "../../configuration/AxiosConfiguration";
import {MultiSelect, Option} from "react-multi-select-component";
import {useAuth} from "../../provider/AuthProvider";

interface AddPersonnelProps {
    toggleModal: () => void,
    setPersonnels: React.Dispatch<React.SetStateAction<User[]>>
}

const AddPersonnel = ({toggleModal, setPersonnels}: AddPersonnelProps) => {
    const {axiosInstance} = useAxios();
    const [user, setNewUser] = useState<User>({
        id: undefined,
        cin: undefined,
        firstName: undefined,
        lastName: undefined,
        functionName: undefined,
        isDriver: false,
        salary: undefined,
        phoneNumber: undefined,
        isActive: true,
        birthDate: undefined,
        roles: [],
        gender: undefined,
        email: undefined,
        imagePath: undefined,
        password: undefined
    });
    const [roles, setRoles] = useState<Role[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<Option[]>([]);
    useAuth()

    useEffect(() => {
        setNewUser(prevState => ({
            ...prevState,
            roles: selectedRoles.map(option => {
                return {
                    id: option.value,
                    name: option.label
                } as Role
            })
        }))
    }, [selectedRoles])

    useEffect(() => {
        axiosInstance
            .get(process.env.REACT_APP_API_PREFIX + '/users/roles')
            .then((response) => {
                setRoles(response.data as Role[])
            }).catch((error) => {
            console.error('Failed to add block', error);
        });
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target;

        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: type === 'number' ? (value !== '' ? parseFloat(value) : null) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Make a POST request to your API using Axios
        axiosInstance
            .post(process.env.REACT_APP_API_PREFIX + '/users/add', user)
            .then((response) => {
                if (response.data){
                    setPersonnels(prevState => [...prevState, response.data as User])
                    toggleModal()
                }
            }).catch((error) => {
            console.error('Failed to add user', error);
        });
    };


    return (
        <div className="absolute inset-0 flex items-start justify-center z-[1039]  ">
            <div className="fixed inset-0 flex items-start justify-center z-[1039] backdrop-blur-sm"
                 onClick={toggleModal}></div>
            <div
                className="modal-container bg-white w-11/12 md:max-w-2xl mx-auto rounded shadow-lg shadow-black overflow-y-auto mt-5 align-items-lg-start">
                <div className="modal-content py-4 text-left px-6 border-0 z-[1040]">
                    <div className=" w-full mx-auto ">
                        <div className="text-center mb-3">
                            <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
                                Add new Personnel
                            </h1>
                        </div>
                        <div className="mt-10  border-t-gray-600">
                            <div className="w-full">
                                <div className="grid gap-4 lg:gap-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                        <div>
                                            <label
                                                className="block text-sm text-gray-700 font-medium dark:text-white">CIN</label>
                                            <input placeholder="Enter cin"
                                                   name="cin"
                                                   value={user.cin ? user.cin : ''}
                                                   onChange={handleChange}
                                                   type="text"
                                                   className="customInput py-2 px-3 block w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                        </div>
                                        <div>
                                            <label
                                                className="block text-sm text-gray-700 font-medium dark:text-white">First
                                                name</label>
                                            <input placeholder="Enter First name"
                                                   name="firstName"
                                                   value={user.firstName ? user.firstName : ''}
                                                   onChange={handleChange}
                                                   type="text"
                                                   className="customInput py-2 px-3 block w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                        <div>
                                            <label className="block text-sm text-gray-700 font-medium dark:text-white">Last
                                                name</label>
                                            <input placeholder="Enter Last name"
                                                   name="lastName"
                                                   value={user.lastName ? user.lastName : ''}
                                                   onChange={handleChange}
                                                   type="text"
                                                   className="customInput py-2 px-3 block w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-700 font-medium dark:text-white">Email</label>
                                            <input placeholder="Enter email"
                                                   name="email"
                                                   onChange={handleChange}
                                                   type="email"
                                                   className="customInput py-2 px-3 block w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                        <div>
                                            <label
                                                className="block text-sm text-gray-700 font-medium dark:text-white">Password</label>
                                            <input placeholder="Enter Password "
                                                   name="password"
                                                   onChange={handleChange}
                                                   type="password"
                                                   className="customInput py-2 px-3 block w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                        </div>
                                        <div>
                                            <label
                                                className="block text-sm text-gray-700 font-medium dark:text-white">Gender</label>
                                            <select name="gender"
                                                    value={user.gender ? user.gender : ''}
                                                    onChange={handleChange}
                                                    className="customInput py-2 px-3 block w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                                                {Object
                                                    .keys(Gender)
                                                    .filter((v) => isNaN(Number(v)))
                                                    .map(value => <option key={value} value={value}> {value} </option>)
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                        <div>
                                            <label
                                                className="block text-sm text-gray-700 font-medium dark:text-white">Roles</label>
                                            <MultiSelect options={roles
                                                .map(value => {
                                                    return {
                                                        value: value.id,
                                                        label: value.name,
                                                        key: 'option-' + value.id
                                                    }
                                                })} value={selectedRoles} onChange={setSelectedRoles}
                                                         labelledBy={"rolesSelect"}/>

                                        </div>
                                        <div>
                                            <label
                                                className="block text-sm text-gray-700 font-medium dark:text-white">Birth
                                                Date</label>
                                            <input
                                                name="birthDate"
                                                onChange={handleChange}
                                                type="date"
                                                className="customInput py-2 px-3 pr-9 block w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mt-3">
                                    <div>
                                        <label
                                            className="block text-sm text-gray-700 font-medium dark:text-white">is Active</label>
                                        <select name="isActive"
                                                onChange={handleChange}
                                                className="customInput py-2 px-3 pr-9 block w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                                            <option value="true">true</option>
                                            <option value="false">false</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label
                                            className="block text-sm text-gray-700 font-medium dark:text-white">Phone
                                            Number</label>
                                        <input
                                            placeholder={"Enter Phone Number"}
                                            name="phoneNumber"
                                            onChange={handleChange}
                                            type="text"
                                            className="customInput py-2 px-3 pr-9 block w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mt-3">
                                    <div>
                                        <label
                                            className="block text-sm text-gray-700 font-medium dark:text-white">Salary</label>
                                        <input name="salary"
                                               type="number"
                                               placeholder="Entre salary"
                                               onChange={handleChange}
                                               className="customInput py-2 px-3 pr-9 block w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                                    </div>
                                    <div>
                                        <label
                                            className="block text-sm text-gray-700 font-medium dark:text-white">Function
                                            name</label>
                                        <input placeholder="Entre Function name"
                                            name="functionName"
                                            onChange={handleChange}
                                            type="text"
                                            className="customInput py-2 px-3 pr-9 block w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
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

export default AddPersonnel;