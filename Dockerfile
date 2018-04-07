FROM cypress/base:8

COPY . .

RUN yarn install --force

CMD yarn test