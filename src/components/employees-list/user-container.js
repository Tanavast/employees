import {getUsers, isActive} from "../../redux/users-reducer";
import {connect} from "react-redux";

const UserContainer = (props) => {
    const {isActive, lastName, firstName, id, value, getUsers} = props;

    const toggleStatus = (value, id) => {
        isActive(value, id);
        getUsers();
    }

    const renderClassNames = () => {
        return "user-container" + (value ? " active" : "");
    }

    return (
        <div className={renderClassNames()} id={id}>
            <h3>{lastName} {firstName}</h3>
            <div>
                <input type="radio"
                       onChange={() => {
                           toggleStatus(false, id)
                       }}
                       checked={value === false}/>
                <span>not active</span>
            </div>
            <div>
                <input type="radio"
                       onChange={() => {
                           toggleStatus(true, id)
                       }}
                       checked={value === true}/>
                <span>active</span>
            </div>
        </div>
    )
}

export default connect(null, {isActive, getUsers})(UserContainer);