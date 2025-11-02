import React from "react";

interface ConfirmDialogProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="confirm-dialog">
            {/* Overlay */}
            <div
                className="dialog-overlay"
                role="none"
                tabIndex={-1}
                onClick={onCancel}
                onKeyDown={(e) => {
                    if (e.key === 'Escape') onCancel();
                }}
            >
            </div>
            {/* Dialog-Inhalt */}
            <div className="dialog-content">
                <p>{message}</p>
                <div className="dialog-buttons">
                    <button className="button-confirm" onClick={onConfirm}>Ja</button>
                    <button className="button-cancel" onClick={onCancel}>Abbrechen</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;