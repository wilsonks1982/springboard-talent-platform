package org.wilsonks.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.wilsonks.backend.domain.IndustryTag;
import org.wilsonks.backend.domain.SkillTag;
import org.wilsonks.backend.repository.IndustryTagRepository;
import org.wilsonks.backend.repository.SkillTagRepository;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class TaxonomySeeder {

    @Bean
    CommandLineRunner seedTaxonomy(
            IndustryTagRepository industryRepository,
            SkillTagRepository skillRepository) {

        return args -> {
            seedIndustries(industryRepository);
            seedSkills(skillRepository);
        };
    }

    private void seedIndustries(
            IndustryTagRepository repository) {

        if (repository.count() > 0) {
            return;
        }

        repository.saveAll(List.of(
                industry("FinTech", "FINTECH", 10),
                industry("Banking & Financial Services", "BANKING_FINANCIAL_SERVICES", 20),
                industry("Insurance", "INSURANCE", 30),
                industry("Healthcare", "HEALTHCARE", 40),
                industry("E-commerce & Retail", "ECOMMERCE_RETAIL", 50),
                industry("SaaS", "SAAS", 60),
                industry("IT Services", "IT_SERVICES", 70),
                industry("Consulting", "CONSULTING", 80),
                industry("Telecommunications", "TELECOMMUNICATIONS", 90),
                industry("Automotive", "AUTOMOTIVE", 100),
                industry("Manufacturing", "MANUFACTURING", 110),
                industry("Logistics & Supply Chain", "LOGISTICS_SUPPLY_CHAIN", 120),
                industry("Media & Entertainment", "MEDIA_ENTERTAINMENT", 130),
                industry("Travel & Hospitality", "TRAVEL_HOSPITALITY", 140),
                industry("Education & EdTech", "EDUCATION_EDTECH", 150),
                industry("Government & Public Sector", "GOVERNMENT_PUBLIC_SECTOR", 160),
                industry("Energy & Utilities", "ENERGY_UTILITIES", 170),
                industry("Real Estate", "REAL_ESTATE", 180),
                industry("Pharmaceuticals", "PHARMACEUTICALS", 190),
                industry("Other", "OTHER", 999)
        ));
    }

    private void seedSkills(
            SkillTagRepository repository) {

        if (repository.count() > 0) {
            return;
        }

        repository.saveAll(List.of(
                skill("Java", "JAVA", 10),
                skill("Spring Boot", "SPRING_BOOT", 20),
                skill("Spring Framework", "SPRING_FRAMEWORK", 30),
                skill("React", "REACT", 40),
                skill("JavaScript", "JAVASCRIPT", 50),
                skill("TypeScript", "TYPESCRIPT", 60),
                skill("Python", "PYTHON", 70),
                skill("SQL", "SQL", 80),
                skill("PostgreSQL", "POSTGRESQL", 90),
                skill("MySQL", "MYSQL", 100),
                skill("REST APIs", "REST_APIS", 110),
                skill("Microservices", "MICROSERVICES", 120),
                skill("AWS", "AWS", 130),
                skill("Microsoft Azure", "AZURE", 140),
                skill("Google Cloud", "GOOGLE_CLOUD", 150),
                skill("Docker", "DOCKER", 160),
                skill("Kubernetes", "KUBERNETES", 170),
                skill("Git", "GIT", 180),
                skill("CI/CD", "CI_CD", 190),
                skill("Apache Kafka", "APACHE_KAFKA", 200),
                skill("Redis", "REDIS", 210),
                skill("MongoDB", "MONGODB", 220),
                skill("JPA / Hibernate", "JPA_HIBERNATE", 230),
                skill("JUnit", "JUNIT", 240),
                skill("Mockito", "MOCKITO", 250),
                skill("Linux", "LINUX", 260),
                skill("System Design", "SYSTEM_DESIGN", 270),
                skill("Distributed Systems", "DISTRIBUTED_SYSTEMS", 280),
                skill("Agile / Scrum", "AGILE_SCRUM", 290),
                skill("Technical Leadership", "TECHNICAL_LEADERSHIP", 300)
        ));
    }

    private IndustryTag industry(
            String name,
            String code,
            int displayOrder) {

        IndustryTag tag = new IndustryTag();

        tag.setName(name);
        tag.setCode(code);
        tag.setDisplayOrder(displayOrder);
        tag.setActive(true);

        return tag;
    }

    private SkillTag skill(
            String name,
            String code,
            int displayOrder) {

        SkillTag tag = new SkillTag();

        tag.setName(name);
        tag.setCode(code);
        tag.setDisplayOrder(displayOrder);
        tag.setActive(true);

        return tag;
    }
}