#! /bin/bash


docker run --name short-mysql -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=url_shortner -p 3306:3306 -d mysql --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci 