// Footer.tsx
import React from 'react';
import reloadIcon from '../../assets/reload.svg';
import addIcon from '../../assets/add.svg';
import './footer.css';
import '../Applications/applications.css';

type FooterProps = {
    reloadRotate: boolean;
    addRotate: boolean;
    onReload: () => void;
    onAdd: () => void;
    disableButtons: boolean;
};

const Footer: React.FC<FooterProps> = ({ reloadRotate, addRotate, onReload, onAdd, disableButtons }) => {
    return (
        <>
        <div className="footer-buttons">
            <button className="reload-button"
                    onClick={onReload}
                    disabled={disableButtons}>
                <img
                    src={reloadIcon}
                    alt="Reload"
                    width="24"
                    height="24"
                    className={reloadRotate ? 'rotate' : ''}
                />
            </button>
            <button className="add-button"
                    onClick={onAdd}
                    disabled={disableButtons}>
                <img
                    src={addIcon}
                    alt="Add new Apply"
                    width="24"
                    height="24"
                    className={addRotate ? 'rotate' : ''}
                />
            </button>
        </div>
    <div className="navbar">
        <p>&copy; 2024&nbsp;&nbsp;Ole Backhaus</p>
    </div>
    </>
    );
};

export default Footer;