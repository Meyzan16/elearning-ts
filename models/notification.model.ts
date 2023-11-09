import mongoose, { Document, Model, Schema } from "mongoose";

export interface INotification extends Document {
    title: string;
    message:string;
    status: string;
    userId:string;
}

const notifSchema = new Schema<INotification>({
    title:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default: "unread"
    },
    userId:{
        type:String,
    },
},{timestamps:true});

const NotificationModel : Model<INotification> = mongoose.model('Notification', notifSchema);

export default NotificationModel;