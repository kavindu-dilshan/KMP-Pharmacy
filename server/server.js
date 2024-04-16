import express from 'express'
import dbCon from './utils/db.js'
import cors from 'cors'
import promotionRouter from './routes/promotion.route.js'
import employeeRouter from './routes/employee.route.js'
import supplierRouter from './routes/supplier.route.js'
import inventoryRouter from './routes/inventory.route.js'
import feedbackRouter from './routes/feedback.route.js'
import prescriptionRouter from './routes/prescription.route.js'
import driverRouter from './routes/driver.route.js'

const app = express()
dbCon()

app.use(express.json())
app.use(cors())

app.use('/api', promotionRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/supplier', supplierRouter)
app.use('/api/inventory', inventoryRouter)
app.use('/api/feedback', feedbackRouter)
app.use('/api/prescription', prescriptionRouter)
app.use('/api/driver', driverRouter)


app.listen(3000, () => {
    console.log('Server is listening on port 3000');
    }
);