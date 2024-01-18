FROM node:20.10.0
# 디렉토리 전환 명령어로 이후의 명령어는 모두 /app 경로를 기준으로 동작한다.

RUN mkdir -p /app
WORKDIR /app
ADD . /app/

RUN rm package-lock.json || true
RUN npm install
RUN npm run build

ENV VUE_APP_API_URL http://www.chatpt.shop:8888/springpt
ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "npm", "run", "serve"]