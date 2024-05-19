/* eslint-disable react/prop-types */

function Loader({ className = '' }) {
    return (
        <i className={`bx bx-loader bx-spin bx-rotate-90 ${className}`} ></i>
    )
}

export default Loader