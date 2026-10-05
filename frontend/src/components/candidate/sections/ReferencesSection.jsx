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
      <Flex
        align={{ base: "flex-start", md: "center" }}
        justify="space-between"
        gap={4}
      >
        <HStack align="flex-start" spacing={4} minW={0}>
          {/* Reference marker */}
          <Box
            flexShrink={0}
            w="36px"
            h="36px"
            border="1px solid"
            borderColor="accent.300"
            bg="cream.100"
            color="accent.600"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="4px"
          >
            <FiUser size={17} />
          </Box>

          <Box minW={0}>
            <HStack spacing={2} flexWrap="wrap">
              <Text
                fontFamily="heading"
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="500"
                color="brand.500"
              >
                {reference.name}
              </Text>

              <Badge
                bg="cream.200"
                color="taupe.700"
                borderRadius="2px"
                fontSize="9px"
                fontWeight="700"
                letterSpacing="0.08em"
                textTransform="uppercase"
                px={2}
                py="2px"
              >
                Professional reference
              </Badge>
            </HStack>

            {reference.relationship && (
              <Text fontSize="sm" color="taupe.600" mt={1.5}>
                {reference.relationship}
              </Text>
            )}

            <HStack spacing={1.5} mt={2}>
              <FiCheckCircle size={13} color="currentColor" />

              <Text fontSize="xs" color="taupe.500">
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
            color="brand.500"
            borderRadius="4px"
            _hover={{
              bg: "brand.50",
              color: "brand.600",
            }}
            onClick={() => onEdit(reference)}
          />

          <IconButton
            aria-label="Delete reference"
            icon={<FiTrash2 />}
            size="sm"
            variant="ghost"
            color="error.500"
            borderRadius="4px"
            _hover={{
              bg: "error.50",
              color: "error.600",
            }}
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
      borderColor="cream.300"
      borderRadius="6px"
      p={{ base: 5, md: 7 }}
      boxShadow="sm"
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
            w="34px"
            h="34px"
            border="1px solid"
            borderColor="accent.300"
            bg="cream.100"
            color="accent.600"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="4px"
          >
            <FiUser size={17} />
          </Box>

          <Box>
            <Text
              fontFamily="heading"
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="500"
              color="brand.500"
              lineHeight="1.2"
            >
              References
            </Text>

            <Text fontSize="sm" color="taupe.600" mt={1.5}>
              Build credibility with people who can speak to your experience
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
          Add reference
        </Button>
      </Flex>

      {/* Section rule */}
      <Box h="1px" bg="cream.300" mb={5} />

      {/* Content */}
      {references.length === 0 ? (
        <Box
          border="1px dashed"
          borderColor="cream.400"
          borderRadius="4px"
          px={6}
          py={9}
          textAlign="center"
          bg="cream.50"
        >
          <Box
            mx="auto"
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="42px"
            h="42px"
            border="1px solid"
            borderColor="accent.300"
            bg="white"
            color="accent.600"
            borderRadius="4px"
            mb={4}
          >
            <FiUser size={19} />
          </Box>

          <Text
            fontFamily="heading"
            fontSize="lg"
            fontWeight="500"
            color="brand.500"
          >
            No references yet
          </Text>

          <Text
            fontSize="sm"
            lineHeight="1.7"
            color="taupe.600"
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
            variant="solid"
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
              <Text fontSize="sm" fontWeight="700" color="charcoal.800">
                Professional references
              </Text>

              <Badge
                bg="cream.200"
                color="brand.500"
                borderRadius="2px"
                px={2}
                py="2px"
                fontSize="10px"
                fontWeight="700"
              >
                {references.length}
              </Badge>
            </HStack>

            <Text
              fontSize="xs"
              color="taupe.500"
              display={{ base: "none", sm: "block" }}
            >
              Credibility & verification
            </Text>
          </Flex>

          <Divider borderColor="cream.300" mb={4} />

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
          <AlertDialogContent
            borderRadius="6px"
            border="1px solid"
            borderColor="cream.300"
          >
            <AlertDialogHeader
              fontFamily="heading"
              fontWeight="500"
              color="brand.500"
            >
              Delete reference?
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text color="charcoal.700" lineHeight="1.7">
                {deleteTarget?.name
                  ? `"${deleteTarget.name}" will be removed from your profile.`
                  : "This reference will be removed from your profile."}
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
