/* eslint-disable react/prop-types */

function Copy({ className = '', ...props }) {
    return (
        <i className={`bx bx-copy ${className}`} {...props}></i>
    )
}

export default Copy