import React, { useState } from "react";
import TagInput from "../../components/input/TagInput";
import { MdClose } from "react-icons/md";

const AddEditNotes = ({ onClose, type, noteDate }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [error, setError] = useState(null);

    const addNewNote =async () => {
   
    }

    const editNote =async () => {
   
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

                <button
                    className="btn-primary font-medium mt-5 p-3"
                    onClick={handleAddNote}
                >
                    Add Here!
                </button>
            </div>
        </>
    );
};

export default AddEditNotes;
