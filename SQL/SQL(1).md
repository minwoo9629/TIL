## RDBMS

- 관계형(`Relactional`) 데이터베이스 시스템
- 테이블기반(`Table based`) `DBMS`
    - 데이터를 테이블 단위로 관리
        - 하나의 테이블은 여러 개의 칼럼(`Column`)으로 구성
    - 중복 데이터를 최소화 시킴
        - 같은 데이터가 여러 `Column` 또는 테이블에 존재 하는 경우
          데이터를 수정 시 문제가 발생할 가능성이 높아짐 → 정규화를 통해 해결
    - 여러 테이블에 분산되어 있는 데이터를 검색 시 테이블 간의 관계 `join` 을 이용하여 필요한 데이터를 검색

## SQL

- DB에 있는 정보를 사용할 수 있도록 지원하는 언어
- SQL문은 대소문자 구별하지 않음(**단, 데이터의 대소문자는 구분**)
    - MySQL, MariaDB는 데이터 대소문자 구분하지 않음
    - 다음과 같이 `binary` 함수를 사용하면 데이터의 대소문자를 구분할 수 있다.

    ```sql
    SELECT *
    FROM MOVIES
    WHERE BINARY(MOVIE_NAME) = 'Hello'
    ```


## SQL 명령어 종류

### DML

`Data Manipulation Language` 데이터베이스에 새롭게 데이터를 추가하거나 삭제, 내용을 갱신하는 등,
데이터를 조작할 때 사용.

- SELECT - 데이터베이스 객체에서 데이터를 조회

    ```sql
    SELECT * | {[ALL | DISTINCT] column | expression [alias], ...}
    FROM table_name
    WHERE conditions;
    ```

    ```sql
    CASE exp1 WHEN exp2 THEN exp3
              WHEN exp4 THEN exp5
              ELSE exp6
    END
    
    // ex
    select exployee_id, first_name, salary,
    	case when salary > 15000 then '고액연봉'
             when salary > 8000 then '평균연봉'
             else '저액연봉'
    	end "연봉등급"
    from employees;
    ```

- INSERT - 데이터베이스 객체에 데이터를 입력

    ```sql
    INSERT INTO TABLE_NAME (col_name1,col_name2,col_name3,...,col_nameN)
    VALUES (col_val1,col_val2,col_val3,...,col_valN);
    ```

- UPDATE - 데이터베이스 객체에 데이터를 수정

    ```sql
    UPDATE TABLE_NAME
    SET col_name1 = col_val1, ..., col_nameN = val_nameN
    WHERE conditions;
    ```

- DELETE - 데이터베이스 객체에 데이터를 삭제

    ```sql
    DELETE FROM TABLE_NAME
    WHERE conditions;
    ```


### DDL

`Data Definitaion Language` 데이터를 정의하는 명령어.

- CREATE - 데이터베이스 객체를 생성
- ALTER - 기존에 존재하는 데이터베이스 객체를 수정
- DROP - 데이터베이스 객체를 삭제
- RENAME

### DCL

`Data Control Language` 데이터를 제어하는 명령어.
트랜잭션을 제어하는 명령과 데이터 접근권한을 제어하는 명령이 포함

- GRANT - 데이터베이스 객체에 권한을 부여
- REVOKE -  데이터베이스 객체 권한 취소

### TCL

`Transaction Control Language` 트랜잭션 제어어

- COMMIT - 실행한 `Query` 를 최종적으로 적용
- ROLLBACK - 실행한 `Query` 를 마지막 `COMMIT` 전으로 취소시켜 데이터를 복구
- SAVEPOINT - `ROLLBACK` 을 수행할 시점을 저장
    - 저장된 `SAVEPOINT`는 `ROLLBACK TO SAVEPOINT`문을 사용하여 표시한 곳까지 `ROLLBACK`

---

## Data Type

### 문자형 데이터 타입

| 타입 | 특징 |
| --- | --- |
| CHAR(N) | 고정 길이를 갖는 문자열 저장<br/>N 은 1 ~ 255 CHAR(20)인 column에 10자만 저장을 하더라도, 20자 만큼의 기억장소 차지|
| VARCHAR(N) | 가변 길이를 갖는 문자열 저장<br/>N 은 1 ~ 255 VARCHAR(20)인 column에 10자만 저장을 하면, 실제로도 10자 만큼의 기억장소를 차지 |
| TEXT | 최대 65535(2^16 - 1)byte |
| ENUM(’value1’, ‘value2’, ...) | 열거형. 정해진 몇가지의 값들 중 하나만 저장.<br/>내부적으로 정수 값으로 표현 |

---

## Table 생성

```sql
create table table_name(
	column_name1 Type [optaional attributes],
	column_name2 Type [optaional attributes],
	...
	column_nameN Type [optaional attributes],
)
```

### 제약조건

칼럼에 저장될 데이터의 조건을 설정하는 것

테이블 생성시 칼럼에 직접 저장하거나 `constraint` 로 지정, 또는 `ALTER` 를 이용하여 설정가능

- NOT NULL - 각 행은 해당 열의 값을 포함해야 하며 `null`값 허용되지 않음
- DEFAULT value - 값이 전달되지 않을 때 추가되는 기본값 설정
- AUTO INCREMENT - 새 레코드가 추가 될 때마다 필드 값을 자동으로 1증가
- PRIMARY KEY - 테이블에서 행을 고유하게 식별하기 위해 사용.
  PRIMARY KEY 설정이 있는 열은 일반적으로 `AUTO INCREMENT`와 같이 사용되는 경우가 많음
- UNIQUE - 칼럼에 중복된 값을 저장 할 수 없음, NULL 값 허용
- FOREIGN KEY - 특정 테이블의 PK 칼럼에 저장되어 있는 값 저장
  참조키, 외래키라고도 부름, `null` 값 허용
  `references`를 이용하여 어떤 칼럼에 어떤 데이터를 참조하는지 반드시 지정
- UNSGNED - Type이 숫자인 경우만 해당, 숫자가 0 또는 양수로 제한
- CHECK 값의 범위나 종류를 지정