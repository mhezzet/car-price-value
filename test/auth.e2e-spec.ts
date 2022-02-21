import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send({ email: 'asd@asd.com', password: '123' })
      .expect(201);

    const { id, email } = res.body;

    expect(id).toBeDefined();
    expect(email).toEqual('asd@asd.com');
  });

  it('handles a signup setCookie', async () => {
    const signRes = await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send({ email: 'asd1@asd.com', password: '123' })
      .expect(201);

    const cookie = signRes.get('Set-Cookie');

    console.log('------------>', cookie);

    const whoamiRes = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    const { email } = whoamiRes.body;

    expect(email).toEqual('asd1@asd.com');
  });
});
