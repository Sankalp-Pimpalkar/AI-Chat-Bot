/* eslint-disable react/prop-types */

function Delete({ className = '', ...props }) {
    return (
        <i className={`bx bxs-trash-alt ${className}`} {...props} ></i>
    )
}

export default Delete