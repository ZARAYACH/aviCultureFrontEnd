import React, {Fragment, useEffect, useState} from "react";
import {Calendar, CalendarProps, momentLocalizer, Week} from "react-big-calendar";
import moment from 'moment'
import {useAxios} from "../../configuration/AxiosConfiguration";
import MedicationTask from "./MedicationTask";
import BulbsReplacementTask from "./BulbsReplacementTask";
import VaccinationTask from "./VaccinationTask";
import {useNavigate} from "react-router-dom";

interface CalendarEvent {
    id?: number,
    title: string,
    allDay: boolean,
    start: Date,
    end: Date,
}

const TasksCalendar = () => {
    const localizer = momentLocalizer(moment)
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const {axiosInstance} = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance
            .get(process.env.REACT_APP_API_PREFIX + "/medication-tasks")
            .then(response => {
                if (response.data){
                    return  response.data as MedicationTask[]
                }
                return [];
            })
            .then(medicationTasks => medicationTasks.map(medicationTask => {
                return {
                    title: "Medication Task Of block with id " + medicationTask?.block?.id + " from disease " + medicationTask?.disease?.name,
                    start: medicationTask?.date ? new Date(medicationTask.date) : new Date(),
                    end: medicationTask?.date ? new Date(new Date(medicationTask.date).setTime(new Date(medicationTask.date).getTime() + (60 * 60 * 1000))) : new Date(),
                    allDay: false
                } as CalendarEvent
            })).then(value => setEvents(prevState => [...prevState, ...value]))

        axiosInstance
            .get(process.env.REACT_APP_API_PREFIX + "/bulbs-replacement-tasks")
            .then(response => {
                if (response.data) {
                    return response.data as BulbsReplacementTask[];
                }
                return [];
            }).then(bulbsReplacementTasks => bulbsReplacementTasks.map(bulbsReplacementTask => {
            return {
                title: "Bulbs Replacements Task for building with name " + bulbsReplacementTask?.building?.name,
                start: bulbsReplacementTask?.date ? new Date(bulbsReplacementTask?.date) : new Date(),
                end: bulbsReplacementTask?.date ? new Date(new Date(bulbsReplacementTask?.date).setTime(new Date(bulbsReplacementTask?.date).getTime() + (60 * 60 * 1000))) : new Date(),
                allDay: false
            } as CalendarEvent
        })).then(value => setEvents(prevState => [...prevState, ...value]))

        axiosInstance
            .get(process.env.REACT_APP_API_PREFIX + "/vaccination-tasks")
            .then(response => {
                if (response.data) {
                    return response.data as VaccinationTask[];
                }
                return []
            })
            .then(vaccinationTasks => vaccinationTasks.map(vaccinationTask => {
                return {
                    title: "Vaccination Task Of block with id " + vaccinationTask?.block?.id + " from disease " + vaccinationTask?.disease?.name,
                    start: vaccinationTask?.date ? new Date(vaccinationTask.date) : new Date(),
                    end: vaccinationTask.date ? new Date(new Date(vaccinationTask.date).setTime(new Date(vaccinationTask.date).getTime() + (60 * 60 * 1000))) : new Date(),
                    allDay: false
                } as CalendarEvent
            })).then(value => setEvents(prevState => [...prevState, ...value]))

    }, [])


    return <Fragment>
        <div className="content-wrapper">
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto ">
                <Calendar defaultView={'week'}
                          localizer={localizer}
                          startAccessor="start"
                          selectable={true}
                          events={events}
                          endAccessor="end"
                          onSelectSlot={(slotInfo) => {
                              navigate('add', {state: slotInfo})
                          }}
                          style={{height: 500}}/>
            </div>
        </div>
    </Fragment>
}
export default TasksCalendar;