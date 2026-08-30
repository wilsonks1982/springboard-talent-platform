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
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";

import { FiBookOpen, FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";

function getEducationMeta(education) {
  const values = [];

  if (education.fieldOfStudy) {
    values.push(education.fieldOfStudy);
  }

  if (education.yearOfPassing) {
    values.push(education.yearOfPassing);
  }

  return values.join(" · ");
}

function formatEducationLevel(level) {
  if (!level) {
    return null;
  }

  const labels = {
    HIGH_SCHOOL: "High School",
    DIPLOMA: "Diploma",
    BACHELOR: "Bachelor's",
    MASTER: "Master's",
    DOCTORATE: "Doctorate",
    OTHER: "Other",
  };

  return labels[level] || level;
}

export default function EducationSection({
  education = [],
  onAdd,
  onEdit,
  onDelete,
}) {
  const [educationToDelete, setEducationToDelete] = useState(null);

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
            Education
          </Text>

          <Text fontSize="sm" color="gray.500" mt={1}>
            Your academic background
          </Text>
        </Box>

        <Button
          leftIcon={<FiPlus />}
          colorScheme="purple"
          variant="ghost"
          size="sm"
          onClick={onAdd}
        >
          Add education
        </Button>
      </Flex>

      {education.length === 0 ? (
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
            w="48px"
            h="48px"
            borderRadius="xl"
            bg="purple.50"
            color="purple.500"
            mb={3}
          >
            <FiBookOpen />
          </Box>

          <Text fontWeight="600" color="gray.700">
            Add your education
          </Text>

          <Text fontSize="sm" color="gray.500" mt={1} mb={4}>
            Highlight the education that shaped your career.
          </Text>

          <Button
            leftIcon={<FiPlus />}
            colorScheme="purple"
            size="sm"
            onClick={onAdd}
          >
            Add education
          </Button>
        </Box>
      ) : (
        <VStack align="stretch" spacing={4}>
          {education.map((item) => (
            <Box
              key={item.id}
              border="1px solid"
              borderColor="gray.100"
              borderRadius="xl"
              p={5}
              transition="all 0.2s"
              _hover={{
                borderColor: "purple.100",
                shadow: "sm",
              }}
            >
              <Flex justify="space-between" align="flex-start" gap={4}>
                <HStack align="flex-start" spacing={4} minW={0}>
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
                    <FiBookOpen />
                  </Box>

                  <Box minW={0}>
                    <Text fontWeight="700" color="gray.800">
                      {item.degree}
                    </Text>

                    <Text
                      fontSize="sm"
                      fontWeight="500"
                      color="purple.600"
                      mt={1}
                    >
                      {item.institution}
                    </Text>

                    {getEducationMeta(item) && (
                      <Text fontSize="xs" color="gray.400" mt={1}>
                        {getEducationMeta(item)}
                      </Text>
                    )}

                    {formatEducationLevel(item.educationLevel) && (
                      <Badge
                        mt={3}
                        colorScheme="purple"
                        variant="subtle"
                        borderRadius="full"
                        px={2}
                        fontSize="10px"
                        textTransform="none"
                      >
                        {formatEducationLevel(item.educationLevel)}
                      </Badge>
                    )}
                  </Box>
                </HStack>

                <HStack spacing={1}>
                  <IconButton
                    aria-label="Edit education"
                    icon={<FiEdit2 />}
                    size="sm"
                    variant="ghost"
                    onClick={() => onEdit(item)}
                  />

                  <IconButton
                    aria-label="Delete education"
                    icon={<FiTrash2 />}
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => setEducationToDelete(item)}
                  />
                </HStack>
              </Flex>
            </Box>
          ))}
        </VStack>
      )}

      <AlertDialog
        isOpen={Boolean(educationToDelete)}
        leastDestructiveRef={cancelRef}
        onClose={() => setEducationToDelete(null)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent borderRadius="2xl">
            <AlertDialogHeader fontSize="lg" fontWeight="700">
              Delete education?
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text color="gray.600">
                This will permanently remove your{" "}
                <Text as="span" fontWeight="600" color="gray.800">
                  {educationToDelete?.degree}
                </Text>{" "}
                from your profile.
              </Text>

              <Text fontSize="sm" color="gray.500" mt={2}>
                This action cannot be undone.
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter gap={3}>
              <Button
                ref={cancelRef}
                variant="ghost"
                onClick={() => setEducationToDelete(null)}
              >
                Cancel
              </Button>

              <Button
                colorScheme="red"
                onClick={async () => {
                  const item = educationToDelete;

                  setEducationToDelete(null);

                  await onDelete(item);
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
