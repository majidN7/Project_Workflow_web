@echo off

set "CATALINA_HOME=%CD%\server\apache-tomcat-10.1.36"

echo "starting Celever Platform 7.23.0-alpha4 on Apache Tomcat 10.1.36"

cd server\apache-tomcat-10.1.36\bin\
start startup.bat

ping -n 5 localhost > NULL
start http://localhost:8080/camunda-welcome/index.html
 