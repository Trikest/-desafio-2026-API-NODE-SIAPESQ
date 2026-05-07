import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { AppModule } from '../app.module';

describe('Species Integration', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/species (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/species')
      .set('Authorization', 'Bearer SEU_TOKEN');

    expect(response.status).toBe(200);
  });
});