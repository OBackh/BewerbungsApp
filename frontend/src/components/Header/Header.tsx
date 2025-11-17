import './header.css';
import monitor from '../../assets/monitor.svg';

export default function Header(){
    return (
            <div className="header">
                <img src={monitor} alt="Bemo App Logo" /><h1>Bemo – Der <span className="word-beginning">Be</span>werbungs<span className="word-beginning">mo</span>nitor</h1>
            </div>
    );

}