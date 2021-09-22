import { FC, useEffect, useState } from "react";
import { Switch } from "@headlessui/react";

type CheckboxProps = {
    label: string;
    value?: any;
    onChange: () => any,
    className?: string;
};
export const Checkbox: FC<CheckboxProps> = (props) => {
    const [enabled, setEnabled] = useState<boolean>(false);

    const changeVal = (val: boolean) => {
        setEnabled(val);
        if (props.onChange) props.onChange();
    }

    useEffect(() => {
        if (props.value)
            setEnabled(props.value)
    }, [])

    return (
        <div className={`group cursor-pointer ${props.className}`}>
            <Switch
                checked={enabled}
                onChange={changeVal}
                className={`flex items-center w-full`}>
                <div className={`
                    ${enabled ? "bg-purple-light" : "bg-blue-darker"}
                    flex items-center relative flex-shrink-0 h-[16px] w-[16px] border-2 
                    border-transparent rounded-sm transition-colors ease-in-out duration-200 group-hover:border-purple-light
                    focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}>
                        <div className="absolute w-[10px] h-[10px] top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4">
                            <img className="object-contain" src="/icon-check.svg" alt="" />
                        </div>
                </div>
                <div className="ml-2 pl-2">
                    <p className="text-white font-bold text-sm">
                        {props.label}
                    </p>
                </div>
            </Switch>
        </div>
    );
};
