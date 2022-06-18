import {useEffect, useState} from "react";
import { useLocation } from 'react-router-dom'

function Chat() {

    const [messages, setMessages] = useState([]);

    const [message, setMessage] = useState('');

    
    const [profile, setProfile] = useState([]);

    const [friend, setFriends] = useState([]);
    const friends = [];
    const location = useLocation();
    const { from } = location.state;
    const id = from;

    const [yid , setYid] = useState('');
    const [cid , setCid] = useState('');

    let address = 'http://localhost:8000/api/friend/' + id

    useEffect(() => {

        const interval = setInterval(() => {
            (
                async () => {
                    
                    const response = await fetch('http://localhost:8000/api/chat/'+cid, {
                        method: 'GET',
                        header: { 'ContentType': 'application/json' }


                    });
                    let content = await response.json();

                    if (response.ok) {

                        setMessages(content)
                    }
                    else {

                    }
                }
            )();
        }, 1000);
        return () => clearInterval(interval);

    }, [cid]);

    useEffect(() => {
            
        
            (
                async () => {
                    const response = await fetch(address, {
                        method: 'GET',
                        header: { 'ContentType': 'application/json' }


                    });
                    let content = await response.json();

                    if (response.ok) {
                        
                        console.log(id)
                        console.log(content)
                        setFriends(content)
                    }
                    else {

                    }
                }
            )();

    }, []);


    useEffect(()=>{
        for(let i = 0;i<friend.length;i++){
            friends.push(Number(friend[i].user_2))
        }
        (
        async () => {
        const response = await fetch ('http://localhost:8000/api/profile/GetFriends',{
            method: 'Post',
            header: {'Content-Type': 'application/json'},
            body: JSON.stringify(friends)

           
        }) 
        let content = await response.json();
        

        setProfile(content)
    }
        )();

    },[friend]);


    const submit = async e => {
        e.preventDefault();

        await fetch('http://localhost:8000/api/chat', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                ChatroomId: cid,
                UserId: id,
                Content: message
            })
        });

        setMessage('');
    }


    const imageCard = data => (

        <div >
            <img src={data.imageSrc} width="100" height="100" id={data.user_id} onClick={Choose} style = {{borderRadius: '50%'}}/>
 

        </div>
       
    )
    const Choose = e => {
        
       e.preventDefault()
       setYid(e.target.id)

    }

    useEffect(()=>{

        (
        async () => {
        const response = await fetch ('http://localhost:8000/api/friend/'+id+'/'+yid,{
            method: 'Get',
            header: {'Content-Type': 'application/json'},


           
        }) 
        let content = await response.json();
        setCid(content.id)

    }
        )();

    },[yid]);



    return (
        <div className="container">
            <div className = "row">
                <div className = "col-4">
                <table>
                <tbody>
                    {

                       
                       profile.map((e, i) =>

                            <tr key={i}>
                                <td>{imageCard(profile[i])}</td>

                            </tr>
                        )
                    }
                </tbody>

            </table>

                </div>
                <div className = "col-8">
                    <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                
                        <div className="list-group list-group-flush border-bottom scrollarea">

                            {messages.map(message => {
                           
                                if(message.userId===id){
                                return (
                                    <div className="list-group-item list-group-item-action py-3 lh-tight">
                                        <div className="col-10 mb-1 small d-flex flex-row-reverse">{message.content}</div>
                                        
                                    </div>
                                )
                                }
                                else{
                                    return (
                                        <div className="list-group-item list-group-item-action py-3 lh-tight">
                                            <div className="col-10 mb-1 small d-flex flex-row">{message.content}</div>
                                        </div>
                                    )

                                }
                            })}
                        
                        </div>
                        </div>
                    </div>
                    <form onSubmit={e => submit(e)}>
                        <input className="form-control" placeholder="Write a message" value={message}
                            onChange={e => setMessage(e.target.value)}
                        />
                    </form>
                </div>
            </div>
    );
}

export default Chat;
