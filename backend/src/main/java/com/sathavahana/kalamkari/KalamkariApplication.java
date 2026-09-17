package com.sathavahana.kalamkari;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class KalamkariApplication {
    public static void main(String[] args) {
        SpringApplication.run(KalamkariApplication.class, args);
    }
}
