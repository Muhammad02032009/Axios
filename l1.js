let tbody=document.querySelector('.tbody')

let api='https://66e583b75cc7f9b6273d9052.mockapi.io/data'

async function getApi()
{
    try{
        const response= await fetch(api)
        const data=await response.json()
        get(data)
    }
    catch (error){
        console.error(error)
    }
}

function get(data)
{
    tbody.innerHTML=""
    data.forEach((el)=>{

        let straka=document.createElement('tr')

        
        let name=document.createElement('td')
        name.innerHTML=el.name

        let birthday=document.createElement('td')
        birthday.innerHTML=new Date(el.chislo).toLocaleDateString()

        let average=document.createElement('td')
        average.innerHTML=el.average*10

        let status=document.createElement('td')
        status.innerHTML=el.status?'Active':'Inactive'


        let phoneNumber=document.createElement('td')
        phoneNumber.innerHTML=el.phoneNumber

        let actTd=document.createElement('td')
        

        let editbtn=document.createElement('button')
        editbtn.innerHTML='Edit'

        let deleteBtn=document.createElement('button')
        deleteBtn.innerHTML='Delete'
        deleteBtn.onclick=()=>{
            deleter(el.id)
        }



        actTd.append(editbtn,deleteBtn)
        straka.append(name,birthday,average,status,phoneNumber,actTd)
        tbody.appendChild(straka)

    })
}
getApi()


let searchInp=document.querySelector('.searchInp')

searchInp.oninput = async() =>{
    try{
        const response=await fetch(`${api}?name=${searchInp.value}`)
        const data=response.json()
        get(data)
    }
    catch (error){
        console.error(error)
    }
}





async function deleter(el) {
    try{
        await fetch(`${api}/${el.id}`,{method:"DELETE"})
        getApi(api)
    } catch(error)
    {
        console.error(error)
    }
    
}

