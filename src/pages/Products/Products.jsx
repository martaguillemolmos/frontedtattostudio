import "./Products.css"
import { useEffect, useState } from "react"
import { getAllproducts } from "../../services/apiCalls"


export const Products = () => {
    const [products, setProducts] = useState([])

    useEffect (() => {
        if (products.length === 0){
        getAllproducts()
        .then ((results) => {
            setProducts(results.data)
            console.log(results.data)
        })
        .catch((error) => console.og (error))
        }
    }, [products])

    return (
    <div className="profileDesign">
    Products
    </div>
    )
}