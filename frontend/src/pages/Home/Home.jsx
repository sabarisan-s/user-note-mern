import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Card/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/Card/EmptyCard";
import AddNoteImg from "../../assets/images/add-notes.svg";
import NoDataImg from "../../assets/images/no-data.svg";

const Home = () => {
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShow: false,
        type: "add",
        data: null,
    });


    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();
    const [allNotes, setAllNotes] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [isUserLogin, setIsUserLogin] = useState(null);

    const [showToastMsg, setShowToastMsg] = useState({
        isShown: false,
        message: "",
        type: "add",
    });

    useEffect(() => {
        getUserInfo();
        getAllNotes();
        setIsUserLogin(true);
        return () => {};
    }, []);

    const getUserInfo = async () => {
        try {
            const { data } = await axiosInstance.get("/get-user");

            if (data && data.user) {
                setUserInfo(data.user);
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }finally{
            
        }
    };

    const getAllNotes = async () => {
        try {
            
            const { data } = await axiosInstance.get("/get-all-notes");

            if (data && data.notes) {
                setAllNotes(data.notes);
            }
        } catch (error) {
        } 
    };

    const onEdit = (noteDetails) => {
        setOpenAddEditModal({ isShow: true, date: noteDetails, type: "edit" });
    };

    const onDelete = async (noteData) => {
        const noteId = noteData._id;
        try {
            const { data } = await axiosInstance.delete(
                "/delete-note/" + noteId
            );

            if (data && !data.error) {
                showToastMessage("Note Delete Successful", "delete");
                getAllNotes();
                onClose();
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred.Please try again");
            }
        }
    };

    const onSearchNote = async (query) => {
        try {
            const { data } = await axiosInstance.get("/search-notes", {
                params: { query },
            });

            if (data && data.notes) {
                setIsSearch(true);
                setAllNotes(data.notes);
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }
    };

    const handleClearSearch = () => {
        setIsSearch(false);
        getAllNotes();
    };

    const onPinNote = async (noteData) => {
        const noteId = noteData._id;
        try {
            const { data } = await axiosInstance.put(
                "/update-note-pinned/" + noteId,
                {
                    isPinned: !noteData.isPinned,
                }
            );

            if (data && data.note) {
                showToastMessage("Note Updated Successful");
                getAllNotes();
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred.Please try again");
            }
        }
    };

    const showToastMessage = (message, type) => {
        setShowToastMsg({
            isShown: true,
            message,
            type,
        });
    };

    const handleCloseToast = () => {
        setShowToastMsg({
            isShown: false,
            message: "",
        });
    };

    return (
        <>
            <Navbar
                userInfo={userInfo}
                isUserLogin={isUserLogin}
                setIsUserLogin={setIsUserLogin}
                onSearchNote={onSearchNote}
                handleClearSearch={handleClearSearch}
            />

            <div className="container mx-auto">
       

                {allNotes.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
                        {allNotes.map((item, index) => (
                            <NoteCard
                                key={item._id}
                                title={item.title}
                                date={item.createdAt}
                                content={item.content}
                                tags={item.tags}
                                isPinned={item.isPinned}
                                onEdit={() => onEdit(item)}
                                onDelete={() => onDelete(item)}
                                onPinNote={() => onPinNote(item)}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyCard
                        imgSrc={isSearch ? NoDataImg : AddNoteImg}
                        message={
                            isSearch
                                ? `Oops no notes matching your search`
                                : `Start create your first note !
                    Click the 'ADD' button write down your reminders,ideas,thoughts and etc... 
                    Let's get started`
                        }
                    />
                )}
            </div>
            <button
                className="sm:w-16 sm:h-16 w-14 h-14 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute sm:right-10 sm:bottom-10 right-5 bottom-5"
                onClick={() =>
                    setOpenAddEditModal({
                        isShow: true,
                        type: "add",
                        data: null,
                    })
                }
            >
                <MdAdd className="text-[32px] text-white" />
            </button>

            <Modal
                isOpen={openAddEditModal.isShow}
                style={{
                    overlay: {
                        background: "rgba(0,0,0,0.2)",
                    },
                }}
                contentLabel=""
                className="sm:w-[70%] lg:w-[40%] w-[90%] max-h-3/3 bg-white rounded-md mx-auto mt-14 p-5 "
            >
                <AddEditNotes
                    getAllNotes={getAllNotes}
                    type={openAddEditModal.type}
                    noteData={openAddEditModal.date}
                    onClose={() => {
                        setOpenAddEditModal({
                            isShow: false,
                            type: "add",
                            data: null,
                        });
                    }}
                    showToastMessage={showToastMessage}
                />
            </Modal>
            <Toast
                isShown={showToastMsg.isShown}
                message={showToastMsg.message}
                type={showToastMsg.type}
                onClose={handleCloseToast}
            />
        </>
    );
};

export default Home;
