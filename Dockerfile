FROM node:latest as build-stage
# 디렉토리 전환 명령어로 이후의 명령어는 모두 /app 경로를 기준으로 동작한다.
WORKDIR /app
# package.json이름을 가진 파일을 모두 workdir폴더로 복사한다.
COPY package*.json ./

RUN npm install

# 현재 폴더를 workdir폴더에 복사한다.
COPY src .
# 빌드하기 !

RUN npm run build