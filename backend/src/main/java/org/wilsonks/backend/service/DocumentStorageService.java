package org.wilsonks.backend.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.UUID;

/*
    * This interface defines the contract for a document storage service. Implementations of this interface
    * The important design decision here is that the rest of the application doesn't know whether we're using:
    * - Local file system storage
    * - Cloud storage (e.g., AWS S3, Google Cloud Storage)
    * - Database storage (e.g., storing files as BLOBs)
    * The interface abstracts away the underlying storage mechanism, allowing for flexibility and easier maintenance.
    * Implementations of this interface can be swapped out without affecting the rest of the application, as long as they adhere to the defined contract.
    * This design promotes the Open/Closed Principle, one of the SOLID principles, which states that software entities should be open for extension but closed for modification.
    *
 */
public interface DocumentStorageService {
    String store(
            String candidateEmail,
            String documentName,
            MultipartFile file
    ) throws IOException;
    void delete(String storageKey) throws IOException; // deletes the file associated with the given storage key
    Path load(String storageKey); // returns the path to the file associated with the given storage key
}