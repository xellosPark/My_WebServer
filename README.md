1. npm install -g @nestjs/cli
2. nest new project-name

3. 모듈 추가 
 - nest g module boards

4. Controller 추가
 - nest g controller boards --no-spec

5. Service 추가
 - nest g service boards --no-spec

6. uuid 모듈 사용하기  
   유니크 값 사용시 사용 대부분 ID 아이디에 사용
 - npm install uuid --save



npm & yarn명령어 복습
npm 명령어	                     yarn 명령어	                                설명
npm init	                    yarn init	                           프로젝트 초기화
npm install 	                yarn 또는 yarn install	                package.json의 패키지 설치
npm install --save 패키지명	     yarn add                               패키지명	패키지를 프로젝트 의존성 수준으로 추가
npm install --save-dev 패키지명	 yarn add --dev 패키지명	             패키지를 프로젝트 개발 의존성 수준으로 추가
npm install --global 패키지명	 yarn global add 패키지명	             패키지를 전역 수준으로 추가
npm update --save	            yarn upgrade	                        프로젝트 패키지 업데이트
npm run 스크립트명	             yarn 스크립트명	                     package.json의 스크립트 명령 실행
npm uninstall --save 패키지명	 yarn remove 패키지명	                 패키지 삭제
npm cache clean	                yarn cache clean	                    캐쉬 삭제


npm으로 nodemon설치
실시간으로 스크립트 파일을 디버깅 할 수 있는 패키지입니다.
npm install --global nodemon


2024-06-14