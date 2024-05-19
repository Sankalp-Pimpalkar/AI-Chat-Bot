import { Link } from 'react-router-dom';

function NotFound() {

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
            <h1 className="text-5xl font-bold mb-4">404 Not Found</h1>
            <p className="text-2xl mb-6">Sorry, the page you are looking for does not exist.</p>
            <Link
                to='/'
                className="px-6 py-3 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-600"
            >
                Go to Home
            </Link>
        </div>
    );
}

export default NotFound;
