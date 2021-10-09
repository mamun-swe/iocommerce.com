import React from 'react'
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./style.scss"

export const DatePicker = (props) => {
    return (
        <div className="customDatePickerWidth">
            <ReactDatePicker
                className="form-control shadow-none"
                selected={new Date(props.default)}
                onChange={(date) => props.value(date)}
            />
        </div>
    );
}