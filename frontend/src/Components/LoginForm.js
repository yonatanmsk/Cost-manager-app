import Header from './Header';
import { FormButton } from './Button';
import { SmallFlex } from './Styles/Flex'
import { useState, useEffect } from 'react'
import { StyledInput } from './Styles/Input.Styled';
import { LoginContainer } from './Styles/Container.styled';

const LoginForm = ({ setUserIdentifier }) => {

    const [userId, setId] = useState("");
    const [userName, setUsername] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [firstName, setFirstName] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [user, setUser] = useState({});

    const [formErrors, setFormErrors] = useState({});
    const [isRegister, setIsRegister] = useState(false);
    const [pageMassage, setPageMassage] = useState("");

    useEffect(() => {
        const userId = window.localStorage.getItem("USER_ID");
        if (userId != "") {
            setUserIdentifier(JSON.parse(userId))
        }
    }, [])


    const onRegister = () => {
        const errors = {};

        if (!userName.trim() || userName.trim().length < 3) {
            errors.userName = "Min 3 characters required";
        }
        if (!firstName.trim() || firstName.trim().length < 2) {
            errors.firstName = "Min 2 characters required";
        }
        if (!userId.trim() || userId.trim().length < 9) {
            errors.userId = "Min 9 characters required";
        }
        if (!lastName.trim() || lastName.trim().length < 2) {
            errors.lastName = "Min 2 characters required";
        }
        if (!birthday.trim()) {
            errors.birthday = "Please choose a date";
        }
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            const newUser = {userName, userId, firstName, lastName, birthday, maritalStatus};
            console.log(JSON.stringify(newUser))
            fetch("http://localhost:5000/users/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser)
            }).then(() => {
                console.log("User added succesfully");
            })
            clearFrom();
            setPageMassage("Registered Successfully");
            setIsRegister(!isRegister);
        }
    }

    const onLogin = () => {
        const errors = {};

        if (!userName.trim() || userName.trim().length < 3) {
            errors.userName = "Min 3 characters required";
        }
        if (!userId.trim() || userId.trim().length < 9) {
            errors.userId = "Min 9 characters required";
        }
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            setPageMassage("Loading Profile...");
            const usere = {};
            getUser().then(result => setUser(result[0])); // FIX 2 CLICKS
            if (usere != null) {
                setPageMassage("Login Successfully");
                setUserIdentifier(user.userIdentifier);
            }
            else { setPageMassage("Check login info"); }
        }
        else { setPageMassage(""); }
    }

    const getUser = async () => {
        const user = await fetchUserFromDB();
        return user;
    }

    const fetchUserFromDB = async () => {
        const url = "http://localhost:5000/users/userName/" + userName + "/userId/" + userId;
        const response = await fetch(url);
        const data = response.json();
        return data;
    }

    const clearFrom = () => {
        setPageMassage("");
        setFormErrors({});
        setFirstName("");
        setUsername("");
        setLastName("");
        setBirthday("");
        setId("");
    }

    return (
        <LoginContainer style={{
            height: !isRegister ? "250px" : "360px",
            maxWidth: !isRegister ? "25%" : "30%"
        }}>
            <Header title={"Login/Register"} fontSize={"12px"}></Header>
            <SmallFlex>
                <div className='FormControl' style={{ paddingTop: "10px" }}>
                    <label>Username</label>
                    <StyledInput className="UserName">
                        <input
                            minLength={3}
                            type="text"
                            placeholder="Username"
                            required
                            value={userName}
                            onChange={(e) => setUsername(e.target.value)}
                        ></input>
                        <p>{formErrors.userName}</p>
                    </StyledInput>
                </div>
                {isRegister && <div className='FormControl' style={{ paddingTop: "10px" }}>
                    <label>First Name</label>
                    <StyledInput className="FirstName">
                        <input
                            type="text"
                            placeholder="First Name"
                            minLength={2}
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        ></input>
                        <p>{formErrors.firstName}</p>
                    </StyledInput>
                </div>}
            </SmallFlex>
            <SmallFlex>
                <div className='FormControl' style={{ paddingTop: "0px" }}>
                    <label>ID</label>
                    <StyledInput className="ID">
                        <input
                            type="number"
                            placeholder="ID"
                            minLength={9}
                            min={0}
                            required
                            value={userId}
                            onChange={(e) => setId(e.target.value)}
                        ></input>
                        <p>{formErrors.userId}</p>
                    </StyledInput>
                </div>
                {isRegister && <div className='FormControl' style={{ paddingTop: "0px" }}>
                    <label>Last Name</label>
                    <StyledInput className="LastName">
                        <input
                            type="text"
                            placeholder="Last Name"
                            minLength={2}
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        ></input>
                        <p>{formErrors.lastName}</p>
                    </StyledInput>
                </div>}
            </SmallFlex>
            {isRegister && <SmallFlex>
                <div className='FormControl' style={{ paddingTop: "5px" }}>
                    <label>Marital Status</label>
                    <StyledInput className="MaritalStatus">
                        <select
                            onChange={(e) => setMaritalStatus(e.target.value)}
                            style={{
                                minWidth: "140px",
                                marginRight: "7px",
                                marginBottom: "10px"
                            }}>
                            <option value={"Single"}>Single</option>
                            <option value={"Married"}>Married</option>
                            <option value={"Divorced"}>Divorced</option>
                            <option value={"Widowed"}>Widowed</option>
                        </select>
                    </StyledInput>
                </div>
                <div className='FormControl' style={{ paddingTop: "5px" }}>
                    <label>Birthday</label>
                    <StyledInput className="ID">
                        <input
                            type="date"
                            placeholder="Birthday"
                            required
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        ></input>
                        <p>{formErrors.birthday}</p>
                    </StyledInput>
                </div>
            </SmallFlex>}
            <div className='FormControl' style={{ paddingTop: "0px" }}>
                <SmallFlex>
                    {!isRegister && <FormButton
                        className="LoginButton"
                        backgroundColor={"steelblue"}
                        text={"Login"}
                        minWidth={"100px"}
                        minHeight={"30px"}
                        onClick={onLogin}
                    ></FormButton>}
                    <FormButton
                        className="RegisterButton"
                        backgroundColor={!isRegister ? "steelblue" : "#C41E3A"}
                        text={!isRegister ? "Register" : "Cancel"}
                        minWidth={"100px"}
                        minHeight={"30px"}
                        onClick={() => { setIsRegister(!isRegister); clearFrom(); }}>
                    </FormButton>
                </SmallFlex>
                {isRegister && <FormButton
                    className="SubmitRegister"
                    backgroundColor={"steelblue"}
                    text={"Submit"}
                    minWidth={"200px"}
                    minHeight={"30px"}
                    margin={"10px"}
                    onClick={onRegister}
                ></FormButton>}
            </div>
            <p>{pageMassage}</p>
        </LoginContainer>
    )
}

export default LoginForm;