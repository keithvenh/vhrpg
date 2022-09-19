export default function Table(props) {
    
    const {tableData, headerData} = props
    
    const tableheader = () => {
        return headerData.map((data,idx) => {
            return (
                <td key={idx}>{data}</td>
            )
        })
    }

    const returnTableData = () => {
        return tableData.map((species,idx) => {
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
                    {returnTableData()}
                </tbody>
            </table>
        </>
    )
}