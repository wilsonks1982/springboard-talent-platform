package org.wilsonks.backend.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.util.Locale;

@Service
@Slf4j
public class LocalDocumentStorageService implements DocumentStorageService {

    private final Path rootDirectory;

    public LocalDocumentStorageService(@Value("${app.storage.upload-dir}") String uploadDirectory) {
        this.rootDirectory = Paths.get(uploadDirectory).toAbsolutePath().normalize();

        try {
            Files.createDirectories(rootDirectory);
            log.info("Initialized document storage at: {}", rootDirectory);
        } catch (IOException e) {
            throw new IllegalStateException("Could not initialize document storage", e);
        }
    }

    @Override
    public String store(String candidateEmail, MultipartFile file) throws IOException {

        String emailDirectory = candidateEmail.trim().toLowerCase(Locale.ROOT);

        String storageKey = "candidates/" + emailDirectory + "/Resume.pdf";

        Path target = rootDirectory.resolve(storageKey).normalize();

        if (!target.startsWith(rootDirectory)) {
            throw new IOException("Invalid storage path");
        }

        Files.createDirectories(target.getParent());

        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, target, StandardCopyOption.REPLACE_EXISTING);
        }

        return storageKey;
    }

    @Override
    public void delete(String storageKey) throws IOException {

        Path target = rootDirectory.resolve(storageKey).normalize();

        if (!target.startsWith(rootDirectory)) {
            throw new IOException("Invalid storage path");
        }

        Files.deleteIfExists(target);
    }

    @Override
    public Path load(String storageKey) {

        Path target = rootDirectory.resolve(storageKey).normalize();

        if (!target.startsWith(rootDirectory)) {
            throw new IllegalArgumentException("Invalid storage path");
        }

        return target;
    }
}