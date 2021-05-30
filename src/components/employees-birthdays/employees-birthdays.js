import './employees-birthdays.css';
import {connect} from "react-redux";
import BirthdayItem from "./birthday-item";

const Birthdays = (props) => {
    const {users} = props;

    let check;

    (() => {
        users.some((p) => {
            check = p.isActive === true;
            return check;
        })
    })();

    let date = new Date();
    let dates = [];

    for (let i = 0; i < 12; i++) {
        let p;
        i ? p = 1 : p = 0;
        date.setMonth(date.getMonth() + p, 1);
        dates.push(date.toLocaleString('en-us', {
            month: 'long'
        }));
    }

    const filteredMonths = (month) => {
        return users.filter(p => {
            if (p.isActive) {
                let userDob = new Date(p.dob);
                let userMonth = userDob.toLocaleString('en-us', {
                    month: 'long'
                });
                return userMonth.indexOf(month) > -1;
            } return null
        })
    }

    const usersBirthdays = dates.map(p => {
        let user = filteredMonths(p);
        let filteredUsers = user.map(j => {
            return (
                <div key={j.id}>
                    <BirthdayItem lastName={j.lastName} firstName={j.firstName} dob={j.dob}/>
                </div>
            )
        })
        if(filteredUsers.length) {
            return (
                <div className="months-row" key={p}>
                    <h2>{p}</h2>
                    {filteredUsers}
                </div>
            )
        } return <></>
    })

    return (
        <div className="container">
            <div className="title">
                <h2>Birthdays</h2>
            </div>
            <div className="content-section birthday-container">
                {!check &&
                <div className="empty-list">
                    <h1>Employees List is empty</h1>
                </div>
                }
                <div className="months-list">
                    {usersBirthdays}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users.users,
    }
}
export default connect(mapStateToProps, null)(Birthdays);