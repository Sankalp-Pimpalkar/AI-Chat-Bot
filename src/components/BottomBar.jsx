/* eslint-disable react/prop-types */
import Send from "./icons/Send"

function BottomBar({ handleClick, value, handleOnchange }) {

    function handlePressEnter(e) {
        if (e.code == 'Enter') {
            handleClick()
        }
    }
    return (
        <div className="text-black antialiased py-6 px-4 bg-slate-950 fixed inset-x-0 bottom-0 w-full">
            <div className="w-full flex items-center max-w-md bg-slate-900 border border-slate-800 rounded-full mx-auto p-2">
                <input
                    className="w-full text-base px-2 ml-2 bg-transparent text-gray-300 outline-none"
                    type="text"
                    value={value}
                    onKeyDown={handlePressEnter}
                    onChange={(e) => handleOnchange(e.target.value)}
                    placeholder="Send Message"
                />
                <button onClick={handleClick} className="bg-gray-400 hover:bg-gray-200 rounded-full">
                    <Send className="text-xl py-2 px-3 rounded-full" />
                </button>
            </div>
        </div>
    )
}

export default BottomBar