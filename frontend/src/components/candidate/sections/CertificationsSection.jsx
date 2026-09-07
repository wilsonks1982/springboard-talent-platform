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
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  FiAward,
  FiCheckCircle,
  FiEdit2,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";

function formatDate(value) {
  if (!value) {
    return null;
  }

  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    year: "numeric",
  });
}

function getCertificationStatus(certification) {
  if (!certification.expiryDate) {
    return null;
  }

  const expiryDate = new Date(certification.expiryDate);
  const today = new Date();

  if (expiryDate < today) {
    return "Expired";
  }

  return "Valid";
}

function CertificationItem({ certification, onEdit, onDelete }) {
  const status = getCertificationStatus(certification);

  return (
    <Box
      border="1px solid"
      borderColor="gray.100"
      borderRadius="xl"
      p={{ base: 4, md: 5 }}
      transition="all 0.2s ease"
      _hover={{
        borderColor: "purple.100",
        boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
      }}
    >
      <Flex justify="space-between" align="flex-start" gap={4}>
        <HStack align="flex-start" spacing={4} minW={0}>
          <Box
            flexShrink={0}
            w={{ base: "42px", md: "46px" }}
            h={{ base: "42px", md: "46px" }}
            borderRadius="xl"
            bg="purple.50"
            color="purple.600"
            border="1px solid"
            borderColor="purple.100"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={FiAward} boxSize={5} />
          </Box>

          <Box minW={0}>
            <Text
              fontWeight="800"
              fontSize={{ base: "sm", md: "md" }}
              color="gray.800"
              lineHeight="1.4"
            >
              {certification.name}
            </Text>

            {certification.issuingOrganization && (
              <Text mt={1} fontSize="sm" fontWeight="600" color="purple.600">
                {certification.issuingOrganization}
              </Text>
            )}

            <HStack spacing={2} mt={3} flexWrap="wrap">
              {certification.issueDate && (
                <Badge
                  colorScheme="purple"
                  variant="subtle"
                  borderRadius="full"
                  px={2.5}
                  py={1}
                  fontSize="10px"
                  fontWeight="700"
                >
                  Issued {formatDate(certification.issueDate)}
                </Badge>
              )}

              {certification.expiryDate && (
                <Badge
                  colorScheme={status === "Expired" ? "red" : "gray"}
                  variant="subtle"
                  borderRadius="full"
                  px={2.5}
                  py={1}
                  fontSize="10px"
                  fontWeight="700"
                >
                  {status === "Expired"
                    ? "Expired"
                    : `Expires ${formatDate(certification.expiryDate)}`}
                </Badge>
              )}

              {!certification.expiryDate && (
                <Badge
                  colorScheme="green"
                  variant="subtle"
                  borderRadius="full"
                  px={2.5}
                  py={1}
                  fontSize="10px"
                  fontWeight="700"
                >
                  No expiry
                </Badge>
              )}
            </HStack>
          </Box>
        </HStack>

        <HStack spacing={1} flexShrink={0}>
          <IconButton
            aria-label="Edit certification"
            icon={<FiEdit2 />}
            size="sm"
            variant="ghost"
            colorScheme="purple"
            onClick={() => onEdit(certification)}
          />

          <IconButton
            aria-label="Delete certification"
            icon={<FiTrash2 />}
            size="sm"
            variant="ghost"
            colorScheme="red"
            onClick={() => onDelete(certification)}
          />
        </HStack>
      </Flex>
    </Box>
  );
}

export default function CertificationsSection({
  certifications = [],
  onAdd,
  onEdit,
  onDelete,
}) {
  const [deleteTarget, setDeleteTarget] = useState(null);

  const cancelRef = useRef();

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="0 4px 20px rgba(15, 23, 42, 0.04)"
    >
      {/* Header */}
      <Box p={{ base: 5, md: 6 }}>
        <Flex
          justify="space-between"
          align={{ base: "flex-start", sm: "center" }}
          gap={4}
        >
          <HStack spacing={3} align="flex-start">
            <Box
              w="40px"
              h="40px"
              borderRadius="xl"
              bg="purple.50"
              color="purple.600"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
            >
              <Icon as={FiAward} boxSize={5} />
            </Box>

            <Box>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="800"
                color="gray.900"
              >
                Certifications
              </Text>

              <Text mt={1} fontSize="sm" color="gray.500">
                Your professional credentials
              </Text>
            </Box>
          </HStack>

          <Button
            size="sm"
            colorScheme="purple"
            variant="outline"
            leftIcon={<FiPlus />}
            onClick={onAdd}
            flexShrink={0}
          >
            Add certification
          </Button>
        </Flex>
      </Box>

      <Divider />

      {/* Empty state */}
      {certifications.length === 0 ? (
        <Box
          mx={{ base: 5, md: 6 }}
          my={{ base: 5, md: 6 }}
          py={10}
          px={5}
          textAlign="center"
          border="1px dashed"
          borderColor="gray.200"
          borderRadius="xl"
          bg="gray.50"
        >
          <Box
            mx="auto"
            w="52px"
            h="52px"
            borderRadius="2xl"
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={FiAward} boxSize={6} color="gray.400" />
          </Box>

          <Text mt={4} fontWeight="700" color="gray.700">
            Strengthen your professional profile
          </Text>

          <Text
            mt={1}
            fontSize="sm"
            color="gray.500"
            maxW="420px"
            mx="auto"
            lineHeight="1.6"
          >
            Add certifications and professional credentials that demonstrate
            your expertise.
          </Text>

          <Button
            mt={5}
            size="sm"
            colorScheme="purple"
            leftIcon={<FiPlus />}
            onClick={onAdd}
          >
            Add your first certification
          </Button>
        </Box>
      ) : (
        <Box px={{ base: 5, md: 6 }} py={{ base: 6, md: 7 }}>
          <HStack mb={5} spacing={2} fontSize="xs" color="gray.500">
            <Icon as={FiCheckCircle} boxSize={3.5} color="green.500" />

            <Text>
              {certifications.length}{" "}
              {certifications.length === 1 ? "credential" : "credentials"} added
            </Text>
          </HStack>

          <Stack spacing={3}>
            {certifications.map((certification, index) => (
              <React.Fragment key={certification.id}>
                {index > 0 && <Divider />}

                <CertificationItem
                  certification={certification}
                  onEdit={onEdit}
                  onDelete={setDeleteTarget}
                />
              </React.Fragment>
            ))}
          </Stack>
        </Box>
      )}

      {/* Delete confirmation */}
      <AlertDialog
        isOpen={Boolean(deleteTarget)}
        leastDestructiveRef={cancelRef}
        onClose={() => setDeleteTarget(null)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent borderRadius="2xl">
            <AlertDialogHeader fontSize="lg" fontWeight="800">
              Delete certification?
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text color="gray.600">
                This certification will be removed from your profile.
              </Text>

              {deleteTarget?.name && (
                <Text mt={2} fontSize="sm" fontWeight="700" color="gray.800">
                  {deleteTarget.name}
                </Text>
              )}

              <Text mt={2} fontSize="sm" color="gray.500">
                This action cannot be undone.
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter gap={3}>
              <Button
                ref={cancelRef}
                variant="ghost"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </Button>

              <Button
                colorScheme="red"
                onClick={async () => {
                  const id = deleteTarget.id;

                  setDeleteTarget(null);

                  await onDelete(id);
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
