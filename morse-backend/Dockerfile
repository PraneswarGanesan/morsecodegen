# Step 1: Build stage using Maven and JDK 21
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Step 2: Runtime stage using OpenJDK 21
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=build /app/target/morse-0.0.1-SNAPSHOT.jar morse-app.jar
EXPOSE 7770
ENTRYPOINT ["java", "-jar", "morse-app.jar"]
