import SummaryApi from "../common/index"
import { toast } from 'react-toastify'


const addToCart = async(e,id) =>{
    e?.stopPropagation()
    e?.preventDefault()

    const response = await fetch(SummaryApi.addTocartProduct.url,{
        method : SummaryApi.addTocartProduct.method,
        credentials : 'include',
        headers : {
            "content-type" : 'application/json'
        },
        body : JSON.stringify(
            { productId : id }
        )
    })

    const responseData = await response.json()

    if(responseData.success){
        toast.success(responseData.message)
    }

    if(responseData.error){
        toast.error(responseData.message)
    } 


    return responseData

}


export default addToCart