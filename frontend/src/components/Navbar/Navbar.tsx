// Navbar.tsx
import React, {useState} from 'react';
import reloadIcon from '../../assets/reload.svg';
import addIcon from '../../assets/add.svg';
import heartIcon from '../../assets/heart.svg';
import archiveIcon from '../../assets/archive.svg';
import Imprint from "../Imprint/Imprint.tsx";

import './Navbar.css';
import '../Applications/applications.css';
import {Link} from "react-router-dom";

type FooterProps = {
    reloadRotate: boolean;
    onFav: React.MouseEventHandler<HTMLButtonElement>;
    addRotate: boolean;
    favoriteRotate: boolean;
    onReload: () => void;
    onAdd: () => void;
    onArch: React.MouseEventHandler<HTMLButtonElement>;
    disableButtons: boolean;
    archiveRotate: boolean;
    showArchive: boolean;
    showFavorites: boolean;
    showForm: boolean;
};

const Navbar: React.FC<FooterProps> = ({ reloadRotate, addRotate, favoriteRotate, archiveRotate, onReload, onAdd, onFav, onArch, disableButtons, showArchive, showFavorites, showForm }) => {
    const [isAddPressed, setIsAddPressed] = useState<boolean>(false);

    function handleClickAddButtonColor() {
        setIsAddPressed(true);
    }

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
                <button className={`favorite-button ${showFavorites ? 'shadow' : ''}`}
                        aria-pressed={showFavorites}
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

                <button className={`archive-button ${showArchive ? 'shadow' : ''}`}
                        aria-pressed={showArchive}
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

                <button className={`add-button ${showForm ? 'shadow' : ''}`}
                        aria-pressed={isAddPressed}
                        onClick={() => {
                            onAdd();
                            handleClickAddButtonColor();
                        }}
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
                <p className="copyright"><span>&copy; 2024&nbsp;&nbsp;Ole Backhaus</span></p>
            </div>

        </>
    );
};

export default Navbar;