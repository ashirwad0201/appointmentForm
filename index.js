var list=document.getElementById('list-items');

list.addEventListener('click',removeElement);

var anonymousId;

window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:5000/get-user')
    .then(
        (response)=>{
            console.log(response);
            for(var i=0;i<response.data.length;i++){
                console.log(response.data[i]);
                showData(response.data[i]);
            }
        }
    )
    .catch(
        (err)=>console.log(err)
    )
})


function onSignUp(){
    var name_=document.getElementById('idx1').value;
    var email_=document.getElementById('idx2').value;
    var phone_=document.getElementById('idx3').value;

    let myObj={
        name:name_,
        email:email_,
        phone:phone_
    };
    if(anonymousId==undefined){
        axios.post('http://localhost:5000/insert-user',myObj)
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err));
    }
    else{
        axios.put(`https://crudcrud.com/api/057c1b800809490aadf6f4857249d836/appointments/${anonymousId}`,myObj)
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err));
    }
    // var myObjSerial=JSON.stringify(myObj);
    // localStorage.setItem(email_,myObjSerial);
    showData(myObj);


    // localStorage.setItem('Name',document.getElementById('idx1').value)
    // localStorage.setItem('Email',document.getElementById('idx2').value)
    // localStorage.setItem('Phone',document.getElementById('idx3').value)
    // localStorage.setItem('Date',document.getElementById('idx4').value)
    // localStorage.setItem('Time',document.getElementById('idx5').value)
    // console.log(localStorage.getItem('Name'));
    // console.log(localStorage.getItem('Email'));
    // console.log(localStorage.getItem('Phone'));
    // console.log(localStorage.getItem('Date'));
    // console.log(localStorage.getItem('Time'));

}

// let myObj= {
//     name : 'Sam',
//     age: '20'
// };

// let myObjSerialized=JSON.stringify(myObj);
// localStorage.setItem('myObj',myObjSerialized);
// console.log(localStorage.getItem('myObj'))
// let myObjDeserialized=JSON.parse(localStorage.getItem('myObj'));
// console.log(myObjDeserialized)

function showData(obj){
    console.log(obj)
    var newList=document.createElement('li');
    var text=obj.name+" - "+obj.email+" - "+obj.phone+" - ";
    newList.appendChild(document.createTextNode(text));
    var delButton=document.createElement('button');
    delButton.className='delete';
    delButton.appendChild(document.createTextNode('Delete'));
    newList.appendChild(delButton);
    var editButton=document.createElement('button');
    editButton.className='edit';
    editButton.appendChild(document.createTextNode('Edit'));
    newList.appendChild(editButton);
    list.appendChild(newList);
}
function removeElement(e){
    e.preventDefault();
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure to delete ?')){
            var li=e.target.parentElement;
            var email_=li.textContent.split(" - ")[1];
            console.log(email_)
            axios
            .delete(`http://localhost:5000/delete-user/${email_}`)
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
            list.removeChild(li)
        }
    }
    else if(e.target.classList.contains('edit')){
        var li=e.target.parentElement;
        const arr=li.textContent.split(" - ");
        var email_=arr[1];
        axios.get('https://crudcrud.com/api/057c1b800809490aadf6f4857249d836/appointments')
        .then(
            (response)=>{
                console.log(response);
                for(var i=0;i<response.data.length;i++){
                    if(response.data[i].email==email_){
                        document.getElementById('idx1').value=response.data[i].name
                        document.getElementById('idx2').value=response.data[i].email
                        document.getElementById('idx3').value=response.data[i].phone
                        anonymousId=response.data[i]._id;
                    }

                }
            }
        )
        .catch(
            (err)=>console.log(err)
        )
        list.removeChild(li);
    }
}