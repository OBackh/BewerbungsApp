return (
    <div className="content">
        {/* Zeigt das Overlay nur an, wenn loading false ist */}
        {selectedApplication && !loading && (
            <div
                className="overlay-spinner"
                onClick={() => setSelectedApplication(null)}
                role="Status"
                aria-label="Loading"
                aria-live="assertive"
            >
                <div
                    className="application-details-container"
                    onClick={(e) => e.stopPropagation()}
                    role="presentation"
                    aria-hidden="true"
                >
                    <ApplicationDetails
                        toggleDetails={() => setSelectedApplication(null)}
                        selectedApplication={selectedApplication}
                        onEdit={handleEdit}
                    />
                </div>
            </div>
        )}

        <table className="table-application-list">
            <caption className="caption">
                {captionText}
            </caption>
            <thead>
                <tr>
                    <th><span>Nr.</span></th>
                    <th><span>Status</span></th>
                    <th><span>Firmenname</span></th>
                    <th><span>Stellenbezeichnung</span></th>
                    <th><span className="date">Beworben am</span></th>
                    <th><span className="favorite-headline">Favorit</span></th>
                </tr>
            </thead>
            <tbody>
                {applications
                    .filter((application) => {
                        if (showFavorites) {
                            return application.isFavorite === "yes";
                        }
                        if (showArchive) {
                            return application.status === "ARCHIVED";
                        }
                        return true;
                    })
                    .slice()
                    .sort((a, b) => {
                        const order = [
                            "PLANNED", "CREATED", "SENT", "CONFIRMED", "UNDER_REVIEW",
                            "INVITATION", "ACCEPTED", "REJECTED", "WITHDRAWN", "ARCHIVED"
                        ];
                        const statusComparison = order.indexOf(a.status) - order.indexOf(b.status);
                        if (statusComparison !== 0) return statusComparison;
                        return a.companyName.localeCompare(b.companyName);
                    })
                    .map((application, index) => (
                        <tr className={`apply-card ${application.status}`} key={application.id}>
                            <td>
                                <button className="button-list" onClick={() => handleToggleDetails(application)}>
                                    {index + 1}
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleToggleDetails(application)}
                                    className={`status-typo ${application.status} button-list`}
                                >
                                    {translateStatus(application.status)}
                                </button>
                            </td>
                            <td>
                                <button className="button-list td-with-break" onClick={() => handleToggleDetails(application)}>
                                    {application.companyName}
                                </button>
                            </td>
                            <td>
                                <button className="button-list td-with-break" onClick={() => handleToggleDetails(application)}>
                                    {(application.jobTitle === 'other' && application.jobTitleFree)
                                        ? application.jobTitleFree
                                        : application.jobTitle}
                                </button>
                            </td>
                            <td>
                                <button className="button-list date" onClick={() => handleToggleDetails(application)}>
                                    {new Date(application.applicationDate).toLocaleDateString("de-DE", {
                                        day: "2-digit", month: "2-digit", year: "numeric",
                                    })}
                                </button>
                            </td>
                            <td>
                                <button
                                    className="button-favorite"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleToggleFavorite(application.id);
                                    }}
                                    onKeyDown={(e) => e.preventDefault()}
                                >
                                    {application.isFavorite === "yes"
                                        ? <MdFavorite className="heart" />
                                        : <MdFavoriteBorder className="heart" />}
                                </button>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>

        <div className="stat">
            <p>Summe aller Bewerbungen: {applications.length}</p>
            <p>Geplante Bewerbungen: {applications.filter(app => app.status === "PLANNED").length}</p>
            <p>Bestätigte Bewerbungen: {applications.filter(app => app.status === "CONFIRMED").length}</p>
            <p>Absagen: {applications.filter(app => app.status === "REJECTED").length}</p>
            <p>Zusagen: {applications.filter(app => app.status === "INVITATION").length}</p>
        </div>
    </div>
);
