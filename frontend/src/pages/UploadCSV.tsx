import { useState } from "react";
import api from "../api/axios";


export default function UploadCSV() {
    const [file, setFile] = useState<File | null>(null)

    const upload = async () => {
        if (!file) return
        
        const formData = new FormData()
        formData.append("file", file)

        try {
            const res = await api.post("/reports/upload-csv", formData)
            alert("Reports created: " + res.data.reportsCreate)
        } catch {
            alert("Upload failed")
        }
    }

  return (
    <div>
      <h2>Upload CSV</h2>

      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <br />
      <button onClick={upload}>Upload CSV</button>
    </div>
  )
}

