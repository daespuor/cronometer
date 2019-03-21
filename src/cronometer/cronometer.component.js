import React from 'react';
import PropTypes from 'prop-types';
import './cronometer.css';
export default function Cronometer(props) {
    return (
        <div className="Cronometer">
            <div className="Cronometer-Buttons">
                <button id="play"><i className="fas fa-play"></i></button>
                <button id="pause"><i className="fas fa-pause"></i></button>
                <button id="stop"><i className="fas fa-stop"></i></button>
            </div>
            <div className="Cronometer-Value">
                {props.value}
            </div>
        </div>
    )
}

Cronometer.propTypes={
    value:PropTypes.string.isRequired
}