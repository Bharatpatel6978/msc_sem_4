import mongoose from "mongoose";
import { number } from "motion";

export interface IOrder{
    _id?: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    items: [
        {
            grocery: mongoose.Types.ObjectId;
            name: string;
            price: string;
            unit: string;
            image: string;
            quantity: number;
        }
    ],
    isPaid:boolean,
    totalAmount: number;
    paymentMethod: "cod" | "online";
    address:{
        fullName: string;
        city: string;
        state: string;
        pincode: string;
        fullAddress: string;
        mobile:string;
        latitude: string;
        longitude: string;
    }
    status: "pending" | "confirmed" | "shipped" | "out for delivery" | "delivered" | "cancelled";
    createdAt?: Date;
    updatedAt?: Date;
}
    
const orderSchema = new mongoose.Schema<IOrder>({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items:[
        {
            grocery:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Grocery",
                required: true,
            },
            name:String,
            price:String,
            unit:String,
            image:String,
            quantity:Number,
        }
    ],
    paymentMethod:{
        type: String,
        enum: ["cod","online"],
        default: "cod",
    },
    isPaid:{
        type: Boolean,
        default: false,
    },
    totalAmount:{
        type: Number,
    },
    address:{
         fullName: String,
        city: String,
        state: String,
        pincode: String,
        fullAddress: String,
        mobile:String,
        latitude: String,
        longitude: String,

    },
    status:{
        type: String,
        enum: ["pending","confirmed","chipped","out for delivery","delivered","cancelled"],
        default: "pending",
    },

},{timestamps:true});

const Order = mongoose.models.Order || mongoose.model<IOrder>("Order",orderSchema);

export default Order;