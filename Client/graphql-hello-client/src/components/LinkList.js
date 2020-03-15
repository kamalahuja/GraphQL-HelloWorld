import React, { Component } from 'react';
import Link from './Link';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
const FEED_QUERY = gql `{
    
      feed(filter : "link"  skip: 2 first : 5) {
        id
        description
        url
        
      }
      
    
        }`;
class LinkList extends Component {
    
    render() {
            

            return (
                <Query query={FEED_QUERY}>
                    {
                        ({loading, error, data}) => {
                            if(loading) return <div>Fetchin</div>
                            if(error) {
                                console.log(error);
                                return <div>Error</div>
                            }
                            const linksToRender = data.feed
                            return (
                                <div>
                                    {
                                        linksToRender.map(link => <Link key={link.id} link={link}></Link>)
                                    }
                                </div>
                            )
                        }
                    }
                    
                </Query>
            );
            


                }
            }


            export default LinkList