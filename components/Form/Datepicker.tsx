import React, { FC, useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useController } from 'react-hook-form';

type DatepickerProps = {
    value?: string
    disabled?: boolean,
    name: string;
    control: any;
    rules?: any,
}
export const Datepicker: FC<DatepickerProps> = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const controller = useController({
        name: props.name,
        control: props.control,
        rules: props.rules,
        defaultValue: props.value,
    });

    useEffect(() => {
        if (props.value)
            setStartDate(new Date(props.value))
    }, [])

    useEffect(() => {
        const date = startDate.toISOString();
        controller.field.onChange(date);
    }, [startDate])

    return (
        <div className={`datepicker relative ${props.disabled && 'opacity-50'}`}>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} disabled={props.disabled}
            className={`${props.disabled && 'cursor-not-allowed'}`}/>
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <img src="/icon-calendar.svg" alt="" />
            </div>
        </div>
    );
}
