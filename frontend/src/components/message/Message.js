import "./message.css"

export const Message = ({own}) => {
    return ( //if message is owned, classname will be messageown, if not, className will be just message
        <div className={own ? "message own": "message"}>
            <div className="messageTop">
                <img className="messageImg" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF65dDrnV_Acx-_JX7o7pyfh4uYMITFMQi5w&usqp=CAU"/>
                <p className="messageText">hello this is a message</p>
            </div>
            <div className="messageBottom">1 hour ago</div>

        </div>
    )
}