import React from 'react'
import { Input } from '../Form/Input'
import { Select } from '../Form/Select'
import { Backdrop } from './Backdrop'

export const NewInvoice = () => {
    return (
        <Backdrop>
            <section className={`absolute h-screen bg-black-light left-0 transform
            w-full sm:w-3/4 lg:w-1/2 lg:max-w-screen-md pl-40 pt-10 pr-10 text-white`}>
                <h2 className="text-white font-bold text-2xl">New Invoice</h2>

                <div className="mt-10">
                    <div className="text-sm text-purple-light font-bold">Bill from</div>

                    <div className={`mt-5`}>
                        <div className={`text-xs mb-2`}>Street Address</div>
                        <Input></Input>
                    </div>
                    <div className="flex gap-5">
                        <div className={`mt-5`}>
                            <div className={`text-xs mb-2`}>City</div>
                            <Input></Input>
                        </div>
                        <div className={`mt-5`}>
                            <div className={`text-xs mb-2`}>Post Code</div>
                            <Input></Input>
                        </div>
                        <div className={`mt-5`}>
                            <div className={`text-xs mb-2`}>Country</div>
                            <Input></Input>
                        </div>
                    </div>

                    <div className="text-sm text-purple-light font-bold mt-10">Bill to</div>

                    <div className={`mt-5`}>
                        <div className={`text-xs mb-2`}>Client’s Name</div>
                        <Input></Input>
                    </div>

                    <div className={`mt-5`}>
                        <div className={`text-xs mb-2`}>Client’s Email</div>
                        <Input></Input>
                    </div>

                    <div className="flex gap-5">
                        <div className={`mt-5`}>
                            <div className={`text-xs mb-2`}>City</div>
                            <Input></Input>
                        </div>
                        <div className={`mt-5`}>
                            <div className={`text-xs mb-2`}>Post Code</div>
                            <Input></Input>
                        </div>
                        <div className={`mt-5`}>
                            <div className={`text-xs mb-2`}>Country</div>
                            <Input></Input>
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <div className={`mt-5 w-1/2`}>
                            <div className={`text-xs mb-2`}>City</div>
                            <Input></Input>
                        </div>
                        <div className={`mt-5 w-1/2`}>
                            <div className={`text-xs mb-2`}>Payment Terms</div>
                            <Select label="test" items={[{text: 'test', value: 'val'}, {text: 'test2', value: 'val3'}]}></Select>
                        </div>
                    </div>


                </div>
            </section>
        </Backdrop>
    )
}
