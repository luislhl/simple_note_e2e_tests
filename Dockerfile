FROM cypress/base:8

COPY . .

RUN yarn install

CMD yarn test
