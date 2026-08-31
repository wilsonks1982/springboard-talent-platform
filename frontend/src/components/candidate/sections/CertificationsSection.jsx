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
  VStack,
} from "@chakra-ui/react";

import { FiAward, FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";

function formatDate(value) {
  if (!value) {
    return null;
  }

  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    year: "numeric",
  });
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
      borderColor="gray.100"
      borderRadius="2xl"
      p={{ base: 5, md: 7 }}
    >
      <Flex align="center" justify="space-between" mb={6}>
        <Box>
          <Text fontSize="lg" fontWeight="700" color="gray.800">
            Certifications
          </Text>

          <Text fontSize="sm" color="gray.500" mt={1}>
            Showcase your professional credentials
          </Text>
        </Box>

        <Button
          size="sm"
          colorScheme="purple"
          leftIcon={<FiPlus />}
          onClick={onAdd}
        >
          Add
        </Button>
      </Flex>

      {certifications.length === 0 ? (
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
            <FiAward size={22} />
          </Box>

          <Text fontWeight="600" color="gray.700">
            No certifications yet
          </Text>

          <Text fontSize="sm" color="gray.500" mt={1} mb={5}>
            Add certifications to strengthen your professional profile.
          </Text>

          <Button
            size="sm"
            colorScheme="purple"
            leftIcon={<FiPlus />}
            onClick={onAdd}
          >
            Add certification
          </Button>
        </Box>
      ) : (
        <VStack align="stretch" spacing={3}>
          {certifications.map((certification) => (
            <Flex
              key={certification.id}
              align="center"
              justify="space-between"
              gap={4}
              p={5}
              border="1px solid"
              borderColor="gray.100"
              borderRadius="xl"
            >
              <HStack align="flex-start" spacing={4} minW={0}>
                <Box
                  flexShrink={0}
                  w="44px"
                  h="44px"
                  borderRadius="lg"
                  bg="purple.50"
                  color="purple.500"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <FiAward size={20} />
                </Box>

                <Box minW={0}>
                  <Text fontWeight="700" color="gray.800" noOfLines={2}>
                    {certification.name}
                  </Text>

                  {certification.issuingOrganization && (
                    <Text fontSize="sm" color="gray.500" mt={1}>
                      {certification.issuingOrganization}
                    </Text>
                  )}

                  <HStack spacing={2} mt={2} flexWrap="wrap">
                    {certification.issueDate && (
                      <Badge
                        colorScheme="purple"
                        variant="subtle"
                        borderRadius="full"
                      >
                        Issued {formatDate(certification.issueDate)}
                      </Badge>
                    )}

                    {certification.expiryDate && (
                      <Badge
                        colorScheme="gray"
                        variant="subtle"
                        borderRadius="full"
                      >
                        Expires {formatDate(certification.expiryDate)}
                      </Badge>
                    )}
                  </HStack>
                </Box>
              </HStack>

              <HStack spacing={1} flexShrink={0}>
                <Button
                  size="sm"
                  variant="ghost"
                  leftIcon={<FiEdit2 />}
                  onClick={() => onEdit(certification)}
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  leftIcon={<FiTrash2 />}
                  onClick={() => setDeleteTarget(certification)}
                >
                  Delete
                </Button>
              </HStack>
            </Flex>
          ))}
        </VStack>
      )}

      <AlertDialog
        isOpen={Boolean(deleteTarget)}
        leastDestructiveRef={cancelRef}
        onClose={() => setDeleteTarget(null)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent borderRadius="2xl">
            <AlertDialogHeader>Delete certification?</AlertDialogHeader>

            <AlertDialogBody>
              <Text color="gray.600">
                This certification will be removed from your profile.
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
