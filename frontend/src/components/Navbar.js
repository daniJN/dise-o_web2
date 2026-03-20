import { Link } from "react-router-dom";

function Navbar(){

return(

<nav className="navbar navbar-dark bg-dark navbar-expand-lg">

<div className="container">

<span className="navbar-brand">Admin Películas</span>

<ul className="navbar-nav">

<li className="nav-item">
<Link className="nav-link" to="/generos">Genero</Link>
</li>

<li className="nav-item">
<Link className="nav-link" to="/directores">Director</Link>
</li>

<li className="nav-item">
<Link className="nav-link" to="/productoras">Productora</Link>
</li>

<li className="nav-item">
<Link className="nav-link" to="/tipos">Tipo</Link>
</li>

<li className="nav-item">
<Link className="nav-link" to="/media">Media</Link>
</li>

</ul>

</div>

</nav>

)

}

export default Navbar