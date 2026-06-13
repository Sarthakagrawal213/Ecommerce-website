import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function Navbar(){

return(

<motion.div

initial={{y:-50}}

animate={{y:0}}

className="bg-slate-900
text-white
flex
justify-between
p-5"

>

<h1
className="text-3xl
font-bold
text-cyan-400">

NeoShop

</h1>

<div className="space-x-8">

<Link to="/">
Home
</Link>

<Link to="/login">
Login
</Link>

<Link to="/add">
Add Product
</Link>

</div>

</motion.div>

)

}