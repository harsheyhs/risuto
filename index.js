import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase,ref,push,onValue,remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings={
    databaseURL:"https://mob-app-practice-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app=initializeApp(appSettings);
const database=getDatabase(app);
const itemsdb=ref(database,"items");

const inputel=document.getElementById('input-field');
const addbtn=document.getElementById('add-button');
const ulel=document.getElementById('list-items');

addbtn.addEventListener('click', function(){

    let inputval=inputel.value;

    if(inputval)
    {
    push(itemsdb,inputval);
    inputel.value='';
    
    } 
})

onValue(itemsdb,function(snapshot){

    if(snapshot.exists())
{
    let itemsInDb=Object.entries(snapshot.val());
    ulel.innerHTML='';
    for(let i=0;i<itemsInDb.length;i++)
    {
        let curritem=itemsInDb[i];
       
        appendulel(curritem);
        
    }
}
else{
    ulel.innerHTML="Nothing here yet!"
}
})


function appendulel(item){
    let newliel=document.createElement('li');
    newliel.textContent=item[1];

    newliel.addEventListener('dblclick', function(){
        let locatn=ref(database,`items/${item[0]}`);
        remove(locatn);
    })

    ulel.append(newliel);
}
