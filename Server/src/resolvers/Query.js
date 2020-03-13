async function feed(root, args, context, info) {
    const where = args.filter ? {
        OR: [{
                description_contains: args.filter
            },
            {
                url_contains: args.filter
            }
        ]
    } : {}

    const results = await context.prisma.links({
        where,
        skip: args.skip,
        first: args.first,
        orderBy: args.orderBy
    })
    return results
}
async function users(root, args, context, info) {

    const results = await context.prisma.users();
    return results
}

async function members(root, args, context, info) {
    const results = await fetch("http://localhost:3000/members");
    console.log("members - Members");
    const returnValue = results.json();
    return returnValue;
}
module.exports = {
    feed,
    users,
    members
}