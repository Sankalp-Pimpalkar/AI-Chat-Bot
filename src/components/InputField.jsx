/* eslint-disable react/prop-types */
import { forwardRef, useId } from "react"

const InputField = (
    {
        className = '',
        type = 'text',
        ...props
    }, ref
) => {
    const id = useId()

    return (
        <div className="w-full">
            <input
                id={id}
                ref={ref}
                type={type}
                className={`border text-lg bg-slate-900 border-gray-800 rounded-sm px-3 py-2 w-full font-normal outline-none text-gray-400 ${className}`}
                {...props}
            />
        </div>
    )
}

export default forwardRef(InputField)