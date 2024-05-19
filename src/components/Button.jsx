/* eslint-disable react/prop-types */

function Button({
    className = '',
    type = 'submit',
    children,
    ...props
}) {
    return (
        <button
            type={type}
            className={`bg-yellow-200 cursor-pointer w-full py-2 px-3 font-medium text-gray-700 rounded-md disabled:bg-yellow-300 hover:bg-yellow-300 ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button