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

module.exports = {
    feed
}