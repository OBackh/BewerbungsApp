import '../../components/Applications/applications.css';
import './loadingSpinner.css';
import spinner from '../../assets/spinnerTransparent.svg';

export default function LoadingSpinner() {
    return (
        <div className="overlay">
            <img className="loadingSpinner" src={spinner} alt="Loading Spinner"/>
        </div>
    );
}