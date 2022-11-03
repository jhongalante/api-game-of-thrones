import { MongoHelper } from '../Infra/Db/Mongo/MongoHelper'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import swaggerJson from '../../docs/swagger-output.json'
import 'reflect-metadata'

dotenv.config()

MongoHelper.connect(process.env.MONGO_URI)
  .then(async () => {
    const app = (await import('./Config/App')).default
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson))
    app.listen(process.env.PORT, () =>
      console.log(`Server running at http://localhost:${process.env.PORT}`)
    )
    console.log('DB Synced')
  })
  .catch((error) => {
    console.log(`Failed to sync db: ${error as string}`)
  })
