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
  FiBookOpen,
  FiCheckCircle,
  FiEdit2,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";

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

function EducationItem({ item, onEdit, onDelete }) {
  const educationLevel = formatEducationLevel(item.educationLevel);
  const meta = getEducationMeta(item);

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
            <Icon as={FiBookOpen} boxSize={5} />
          </Box>

          <Box minW={0}>
            <Text
              fontWeight="800"
              fontSize={{ base: "sm", md: "md" }}
              color="gray.800"
              lineHeight="1.4"
            >
              {item.degree || "Education"}
            </Text>

            <Text mt={1} fontSize="sm" fontWeight="600" color="purple.600">
              {item.institution}
            </Text>

            {meta && (
              <Text mt={1.5} fontSize="xs" color="gray.500">
                {meta}
              </Text>
            )}

            {educationLevel && (
              <Badge
                mt={3}
                colorScheme="purple"
                variant="subtle"
                borderRadius="full"
                px={2.5}
                py={1}
                fontSize="10px"
                fontWeight="700"
                textTransform="none"
              >
                {educationLevel}
              </Badge>
            )}
          </Box>
        </HStack>

        <HStack spacing={1} flexShrink={0}>
          <IconButton
            aria-label="Edit education"
            icon={<FiEdit2 />}
            size="sm"
            variant="ghost"
            colorScheme="purple"
            onClick={() => onEdit(item)}
          />

          <IconButton
            aria-label="Delete education"
            icon={<FiTrash2 />}
            size="sm"
            variant="ghost"
            colorScheme="red"
            onClick={() => onDelete(item)}
          />
        </HStack>
      </Flex>
    </Box>
  );
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
              <Icon as={FiBookOpen} boxSize={5} />
            </Box>

            <Box>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="800"
                color="gray.900"
              >
                Education
              </Text>

              <Text mt={1} fontSize="sm" color="gray.500">
                Your academic background
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
            Add education
          </Button>
        </Flex>
      </Box>

      <Divider />

      {/* Empty state */}
      {education.length === 0 ? (
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
            <Icon as={FiBookOpen} boxSize={6} color="gray.400" />
          </Box>

          <Text mt={4} fontWeight="700" color="gray.700">
            Build your academic profile
          </Text>

          <Text
            mt={1}
            fontSize="sm"
            color="gray.500"
            maxW="420px"
            mx="auto"
            lineHeight="1.6"
          >
            Add the education that shaped your knowledge and professional
            journey.
          </Text>

          <Button
            mt={5}
            size="sm"
            colorScheme="purple"
            leftIcon={<FiPlus />}
            onClick={onAdd}
          >
            Add your first qualification
          </Button>
        </Box>
      ) : (
        <Box px={{ base: 5, md: 6 }} py={{ base: 6, md: 7 }}>
          <HStack mb={5} spacing={2} fontSize="xs" color="gray.500">
            <Icon as={FiCheckCircle} boxSize={3.5} color="green.500" />

            <Text>
              {education.length}{" "}
              {education.length === 1 ? "qualification" : "qualifications"}{" "}
              added
            </Text>
          </HStack>

          <Stack spacing={3}>
            {education.map((item, index) => (
              <React.Fragment key={item.id}>
                {index > 0 && <Divider />}
                <EducationItem
                  item={item}
                  onEdit={onEdit}
                  onDelete={setEducationToDelete}
                />
              </React.Fragment>
            ))}
          </Stack>
        </Box>
      )}

      {/* Delete confirmation */}
      <AlertDialog
        isOpen={Boolean(educationToDelete)}
        leastDestructiveRef={cancelRef}
        onClose={() => setEducationToDelete(null)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent borderRadius="2xl">
            <AlertDialogHeader fontSize="lg" fontWeight="800">
              Delete education?
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text color="gray.600">
                This will permanently remove your{" "}
                <Text as="span" fontWeight="700" color="gray.800">
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
