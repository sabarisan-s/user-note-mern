import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Card/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";

import Modal from "react-modal";

const Home = () => {
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShow: false,
        type: "add",
        date: null,
    });
    const title = "fad",
        date = "dsa",
        content = "#dsa",
        tags = "dsa",
        isPinned = true;

    const onEdit = () => {
        return;
    };
    const onDelete = () => {
        return;
    };
    const onPinNote = () => {
        return;
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto">
                <div className="grid grid-cols-3 gap-4 mt-8">
                    <NoteCard
                        title={title}
                        date={date}
                        content={content}
                        tags={tags}
                        isPinned={isPinned}
                        onEdit={() => onEdit}
                        onDelete={() => onDelete}
                        onPinNote={() => onPinNote}
                    />
                </div>
            </div>
            <button
                className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
                onClick={() =>
                    setOpenAddEditModal({
                        isShow: true,
                        type: "add",
                        date: null,
                    })
                }
            >
                <MdAdd className="text-[32px] text-white" />
            </button>

            <Modal
                isOpen={openAddEditModal.isShow}
                onRequestClose={() => {}}
                style={{
                    overlay: {
                        background: "rgba(0,0,0,0.2)",
                    },
                }}
                contentLabel=""
                className="w-[40%] max-h-3/3 bg-white rounded-md mx-auto mt-14 p-5 "
            >
                <AddEditNotes
                    type={openAddEditModal.type}
                    noteDate={openAddEditModal.date}
                    onClose={() => {
                        setOpenAddEditModal({
                            isShow: false,
                            type: "add",
                            date: null,
                        });
                    }}
                />
            </Modal>
        </>
    );
};

export default Home;
