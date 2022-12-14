import 'reflect-metadata'
import request from 'supertest'
import app from '../Config/App'

describe('Body Parser Middleware', () => {
  test('Should parse body as json', async () => {
    app.post('/test-body-parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test-body-parser')
      .send({ name: 'Jhonata' })
      .expect({ name: 'Jhonata' })
  })
})
