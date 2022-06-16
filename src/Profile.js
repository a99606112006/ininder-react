import React, {useState, useEffect} from "react";
import { useLocation } from 'react-router-dom'
const defaultimg = '/img/profile.jpg';



const initialData = {
    Id:0,
    Q:'',
    A1:'',
    A2:'',
    A3:'',
    A4:'',
    imgName:'',
    imgSrc:defaultimg,
    imgFile: ''


}

export default function Profile(){

    const [data, setData] =  useState(initialData)


    const inputChange = e=>{
        const {name, value} = e.target;
        setData({
            ...data,
            [name]:value
        })
    }

    const showPreview = e =>{
        if(e.target.files && e.target.files[0]){
            let imgFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x =>{
                setData({
                    ...data,
                    imgFile:imgFile,
                    imgSrc: x.target.result

                })
            }
            reader.readAsDataURL(imgFile)
        }
    }


    const handleForm = e => {
        e.preventDefault()
        console.log(from)
        const formData = new FormData()
        formData.append('Quesion', data.Q,)
        formData.append('CorrectAnswer', data.A1)
        formData.append('Answer2' , data.A2)
        formData.append('Answer3' , data.A3)
        formData.append('Answer4' , data.A4)
        formData.append('ImageName' , data.imgName)
        formData.append('ImageFile' , data.imgFile)
        formData.append('User_Id' , from)
        
        fetch ('http://localhost:8000/api/profile',{
            method: 'POST',
            header: {'Accept':'application/json','Content-Type': 'application/json'},
            body: formData
           
        })
    }

    const location = useLocation()
    const { from } = location.state


    return(
        <>
        <div className="Containrt text-center">
            <p className="lead">Profile </p>
        </div>

        <form onSubmit={handleForm}>
            <div className="card">
                <div className="card-body">

                    <img src={data.imgSrc}  className="card-img-top"/>
                    <div className="form-group">
                        <input type = "file" className="form-control-file" 
                        onChange={showPreview}/>
                       
                    </div>
                    <div className="form-group">
                        <input className="form-control" placeholder="Quesion" name="Q"
                        value = {data.Q} onChange={inputChange}/>
                    </div>

                    <div className="form-group">
                        <input className="form-control" placeholder="Answer1" name="A1"
                        value = {data.A1} onChange={inputChange}/>
                    </div>

                    <div className="form-group">
                        <input className="form-control" placeholder="Answer2" name="A2"
                        value = {data.A2} onChange={inputChange}/>
                    </div>

                    <div className="form-group">
                        <input className="form-control" placeholder="Answer3" name="A3"
                        value = {data.A3} onChange={inputChange}/>
                    </div>

                    <div className="form-group">
                        <input className="form-control" placeholder="Answer4" name="A4"
                        value = {data.A4} onChange={inputChange}/>
                    </div>
                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-primary">submit</button>
                    </div>
                </div>
            </div>

        </form>
        </>
    )

}

