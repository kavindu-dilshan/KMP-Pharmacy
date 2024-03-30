import express from 'express'
import dbCon from './utils/db.js'
import cors from 'cors'
import promotionRouter from './routes/promotion.route.js'
import employeeRouter from './routes/employee.route.js'

const app = express()
dbCon()

app.use(express.json())
app.use(cors())

app.use('/api', promotionRouter)
app.use('/api/employee', employeeRouter)

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
    }
);