import northcoders from "../Images/northcoders.png";

const Header = () => {
  return <header><h1 className="mainheader">Welcome to NCN{<img className="NC" src={northcoders} 
  alt={'Oops..No Thumbnail'}></img>}</h1>
  </header>
  ;

};

export default Header;
