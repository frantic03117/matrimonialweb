import { LeftOutlined, RightOutlined } from '@ant-design/icons';
// import React from 'react';
import PropTypes from "prop-types";
const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
        <button
            className={className}

            onClick={onClick}
        >
            <RightOutlined className='text-black' />
        </button>
    );
};

const PrevArrow = (props) => {
    const { className,  onClick } = props;
    return (
        <button
            className={className}
           
            onClick={onClick}
        >
            <LeftOutlined className='text-dark ' />

        </button>
    );
};
NextArrow.propTypes = {
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func
};
PrevArrow.propTypes = {
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func
};
export { NextArrow, PrevArrow };