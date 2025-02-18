import react from "react"

const Footer = () => {
    return (
        <footer>
            <p className="dark:text-white text-center m-8">© {new Date().getFullYear()} Yoel Weisberg. All rights reserved.</p>
        </footer>
    );
    
}

export default Footer;