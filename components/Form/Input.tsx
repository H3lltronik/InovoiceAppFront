import React, { FC, useEffect, useReducer, useRef, useState } from "react";
import { Controller, useController } from "react-hook-form";
import { Box } from "./Box";

type InputProps = {
    className?: string;
    boxClassName?: string;
    type?: string;
    value?: any;
    onChange?: (value: any) => any;
    name: string;
    control: any;
    rules?: any;
    hidden?: any;
};
export const Input: FC<InputProps> = (props) => {
    const [value, setValue] = useState("");
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const controller = useController({
        name: props.name,
        control: props.control,
        rules: props.rules,
        defaultValue: props.value,
    });

    useEffect(() => {
        if (props.value) {
            setValue(props.value);
            forceUpdate(); // OMG I think I hate React
        }
    }, [props]);

    const onChange = (eVal: string) => {
        setValue(eVal);
        if (props.onChange) props.onChange(eVal);
    };

    return (
        <Box className={`${props.boxClassName} ${props.hidden && 'hidden'}`}>
            {/* <div className="text-xs right-96 -top-96 absolute text-white-dark">
                {JSON.stringify(controller.field)} <br />
                {JSON.stringify(controller.fieldState)} <br />
                {JSON.stringify(controller.formState)} <br />
            </div> */}
            <input hidden={props.hidden}
                defaultValue={props.value}
                onChange={(e) => {
                    onChange(e.target.value);
                    controller.field.onChange(e);
                }}
                className={`${props.className} bg-transparent w-full text-white focus:outline-none h-full px-2 text-xs`}
                type={`${props.type ?? "text"}`}
            />

            {controller.fieldState.error && controller.fieldState.error.type == "required" && (
                <div className="text-xs text-red-500 mt-1">Required field</div>
            )}
        </Box>
        // <Controller rules={props.rules} control={props.control} name={props.name} render={({ field, fieldState, formState }) => {
        //     return
        // }}/>
    );
};
