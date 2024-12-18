// Navbar.tsx
import React, {useState} from 'react';
import reloadIcon from '../../assets/reload.svg';
import addIcon from '../../assets/add.svg';
import heartIcon from '../../assets/heart.svg';
import archiveIcon from '../../assets/archive.svg';

import './Navbar.css';
import '../Applications/applications.css';

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
};

const Navbar: React.FC<FooterProps> = ({ reloadRotate, addRotate, favoriteRotate, archiveRotate, onReload, onAdd, onFav, onArch, disableButtons }) => {
    const [isAddPressed, setIsAddPressed] = useState<boolean>(false);
    const [isArchivePressed, setIsArchivePressed] = useState<boolean>(false);
    const [isFavoritePressed, setIsFavoritePressed] = useState<boolean>(false);
    const [showOverview, setShowOverview] = useState<boolean>(true);

    function handleClickAddButtonColor() {
        setIsAddPressed(true);
    }

    // Logik für den Favoriten-Button
    function handleClickFavorite() {
        if (isArchivePressed) {
            setIsArchivePressed(false);
            setIsFavoritePressed(true);
        }
        else if (isFavoritePressed) {
            // Wenn Favoriten bereits aktiv sind, gehe zurück zur Übersicht
            setIsFavoritePressed(false);
        }
        else {
            // Wenn weder Archiv noch Favoriten aktiv sind, zeige die Favoriten
            setIsFavoritePressed(true);
            setIsArchivePressed(false);
        }
    }

    // Logik für den Archiv-Button
    function handleClickArchive() {
        if (isArchivePressed) {
            // Wenn Archiv bereits aktiv ist, zeige die Übersicht
            setShowOverview(true);
            setIsArchivePressed(false);
        } else {
            // Ansonsten zeige das Archiv und setze die anderen zurück
            setShowOverview(false);
            setIsArchivePressed(true);
            setIsFavoritePressed(false);
        }
    }

    /*function handleClickFavorite() {
        setShowOverview(false)
        if (isArchivePressed){setIsArchivePressed(false); setIsFavoritePressed(true)}
        else if (!isArchivePressed){setIsFavoritePressed(true)}
    }*/

/*
    function handleClickArchive() {
        if (isFavoritePressed){setIsFavoritePressed(false)}
        setIsArchivePressed((prev) => !prev);
    }
*/

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
                <button className={`favorite-button ${isFavoritePressed ? 'shadow' : ''}`}
                        aria-pressed={isFavoritePressed}
                        onClick={(event) => {
                            onFav(event);
                            handleClickFavorite();
                            }
                        }
                        disabled={disableButtons}>
                    <img
                        src={heartIcon}
                        alt="Reload"
                        width="24"
                        height="24"
                        className={favoriteRotate ? 'rotate' : ''}
                    />
                </button>

                <button className={`archive-button ${isArchivePressed ? 'shadow' : ''}`}
                        aria-pressed={isArchivePressed}
                        onClick={(event) => {
                        onArch(event);
                        handleClickArchive();
                        }
                        }
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
                <p className="copyright">&copy; 2024&nbsp;&nbsp;Ole Backhaus</p>
            </div>

        </>
    );
};

export default Navbar;