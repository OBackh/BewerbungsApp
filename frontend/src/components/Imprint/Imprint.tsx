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
                <p>Ole Backhaus</p>
            </div>
            </div>
    )
}