import express from 'express'
import cors from 'cors'

const app = express()

const PORT = 5000

app.use(cors())
app.use(express.json())
app.use('/upload', express.static("uploads"))

app.get('/', (req,res) => {
    res.json({messagw:"Server is running"})
})

export default app