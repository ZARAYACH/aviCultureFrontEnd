import React, {Fragment, useEffect, useState} from 'react';
import {useAxios} from "../../configuration/AxiosConfiguration";
import {useNavigate} from "react-router-dom";
import Building from "../Breeding/buildings/Building";
import Medicine from "../health/Medicine";
import Disease from "../health/Disease";
import {VaccinationTaskType} from "./VaccinationTask";
import Medicines from "../health/Medicines";
import {TransactionType} from "../transactions/Transaction";

enum typeOfTasks{
    vaccination = "VaccinationTask" , medicines = "MedicationTask", bulbsReplacement = "bulbsReplacement"
}

function AddTasks() {
    const [buildings, setBuildings] = useState<Building[]>([]);
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [diseases, setDiseases] = useState<Disease[]>([]);
    const [selectedType, setSelectedType] = useState<typeOfTasks>(typeOfTasks.medicines);


    useEffect(() => {
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


    return (
        <Fragment>
            <div className="content-wrapper">
                <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto ">
                    <div>
                        <select onChange={({target})=>{
                            setSelectedType(target.value as typeOfTasks);
                        }}>
                            {Object
                                .keys(typeOfTasks)
                                .filter((v) => isNaN(Number(v)))
                                .map(value => <option key={value} value={value}> {value} </option>)
                            }
                        </select>
                    </div>

                </div>
            </div>
        </Fragment>);
}

export default AddTasks;