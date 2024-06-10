/* eslint-disable react/prop-types */
import Loader from '../icons/Loader';
import Modal from './Modal'

function DeleteSession({ modalOpen, handleDelete, setModalOpen, loading }) {

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <Modal isOpen={modalOpen}>
            <h1 className="text-lg font-semibold text-gray-200">
                Do you want to delete this session ?
            </h1>

            <div className="mt-5 flex flex-wrap xs:flex-nowrap gap-3 items-center justify-evenly font-medium transition-all duration-500">
                <button className="border w-full h-full px-3 py-2 rounded-md border-gray-800 text-gray-400 active:text-gray-300" onClick={closeModal}>Cancel</button>
                <button disabled={loading} className="flex items-center justify-center gap-2 border w-full h-full px-3 py-2 rounded-md bg-red-600 border-red-600 disabled:bg-red-500 active:bg-red-700 text-gray-200" onClick={handleDelete}>
                    {
                        loading && <Loader />
                    }
                    Delete
                </button>
            </div>
        </Modal>
    )
}

export default DeleteSession