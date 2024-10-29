const url=`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_APP_CLOUDNARY_CLOUD_NAME}/image/upload`

const uploadImage=async(image)=>{
    const fromData=new FormData()
    fromData.append("file",image)
    fromData.append("upload_preset","mern_product")
    const dataResponse=await fetch(url,{
        method:"POST",
        body:fromData
    })
    return dataResponse.json()
}

export default uploadImage;