const BirthdayItem = (props) => {
    const {lastName, firstName, dob} = props;
    return (
        <div className="birthday-item">
            <li>{lastName} {firstName} - {new Date(dob).toLocaleString('en', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })} year
            </li>
        </div>
    )
}

export default BirthdayItem;