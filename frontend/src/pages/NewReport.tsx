import { useState } from "react";
import api from "../api/axios";

export default function NewReport() {
    const [category, setCategory] = useState("")
    const [urgency, setUrgency] = useState("")
    const [message, setMessage] = useState("")
    const [image, setImage] = useState<File | null>(null)

    const submit = async () => {
        const formData = new FormDate()

        formData.append("category", category)
        formData.append("urgency", urgency)
        formData.append("message", message)

        if (image) {
            formData.append("image", image)
        }
        
        try {
            await api.post("/reports", formData)
            alert("Report Created")
        } catch{
            alert("Error")
        }
    } 

    return (
        <div>
            <h2>New Report</h2>
            <input placeholder="Category" value={category} onChange={(e) => e.target.value} />
            <br />
            <select value={urgency} onChange={(e) => e.target.value}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <br />
            <textarea placeholder="Message" value={message} onChange={(e) => e.target.value}/>
            <br />
            <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)}/>
            <br />
            <button onClick={submit}>Submit Report</button>
        </div>
    )
}