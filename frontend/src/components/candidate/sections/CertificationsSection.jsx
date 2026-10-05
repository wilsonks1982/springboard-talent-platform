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
      borderColor="cream.300"
      borderRadius="6px"
      p={{ base: 4, md: 5 }}
      bg="white"
      transition="all 0.18s ease"
      _hover={{
        borderColor: "accent.300",
        boxShadow: "sm",
      }}
    >
      <Flex justify="space-between" align="flex-start" gap={4}>
        <HStack align="flex-start" spacing={4} minW={0}>
          {/* Certification marker */}
          <Box
            flexShrink={0}
            w={{ base: "36px", md: "38px" }}
            h={{ base: "36px", md: "38px" }}
            border="1px solid"
            borderColor="accent.300"
            bg="cream.100"
            color="accent.600"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="4px"
          >
            <Icon as={FiAward} boxSize={4} />
          </Box>

          <Box minW={0}>
            <Text
              fontFamily="heading"
              fontWeight="500"
              fontSize={{ base: "md", md: "lg" }}
              color="brand.500"
              lineHeight="1.4"
            >
              {certification.name}
            </Text>

            {certification.issuingOrganization && (
              <Text mt={1} fontSize="sm" fontWeight="600" color="accent.600">
                {certification.issuingOrganization}
              </Text>
            )}

            <HStack spacing={2} mt={3} flexWrap="wrap">
              {certification.issueDate && (
                <Badge
                  bg="cream.200"
                  color="taupe.700"
                  borderRadius="2px"
                  px={2}
                  py="2px"
                  fontSize="9px"
                  fontWeight="700"
                  letterSpacing="0.05em"
                >
                  Issued {formatDate(certification.issueDate)}
                </Badge>
              )}

              {certification.expiryDate && (
                <Badge
                  bg={status === "Expired" ? "error.50" : "cream.200"}
                  color={status === "Expired" ? "error.600" : "taupe.700"}
                  borderRadius="2px"
                  px={2}
                  py="2px"
                  fontSize="9px"
                  fontWeight="700"
                  letterSpacing="0.05em"
                >
                  {status === "Expired"
                    ? "Expired"
                    : `Expires ${formatDate(certification.expiryDate)}`}
                </Badge>
              )}

              {!certification.expiryDate && (
                <Badge
                  bg="success.50"
                  color="success.600"
                  borderRadius="2px"
                  px={2}
                  py="2px"
                  fontSize="9px"
                  fontWeight="700"
                  letterSpacing="0.05em"
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
            color="brand.500"
            borderRadius="4px"
            _hover={{
              bg: "brand.50",
              color: "brand.600",
            }}
            onClick={() => onEdit(certification)}
          />

          <IconButton
            aria-label="Delete certification"
            icon={<FiTrash2 />}
            size="sm"
            variant="ghost"
            color="error.500"
            borderRadius="4px"
            _hover={{
              bg: "error.50",
              color: "error.600",
            }}
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
      borderColor="cream.300"
      borderRadius="6px"
      overflow="hidden"
      boxShadow="sm"
    >
      {/* Header */}
      <Box p={{ base: 5, md: 7 }}>
        <Flex
          justify="space-between"
          align={{ base: "flex-start", sm: "center" }}
          gap={4}
        >
          <HStack spacing={3} align="flex-start">
            <Box
              w="34px"
              h="34px"
              border="1px solid"
              borderColor="accent.300"
              bg="cream.100"
              color="accent.600"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
              borderRadius="4px"
            >
              <Icon as={FiAward} boxSize={4} />
            </Box>

            <Box>
              <Text
                fontFamily="heading"
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="500"
                color="brand.500"
                lineHeight="1.2"
              >
                Certifications
              </Text>

              <Text mt={1.5} fontSize="sm" color="taupe.600">
                Your professional credentials
              </Text>
            </Box>
          </HStack>

          <Button
            size="sm"
            variant="outlineGold"
            leftIcon={<FiPlus />}
            onClick={onAdd}
            flexShrink={0}
          >
            Add certification
          </Button>
        </Flex>
      </Box>

      <Divider borderColor="cream.300" />

      {/* Empty state */}
      {certifications.length === 0 ? (
        <Box
          mx={{ base: 5, md: 7 }}
          my={{ base: 5, md: 7 }}
          py={10}
          px={5}
          textAlign="center"
          border="1px dashed"
          borderColor="cream.400"
          borderRadius="4px"
          bg="cream.50"
        >
          <Box
            mx="auto"
            w="42px"
            h="42px"
            border="1px solid"
            borderColor="accent.300"
            bg="white"
            color="accent.600"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="4px"
          >
            <Icon as={FiAward} boxSize={5} />
          </Box>

          <Text
            mt={4}
            fontFamily="heading"
            fontSize="lg"
            fontWeight="500"
            color="brand.500"
          >
            Strengthen your professional profile
          </Text>

          <Text
            mt={1.5}
            fontSize="sm"
            color="taupe.600"
            maxW="420px"
            mx="auto"
            lineHeight="1.7"
          >
            Add certifications and professional credentials that demonstrate
            your expertise.
          </Text>

          <Button
            mt={5}
            size="sm"
            variant="solid"
            leftIcon={<FiPlus />}
            onClick={onAdd}
          >
            Add your first certification
          </Button>
        </Box>
      ) : (
        <Box px={{ base: 5, md: 7 }} py={{ base: 6, md: 7 }}>
          <HStack mb={5} spacing={2} fontSize="xs" color="taupe.600">
            <Icon as={FiCheckCircle} boxSize={3.5} color="success.500" />

            <Text>
              {certifications.length}{" "}
              {certifications.length === 1 ? "credential" : "credentials"} added
            </Text>
          </HStack>

          <Stack spacing={3}>
            {certifications.map((certification) => (
              <CertificationItem
                key={certification.id}
                certification={certification}
                onEdit={onEdit}
                onDelete={setDeleteTarget}
              />
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
          <AlertDialogContent
            borderRadius="6px"
            border="1px solid"
            borderColor="cream.300"
          >
            <AlertDialogHeader
              fontFamily="heading"
              fontSize="lg"
              fontWeight="500"
              color="brand.500"
            >
              Delete certification?
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text color="charcoal.700" lineHeight="1.7">
                This certification will be removed from your profile.
              </Text>

              {deleteTarget?.name && (
                <Text
                  mt={2}
                  fontSize="sm"
                  fontWeight="700"
                  color="charcoal.800"
                >
                  {deleteTarget.name}
                </Text>
              )}

              <Text mt={2} fontSize="sm" color="taupe.500">
                This action cannot be undone.
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter gap={3}>
              <Button
                ref={cancelRef}
                variant="ghostBrand"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </Button>

              <Button
                variant="danger"
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
