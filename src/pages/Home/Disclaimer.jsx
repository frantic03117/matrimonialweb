import { Dialog, DialogBody } from '@material-tailwind/react';
import React from 'react'
import { useUser } from '../Account/UserContext';

const Disclaimer = () => {
    const { policies } = useUser();
    const [open, setOpen] = React.useState(true);
    const handler = () => {
        setOpen(!open);
    }
    return (
        <>
            <Dialog className='border-none outline-none' open={open} handler={handler}>
                <DialogBody className='border-none outline-none '>
                    <div className="w-full">
                        <div className="w-full">
                            <p className='text-sm pb-5 font-light tracking-widest leading-6'><span className="font-bold text-dark">Disclaimer</span> :
                                <div className='inline-block *:pb-5  font-light' dangerouslySetInnerHTML={{ __html: policies.find(itm => itm.url == "diclaimer")?.description }} />
                            </p>
                            <div className="w-full text-center">
                                <button onClick={handler} className='bg-primary text-white rounded px-4 py-2 '>
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    )
}

export default Disclaimer