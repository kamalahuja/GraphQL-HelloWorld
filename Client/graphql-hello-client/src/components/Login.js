import React, { Component } from 'react';
import {AUTH_TOKEN} from './constants';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';


const SIGNUP_MUTATION = gql`
    mutation signUpMutation($email : String!, $password : String!, $name : String!){
  signup(email: $email, password: $password, name: $name){
    token
  }
}
`;


const LOGIN_MUTATION = gql`
    mutation loginMutation($email : String!, $password : String!){
        login(email : $email, password : $password){
            token
        }
    }
`;

class Login extends Component {
    state = {
        login: true,
        email: '',
        password: '',
        name: '',
    }

    
    render(){
        const {login, email, password, name} = this.state;
        return (
            <div>
                <h4 className="mv3">{login ? "Login" : "SignUp"}</h4>
                <div className="flex flex-column">
                    {!login && (
                        <input value={name} onChange={e => this.setState({name : e.target.value}) } type="text" placeholder="Your Name"></input>
                    )}

                    <input value={email} onChange={e => this.setState({email : e.target.value})} type="text" placeholder="Your Email Addreess"></input>    
                    <input value={password} onChange={e => this.setState({password : e.target.value})} type="password" placeholder="Your Password"></input>    
                </div>

                <div className="flex mt3">

                        <Mutation
                          mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                          variables ={{email, password, name}}
                           onCompleted={data => this._confirm(data)}>

                           {mutation => (
                            <div className="pointer mr2 button" onClick={mutation}>
                                {login ? 'login' : 'create account'}

                            </div>
                           )}
                        </Mutation>
                    
                    <div className="pointer button" onClick={() => this.setState({login : !login})}>
                            {login ? 'need to create accoun' : 'already have account'}
                    </div>
                </div>
            </div>
        );
    }

    _confirm = async (data) => {
        const {token} = this.state.login ? data.login : data.signup
        this._saveUserData(token);
        this.props.history.push(`/`);
    }

    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token);
    }
}


export default Login;