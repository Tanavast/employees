import './employees-list.css';
import {useEffect} from "react";
import {getUsers} from "../../redux/users-reducer";
import {connect} from "react-redux";
import UserContainer from './user-container';

const Employees = (props) => {
    const {getUsers, users} = props;
    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const sortedUsers = users.sort((a, b) => a.lastName.localeCompare(b.lastName));
    let arr_EN = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const filterValues = (letter) => {
        return sortedUsers.filter(data => {
            return data.lastName[0].indexOf(letter) > -1;
        });
    }

    const alphabet = arr_EN.map(p => {
        let names = filterValues(p);
        let filteredLastNames = (names) => {
            if (names.length === 0) {
                return (
                    <h1 className="empty">------</h1>
                )
            } else {
                return (names.map(j => {
                    return (
                        <div key={j.id}>
                            <UserContainer id={j.id}
                                           firstName={j.firstName}
                                           lastName={j.lastName}
                                           value={j.isActive}/>
                        </div>
                    )
                }))
            }
        }
        return (
            <div className="alphabet-column" key={p}>
                <h1>{p}</h1>
                {filteredLastNames(names)}
            </div>
        )
    })

    return (
        <div className="container">
            <div className="title">
                <h2>Employees</h2>
            </div>
            <div className="content-section">
                {alphabet}
            </div>

        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        users: state.users.users,
    }
}
export default connect(mapStateToProps, {getUsers})(Employees);