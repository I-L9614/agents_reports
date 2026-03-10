import { useState } from "react";
import api from "../api/axios";

export default function NewReport() {
    const [category, setCategory] = useState("")
    const [urgency, setUrgency] = useState("")
    const [message, setMessage] = useState("")
    const [image, setImage] = useState<File | null>(null)
}