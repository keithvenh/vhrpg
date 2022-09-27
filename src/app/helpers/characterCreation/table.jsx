export default function Table(props) {
    const {tableData, headerData} = props
    
    const tableheader = () => {
        return headerData.map((data,idx) => {
            return (
                <td key={idx}>{data}</td>
            )
        })
    }
    
    const returnTableData = (type) => {
        let myData
        switch(type) {
            case 'species':
                myData = tableData.map((species,idx) => {
                    const {name,brawn,agility,cunning,willpower,intellect,presence,notes} = species;
                    return (
                        <tr data-id={name}>
                            <td>{name}</td>
                            <td>{brawn}</td>
                            <td>{agility}</td>
                            <td>{cunning}</td>
                            <td>{willpower}</td>
                            <td>{intellect}</td>
                            <td>{presence}</td>
                            <td>{notes}</td>
                        </tr>
                    )
                });
                break;
            case 'career':
                myData = tableData.map((career,idx) => {
                    const {name,careerSkills} = career;
                    return (
                        <tr className='list-item' key={name} onClick={props.handleClick}>
                            <td>{name}</td>
                            <td>{careerSkills}</td>
                        </tr>
                    )
                });
                break;
            case 'specializations':
                myData = tableData.map((specializations,idx) => {
                    const {name,bonusCareerSkills} = specializations;
                    return (
                        <tr className='list-item' key={name} onClick={props.handleSpecClick}>
                            <td>{name}</td>
                            <td>{bonusCareerSkills}</td>
                        </tr>
                    )
                });
                break;
            default:
                break;
        }
        return myData
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        {tableheader()}
                    </tr>
                </thead>
                <tbody>
                    {returnTableData(props.type)}
                </tbody>
            </table>
        </>
    )
}