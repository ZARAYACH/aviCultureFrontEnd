import React, { Component, FormEvent } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeightScale, faWheatAwnCircleExclamation, faSkullCrossbones, faOilCan, faBuilding } from '@fortawesome/free-solid-svg-icons'


interface State {
    block: {
        id: number| null;
        dailyMortality: number | null;
        dailyGasCylinder: number | null;
        weightFirstWeek: number | null;
        weightEveryFeeding: number | null;
        weightByTheEnd: number | null;
        foodNature: string;
        foodQuantity: string;
    };
}

class AddBlock extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            block: {
                id: null,
                dailyMortality: null,
                dailyGasCylinder: null,
                weightFirstWeek: null,
                weightEveryFeeding: null,
                weightByTheEnd: null,
                foodNature: '',
                foodQuantity: '',
            }
        };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        this.setState((prevState) => ({
            block: {
                ...prevState.block,
                [name]: type === 'number' ? (value !== '' ? parseFloat(value) : null) : value,
            },

        }));
    };

    handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    
        const { block } = this.state;
    
        // Create a new block object based on your API's expected format
        const newBlock = {
          dailyMortality: block.dailyMortality,
          dailyGasCylinder: block.dailyGasCylinder,
          weightFirstWeek: block.weightFirstWeek,
          weightEveryFeeding: block.weightEveryFeeding,
          weightByTheEnd: block.weightByTheEnd,
          foodNature: block.foodNature,
          foodQuantity: block.foodQuantity,
        };
    
        // Make a POST request to your API using Axios
        axios
          .post('http://localhost:8080/api/v1/breeding-blocks/add', newBlock)
          .then((response) => {
            // Handle a successful response
            console.log('Block added successfully', response.data);
            // You can also reset the form or navigate to another page here
          })
          .catch((error) => {
            // Handle errors
            console.error('Failed to add block', error);
          });
      };

    render() {
        const { block } = this.state;

        return (
            <div className="global content-wrapper">
                {/* Hire Us */}
                <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                    <div className="max-w-xl mx-auto">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
                                Add new Block
                            </h1>
                        </div>
                        <div className="mt-12">
                            {/* Form */}
                            <form>
                                <div className="grid gap-4 lg:gap-6">
                                    {/* Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                        <div>
                                            <label htmlFor="hs-firstname-hire-us-2" className="block text-sm text-gray-700 font-medium dark:text-white">Daily Mortality</label>
                                            <input placeholder="Enter daily Mortality"
                                                name="dailyMortality"
                                                value={block.dailyMortality !== null ? block.dailyMortality.toString() : ''}
                                                onChange={this.handleChange}
                                                type="text"
                                                id="hs-firstname-hire-us-2"
                                                className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" />
                                        </div>
                                        <div>
                                            <label htmlFor="hs-lastname-hire-us-2" className="block text-sm text-gray-700 font-medium dark:text-white">Daily Gas Cylinder</label>
                                            <input placeholder="Enter daily Gas Cylinder"
                                                name="dailyGasCylinder"
                                                value={block.dailyGasCylinder !== null ? block.dailyGasCylinder.toString() : ''}
                                                onChange={this.handleChange}
                                                type="text"
                                                id="hs-lastname-hire-us-2"
                                                className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" />
                                        </div>
                                    </div>
                                    {/* End Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                        <div>
                                            <label htmlFor="hs-firstname-hire-us-2" className="block text-sm text-gray-700 font-medium dark:text-white">Weight First Week</label>
                                            <input placeholder="Enter daily Mortality"
                                                name="weightFirstWeek"
                                                value={block.weightFirstWeek !== null ? block.weightFirstWeek.toString() : ''}
                                                onChange={this.handleChange}
                                                type="text"
                                                id="hs-firstname-hire-us-2"
                                                className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" />
                                        </div>
                                        <div>
                                            <label htmlFor="hs-lastname-hire-us-2" className="block text-sm text-gray-700 font-medium dark:text-white">Weight Every Feeding</label>
                                            <input placeholder="Enter daily Gas Cylinder"
                                                name="weightEveryFeeding"
                                                value={block.weightEveryFeeding !== null ? block.weightEveryFeeding.toString() : ''}
                                                onChange={this.handleChange}
                                                type="text"
                                                id="hs-lastname-hire-us-2"
                                                className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" />
                                        </div>
                                    </div>
                                    {/* Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                        <div>
                                            <label htmlFor="hs-firstname-hire-us-2" className="block text-sm text-gray-700 font-medium dark:text-white">Weight By The End</label>
                                            <input placeholder="Enter the Weight By The End"
                                                name="weightByTheEnd"
                                                value={block.weightByTheEnd !== null ? block.weightByTheEnd.toString() : ''}
                                                onChange={this.handleChange}
                                                type="text"
                                                id="hs-firstname-hire-us-2"
                                                className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" />
                                        </div>
                                        <div>
                                            <label htmlFor="hs-lastname-hire-us-2" className="block text-sm text-gray-700 font-medium dark:text-white">Food Nature</label>
                                            <input placeholder="Enter the food Nature"
                                                name="foodNature"
                                                value={block.foodNature}
                                                onChange={this.handleChange}
                                                type="text"
                                                id="hs-lastname-hire-us-2"
                                                className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" />
                                        </div>
                                    </div>
                                    {/* End Grid */}
                                    {/* Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                        <div>
                                            <label htmlFor="hs-firstname-hire-us-2" className="block text-sm text-gray-700 font-medium dark:text-white">Food Quantity</label>
                                            <input placeholder="Enter the Weight By The End"
                                                name="foodQuantity"
                                                value={block.foodQuantity}
                                                onChange={this.handleChange}
                                                type="text"
                                                id="hs-firstname-hire-us-2"
                                                className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" />
                                        </div>
                                        <div>
                                            <label htmlFor="hs-lastname-hire-us-2" className="block text-sm text-gray-700 font-medium dark:text-white">Food Nature</label>
                                            <select className="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                                                <option selected>Choose Building</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                            </select>

                                        </div>
                                    </div>
                                    {/* End Grid */}
                                </div>
                                {/* End Grid */}
                                <div className="mt-6 grid">
                                    <button onClick={this.handleSubmit} type="submit" className="inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-sm lg:text-base text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800">Add</button>
                                </div>
                            </form>
                            {/* End Form */}
                        </div>
                    </div>
                </div>
                {/* End Hire Us */}

            </div>
        );
    }
}

export default AddBlock;
