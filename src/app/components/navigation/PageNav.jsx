// ===== Creates and Entire Nav from props ===== //
export default function PageNav(props) {

    return (
        // Styles based on pageNav and pageNavItem
        // page specific styles can target {page}Nav (e.g. AuthNav)
        <ul className={`pageNav ${props.page}Nav`} >
            {props.links.map((link) => {
                /* replace camel case with proper spacing */
                const displayLink = link.replace(/([a-z])([A-Z])/g, '$1 $2');
                return (
                    <li className={`${props.page}NavItem pageNavItem ${props.activeLink === link}`}
                        onClick={() => props.handler(link)}
                        key={link}
                    >{displayLink}</li>
                )
            })}
            {props.children}
        </ul>
    )
}