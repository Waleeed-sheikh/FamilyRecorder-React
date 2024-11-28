import React from "react"
import "./style.css"
import { db } from "./Fire-base"
import { collection,getDocs, querySnapshot ,onSnapshot,deleteDoc,doc} from "firebase/firestore"
import Model from "./Model"
import  icon from './icons8-delete-48.png'
import { Color } from "antd/es/color-picker"
export default function Main(){
    
    const [data,setData]=React.useState([])

    
    const fetchPosts = () => {
        const unsubscribe = onSnapshot(collection(db, "FamilyRecords"), (querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            var sorted=newData.sort((a, b) => b.Records.Time- a.Records.Time)
            console.log(sorted)
            setData(sorted);
        });

        // Cleanup subscription on unmount\
        
    };
    

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "FamilyRecords", id));
    };


    React.useEffect(()=>{
        fetchPosts();
        console.log("checking data")///comeback to it and below useeffect
        console.log(data)
    },[])

    // React.useEffect(() => {
    //     console.log("Data updated: ", data);
    // }, [data]);

    
    return(
        <>
        <div className="Title">
        <h1>Family Recorder</h1>
        </div>

        <div className="buttonBar">
        <h2>All Records</h2>
         <Model/>
         </div>

        <div className="list">
       {data.map((item,index)=>(<ul key={index} >
        <li> 
            <span className="info">Name - </span>
            <span className="data">{item.Records.Name}</span>
        </li>


        <li> 
            <span className="info">Age - </span>
            <span span className="data">{ item.Records.Age}</span>
            </li>

        <li><span className="info"> Relation - </span><span span className="data">{item.Records.Relation}</span></li>
        <button  className="delete" onClick={()=>handleDelete(item.id)}><img src={icon}/></button>
       </ul>))} 
       
       
        </div>

        </>
        
    )
}