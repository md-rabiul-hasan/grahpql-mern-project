const Project = require("./../models/Project");
const Client  = require("./../models/Client");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInputObjectType, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql');

// client type schema
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id   : { type: GraphQLID },
        name : { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
});

// project type schema
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id         : { type: GraphQLID },
        name       : { type: GraphQLString },
        description: { type: GraphQLString },
        status     : { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args){
                return Client.findById(parent.clientId);
                // return clients.find( client => client.id == parent.clientId)
            }
        }
    })
});

// Query 
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                return Client.findById(args.id);
                // return clients.find((client) => client.id === args.id)
            }
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args){
                return Client.find();
                // return clients
            }
        },
        project: {
            type: ProjectType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Project.findById(args.id);
                // return projects.find((project) => project.id == args.id)
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args){
                return Project.find();
                // return projects
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        // client create
        addClient: {
            type: ClientType,
            args: {
                name : { type: GraphQLNonNull(GraphQLString)},
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                const client = new Client ({
                    name : args.name,
                    email: args.email,
                    phone: args.phone
                });
                return client.save();
            }
        },
        // client delete
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                return Client.findByIdAndRemove(args.id);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})