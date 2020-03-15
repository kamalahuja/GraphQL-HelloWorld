import React, { Component } from 'react';
import Link from './Link';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
const FEED_QUERY = gql `{
    
      feed(filter : "link"  skip: 0 first : 50) {
        id
        description
        url
        
      }
      
    
        }`;
const NEW_LINKS_SUBSCRIPTION = gql`
subscription {
  newLink {
    id
    url
    description
  }
}`;        
class LinkList extends Component {
    _subscribeToNewLinks = subscribeToMore => {
        subscribeToMore(
            {
                document: NEW_LINKS_SUBSCRIPTION,
                updateQuery: (prev, {subscriptionData}) => {
                        if(!subscriptionData.data) return prev;
                        const newLink = subscriptionData.data.newLink;
                        console.log(newLink);
                        console.log(prev);
                        console.log(prev.feed);
                        const exists = prev.feed.find( ({id}) => id === newLink.id);
                        if(exists) return prev;

                        return Object.assign(
                            {}, prev, {
                                feed: [newLink, ...prev.feed],
                            }
                        )
                }
            }
        )
    }
    render() {
            

            return (
                <Query query={FEED_QUERY}>
                    {
                        ({loading, error, data , subscribeToMore }) => {
                            if(loading) return <div>Fetchin</div>
                            if(error) {
                                console.log(error);
                                return <div>Error</div>
                            }
                            this._subscribeToNewLinks(subscribeToMore);
                            const linksToRender = data.feed.links ? data.feed.links : data.feed;
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