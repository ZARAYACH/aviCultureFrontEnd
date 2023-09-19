import React, {Fragment, useEffect, useState} from "react";
import Product from "../product/modal/Product";
import TransactionProductDetail from "./TransactionProductDetail";
import transactions from "./Transactions";

interface TransactionProductItemProps {
    products: Product[],
    updateTransactionProductsDetails: (transactionProductsDetail: TransactionProductDetail, transactionProductsDetailIndex: number) => void,
    transactionProductsDetailIndex: number,
    transactionProductDetail: TransactionProductDetail,
    removeTransactionProductsDetailsAtIndex: (transactionProductsDetailIndex: number) => void
}


const TransactionProductItem = ({
                                    updateTransactionProductsDetails,
                                    products,
                                    transactionProductsDetailIndex,
                                    transactionProductDetail,
                                    removeTransactionProductsDetailsAtIndex
                                }: TransactionProductItemProps) => {


    const [product, setProduct] = useState<Product | undefined>(() => products.find(product => product.id === transactionProductDetail.productId));
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target;
        if (name === 'productId') {
            setProduct(()=>products.find(product => product.id === value));
        }
        const updatedTransactionProductDetail = {
            ...transactionProductDetail,
            [name]: type === 'number' ? (value !== '' ? parseFloat(value) : null) : value,
            [name]: name === 'quantity' ? parseFloat(value) < 1 ? 1 : value : value,
        }
        updateTransactionProductsDetails(updatedTransactionProductDetail, transactionProductsDetailIndex)

    };
    return <Fragment>
        <div className="hidden sm:block border-b border-gray-200 dark:border-gray-700"></div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            <div className="col-span-full sm:col-span-2">
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Item</h5>
                <select onChange={handleChange}
                        disabled={transactionProductDetail.id !== undefined}
                        name='productId'
                        value={product?.id}
                        className="customInput m-0 py-2 px-3 w-11/12 border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                    <option key={0} value={undefined}></option>
                    {products.map((value, index) => <option key={index} value={value.id}>{value.name}</option>)}
                </select>
            </div>
            <div>
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Quantity</h5>
                <input type='number' name='quantity' disabled={transactionProductDetail.id !== undefined}
                       value={transactionProductDetail?.quantity ? transactionProductDetail?.quantity : 1}
                       onChange={handleChange}
                       className="customInput m-0 py-2 px-3 w-50 border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"></input>
            </div>
            <div>
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Unitary Price</h5>
                <input disabled={true}
                       className="customInput m-0 py-2 px-3 w-50 border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                       value={(product?.unitaryPrice ? product?.unitaryPrice : 0) + ' MAD'}/>
            </div>
            <div className={'text-right w-full'}>
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Amount</h5>
                <input disabled={true}
                       className="customInput m-0 py-2 w-full px-3 w-50 border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                       value={(product?.unitaryPrice ? transactionProductDetail?.quantity ? product?.unitaryPrice * transactionProductDetail?.quantity : product.unitaryPrice : 0) + ' MAD'}/>
            </div>
            <div className='text-right w-full '>
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">...</h5>
                <div className="h-px w-px whitespace-nowrap">
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
                                    <button disabled={transactionProductDetail.id !== undefined}
                                        onClick={() => removeTransactionProductsDetailsAtIndex(transactionProductsDetailIndex)}
                                        className="flex w-full items-center gap-x-3 py-2 px-3 rounded-md text-sm text-red-600 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-red-500 dark:hover:bg-gray-700">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
}
export default TransactionProductItem;