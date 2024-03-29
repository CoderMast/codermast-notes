---
order : 18
---
# MySQL进阶 - 触发器
## 介绍
触发器是于表有关的数据库对象，指在insert、update、delete之前或者之后，触发并执行触发器中定义的SQL语句集合。触发器的这种特性可以与协助应用在数据库端确保数据的完整性，日志记录，数据校验等操作。

使用别名OLD和NEW来引用触发器中发生变化的记录内容，这与其他的数据库是相似的。现在触发器还只支持行级触发，不支持语句级触发。

::: note 举例
语句级触发：执行一次SQL，触发器会触发一次，无论影响多少行。
行级触发：如一个SQL语句更新了3行数据，则触发器会触发三次。
:::
## 类型

|触发器类型|NEW和OLD|
|:---:|:---:|
|INSERT型触发器|NEW表示将要或者已经新增的数据|
|UPDATE型触发器|OLD表示修改之前的数据，NEW表示将要或已经修改后的数据|
|DELETE型触发器|OLD表示将要或者已经删除的数据|

## 语法

- 创建
> MySQL目前只支持行级触发器
```sql
CREATE TRIGGER trigger_name
BEFORE/AFTER INSERT/UPDATE/DELETE
ON tbl_name FOR EACH ROW -- 行级触发器
BEGIN
    -- 触发器语句
    trigger_stmt;
END;
```
- 查看
```sql
SHOW TRIGGERS;
```
- 删除
```sql
-- 如果没有指定schema_name，默认为当前数据库
DROP TRIGGER [schema_name.]trigger_name;
```

## 案例

### 插入触发器

```sql
CREATE TRIGGER user_insert_trigger
AFTER INSERT
ON user FOR EACH ROW
BEGIN
    -- user表中数据插入时，则向日志表中插入一条数据
    INSERT INTO user_logs(id,operate_type,excute_sql) VALUE (null,"INSERT",concat("SQL:INSERT INTO user(id,username,password) VALUE (",new.id,",",new.username,",",new.password,")"));
END;
```
### 更新触发器

```sql
CREATE TRIGGER user_update_trigger
AFTER UPDATE
ON user FOR EACH ROW
BEGIN
    -- user表中数据更新时，则向日志表中插入一条数据
    INSERT INTO user_logs(id,operate_type,excute_sql) VALUE (null,"UPDATE",concat("SQL:INSERT INTO user(id,username,password) VALUE (",new.id,",",new.username,",",new.password,")"));
END;
```

### 删除触发器
```sql
CREATE TRIGGER user_delete_trigger
AFTER DELETE
ON user FOR EACH ROW
BEGIN
    -- user表中数据删除时，则向日志表中插入一条数据
    INSERT INTO user_logs(id,operate_type,excute_sql) VALUE (null,"DELETE",concat("SQL:INSERT INTO user(id,username,password) VALUE (",new.id,",",new.username,",",new.password,")"));
END;
```

::: info 小知识
在触发器内所执行的SQL中，我们可以使用NEW和OLD两个关键字来调用执行后和执行前的数据。
:::