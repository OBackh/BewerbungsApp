import './imprint.css'

type ImprintProps = {
    readonly toggle: ()=>void;
};

export default function Imprint({ toggle }: ImprintProps){
    return (
            <div className="overlay">
            <div className="imprint" >
                <p className="closingCross"
                   onClick={toggle}
                   role="presentation"
                   aria-hidden="true">&#215;</p>
                <h1>Impressum</h1>
                <hr/>
                <h2>Ole Backhaus</h2>

                <p>Kontaktieren Sie mich gerne über LinkedIn:&nbsp;&nbsp;<a
                    href="https://www.linkedin.com/in/ole-backhaus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="imprint-link"
                >
                    [LINK]
                </a></p>
                    <p>Dies ist mein Capstone-Projekt, das während der Teilnahme am neuefische Bootcamp "Java Fullstack Development" im Dezember 2024 entstanden ist.</p>
            </div>
            </div>
    )
}