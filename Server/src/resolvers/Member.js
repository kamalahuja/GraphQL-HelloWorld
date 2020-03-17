 const { filter } = require('lodash');

 async function posts(parent, args, context) {
     return new Promise((resolve, reject) => {
         fetch("http://localhost:3000/posts").then((results) => {
             return results.json();

         }).then((data) => {
             const posts = data;
             const returns = posts.filter((post) => {
                 console.log("here is post");
                 console.log(post);
                 return parent.posts.includes(post.id);
             });
             resolve(returns);
         });

     });

 }

 module.exports = {
     posts
 }