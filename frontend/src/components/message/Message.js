import "./message.css"
import {format} from "timeago.js"

export const Message = ({message, own}) => {
    return ( //if message is owned, classname will be messageown, if not, className will be just message
        <div className={own ? "message own": "message"}>
            <div className="messageTop">
                <img className="messageImg" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF65dDrnV_Acx-_JX7o7pyfh4uYMITFMQi5w&usqp=CAU"/>
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>

        </div>
    )
}