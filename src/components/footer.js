import '../css/footer.css';

function Footer(){
    return(
        <footer className="footer">

            <div className="footer_top">

                <div className="foot_1">
                    Contact: <a
                        href="mailto:hellocreditninja@gmail.com"
                        target="_blank" 
                        rel="noreferrer"
                        className="contact_us" 
                    >
                        hellocreditninja@gmail.com
                    </a>
                </div>

                <div className="foot_2">
                    Copyright &copy; Creditninja.in - All Rights Reserved.
                </div>
                
            </div>


        </footer>
    );
}

export default Footer;