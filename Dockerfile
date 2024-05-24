# Этап сборки
FROM maven:3.8.4-openjdk-11-slim AS build

# Установим рабочую директорию
WORKDIR /app

# Скопируем pom.xml и скачиваем зависимости
COPY pom.xml .
RUN mvn dependency:go-offline

# Копируем исходные файлы и собираем приложение
COPY src ./src
RUN mvn package -DskipTests

# Этап запуска
FROM openjdk:11-jdk-slim-buster

# Установим рабочую директорию
WORKDIR /app

# Скопируем скомпилированный JAR файл из этапа сборки
COPY --from=build /app/target/spring-boot_security-demo-0.0.1-SNAPSHOT.jar /app/java-advanced.jar

# Используем небезопасного пользователя для запуска приложения
RUN useradd -m myuser
USER myuser

# Открываем порт, на котором будет работать приложение
EXPOSE 8080

# Устанавливаем команду для запуска JAR файла
ENTRYPOINT ["java", "-jar", "java-advanced.jar"]