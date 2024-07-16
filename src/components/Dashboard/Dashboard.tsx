import Box from "./Box.tsx"
import './Dashboard.css'

const links: {
    [key: string]: string
} = {
    "https://devilry.ifi.uio.no" : "Devilry",
    "https://mail.uio.no" : "Mail",
    "https://studentweb.uio.no" : "Studentweb",
    "https://ifinavet.no" : "Navet",
    "https://for-ansatte.uio.no/employee/index.html" : "Ansatt UiO",
    "https://minestudier.uio.no/nb/student/index.html" : "Mine studier",
    "https://ifirom.no" : "Ifi-rom",
    "https://login.dfo.no/?idp=feide&service=selvbetjeningsportal" : "DFO"
} 

export default function Dashboard(){
    return (
        <div className="dashboard">
            {
                Object
                .entries(links)
                .map(
                    ([link, keyword], index) => (
                        <Box key={index} link={link} keyword={keyword} />
                    )
                )
            }
        </div>
    );
}