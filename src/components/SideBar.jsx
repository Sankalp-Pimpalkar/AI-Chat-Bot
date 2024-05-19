import { useState } from 'react';
import Hide from './icons/Hide';
import Show from './icons/Show';
import Write from './icons/Write';
import Google from './icons/Google';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const navigate = useNavigate()

    const toggleSidebar = () => {
        setIsVisible(!isVisible);
    };

    const GenerateNewSession = () => {
        navigate(`/${Date.now()}`)
    }

    return (
        <div className={`flex items-start ${isVisible && 'border-r'} border-gray-600`}>
            <div className={`w-full flex flex-col gap-3 min-w-[20rem] sm:max-w-xs h-screen p-3 overflow-y-auto bg-gray-300 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0 block' : '-translate-x-full hidden'}`}>
                <div className='bg-gray-100 py-2 px-3 rounded-md flex items-center justify-between'>
                    <button onClick={toggleSidebar}>
                        <Hide className='text-3xl text-gray-600' />
                    </button>

                    <button>
                        <Write className='text-3xl text-gray-600' />
                    </button>
                </div>

                <div onClick={GenerateNewSession} className='bg-gray-100 py-2 px-3 rounded-md flex gap-6 items-center cursor-pointer'>
                    <Google className='text-2xl text-gray-600' />
                    <p className='text-md text-gray-500 font-medium'>Create a new Chat</p>
                </div>

                <div>
                    <p className='text-md text-gray-500 font-medium'>
                        Chats will go here
                    </p>
                </div>
            </div>

            {
                !isVisible && (
                    <div className='p-5 rounded-md flex justify-center gap-6'>
                        <button onClick={toggleSidebar}>
                            <Show className='text-3xl text-gray-600' />
                        </button>

                        <button>
                            <Write className='text-3xl text-gray-600' />
                        </button>
                    </div>
                )
            }
        </div>
    );
};

export default Sidebar;
