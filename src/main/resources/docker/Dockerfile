FROM openjdk:latest
MAINTAINER graundshadow@gmail.com

# WORKDIR /wtg
# COPY .mvn/ .mvn
# COPY mvnw pom.xml ./
# RUN ./mvnw dependency:resolve
# COPY target/WTG-0.0.1-SNAPSHOT.jar WTG-0.0.1-SNAPSHOT.jar

ARG JAR_FILE=*.jar
COPY ${JAR_FILE} WTG-0.0.1-SNAPSHOT.jar

ENTRYPOINT ["java", "-jar", "WTG-0.0.1-SNAPSHOT.jar"]
CMD ["./mvnw", "spring-boot:run"]


