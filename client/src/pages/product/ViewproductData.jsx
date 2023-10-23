import { useLocation } from "react-router-dom"

function ViewproductData() {

    const location = useLocation()
    const data = location.state

    const isImage = ['.gif','.jpg','.jpeg','.png']; //you can add more

  return (
    <>
        <div className="flex justify-center items-center">
            <div>
                {
                  isImage.includes(data.data.image) 
                  ?
                  <img className="h-96 w-96 mx-auto rounded-md" src={`http://localhost:3000/images/${data.data.image}`} alt="image comes here" />
                  :
                  <video className="h-96 w-96 mx-auto rounded-md" autoPlay src={`http://localhost:3000/images/${data.data.image}`}></video>
                }
            <p className="text-center text-5xl font-extrabold mt-5">{data.data.productName}</p>
            <p className="text-center mt-2">{data.data.productDescription}</p>
            </div>
        </div>
    </>
  )
}

export default ViewproductData