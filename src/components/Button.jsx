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
            className={`bg-sky-500 cursor-pointer w-full py-2 px-3 font-medium text-gray-200 rounded-md disabled:bg-sky-300 hover:bg-sky-400 ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button