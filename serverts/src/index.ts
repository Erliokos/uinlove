import 'reflect-metadata'
import exspress, { Express } from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql';
import { UserCrud } from './resolvers/userCrud';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { createConnection } from  'typeorm'
import { User } from './entities/User';

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    database: 'mizer',
    entities: [User],
    logging: true,
    synchronize: true,
    username: 'postgres',
    password: '',
    port: 5434
  })

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserCrud], 
      validate: false 
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
  })

  await apolloServer.start( )
  const app: Express = exspress();
  apolloServer.applyMiddleware({
    app
  })
  
  app.get('/', (_req, res) => res.send('hello world'));

  const PORT = process.env.PORT || 4000

  app.listen(PORT, () => console.log(`Server start has been port ${PORT}`)
  )


}

main().catch((err) => console.error(err))
