import React, { useRef, useState } from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Text,
} from "@chakra-ui/react";

import {
  FiDownload,
  FiFileText,
  FiPlus,
  FiRefreshCw,
  FiTrash2,
} from "react-icons/fi";

function formatFileSize(bytes) {
  if (!bytes) {
    return "";
  }

  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  return new Date(value).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ResumeSection({
  resume,
  onUpload,
  onDownload,
  onDelete,
}) {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const cancelRef = useRef();

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.100"
      borderRadius="2xl"
      p={{
        base: 5,
        md: 7,
      }}
    >
      <Flex align="center" justify="space-between" mb={6}>
        <Box>
          <Text fontSize="lg" fontWeight="700" color="gray.800">
            Resume
          </Text>

          <Text fontSize="sm" color="gray.500" mt={1}>
            Your latest resume for recruiters
          </Text>
        </Box>

        {resume && (
          <Button
            leftIcon={<FiRefreshCw />}
            size="sm"
            variant="ghost"
            colorScheme="purple"
            onClick={onUpload}
          >
            Replace
          </Button>
        )}
      </Flex>

      {!resume ? (
        <Box
          border="1px dashed"
          borderColor="gray.300"
          borderRadius="xl"
          p={8}
          textAlign="center"
        >
          <Box
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            w="52px"
            h="52px"
            borderRadius="xl"
            bg="purple.50"
            color="purple.500"
            mb={4}
          >
            <FiFileText size={22} />
          </Box>

          <Text fontWeight="600" color="gray.700">
            Your resume is missing
          </Text>

          <Text fontSize="sm" color="gray.500" mt={1} mb={5}>
            Upload a PDF to strengthen your profile.
          </Text>

          <Button
            leftIcon={<FiPlus />}
            colorScheme="purple"
            size="sm"
            onClick={onUpload}
          >
            Upload resume
          </Button>
        </Box>
      ) : (
        <Flex
          align="center"
          justify="space-between"
          gap={4}
          p={5}
          border="1px solid"
          borderColor="gray.100"
          borderRadius="xl"
        >
          <HStack spacing={4} minW={0}>
            <Box
              flexShrink={0}
              w="48px"
              h="56px"
              borderRadius="lg"
              bg="red.50"
              color="red.500"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FiFileText size={22} />
            </Box>

            <Box minW={0}>
              <HStack spacing={2}>
                <Text fontWeight="700" color="gray.800" noOfLines={1}>
                  Resume.pdf
                </Text>

                <Badge
                  colorScheme="green"
                  variant="subtle"
                  borderRadius="full"
                  fontSize="10px"
                >
                  READY
                </Badge>
              </HStack>

              <Text fontSize="xs" color="gray.400" mt={1}>
                {formatFileSize(resume.fileSize)}

                {resume.uploadedAt &&
                  ` · Uploaded ${formatDate(resume.uploadedAt)}`}
              </Text>
            </Box>
          </HStack>

          <HStack spacing={1}>
            <Button
              size="sm"
              variant="ghost"
              leftIcon={<FiDownload />}
              onClick={onDownload}
            >
              Download
            </Button>

            <Button
              size="sm"
              variant="ghost"
              colorScheme="red"
              leftIcon={<FiTrash2 />}
              onClick={() => setDeleteOpen(true)}
            >
              Delete
            </Button>
          </HStack>
        </Flex>
      )}

      <AlertDialog
        isOpen={deleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setDeleteOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent borderRadius="2xl">
            <AlertDialogHeader fontWeight="700">
              Delete resume?
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text color="gray.600">
                Your current resume will be removed from your profile.
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter gap={3}>
              <Button
                ref={cancelRef}
                variant="ghost"
                onClick={() => setDeleteOpen(false)}
              >
                Cancel
              </Button>

              <Button
                colorScheme="red"
                onClick={async () => {
                  setDeleteOpen(false);

                  await onDelete();
                }}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
