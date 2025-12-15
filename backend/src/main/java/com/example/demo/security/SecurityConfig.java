package com.example.demo.security; // ⚠️ KEEP YOUR PACKAGE NAME

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. DISABLE CSRF (Fixes the 403 error on POST requests)
                .csrf(csrf -> csrf.disable())

                // 2. ENABLE CORS (Fixes the connection to localhost:3000)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // 3. ALLOW PUBLIC ACCESS to your auth endpoints
                .authorizeHttpRequests(auth -> auth
                        // This allows both /auth/signup AND /api/auth/signup to work
                        .requestMatchers("/**").permitAll()
                        // All other pages require login
                        .anyRequest().authenticated()
                );

        return http.build();
    }

    // This block handles the CORS "handshake" between React and Java
    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000")); // Your React URL
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}