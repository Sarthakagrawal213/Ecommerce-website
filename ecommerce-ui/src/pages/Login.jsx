import Navbar from "../components/Navbar"

export default function Login(){

return(

<>

<Navbar/>

<div
className="
flex
justify-center
items-center
h-screen">

<form
className="
bg-slate-800
p-10
rounded-xl
space-y-5
w-[400px]">

<h1
className="
text-white
text-3xl">

Login

</h1>

<input

placeholder="Email"

className="
w-full
p-3
rounded"


></input>

<input

type="password"

placeholder="Password"

className="
w-full
p-3
rounded"

></input>

<button

className="
w-full
bg-cyan-500
p-3
rounded">

Login

</button>

</form>

</div>

</>

)

}