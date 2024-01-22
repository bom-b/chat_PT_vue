#FROM node:20.10.0
## 디렉토리 전환 명령어로 이후의 명령어는 모두 /app 경로를 기준으로 동작한다.
#
#RUN mkdir -p /app
#WORKDIR /app
#ADD . /app/
#
#RUN rm package-lock.json || true
#RUN npm install
#RUN npm run build
#
#ENV VUE_APP_API_URL http://www.chatpt.shop:8888/springpt
#ENV HOST 0.0.0.0
#EXPOSE 3000
#
#CMD [ "npm", "run", "serve"]

##### nginx 사용으로 변경 #####
# 빌드 스테이지
FROM node:20.10.0 as builder

WORKDIR /app
ADD . /app/

RUN rm package-lock.json || true
RUN npm install
RUN npm run build

# 배포 스테이지
FROM nginx:1.19.6-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]