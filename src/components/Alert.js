import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Alert(props) {
    const mode = props.alert.isDarkMode ? 'black' : 'white';

    useEffect(() => {
        if (props.alert) {
            const timer = setTimeout(() => {
                // Use setAlert to hide the alert after 3 seconds
                props.setAlert(null); // Dismiss the alert after 3 seconds
            }, 1500);

            // Cleanup timer if the alert is dismissed or component unmounts
            return () => clearTimeout(timer);
        }
    }, [props.alert, props.setAlert]); // Ensure setAlert is part of the dependencies

    if (!props.alert) return null; // Don't render the alert if it's null

    return (
        <div className={`alert bg-${mode} ${props.alert.danger ? 'alert-danger' : ''} alert-dismissible fade show container my-2 sticky-top`} role="alert">
            <strong>{props.alert.title}</strong> {props.alert.para}
            <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => props.setAlert(null)} // Allow manual close via button
            ></button>
        </div>
    );
}


Alert.propTypes = {
    alert: PropTypes.shape({
        title: PropTypes.string.isRequired,
        para: PropTypes.string.isRequired,
        danger: PropTypes.bool.isRequired,
        isDarkMode: PropTypes.bool.isRequired
    }).isRequired,
    setAlert: PropTypes.func.isRequired
};