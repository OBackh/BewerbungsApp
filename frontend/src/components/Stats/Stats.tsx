import {Cell, Pie, PieChart} from "recharts";
import { Application } from "../Models/Application.ts";
import './stats.css';


type ApplicationStatsProps = {
    readonly applications: Application[];
    readonly toggle: ()=>void;
};

export default function ApplicationStats( {applications, toggle }: ApplicationStatsProps) {
    const data = [
        { name: 'Geplante', value: applications.filter(app => app.status === "PLANNED").length },
        { name: 'Bestätigte', value: applications.filter(app => app.status === "CONFIRMED").length },
        { name: 'Absagen', value: applications.filter(app => app.status === "REJECTED").length },
        { name: 'Zusagen', value: applications.filter(app => app.status === "INVITATION").length }
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (

                <div className="overlay">
                    <div className="stats">
                        <p className="closingCross"
                           onClick={toggle}
                           role="presentation"
                           aria-hidden="true">&#215;</p>
                        <h1>Bewerbungsstatistik</h1>
                        <hr/>
                        <div className="stat">
                            <p>Anzahl an Bewerbungen: {applications.length}</p>
                            <p>Geplante Bewerbungen: {applications.filter(app => app.status === "PLANNED").length}</p>
                            <p>Bestätigte Bewerbungen: {applications.filter(app => app.status === "CONFIRMED").length}</p>
                            <p>Absagen: {applications.filter(app => app.status === "REJECTED").length}</p>
                            <p>Zusagen: {applications.filter(app => app.status === "INVITATION").length}</p>
                        </div>
                        <PieChart className="pieChartBox" width={210} height={210}>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={70}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                label={true}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]}/>
                                ))}
                            </Pie>
                        </PieChart>
                    </div>
                </div>

    )
}