import { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
    title: string, 
    onChange: (newValue: string) => void
}

function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState("");

    function activateEditMode() { 
        setEditMode(true);
        setTitle(props.title)
    }
    function activateViewMode() { 
        setEditMode(false);
        props.onChange(title);
    }
    function onChangeTitleHandler(evt: ChangeEvent<HTMLInputElement>) { setTitle(evt.currentTarget.value) }

    return (
        editMode ? <input value={title} onBlur={activateViewMode} onChange={onChangeTitleHandler} autoFocus/>
                 : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}

export default EditableSpan;