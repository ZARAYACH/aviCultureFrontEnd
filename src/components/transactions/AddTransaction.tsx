import React, {useEffect, useState} from 'react';
import {useAxios} from "../../configuration/AxiosConfiguration";
import {Transaction, TransactionType} from "./Transaction";
import Product from "../product/modal/Product";
import {CounterParty, CounterPartyType} from "./CounterParty";
import TransactionProductDetail from "./TransactionProductDetail";
import TransactionProductItem from "./TransactionProductItem";
import {log} from "console";
import {useNavigate, useParams} from "react-router-dom";
import NotFound from "../NotFound";

function AddTransaction() {
    const [products, setProducts] = useState<Product[]>([]);
    const {transactionId} = useParams()
    const [counterParties, setCounterParties] = useState<CounterParty[]>([])
    const [transactionProductDetails, setTransactionProductDetails] = useState<TransactionProductDetail[]>([])
    const {axiosInstance} = useAxios();
    const [notFound, setNotFound] = useState<boolean>(false);
    const navigate = useNavigate();
    const [transaction, setNewTransaction] = useState<Transaction>({
        id: undefined,
        counterParty: undefined,
        type: TransactionType.SELES,
        transactionProductsDetails: [],
        timeStamp : undefined
    });
    useEffect(() => {
        if (transactionId){
            axiosInstance
                .get(process.env.REACT_APP_API_PREFIX + '/transactions/' +  transactionId  )
                .then((response) => {
                    setNewTransaction(response.data)
                    setTransactionProductDetails((response.data as Transaction).transactionProductsDetails)
                }).catch((error) => {
                return <NotFound />
            });
        }
    },[transactionId])


    const updateTransactionProductsDetails = (transactionProductDetail: TransactionProductDetail, transactionProductDetailIndex: number) => {
        setTransactionProductDetails(prevState => {
            const updatedDetails = [
                ...prevState,
            ];
            updatedDetails[transactionProductDetailIndex] = transactionProductDetail
            return updatedDetails;
        });
    }
    const removeTransactionProductsDetailsAtIndex = (transactionProductDetailIndex: number) => {
        setTransactionProductDetails((prevState) => {
            const updatedTransaction = [
                ...prevState
            ];
            delete updatedTransaction[transactionProductDetailIndex];
            return updatedTransaction;
        });

    }
    useEffect(() => {
        setNewTransaction(prevState => {
            return {
                ...prevState,
                transactionProductsDetails: transactionProductDetails
            }
        })
    }, [transactionProductDetails])

    // Fetch Transactions data when the component mounts
    useEffect(() => {
        axiosInstance
            .get(process.env.REACT_APP_API_PREFIX + "/counter-parties", {params: {type: transaction.type === TransactionType.SELES ? CounterPartyType.CUSTOMER : CounterPartyType.SUPPLIER}})
            .then((response) => {
                setCounterParties(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, [transaction.type]);

    useEffect(() => {
        axiosInstance
            .get(process.env.REACT_APP_API_PREFIX + "/products")
            .then((response) => {
                setProducts(response.data);
                console.log(response.data)

            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target;
        setNewTransaction((prevTransaction) => ({
            ...prevTransaction,
            [name]: type === 'number' ? (value !== '' ? parseFloat(value) : null) : value,
            [name]: name === 'counterParty' ? counterParties.find(counterParty => counterParty.id == parseFloat(value)) : value
        }));
        console.log(transaction)
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Make a POST request to your API using Axios
        axiosInstance
            .post(process.env.REACT_APP_API_PREFIX + '/transactions/add', transaction)
            .then((response) => {
                navigate("/dashboard/transactions")
            }).catch((error) => {
            console.error('Failed to add Transaction', error);
        });
    };
    const calculateTotal = () => {
        let total = 0;
        transaction.transactionProductsDetails.forEach(value => {
            const price = products.find(product => product.id === value.productId)?.unitaryPrice;
            total += price ? price * (value?.quantity ? value?.quantity : 1) : 0
        })
        return total;
    }

    return (
        <div className='content-wrapper bg-white'>
            <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
                <div
                    className="mb-5 pb-5 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Add New Transaction</h2>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                    <div>
                        <div className="grid space-y-3">
                            <dl className="grid sm:flex gap-x-3 text-sm items-center">
                                <dt className="min-w-[150px] max-w-[200px] text-gray-500">
                                    Transaction type:
                                </dt>
                                <dd className="text-gray-800 dark:text-gray-200 w-full">
                                    <select name="type"
                                            disabled={transactionId !== undefined}
                                            value={transaction.type}
                                            onChange={handleChange}
                                            className="customInput m-0 py-2 px-3 w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                                        {Object
                                            .keys(TransactionType)
                                            .filter((v) => isNaN(Number(v)))
                                            .map(value => <option key={value} value={value}> {value} </option>)
                                        }
                                    </select>
                                </dd>
                            </dl>

                            <dl className="grid sm:flex gap-x-3 text-sm items-center">
                                <dt className="min-w-[150px] max-w-[200px] text-gray-500">
                                    Counter Party:
                                </dt>
                                <dd className="font-medium text-gray-800 dark:text-gray-200 w-full items-center">
                                    <select name="counterParty"
                                            disabled={transactionId !== undefined}
                                            value={transaction.counterParty?.id}
                                            onChange={handleChange}
                                            className="customInput m-0 py-2 px-3 w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                                        <option value={undefined}></option>
                                        {counterParties.map(value => <option key={value.id}
                                                                             value={value.id}>{value.name}</option>)}
                                    </select>
                                </dd>
                            </dl>

                            <dl className="grid sm:flex gap-x-3 text-sm w-full items-start mt-4">
                                <dt className="min-w-[150px] max-w-[200px] text-gray-500">
                                    Counter Party details:
                                </dt>
                                <dd className="font-medium text-gray-800 dark:text-gray-200">
                                    <span className="block font-semibold">{transaction.counterParty?.name}</span>
                                    <address className="not-italic font-normal m-0">
                                        {transaction.counterParty?.emailAddress} • {transaction.counterParty?.phoneNumber}<br/>
                                        {transaction.counterParty?.address}
                                    </address>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div className="mt-6 border border-gray-200 p-4 rounded-lg space-y-4 dark:border-gray-700">
                    <div className="hidden sm:grid sm:grid-cols-6 items-center">
                        <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">Item</div>
                        <div className="text-left text-xs font-medium text-gray-500 uppercase">Quantity</div>
                        <div className="text-left text-xs font-medium text-gray-500 uppercase">Unitary price</div>
                        <div className="text-right text-xs font-medium text-gray-500 uppercase">Amount</div>
                        <div className="text-right font-medium text-gray-500 text-lg uppercase">...</div>
                    </div>

                    {transactionProductDetails.map((value, index) =>
                        <TransactionProductItem key={index} products={products}
                                                updateTransactionProductsDetails={updateTransactionProductsDetails}
                                                transactionProductsDetailIndex={index}
                                                transactionProductDetail={value}
                                                removeTransactionProductsDetailsAtIndex={removeTransactionProductsDetailsAtIndex}/>
                    )}

                    <div className="sm:hidden border-b border-gray-200 dark:border-gray-700"></div>

                    <div className={`${transactionId ? 'hidden' : ''} grid grid-cols-3 sm:grid-cols-5 gap-2`}>
                        <div className="col-span-full sm:col-span-2">
                            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">new Transaction</h5>
                            <button

                                onClick={() => {
                                    setTransactionProductDetails(prevState => {
                                        const updatedArray = prevState.filter(value => value)
                                            .map(value => value)
                                        updatedArray.push({
                                            id: undefined,
                                            quantity: 1,
                                            productId: undefined,
                                            expirationDate: undefined
                                        })
                                        return updatedArray;
                                    });
                                }}
                                className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-900 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
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
                                Add Product to Transaction
                            </button>
                        </div>
                    </div>

                </div>
                <div className="mt-8 flex sm:justify-end">
                    <div className="w-full max-w-2xl sm:text-right space-y-2">
                        <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                            <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
                                <dt className="col-span-3 text-gray-500">SubTotal:</dt>
                                <dd className="col-span-2 font-medium text-gray-800 dark:text-gray-200">{calculateTotal() + ' MAD'}</dd>
                            </dl>

                            <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
                                <dt className="col-span-3 text-gray-500">Tax :</dt>
                                <dd className="col-span-2 font-medium text-gray-800 dark:text-gray-200">0 %</dd>
                            </dl>

                            <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
                                <dt className="col-span-3 text-gray-500"> Total:</dt>
                                <dd className="col-span-2 font-medium text-gray-800 dark:text-gray-200">{calculateTotal() + ' MAD'}</dd>
                            </dl>

                            <dl className={`${transactionId ? 'hidden' : ''} grid sm:grid-cols-2 gap-x-3 text-sm`} >
                                <div className={'w-full'}></div>
                                <button onClick={handleSubmit} type="submit"
                                        className="inline-flex justify-center mt-3 items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-lg lg:text-base text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800">Add Transaction
                                </button>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTransaction;