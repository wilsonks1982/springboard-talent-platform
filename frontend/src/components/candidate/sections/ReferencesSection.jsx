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
  IconButton,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import {
  FiCheckCircle,
  FiEdit2,
  FiPlus,
  FiTrash2,
  FiUser,
} from "react-icons/fi";

function ReferenceItem({ reference, onEdit, onDelete }) {
  return (
    <Box
      border="1px solid"
      borderColor="gray.100"
      borderRadius="xl"
      p={{ base: 4, md: 5 }}
      transition="all 0.2s ease"
      _hover={{
        borderColor: "purple.100",
        boxShadow: "sm",
        transform: "translateY(-1px)",
      }}
    >
      <Flex
        align={{ base: "flex-start", md: "center" }}
        justify="space-between"
        gap={4}
      >
        <HStack align="flex-start" spacing={4} minW={0}>
          <Box
            flexShrink={0}
            w="44px"
            h="44px"
            borderRadius="full"
            bg="purple.50"
            color="purple.500"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <FiUser size={20} />
          </Box>

          <Box minW={0}>
            <HStack spacing={2} flexWrap="wrap">
              <Text
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="700"
                color="gray.800"
              >
                {reference.name}
              </Text>

              <Badge
                colorScheme="purple"
                variant="subtle"
                borderRadius="full"
                fontSize="10px"
                px={2}
              >
                Professional reference
              </Badge>
            </HStack>

            {reference.relationship && (
              <Text fontSize="sm" color="gray.500" mt={1}>
                {reference.relationship}
              </Text>
            )}

            <HStack spacing={1.5} mt={2}>
              <FiCheckCircle size={13} />

              <Text fontSize="xs" color="gray.400">
                Contact information protected
              </Text>
            </HStack>
          </Box>
        </HStack>

        <HStack spacing={1} flexShrink={0}>
          <IconButton
            aria-label="Edit reference"
            icon={<FiEdit2 />}
            size="sm"
            variant="ghost"
            colorScheme="purple"
            onClick={() => onEdit(reference)}
          />

          <IconButton
            aria-label="Delete reference"
            icon={<FiTrash2 />}
            size="sm"
            variant="ghost"
            colorScheme="red"
            onClick={() => onDelete(reference)}
          />
        </HStack>
      </Flex>
    </Box>
  );
}

export default function ReferencesSection({
  references = [],
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
      {/* Header */}
      <Flex
        align={{ base: "flex-start", sm: "center" }}
        justify="space-between"
        gap={4}
        mb={6}
      >
        <HStack align="flex-start" spacing={3}>
          <Box
            flexShrink={0}
            w="42px"
            h="42px"
            borderRadius="xl"
            bg="purple.50"
            color="purple.500"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <FiUser size={20} />
          </Box>

          <Box>
            <Text fontSize="lg" fontWeight="700" color="gray.800">
              References
            </Text>

            <Text fontSize="sm" color="gray.500" mt={1}>
              Build credibility with people who can speak to your experience
            </Text>
          </Box>
        </HStack>

        <Button
          size="sm"
          variant="outline"
          colorScheme="purple"
          leftIcon={<FiPlus />}
          onClick={onAdd}
          flexShrink={0}
        >
          Add reference
        </Button>
      </Flex>

      {/* Content */}
      {references.length === 0 ? (
        <Box
          border="1px dashed"
          borderColor="gray.300"
          borderRadius="xl"
          px={6}
          py={9}
          textAlign="center"
          bg="gray.50"
        >
          <Box
            mx="auto"
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="56px"
            h="56px"
            borderRadius="full"
            bg="white"
            color="purple.500"
            border="1px solid"
            borderColor="purple.100"
            mb={4}
          >
            <FiUser size={24} />
          </Box>

          <Text fontWeight="700" color="gray.700">
            No references yet
          </Text>

          <Text
            fontSize="sm"
            color="gray.500"
            mt={2}
            mb={5}
            maxW="430px"
            mx="auto"
          >
            Professional references add credibility and give employers
            additional confidence in your experience.
          </Text>

          <Button
            size="sm"
            colorScheme="purple"
            leftIcon={<FiPlus />}
            onClick={onAdd}
          >
            Add your first reference
          </Button>
        </Box>
      ) : (
        <Stack spacing={0}>
          <Flex align="center" justify="space-between" mb={4}>
            <HStack spacing={2}>
              <Text fontSize="sm" fontWeight="600" color="gray.700">
                Professional references
              </Text>

              <Badge
                colorScheme="purple"
                variant="subtle"
                borderRadius="full"
                px={2}
              >
                {references.length}
              </Badge>
            </HStack>

            <Text
              fontSize="xs"
              color="gray.400"
              display={{ base: "none", sm: "block" }}
            >
              Credibility & verification
            </Text>
          </Flex>

          <Divider mb={4} />

          <VStack align="stretch" spacing={3}>
            {references.map((reference) => (
              <ReferenceItem
                key={reference.id}
                reference={reference}
                onEdit={onEdit}
                onDelete={() => setDeleteTarget(reference)}
              />
            ))}
          </VStack>
        </Stack>
      )}

      {/* Delete confirmation */}
      <AlertDialog
        isOpen={Boolean(deleteTarget)}
        leastDestructiveRef={cancelRef}
        onClose={() => setDeleteTarget(null)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent borderRadius="2xl">
            <AlertDialogHeader>Delete reference?</AlertDialogHeader>

            <AlertDialogBody>
              <Text color="gray.600">
                {deleteTarget?.name
                  ? `"${deleteTarget.name}" will be removed from your profile.`
                  : "This reference will be removed from your profile."}
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
