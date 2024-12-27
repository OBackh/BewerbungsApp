import './header.css';
import Monitor from '../../assets/monitor.svg'

export default function Header(){
    return (
            <div className="header">
                <h1><img src={Monitor} height="90em" alt="Logo"/><span>&nbsp;&nbsp;BeMo – Der <span className="word-beginning">Be</span>werbungs<span className="word-beginning">Mo</span>nitor</span></h1>
            </div>
    );

}