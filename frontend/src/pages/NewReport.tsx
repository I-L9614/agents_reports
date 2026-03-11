import { useState } from "react";
import api from "../api/axios";

export default function NewReport() {
    const [category, setCategory] = useState("intelligence");
    const [urgency, setUrgency] = useState("low");
    const [message, setMessage] = useState("")
    const [image, setImage] = useState<File | null>(null)

    const submit = async () => {
        const formData = new FormData()

        formData.append("category", category)
        formData.append("urgency", urgency)
        formData.append("message", message)

        if (image) {
            formData.append("image", image)
        }
        console.log(formData)
        try {
            await api.post("/reports", formData, {
    headers: {
        "Content-Type": "multipart/form-data",
    },
})
            alert("Report Created")
        } catch{
            alert("Error")
        }
    } 

    return (
        <div>
            <h2>New Report</h2>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option value="intelligence">Intelligence</option>
                <option value="logistics">Logistics</option>
                <option value="alert">Alert</option>
            </select>
            <br />
            <select value={urgency} onChange={(e) => setUrgency(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <br />
            <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)}/>
            <br />
            <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)}/>
            <br />
            <button onClick={submit}>Submit Report</button>
        </div>
    )
}