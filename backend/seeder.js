import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async()=>{
    try{
        // clean up db before insert
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        
        const createUsers = await User.insertMany(users)
        
        const adminUser = createUsers[0]._id
        
        const sampleProducts = products.map((product)=>({...product, user: adminUser}))
        
        await Product.insertMany(sampleProducts)
        console.log('Data Imported'.green.inverse)
        process.exit()
    }
    catch(error){
        console.error(`Data Import Failed ${error}`.red.inverse)
        process.exit(1)
    }
}

const destoryData = async()=>{
    try{
        // clean up db before insert
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        process.exit()
    }
    catch(error){
        console.error(`Data Import Failed ${error}`.red.inverse)
        process.exit(1)
    }
}


if(process.argv[2] === '-d'){
    destoryData()
}
else {
    importData()
}