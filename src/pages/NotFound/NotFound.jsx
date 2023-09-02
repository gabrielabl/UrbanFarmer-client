import "./NotFound.scss";
import Header from "../../components/Header/Header"; 
import Footer from '../../components/Footer/Footer'

const NotFound =() =>{
    return(
        <>
        <Header />
        <main>
            <h1>404</h1>
            <p>OPS, PAGE NOT FOUND</p>
        </main>
        <Footer />
        </>
    )
};

export default NotFound