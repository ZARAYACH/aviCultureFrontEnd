import React, { Component, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeightScale, faWheatAwnCircleExclamation, faSkullCrossbones, faOilCan,faBuilding } from '@fortawesome/free-solid-svg-icons'


interface State {
    block: {
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
        // Perform your form submission or other logic here
        console.log(this.state);
    };

    render() {
        const { block } = this.state;

        return (
            <div className="global">
                <div className="row position-relative text-light">
                    <div id="LoginForm" data-bs-spy="scroll"
                        data-bs-smooth-scroll="true" className="row rounded mx-auto my-5 scrollspy-example" >
                        <div className="position-relative pt-5 text-light">
                            <form onSubmit={this.handleSubmit}>
                                <h3 className="fs-1 ">Add new Block </h3>
                                <div className="form-group ">
                                    <label htmlFor="dailyMortalit" className="form-label">
                                        Daily Mortality
                                    </label>
                                    <div className="input input-group mb-4">
                                        <span className="input-group-text ">
                                            <i className="bi bi-emoji-dizzy"></i>
                                        </span>
                                        <input
                                            id="inp"
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter daily Mortality"
                                            name="dailyMortality"
                                            value={block.dailyMortality !== null ? block.dailyMortality.toString() : ''}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group ">
                                    <label htmlFor="dailyGasCylinder" className="form-label">
                                        Daily Gas Cylinder
                                    </label>
                                    <div className="input input-group mb-4">
                                        <span className="input-group-text ">
                                            <FontAwesomeIcon icon={faOilCan} />
                                        </span>
                                        <input
                                            id="inp"
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter daily Gas Cylinder"
                                            name="dailyGasCylinder"
                                            value={block.dailyGasCylinder !== null ? block.dailyGasCylinder.toString() : ''}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group ">
                                    <label htmlFor="weightFirstWeek" className="form-label">
                                        Weight First Week
                                    </label>
                                    <div className="input input-group mb-4">
                                        <span className="input-group-text ">
                                            <FontAwesomeIcon icon={faWeightScale} />
                                        </span>
                                        <input
                                            id="inp"
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter the weight First Week"
                                            name="weightFirstWeek"
                                            value={block.weightFirstWeek !== null ? block.weightFirstWeek.toString() : ''}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group ">
                                    <label htmlFor="weightEveryFeeding" className="form-label">
                                        Weight Every Feeding
                                    </label>
                                    <div className="input input-group mb-4">
                                        <span className="input-group-text ">
                                            <FontAwesomeIcon icon={faWeightScale} />
                                        </span>
                                        <input
                                            id="inp"
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter the  Weight Every Feeding"
                                            name="weightEveryFeeding"
                                            value={block.weightEveryFeeding !== null ? block.weightEveryFeeding.toString() : ''}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group ">
                                    <label htmlFor="weightByTheEnd" className="form-label">
                                        Weight By The End
                                    </label>
                                    <div className="input input-group mb-4">
                                        <span className="input-group-text ">
                                            <FontAwesomeIcon icon={faWeightScale} />
                                        </span>
                                        <input
                                            id="inp"
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter the Weight By The End"
                                            name="weightByTheEnd"
                                            value={block.weightByTheEnd !== null ? block.weightByTheEnd.toString() : ''}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group ">
                                    <label htmlFor="foodNature" className="form-label">
                                        Food Nature
                                    </label>
                                    <div className="input input-group mb-4">
                                        <span className="input-group-text ">
                                            <FontAwesomeIcon icon={faWheatAwnCircleExclamation} />
                                        </span>
                                        <input
                                            id="inp"
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter the food Nature"
                                            name="foodNature"
                                            value={block.foodNature}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group ">
                                    <label htmlFor="foodNature" className="form-label">
                                        Food Quantity
                                    </label>
                                    <div className="input input-group mb-4">
                                        <span className="input-group-text ">
                                            <FontAwesomeIcon icon={faWheatAwnCircleExclamation} />
                                        </span>
                                        <input
                                            id="inp"
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter the foodQuantity"
                                            name="foodQuantity"
                                            value={block.foodQuantity}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group ">
                                    <label htmlFor="dailyMortalit" className="form-label">
                                        Daily Mortality
                                    </label>
                                    <div className="input input-group mb-4">
                                        <span className="input-group-text ">
                                            <FontAwesomeIcon icon={faSkullCrossbones} />
                                        </span>
                                        <input
                                            id="inp"
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter daily Mortality"
                                            name="dailyMortality"
                                            value={block.dailyMortality !== null ? block.dailyMortality.toString() : ''}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group ">
                                    <label htmlFor="dailyMortalit" className="form-label">
                                        Building
                                    </label>
                                    
                                    <div className="form-floating input input-group mb-4">
                                        <span className="input-group-text ">
                                        <FontAwesomeIcon icon={faBuilding} />
                                        </span>
                                        <select  className="form-select" id="floatingSelect" aria-label="Floating label select example">
                                            <option selected>Choose Building</option>
                                            <option value="1">Building One</option>
                                            <option value="2">Building Two</option>
                                            <option value="3">Building Three</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="BTN">
                            <button id="btn2" type="submit">
                                Sumbet
                            </button>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default AddBlock;
