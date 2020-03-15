import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const POST_MUTATION = gql`mutation PostMutation($description: String!, $url: String!){
    post(url: $url description: $description){
      description
      url
    }
  }`;
class CreateLink extends Component {
    state = {
        description: '',
        url: ''

    }
    render() {
        const {description, url} = this.state;
        return (
            <div>
                <div className="flex flex-column mt3">
                    <input className="mb2" value={description} 
                    onChange={e => this.setState({description : e.target.value})}
                    type="text"
                    placeholder="Descrption for the link"></input>

                    <input className="mb2" value={url} 
                    onChange={e => this.setState({url : e.target.value})}
                    type="text"
                    placeholder="URL for the link"></input>
                </div>
                <Mutation mutation={POST_MUTATION} variables={{description, url}} onCompleted={() => this.props.history.push('/')}>
                    {
                        (postMutation) => (
                            <button onClick={postMutation}>
                                submit

                            </button>
                        )
                    }
                </Mutation>
                
            </div>
        );
    }

    
}
export default CreateLink;