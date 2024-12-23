// import React from 'react';
import PropTypes from 'prop-types';

const WorkFlow = ({ title, desc, icon, isOdd }) => {
    return (
        <div className="container py-10 workflow relative">
            <div className="grid grid-cols-12 gap-5">

                <div className={`lg:col-span-6 col-span-12 px-20 ${isOdd ? 'lg:order-2 order-1' : 'lg:order-1 order-2'}`}>
                    <div className={`${isOdd ? 'lg:text-start text-center' : 'lg:text-end text-center'}`}>
                        <img
                            src={icon}
                            alt=""
                            className={`${isOdd ? 'lg:ms-0 mx-auto' : 'lg:ms-auto mx-auto'} size-24`}
                        />
                    </div>
                </div>

                <div className={`lg:col-span-6 col-span-12 ${isOdd ? 'order-1' : 'order-2'}`}>
                    <div className="w-full px-20">
                        <h3 className={`cursive ${isOdd ? 'lg:text-end text-center' : 'lg:text-start text-center'} relative text-2xl text-primary mb-5 font-bold`}>

                            {title}

                        </h3>
                        <p className={`font-light tracking-wider text-md ${isOdd ? 'lg:text-end text-center' : 'lg:text-start text-center'} `}>{desc}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Adding PropTypes for validation
WorkFlow.propTypes = {
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    isOdd: PropTypes.bool,
};

// Default Props for optional props
WorkFlow.defaultProps = {
    isOdd: false, // Default to false if `isOdd` is not provided
};

export default WorkFlow;
