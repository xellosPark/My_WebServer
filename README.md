1. npm install -g @nestjs/cli

2. nest new project-name (2. nest new ./ ) <- 해당 폴더

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
npm 명령어	                     yarn 명령어	                       설명
npm init	                       yarn init	                프로젝트 초기화
npm install 	                   yarn 또는 yarn install	    package.json의 패키지 설치
npm install --save 패키지명	     yarn add                   패키지명	패키지를 프로젝트 의존성 수준으로 추가
npm install --save-dev 패키지명	 yarn add --dev 패키지명	  패키지를 프로젝트 개발 의존성 수준으로 추가
npm install --global 패키지명	   yarn global add 패키지명	  패키지를 전역 수준으로 추가
npm update --save	               yarn upgrade	              프로젝트 패키지 업데이트
npm run 스크립트명	             yarn 스크립트명	          package.json의 스크립트 명령 실행
npm uninstall --save 패키지명	  yarn remove 패키지명	      패키지 삭제
npm cache clean	                yarn cache clean	          캐쉬 삭제


npm으로 nodemon설치
실시간으로 스크립트 파일을 디버깅 할 수 있는 패키지입니다.
npm install --global nodemon


📢 DTO란 무엇인가요?  
 

DTO(Data Transfer Object, 데이터 전송 객체)란 프로세스 간에 데이터를 전달하는 객체를 의미합니다. 말 그대로 데이터를 전송하기 위해 사용하는 객체라서 그 안에 비즈니스 로직 같은 복잡한 코드는 없고 순수하게 전달하고 싶은 데이터만 담겨있습니다.  아래의 그림을 통해 DTO는 주로 클라이언트와 서버가 데이터를 주고받을 때 사용하는 객체임을 알 수 있습니다
interface나 class를 이용해서 정의 될 수 있습니다.
하지만 클래스를 이용하는것을 NestJs에서는 추천하고 있습니다.