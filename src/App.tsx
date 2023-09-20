import React, {Fragment, useEffect, useState} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Blocks from "./components/Breeding/Block/Blocks";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import SideNavBar from "./components/SideNavBar";
import Centers from "./components/Breeding/centers/Centers";
import Buildings from "./components/Breeding/buildings/Buildings";
import NotFound from "./components/NotFound";
import Diseases from "./components/health/Diseases";
import Medicines from "./components/health/Medicines";
import ProductStock from "./components/product/ProductStock";
import Vehicles from "./components/vehicle/vehicles/Vehicles";
import Transactions from "./components/transactions/Transactions";
import AddTransaction from "./components/transactions/AddTransaction";
import CounterParties from "./components/transactions/CounterParties";
import VehicleInterventions from "./components/vehicle/interventions/vehicleInterventions";
import Personnels from "./components/personnels/Personnels";
import MedicationTask from "./components/tasks/TasksCalendar";
import "react-big-calendar/lib/css/react-big-calendar.css"
import TasksCalendar from "./components/tasks/TasksCalendar";
import AddTasks from "./components/tasks/AddTasks";

library.add(fas);

export default function App() {
    useEffect(() => {
        import("preline");
    }, []);

    const [loading, setLoading] = useState(false);

    return (
        <div className="wrapper">
            <Header/>
            <SideNavBar/>
            <Routes>
                <Route path={''} element={<Home/>}/>
                <Route path='centers' element={<Centers/>}/>
                <Route path='buildings' element={<Buildings/>}/>
                <Route path='blocks' element={<Blocks/>}/>
                <Route path='medicines' element={<Medicines/>}/>
                <Route path='diseases' element={<Diseases/>}/>
                <Route path='products/*' element={<ProductStock/>}></Route>
                <Route path='vehicles/*'>
                    <Route path='' element={<Vehicles/>}/>
                    <Route path=':vehicleId' element={<VehicleInterventions />}/>
                </Route>
                <Route path='transactions/*'>
                    <Route path='add' element={<AddTransaction/>}></Route>
                    <Route path=':transactionId' element={<AddTransaction/>}></Route>
                    <Route path='*' element={<Transactions/>}/>
                </Route>
                <Route path='counter-parties' element={<CounterParties />} />
                <Route path='tasks/*'>
                    <Route path={""} element={<TasksCalendar />}></Route>
                    <Route path={"add"} element={<AddTasks />}></Route>

                </Route>
                <Route path={'personnels'} element={<Personnels />}></Route>

                <Route path="*" element={<NotFound/>}/>
            </Routes>
            <Footer/>
        </div>
    )
}
