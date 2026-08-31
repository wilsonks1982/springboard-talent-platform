import React, { useRef, useState } from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { FiEdit2, FiPlus, FiTrash2, FiUser } from "react-icons/fi";

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
      <Flex align="center" justify="space-between" mb={6}>
        <Box>
          <Text fontSize="lg" fontWeight="700" color="gray.800">
            References
          </Text>

          <Text fontSize="sm" color="gray.500" mt={1}>
            Add professional references who can speak about your experience
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

      {references.length === 0 ? (
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
            <FiUser size={22} />
          </Box>

          <Text fontWeight="600" color="gray.700">
            No references yet
          </Text>

          <Text fontSize="sm" color="gray.500" mt={1} mb={5}>
            Add professional references to strengthen your profile.
          </Text>

          <Button
            size="sm"
            colorScheme="purple"
            leftIcon={<FiPlus />}
            onClick={onAdd}
          >
            Add reference
          </Button>
        </Box>
      ) : (
        <VStack align="stretch" spacing={3}>
          {references.map((reference) => (
            <Flex
              key={reference.id}
              align={{ base: "flex-start", md: "center" }}
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
                  <FiUser size={20} />
                </Box>

                <Box minW={0}>
                  <Text fontWeight="700" color="gray.800">
                    {reference.name}
                  </Text>

                  {reference.relationship && (
                    <Text fontSize="sm" color="gray.500" mt={1}>
                      {reference.relationship}
                    </Text>
                  )}

                  <Text fontSize="xs" color="gray.400" mt={2}>
                    Contact information hidden
                  </Text>
                </Box>
              </HStack>

              <HStack spacing={1} flexShrink={0}>
                <Button
                  size="sm"
                  variant="ghost"
                  leftIcon={<FiEdit2 />}
                  onClick={() => onEdit(reference)}
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  leftIcon={<FiTrash2 />}
                  onClick={() => setDeleteTarget(reference)}
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
            <AlertDialogHeader>Delete reference?</AlertDialogHeader>

            <AlertDialogBody>
              <Text color="gray.600">
                This reference will be removed from your profile.
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
