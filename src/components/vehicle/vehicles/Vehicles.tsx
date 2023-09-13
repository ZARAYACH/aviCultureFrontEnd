import React, { useState, useEffect, Fragment } from "react";
import { Link } from 'react-router-dom';

import axios from "axios";
// interface for the vehicle object
import Vehicle from './interfaces';
import { useAxios } from "../../../configuration/AxiosConfiguration";
import AddVehicles from "./AddVehicles";

export default function Vehicles() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]); // Provide the type annotation
    const { axiosInstance } = useAxios();
    const [isAddVehicle, setIsAddVehicleOpen] = useState(false);
    const toggleAddVehicles = () => {
        setIsAddVehicleOpen(!isAddVehicle);
    };

    useEffect(() => {
        axiosInstance
            .get(process.env.REACT_APP_API_PREFIX + "/api/v1/vehicles")
            .then((response) => {
                setVehicles(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching vehicles data :", error);
            });
    }, []);

    const deleteVehicle = (vehicleId: number) => {
        axiosInstance
            .delete(process.env.REACT_APP_API_PREFIX + "/api/v1/vehicles/" + vehicleId + "/delete")
            .then((response) => {
                setVehicles(vehicles.filter((vehicle, index) => vehicle.id != vehicleId))
            })
            .catch((error) => {
                console.error("Error fetching data :", error);
            });
    }
    // @ts-ignore
    return (
        <Fragment>
            {(isAddVehicle && <AddVehicles toggleModal={toggleAddVehicles} setVehicle={setVehicles}/>)}
            <div className="content-wrapper">
                {/* Table Section */}
                <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                    {/* Card */}
                    <div className="flex flex-col">
                        <div className="-m-1.5 overflow-x-auto">
                            <div className="p-1.5 min-w-full inline-vehicle align-middle">
                                <div
                                    className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                                    <div
                                        className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                                Vehicles
                                            </h2>
                                        </div>
                                        <div>
                                            <div className="inline-flex gap-x-2">
                                                <a className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                                                    href="#">
                                                    View all
                                                </a>
                                                <button
                                                    className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                                    onClick={toggleAddVehicles}>
                                                    <svg
                                                        className="w-3 h-3"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={16}
                                                        height={16}
                                                        viewBox="0 0 16 16"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2"
                                                            stroke="currentColor"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                        />
                                                    </svg>
                                                    Create
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="pl-6 py-3 text-left">
                                                    <label
                                                        htmlFor="hs-at-with-checkboxes-main"
                                                        className="flex"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            className="shrink-0 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                                            id="hs-at-with-checkboxes-main"
                                                        />
                                                        <span className="sr-only">Checkbox</span>
                                                    </label>
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left">
                                                    <div className="flex items-center gap-x-2">
                                                        <span
                                                            className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                            ID
                                                        </span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left">
                                                    <div className="flex items-center gap-x-2">
                                                        <span
                                                            className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                            type
                                                        </span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left">
                                                    <div className="flex items-center gap-x-2">
                                                        <span
                                                            className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                            marque
                                                        </span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left">
                                                    <div className="flex items-center gap-x-2">
                                                        <span
                                                            className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                            module
                                                        </span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left">
                                                    <div className="flex items-center gap-x-2">
                                                        <span
                                                            className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                            licence_plate
                                                        </span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left">
                                                    <div className="flex items-center gap-x-2">
                                                        <span
                                                            className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                            first_rolling_date
                                                        </span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left">
                                                    <div className="flex items-center gap-x-2">
                                                        <span
                                                            className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                            Drivers
                                                        </span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left">
                                                    <div className="flex items-center gap-x-2">
                                                        <span
                                                            className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                            documents
                                                        </span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left">
                                                    <div className="flex items-center gap-x-2">
                                                        <span
                                                            className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                            ...
                                                        </span>
                                                    </div>
                                                </th>

                                                <th scope="col" className="px-6 py-3 text-right" />
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {vehicles.map((vehicle) => (
                                                <tr key={vehicle.id}>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="pl-6 py-3">
                                                            <label htmlFor={"checkbox-" + vehicle.id}
                                                                className="flex">
                                                                <input id={"checkbox-" + vehicle.id}
                                                                    type="checkbox"
                                                                    className="shrink-0 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                                                                <span className="sr-only">Checkbox</span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                                {vehicle.id}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <div className="flex items-center gap-x-2">
                                                                <div class-Name="grow">
                                                                    <span
                                                                        className="text-sm text-gray-600 dark:text-gray-400">
                                                                        {vehicle.type}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <div className="flex items-center gap-x-2">
                                                                <div className="grow">
                                                                    <span
                                                                        className="text-sm text-gray-600 dark:text-gray-400">
                                                                        {vehicle.marque}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <div className="flex items-center gap-x-2">
                                                                <div className="grow">
                                                                    <span
                                                                        className="text-sm text-gray-600 dark:text-gray-400">
                                                                        {vehicle.module}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <div className="flex items-center gap-x-2">
                                                                <div className="grow">
                                                                    <span
                                                                        className="text-sm text-gray-600 dark:text-gray-400">
                                                                        {vehicle.licencePlate}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <div className="flex items-center gap-x-2">
                                                                <div className="grow">
                                                                    <span
                                                                        className="text-sm text-gray-600 dark:text-gray-400">
                                                                        {vehicle.firstRollingDate}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-3">
                                                            <div className="flex items-center gap-x-2">
                                                                <div className="grow">
                                                                    <span
                                                                        className="text-sm text-gray-600 dark:text-gray-400">
                                                                        {/*vehicle.documents*/}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="h-px w-px whitespace-nowrap">
                                                        <div className="px-6 py-1.5">
                                                            <div
                                                                className="hs-dropdown relative inline-vehicle [--placement:bottom-right]">
                                                                <button
                                                                    id="hs-table-dropdown-1"
                                                                    type="button"
                                                                    className="hs-dropdown-toggle py-1.5 px-2 inline-flex justify-center items-center gap-2 rounded-md text-gray-700 align-middle focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                                                                >
                                                                    <svg
                                                                        className="w-4 h-4"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width={16}
                                                                        height={16}
                                                                        fill="currentColor"
                                                                        viewBox="0 0 16 16"
                                                                    >
                                                                        <path
                                                                            d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                                                    </svg>
                                                                </button>
                                                                <div
                                                                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden mt-2 divide-y divide-gray-200 min-w-[10rem] z-10 bg-white shadow-2xl rounded-lg p-2 mt-2 dark:divide-gray-700 dark:bg-gray-800 dark:border dark:border-gray-700"
                                                                    aria-labelledby="hs-table-dropdown-1"
                                                                >
                                                                    <div className="py-2 first:pt-0 last:pb-0">
                                                                        <a
                                                                            className="flex items-center gap-x-3 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                                                            href=""
                                                                        >
                                                                            Edit
                                                                        </a>
                                                                        <a
                                                                            className="flex items-center gap-x-3 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                                                            href=""
                                                                        >
                                                                            Disable
                                                                        </a>
                                                                    </div>
                                                                    <div className="py-2 first:pt-0 last:pb-0">
                                                                        <a onClick={() => (vehicle.id && deleteVehicle(vehicle.id))}
                                                                            className="flex items-center gap-x-3 py-2 px-3 rounded-md text-sm text-red-600 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-red-500 dark:hover:bg-gray-700"
                                                                        >
                                                                            Delete
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {/* End Table */}
                                    {/* Footer */}
                                    <div
                                        className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <span className="font-semibold text-gray-800 dark:text-gray-200">
                                                    {vehicles.length}
                                                </span>{" "}
                                                results
                                            </p>
                                        </div>
                                        <div>
                                            <div className="inline-flex gap-x-2">
                                                <button
                                                    type="button"
                                                    className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                                                >
                                                    <svg
                                                        className="w-3 h-3"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={16}
                                                        height={16}
                                                        fill="currentColor"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                                                        />
                                                    </svg>
                                                    Prev
                                                </button>
                                                <button
                                                    type="button"
                                                    className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                                                >
                                                    Next
                                                    <svg
                                                        className="w-3 h-3"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={16}
                                                        height={16}
                                                        fill="currentColor"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}


