import React, {Fragment, useEffect, useState} from "react";
import {useAxios} from "../../configuration/AxiosConfiguration";
import {Transaction, TransactionType} from "./Transaction";
import {Link, useNavigate} from "react-router-dom";
import Product from "../product/modal/Product";
import {CounterParty} from "./CounterParty";
import {counter} from "@fortawesome/fontawesome-svg-core";
import AddCounterPartyModal from "./AddCounterPartyModal";

const CounterParties = () => {
    const [counterParties, setCounterParties] = useState<CounterParty[]>([]);
    const {axiosInstance} = useAxios();
    const navigate = useNavigate();
    const [isAddCounterPartyModalOpen, setIsAddCounterPartyModalOpen] = useState(false);
    const toggleAddCounterPartyModal = () => {
        setIsAddCounterPartyModalOpen(!isAddCounterPartyModalOpen);
    };    useEffect(() => {
        axiosInstance
            .get(process.env.REACT_APP_API_PREFIX + "/counter-parties")
            .then((response) => {
                setCounterParties(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data :", error);
            });
    }, []);
    const deleteCounterParties = (id: number) => {
        axiosInstance
            .delete(process.env.REACT_APP_API_PREFIX + "/counter-parties/" + id + "/delete")
            .then((response) => {
                setCounterParties(counterParties.filter((counterParty => counterParty.id !== id)))
            }).catch((error) => {
            console.error("Error fetching data :", error);
        });
    }
    const handleRowClick = (transactionId: number) => {
        // navigate(transactionId)
    }

    return (
            <Fragment>
                {(isAddCounterPartyModalOpen &&
                    <AddCounterPartyModal toggleModal={toggleAddCounterPartyModal} setCounterParties={setCounterParties}/>)}

                <div className="content-wrapper">
                <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                    <div className="flex flex-col">
                        <div className="-m-1.5 overflow-x-auto">
                            <div className="p-1.5 min-w-full inline-block align-middle">
                                <div
                                    className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                                    <div
                                        className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                                CounterParties
                                            </h2>
                                        </div>
                                        <div>
                                            <div className="inline-flex gap-x-2">
                                                <a className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                                                   href="#">
                                                    View all
                                                </a>
                                                <button onClick={toggleAddCounterPartyModal} className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                                    <svg className="w-3 h-3"
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         width={16}
                                                         height={16}
                                                         viewBox="0 0 16 16"
                                                         fill="none">
                                                        <path
                                                            d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2"
                                                            stroke="currentColor"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"/>
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
                                                    htmlFor="all"
                                                    className="flex"
                                                >
                                                    <input id="all"
                                                           type="checkbox"
                                                           className="shrink-0 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"/>
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
                                                        name
                                                    </span>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left">
                                                <div className="flex items-center gap-x-2">
                                                    <span
                                                        className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                      emailAddress
                                                    </span>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left">
                                                <div className="flex items-center gap-x-2">
                                                    <span
                                                        className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                        Phone Number
                                                    </span>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left">
                                                <div className="flex items-center gap-x-2">
                                                    <span
                                                        className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                        Type
                                                    </span>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left">
                                                <div className="flex items-center gap-x-2">
                                                    <span
                                                        className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                        Address
                                                    </span>
                                                </div>
                                            </th>

                                            <th scope="col" className="px-6 py-3 text-left">
                                                <div className="flex items-center gap-x-2">
                                                    <span
                                                        className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                        Supply Types
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
                                            <th scope="col" className="px-6 py-3 text-right"/>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {counterParties.map((counterParty, index) => (
                                            <tr onClick={() => handleRowClick(counterParty.id ? counterParty.id : 0)}
                                                key={index}
                                                className='hover:bg-gray-100 cursor-pointer'>
                                                <td className="h-px w-px whitespace-nowrap">
                                                    <div className="pl-6 py-3">
                                                        <label htmlFor={"checkbox-" + counterParty.id}
                                                               className="flex"
                                                        >
                                                            <input id={"checkbox-" + counterParty.id}
                                                                   type="checkbox"
                                                                   className="shrink-0 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"/>
                                                            <span className="sr-only">Checkbox</span>
                                                        </label>
                                                    </div>
                                                </td>
                                                <td className="h-px w-px whitespace-nowrap">
                                                    <div className="px-6 py-3">
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                                            {counterParty.id}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="h-px w-px whitespace-nowrap">
                                                    <div className="px-6 py-3">
                                                        <div className="flex items-center gap-x-2">
                                                            <div className="grow">
                                                                <span
                                                                    className="text-sm text-gray-600 dark:text-gray-400">
                                                                    {counterParty.name}
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
                                                                    {counterParty.emailAddress}
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
                                                                    {counterParty.phoneNumber}                                                                </span>
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
                                                                    {counterParty.type}
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
                                                                    {counterParty.address}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="h-px w-px whitespace-nowrap">
                                                    <div className="px-6 py-3">
                                                        <div className="flex items-center gap-x-2">
                                                            <div className="grow">
                                                                {counterParty.suppliesType?.map(type => {
                                                                    return <span
                                                                        className="inline-flex items-center rounded-md border-2 border-muted-1 bg-stone-200	 px-2 py-1 text-sm font-bold text-heading shadow-sm mr-1">
                                                                        {type}</span>;
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="h-px w-px whitespace-nowrap">
                                                    <div className="px-6 py-1.5">
                                                        <div
                                                            className="hs-dropdown relative inline-block [--placement:bottom-right]">
                                                            <button id="hs-table-dropdown-1"
                                                                    type="button"
                                                                    className="hs-dropdown-toggle py-1.5 px-2 inline-flex justify-center items-center gap-2 rounded-md text-gray-700 align-middle focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                                                                <svg
                                                                    className="w-4 h-4"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width={16}
                                                                    height={16}
                                                                    fill="currentColor"
                                                                    viewBox="0 0 16 16">
                                                                    <path
                                                                        d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
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
                                                                    <a onClick={() => (counterParty.id && deleteCounterParties(counterParty.id))}
                                                                       className="flex items-center gap-x-3 py-2 px-3 rounded-md text-sm text-red-600 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-red-500 dark:hover:bg-gray-700">
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
                                    <div
                                        className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                            <span className="font-semibold text-gray-800 dark:text-gray-200">
                                                {counterParties.length}
                                            </span>{" "}
                                                results
                                            </p>
                                        </div>
                                        <div>
                                            <div className="inline-flex gap-x-2">
                                                <button type="button"
                                                        className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                                                    <svg className="w-3 h-3"
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         width={16}
                                                         height={16}
                                                         fill="currentColor"
                                                         viewBox="0 0 16 16">
                                                        <path fillRule="evenodd"
                                                              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                                    </svg>
                                                    Prev
                                                </button>
                                                <button type="button"
                                                        className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">Next
                                                    <svg className="w-3 h-3"
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         width={16}
                                                         height={16}
                                                         fill="currentColor"
                                                         viewBox="0 0 16 16">
                                                        <path fillRule="evenodd"
                                                              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
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

export default CounterParties;