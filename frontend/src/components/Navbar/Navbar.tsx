// Navbar.tsx
import React from 'react';
import reloadIcon from '../../assets/reload.svg';
import addIcon from '../../assets/add.svg';
import heartIcon from '../../assets/heart.svg';
import archiveIcon from '../../assets/archive.svg';

import './Navbar.css';
import '../Applications/applications.css';

type FooterProps = {
    reloadRotate: boolean;
    onFav: React.MouseEventHandler<HTMLButtonElement>;
    onArch: React.MouseEventHandler<HTMLButtonElement>;
    addRotate: boolean;
    favoriteRotate: boolean;
    onReload: () => void;
    onAdd: () => void;
    disableButtons: boolean;
    archiveRotate: boolean;
};

const Navbar: React.FC<FooterProps> = ({ reloadRotate, addRotate, favoriteRotate, archiveRotate, onReload, onAdd, onFav, onArch, disableButtons }) => {
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

                <button className="favorite-button"
                        onClick={onFav}
                        disabled={disableButtons}>
                    <img
                        src={heartIcon}
                        alt="Reload"
                        width="24"
                        height="24"
                        className={favoriteRotate ? 'rotate' : ''}
                    />
                </button>

                <button className="archiv-button"
                        onClick={onArch}
                        disabled={disableButtons}>
                    <img
                        src={archiveIcon}
                        alt="Reload"
                        width="24"
                        height="24"
                        className={archiveRotate ? 'rotate' : ''}
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
                <p className="copyright">&copy; 2024&nbsp;&nbsp;Ole Backhaus</p>
            </div>
        </>
    );
};

export default Navbar;