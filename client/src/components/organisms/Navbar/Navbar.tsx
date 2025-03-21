import './Navbar.css'
function Navbar()
{
    return(
        <div className='fullnav'>
            <h1 className='title'>My API Tester</h1>
            <div className="top-nav">
                <a className='active' href="/">Home</a>
                <a href="/search">Search</a>
                <a href="/info">Info</a>
                <a href="/contact">Contact</a>
            </div>
        </div>
    );   
};
export default Navbar