import InputField from './InputField'
import Send from './icons/Send'

function ChatSession() {

    const chats = [
        {
            id: 1,
            sender: "Alice",
            message: "Hey, how are you?",
            timestamp: "2024-05-19T10:00:00Z",
            isUser: false,
        },
        {
            id: 2,
            sender: "You",
            message: "I'm good, thanks! How about you?",
            timestamp: "2024-05-19T10:01:00Z",
            isUser: true,
        },
        {
            id: 3,
            sender: "Alice",
            message: "I'm doing great! What are you up to?",
            timestamp: "2024-05-19T10:02:00Z",
            isUser: false,
        },
        {
            id: 4,
            sender: "You",
            message: "Just working on a project. You?",
            timestamp: "2024-05-19T10:03:00Z",
            isUser: true,
        },
        {
            id: 5,
            sender: "Alice",
            message: "Just relaxing at home.",
            timestamp: "2024-05-19T10:04:00Z",
            isUser: false,
        },
        {
            id: 6,
            sender: "You",
            message: "Nice! Any plans for the weekend?",
            timestamp: "2024-05-19T10:05:00Z",
            isUser: true,
        },
        {
            id: 7,
            sender: "Alice",
            message: "Not yet. Maybe just catch up on some reading. You?",
            timestamp: "2024-05-19T10:06:00Z",
            isUser: false,
        },
        {
            id: 8,
            sender: "You",
            message: "Thinking of going for a hike if the weather is nice.",
            timestamp: "2024-05-19T10:07:00Z",
            isUser: true,
        },
    ];

    return (
        <div className="bg-gray-300 relative container mx-auto h-screen overflow-y-auto p-10 antialiased">

            <div className="p-6 w-full max-w-6xl flex flex-col gap-6 mx-auto border-gray-600 selection:bg-gray-600 selection:text-gray-200">
                {
                    chats.map(chat => (
                        <div key={chat.id}>
                            <h4 className='text-lg font-medium font-Roboto text-gray-700'>{chat.sender}</h4>
                            <p className='text-base font-normal text-gray-800'>{chat.message}</p>
                        </div>
                    ))
                }
            </div>

            <div className="w-full absolute bottom-8 right-1/3 max-w-2xl pl-4 py-1 border-gray-600 bg-gray-200 rounded-full flex gap-2 items-center">
                <InputField
                    placeholder="Send Message"
                    className='bg-transparent placeholder:text-gray-700 text-gray-800 border-none'
                />
                <div className="bg-gray-600 flex mr-2 items-center justify-center rounded-full">
                    <Send className="text-2xl text-gray-100 py-1 px-2" />
                </div>
            </div>
        </div>
    )
}

export default ChatSession