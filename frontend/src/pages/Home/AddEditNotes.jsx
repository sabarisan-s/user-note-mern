import React, { useState } from "react";
import TagInput from "../../components/input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from '../../utils/axiosInstance'
import Loading from "../../components/Loading/Loading";

const AddEditNotes = ({ onClose, type, getAllNotes,noteData,showToastMessage }) => {

    const [title, setTitle] = useState(noteData?.title||"");
    const [content, setContent] = useState(noteData?.content||"");
    const [tags, setTags] = useState(noteData?.tags||[]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const addNewNote =async () => {
        try {
            setIsLoading(true);
            const { data } = await axiosInstance.post("/add-note",{
                title,
                content,
                tags
            });

            if (data && data.note) {
                showToastMessage("Note Added Successful")
                getAllNotes()
                onClose()
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
        }finally {
            setIsLoading(null);
        }
    }

    const editNote =async () => {
        const noteId=noteData._id
        try {
            setIsLoading(true);
            const { data } = await axiosInstance.put("/edit-note/"+noteId,{
                title,
                content,
                tags
            });

            if (data && data.note) {
                showToastMessage("Note Updated Successful")
                getAllNotes()
                onClose()
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
        }finally {
            setIsLoading(null);
        }
    }

    const handleAddNote = () => {
        if (!title) {
            setError("please enter title");
            return;
        }
        if (!content) {
            setError("please enter content");
            return;
        }
        setError("");

        if (type == "edit") {
            editNote();
        } else {
            addNewNote();
        }
    };

    return (
        <>
            <div className="relative">
                <button
                    className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
                    onClick={onClose}
                >
                    <MdClose className="text-xl text-slate-400" />
                </button>
                <div className="flex flex-col gap-2">
                    <label htmlFor="" className="input-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="text-2xl text-slate-950 outline-none"
                        name="title"
                        id="title"
                        placeholder="enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2 mt-4">
                    <label htmlFor="content" className="input-label">
                        Content
                    </label>
                    <textarea
                        type="text"
                        name="content"
                        id="content"
                        className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded-lg resize-none"
                        rows={10}
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <div className="mt-3">
                    <label htmlFor="" className="input-label">
                        Tags
                    </label>
                    <TagInput tags={tags} setTags={setTags} />
                </div>

                {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

                {!isLoading ? (
                <button
                className="btn-primary font-medium mt-5 p-3"
                onClick={handleAddNote}
            >
               { type==='edit'?'Update':'Add Here'}
            </button>
                        ) : (
                            <Loading />
                        )}

            </div>
        </>
    );
};

export default AddEditNotes;
