// Navbar.tsx
import React, {useState} from 'react';
import reloadIcon from '../../assets/reload.svg';
import addIcon from '../../assets/add.svg';
import heartIcon from '../../assets/heart.svg';
import archiveIcon from '../../assets/archive.svg';
import statsIcon from '../../assets/piechart.svg';
import Imprint from "../Imprint/Imprint.tsx";

import './navbar.css';
import '../Applications/applications.css';

type FooterProps = {
    // Visibility / display control
    showArchive: boolean;
    showFavorites: boolean;
    showStats: boolean;
    showForm: boolean;

    // Button rotation / animation state
    archiveRotate: boolean;
    favoriteRotate: boolean;
    statsRotate: boolean;
    addRotate: boolean;
    reloadRotate: boolean;

    // Actions / event handlers
    onArch: React.MouseEventHandler<HTMLButtonElement>;
    onFav: React.MouseEventHandler<HTMLButtonElement>;
    onStat: React.MouseEventHandler<HTMLButtonElement>;
    onAdd: () => void;
    onReload: () => void;

    // General control / state
    disableButtons: boolean;
};

const Navbar: React.FC<FooterProps> = ({ reloadRotate, addRotate, favoriteRotate, archiveRotate, statsRotate, onReload, onAdd, onFav, onStat, onArch, disableButtons, showArchive, showFavorites, showStats, showForm }) => {
    const [isAddPressed, setIsAddPressed] = useState<boolean>(false);
    const [showImprint, setShowImprint] = useState<boolean>(false);

    function handleClickAddButtonColor() {
        setIsAddPressed(true);
    }

    function handleToggleImprint (){
        setShowImprint(!showImprint);
        console.log("ShowImprint: " + showImprint);
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
                        alt="Favorites"
                        width="24"
                        height="24"
                        className={favoriteRotate ? 'rotate' : ''}
                    />
                </button>

                <button className={`stats-button ${showStats ? 'shadow' : ''}`}
                        aria-pressed={showStats}
                        onClick={onStat}
                        disabled={disableButtons}>
                    <img
                        src={statsIcon}
                        alt="Reload"
                        width="24"
                        height="24"
                        className={statsRotate ? 'rotate' : ''}
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
                <p className="copyright"><span>&copy; 2024&nbsp;&nbsp;Ole Backhaus</span><button className="imprintLink" onClick={handleToggleImprint}>Imprint</button></p>
            </div>
            {showImprint ? <Imprint toggle={handleToggleImprint}/> : null }
        </>
    );
};

export default Navbar;