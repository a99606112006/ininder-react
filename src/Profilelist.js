import React, { useState, useEffect } from "react";



export default function Profilelist(props) {

    var temp;
    function getRandom() {
        return Math.floor(Math.random() * 3);
    }

    const [profileList, setProfile] = useState([])
    const [show, setShow] = useState(false);
    const [showProfile, setShowProfile] = useState(true);
    const [showrong, setShowWrong] = useState(false);

    const [ans, setAns] = useState(null);
    const [ansid, setAnsid] = useState(0);

    const handleClose = () => {
        setShow(false)
        setShowProfile(true)
    }
    const handleCloseWrong = () => {
        setShowWrong(false)
        setShowProfile(true)
    }
    

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/api/profile', {
                    method: 'GET',
                    header: { 'ContentType': 'application/json' },
                    credentials: 'include'

                });
                let content = await response.json();

                if (response.ok) {

                    for (let i = 0; i < content.length; i++) {
                        let rand = getRandom();
                        if (rand === 0) {
                            temp = content[i].correctAnswer;
                            content[i].correctAnswer = content[i].answer4;
                            content[i].answer4 = temp;

                        }
                        else if (rand === 1) {
                            temp = content[i].correctAnswer;
                            content[i].correctAnswer = content[i].answer2;
                            content[i].answer2 = temp;

                        }
                        else if (rand === 2) {
                            temp = content[i].correctAnswer;
                            content[i].correctAnswer = content[i].answer3;
                            content[i].answer3 = temp;

                        }



                    }





                    setProfile(content)




                }
                else {

                }

            }
        )();

    }, []);

 

    const imageCard = data => (
       
        <div className="card" >
            {showProfile && <img src={data.imageSrc} width="300" height="300"  style = {{borderRadius: '50%'}}/>}
            {showProfile && <div className="card-body">
                <h5>{data.quesion}</h5>
                <div>
                    <input type="radio" id={data.user_id} value={data.correctAnswer} onChange={handleShow} /> {data.correctAnswer}
                </div>
                <div>
                    <input type="radio" id={data.user_id} value={data.answer2} onChange={handleShow} /> {data.answer2}
                </div>
                <div>
                    <input type="radio" id={data.user_id} value={data.answer3} onChange={handleShow} /> {data.answer3}
                </div>
                <div>
                    <input type="radio" id={data.user_id} value={data.answer4} onChange={handleShow} /> {data.answer4}
                </div>
            </div>}

        </div>
    )

    const handleShow = e => {
        
        e.preventDefault()
        setAns(e.target.value)
        setAnsid(e.target.id)



    }

    function handleMatch(){
        let me = Number(props.name)
        let you = Number(ansid)

        fetch('http://localhost:8000/api/friend', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
               
                User_1: me,
                User_2: you
                
            })
        });

        setShow(false)
        setShowProfile(true)

    }

    useEffect(() => {
        if(ans!==null){
        if (ans == "correct") {
            setShow(true)
            setShowProfile(false)
        }
        else {
            setShowWrong(true)
            setShowProfile(false)

        }
    }
    }, [ans]);


    return (



        <div className=" d-flex flex-column">
            <table>
                <tbody>
                    {

                        //tr > 3 td
                        [...Array(Math.ceil(profileList.length / 3))].map((e, i) =>

                            <tr key={i}>
                                <td>{imageCard(profileList[3 * i])}</td>
                                <td>{profileList[3 * i + 1] ? imageCard(profileList[3 * i + 1]) : null}</td>
                                <td>{profileList[3 * i + 2] ? imageCard(profileList[3 * i + 2]) : null}</td>
                            </tr>
                        )
                    }
                </tbody>

            </table>

            {show && <div>
                <div className="modal-dialog" role="document">
                    <div className='modal-content'>

                        <p className="modal-body">Congrads, you are correct!</p>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={handleClose}>
                                Nah
                            </button>
                            <button className="btn btn-primary" onClick={handleMatch}>
                                Match
                            </button>
                        </div>
                    </div>
                </div>
            </div>}

            {showrong && <div>
                <div className="modal-dialog" role="document">
                    <div className='modal-content'>

                        <p className="modal-body">Sorry, you are Wrong!</p>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={handleCloseWrong}>
                                Try Next Time
                            </button>

                        </div>
                    </div>
                </div>
            </div>}

        </div>




    )

}