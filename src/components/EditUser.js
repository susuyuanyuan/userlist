import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../actions/index';
class EditUser extends Component {

    componentDidMount() {
        if (this.props.location == null || this.props.location.state == null) {
            // set initial state to empty
            this.setState({
                firstName: "",
                lastName: "",
                age: 0,
                sex: "",
                password: "",
                repeat: "",
                isValidFirst: true,
                isValidLast: true,
                isValidAge: true,
                isValidPwd: true,
                isValidPwdLength: true,
                isValidRepeat: true,
                isNotEmpty: false
            });
        } else {
            this.setState(this.props.location.state);
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            age: 0,
            sex: "",
            password: "",
            repeat: "",
            isValidFirst: true,
            isValidLast: true,
            isValidAge: true,
            isValidPwd: true,
            isValidPwdLength: true,
            isValidRepeat: true,
            isNotEmpty: false
        }
    }

    // update
    submitUser() {
        const { history, dispatch } = this.props;
        const updated_user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: this.state.age,
            sex: this.state.sex,
            password: this.state.password
        }
        const user_id = this.state._id;
        dispatch(updateUser(user_id, updated_user, history));
    }

    handleEmpty() {
        const { firstName, lastName, age, sex, password, repeat } = this.state;
        const arr = [firstName, lastName, age, sex, password, repeat];
        this.setState({
            isNotEmpty: arr.findIndex(
                function (ele) {
                    return ele === null;
                }) < 0 ? true : false
        })
    };

    handleFirstName(e) {
        this.setState({ firstName: e.target.value });
        this.setState({ isValidFirst: e.target.value.match(/[^A-Za-z]/g) === null });
    }

    handleLastName(e) {
        this.setState({ lastName: e.target.value });
        this.setState({ isValidLast: e.target.value.match(/[^A-Za-z]/g) === null });
    }

    handleAge(e) {
        this.setState({ age: e.target.value })
        this.setState({ isValidAge: e.target.value > 0 && e.target.value < 121 });
    }

    handlePwd(e) {
        this.setState({ password: e.target.value });
        this.setState({ isValidPwd: e.target.value.match(/[^a-z0-9]+$/i) === null });
        this.setState({ isValidPwdLength: e.target.value.length > 7 && e.target.value.length < 21 });
    }

    handleRepeat(e) {
        this.setState({ repeat: e.target.value });
        this.setState({ isValidRepeat: this.state.password === e.target.value });
        this.handleEmpty(e.target.value);
    }

    render() {
        const { isValidFirst, isValidLast, isValidAge, isValidPwd, isValidPwdLength, isValidRepeat, isNotEmpty } = this.state;
        const isValidEntry = isValidFirst && isValidLast && isValidAge && isValidPwd && isValidPwdLength && isValidRepeat && isNotEmpty;
        return (
            <div className="grid-container">
                <div><h1 className="headers">Edit User</h1></div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>First Name:</td>
                                <td>
                                    <input
                                        type="text"
                                        value={this.state.firstName}
                                        onChange={e => this.handleFirstName(e)}
                                    />
                                </td>
                                <td>{isValidFirst ? "" : "Please enter valid First Name"}</td>
                            </tr>
                            <tr>
                                <td>Last Name:</td>
                                <td>
                                    <input
                                        type="text"
                                        value={this.state.lastName}
                                        onChange={e => this.handleLastName(e)}
                                    />
                                </td>
                                <td>{isValidLast ? "" : "Please enter valid Last Name"}</td>
                            </tr>
                            <tr>
                                <td>Sex:</td>
                                <td>
                                    <select name="sex" id="sex" value={this.state.sex} onChange={e => this.setState({ sex: e.target.value })}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Transgender">Transgender</option>
                                        <option value="Other">Other</option>
                                        <option value="Prefer not to say">Prefer not to say</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Age:</td>
                                <td>
                                    <input
                                        type="text"
                                        value={this.state.age}
                                        onChange={e => this.handleAge(e)}
                                    />
                                </td>
                                <td>{isValidAge ? "" : "Please enter valid range 0 - 120"}</td>
                            </tr>
                            <tr>
                                <td>Password:</td>
                                <td>
                                    <input
                                        type="password"
                                        value={this.state.password}
                                        onChange={e => this.handlePwd(e)}
                                    />
                                </td>
                                <td>{isValidPwd && isValidPwdLength ? "" : "Please enter valid password with number and letters. The length is 8 - 20."}</td>
                            </tr>
                            <tr>
                                <td>Repeat:</td>
                                <td>
                                    <input
                                        type="password"
                                        placeholder="Enter password again"
                                        onChange={e => this.handleRepeat(e)}
                                    />
                                </td>
                                <td>{isValidRepeat ? "" : "Please make sure the password and repeat is consistent."}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-4">
                    <button type="submit" className={isValidEntry ? "submit-button" : "submit-disable-button"} onClick={() => this.submitUser()}>
                        <i className="fas fa-user-alt"></i> Save Changes
                    </button>
                </div>
            </div>
        );
    }
}

export default connect(null)(EditUser);